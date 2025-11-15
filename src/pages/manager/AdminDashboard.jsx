import React, { useEffect, useMemo, useState } from "react";
import S from "./style";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const API = process.env.REACT_APP_BACKEND_URL;

const PERIOD_OPTIONS = [
  { key: "week", label: "주간(7일)", horizon: 7 },
  { key: "month", label: "월간(30일)", horizon: 30 },
  { key: "year", label: "연간(1년)", horizon: 365 },
];

const AdminDashboard = ({ orders = [], products = [] }) => {
  const [period, setPeriod] = useState("week"); // "week" | "month" | "year"
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1) 프론트에서 주문 리스트로 일자별 매출 집계 (전체 기간 기준)
  const dailyRevenue = useMemo(() => {
    const map = new Map();

    orders.forEach((o) => {
      const date = o.orderDate; // 백엔드에서 보내주는 필드명에 맞춰서 사용
      const prev = map.get(date) || 0;
      map.set(date, prev + (o.total || 0));
    });

    const result = Array.from(map.entries())
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => (a.date > b.date ? 1 : -1));
    return result;
  }, [orders]);

  // 1-1) 선택된 기간 기준으로 "히스토리" 잘라내기
  const limitedDailyRevenue = useMemo(() => {
    const currentPeriod = PERIOD_OPTIONS.find((p) => p.key === period);
    const limit = currentPeriod?.horizon ?? 7;

    if (!dailyRevenue.length) return [];
    if (dailyRevenue.length <= limit) return dailyRevenue;

    // 가장 최근 limit일만 사용
    return dailyRevenue.slice(-limit);
  }, [dailyRevenue, period]);

  // 2) XGBoost 예측 결과 호출 (백엔드 연동)
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        setError(null);

        const currentPeriod = PERIOD_OPTIONS.find((p) => p.key === period);
        const horizon = currentPeriod?.horizon ?? 7;

        const res = await fetch(
          `${API}/api/admin/revenue/forecast?horizon=${horizon}`
        );
        if (!res.ok) {
          throw new Error(`수익 예측 API 호출 실패 (status ${res.status})`);
        }

        const data = await res.json();
        // 백엔드에서 { history: [...], forecast: [...] } 또는 { data: [...] } 형태로 내려온다고 가정
        const rawForecast = Array.isArray(data.forecast)
          ? data.forecast
          : data.data || [];

        setForecastData(
          rawForecast.map((d) => ({
            date: d.date,
            // RevenueForecastPoint.predictRevenue 필드에 맞춤
            predicted: d.predictRevenue ?? d.predictedRevenue ?? d.revenue,
          }))
        );
      } catch (e) {
        console.error(e);
        setError(e.message);

        // 🔧 예측 API가 죽었을 때 임시 더미 데이터
        const currentPeriod = PERIOD_OPTIONS.find((p) => p.key === period);
        const horizon = currentPeriod?.horizon ?? 7;

        if (dailyRevenue.length) {
          const last = dailyRevenue[dailyRevenue.length - 1];
          const dummy = Array.from({ length: horizon }).map((_, i) => {
            const base = last.revenue || 0;
            return {
              date: `예측+${i + 1}일`,
              predicted: Math.round(base * (1 + 0.03 * (i + 1))),
            };
          });
          setForecastData(dummy);
        } else {
          setForecastData([]);
        }
      } finally {
        setLoading(false);
      }
    };

    if (orders.length) {
      fetchForecast();
    } else {
      setForecastData([]);
    }
  }, [orders, dailyRevenue, period]);

  // 3) 차트에 쓸 최종 데이터 (히스토리 + 예측)
  const chartData = useMemo(() => {
    const map = new Map();

    // 🔹 선택된 기간만 반영된 실제 매출
    limitedDailyRevenue.forEach((d) => {
      map.set(d.date, { date: d.date, actual: d.revenue, predicted: null });
    });

    // 🔹 예측 매출
    forecastData.forEach((f) => {
      const prev = map.get(f.date) || { date: f.date, actual: null };
      map.set(f.date, { ...prev, predicted: f.predicted });
    });

    return Array.from(map.values()).sort((a, b) =>
      a.date > b.date ? 1 : -1
    );
  }, [limitedDailyRevenue, forecastData]);

  // 4) 카테고리별 매출 / 주문 수 (전체 기준)
  const categoryStats = useMemo(() => {
    const map = new Map();

    orders.forEach((o) => {
      const product = products.find((p) => p.name === o.product);
      const category = product?.category || "기타";

      const prev = map.get(category) || { category, revenue: 0, count: 0 };
      map.set(category, {
        category,
        revenue: prev.revenue + (o.total || 0),
        count: prev.count + (o.quantity || 1),
      });
    });

    return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue);
  }, [orders, products]);

  // 5) 상단 요약 카드 지표
  const summary = useMemo(() => {
    const totalRevenue = dailyRevenue.reduce(
      (sum, d) => sum + (d.revenue || 0),
      0
    );
    const predictedSum = forecastData.reduce(
      (sum, d) => sum + (d.predicted || 0),
      0
    );
    const orderCount = orders.length;

    return {
      totalRevenue, // 전체 누적 매출
      predictedSum, // 선택 기간 horizon만큼의 예측 합계
      orderCount,
    };
  }, [dailyRevenue, forecastData, orders]);

  const fmt = (n) => Number(n || 0).toLocaleString("ko-KR");

  const currentPeriodLabel =
    PERIOD_OPTIONS.find((p) => p.key === period)?.label || "";

  return (
    <S.ContentSection>
      <S.DashboardHeaderRow>
        <S.DashboardSubTitle>매출과 예상 매출</S.DashboardSubTitle>
      </S.DashboardHeaderRow>

      {/* 상단 요약 카드 */}
      <S.DashboardGrid>
        <S.DashboardCard>
          <S.MetricLabel>누적 매출</S.MetricLabel>
          <S.MetricValue>{fmt(summary.totalRevenue)} 원</S.MetricValue>
        </S.DashboardCard>
        <S.DashboardCard>
          <S.MetricLabel>예측 매출 합계 ({currentPeriodLabel})</S.MetricLabel>
          <S.MetricValue>{fmt(summary.predictedSum)} 원</S.MetricValue>
        </S.DashboardCard>
        <S.DashboardCard>
          <S.MetricLabel>총 주문 수</S.MetricLabel>
          <S.MetricValue>{fmt(summary.orderCount)} 건</S.MetricValue>
        </S.DashboardCard>
      </S.DashboardGrid>

      {/* 차트 영역 */}
      <S.ChartSection>
        <S.SectionTitle>일자별 매출 및 예측</S.SectionTitle>

        {/* 🔹 주간 / 월간 / 연간 탭 */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          {PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setPeriod(opt.key)}
              style={{
                padding: "6px 12px",
                borderRadius: "999px",
                border: "1px solid #ddd",
                backgroundColor:
                  period === opt.key ? "#726EF0" : "transparent",
                color: period === opt.key ? "#fff" : "#333",
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {loading && <S.InfoText>예측 데이터 불러오는 중...</S.InfoText>}
        {error && <S.ErrorText>예측 API 오류: {error}</S.ErrorText>}

        <S.ChartWrapper>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                name="실제 매출"
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                name="예측 매출"
                strokeDasharray="5 5"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </S.ChartWrapper>
      </S.ChartSection>

      <S.ChartSection>
        <S.SectionTitle>카테고리별 매출 / 주문 수</S.SectionTitle>

        <S.ChartGrid>
          <S.ChartWrapper>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={categoryStats}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" name="매출" />
              </BarChart>
            </ResponsiveContainer>
          </S.ChartWrapper>

          <S.CategoryList>
            {categoryStats.map((c) => (
              <S.CategoryItem key={c.category}>
                <div>
                  <S.CategoryName>{c.category}</S.CategoryName>
                  <S.CategoryMeta>
                    주문 {fmt(c.count)}건 · 매출 {fmt(c.revenue)}원
                  </S.CategoryMeta>
                </div>
              </S.CategoryItem>
            ))}
            {categoryStats.length === 0 && (
              <S.InfoText>
                카테고리별 집계할 주문 데이터가 없습니다.
              </S.InfoText>
            )}
          </S.CategoryList>
        </S.ChartGrid>
      </S.ChartSection>
    </S.ContentSection>
  );
};

export default AdminDashboard;
