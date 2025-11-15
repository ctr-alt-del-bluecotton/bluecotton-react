// src/pages/.../OrderManagement/AdminDashboard.jsx
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

  // 0) 날짜 문자열 -> Date 객체
  const toDate = (s) => {
    if (!s) return new Date("1970-01-01T00:00:00");
    // "2025-11-16 10:20:30" 이런 형식이 올 수도 있으니 앞 10자리만 사용
    const dateStr = String(s).slice(0, 10);
    return new Date(`${dateStr}T00:00:00`);
  };

  // 1) 프론트에서 주문 리스트로 일자별 매출 집계
  const dailyRevenue = useMemo(() => {
    const map = new Map();

    (orders || []).forEach((o) => {
      if (!o) return;

      // 백엔드에서 내려주는 필드명에 맞춰서 한 번 더 방어코드
      const date = o.orderDate || o.order_date || o.date;
      if (!date) return;

      const amount =
        Number(o.total ?? o.totalPrice ?? o.orderTotalPrice ?? 0) || 0;

      const prev = map.get(date) || 0;
      map.set(date, prev + amount);
    });

    const result = Array.from(map.entries())
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => (a.date > b.date ? 1 : -1));

    return result;
  }, [orders]);

  // 로그는 밖에서 찍기
  useEffect(() => {
    console.log("[AdminDashboard] dailyRevenue:", dailyRevenue);
  }, [dailyRevenue]);

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

        // 백엔드에서 { history: [...], forecast: [...] } 형태로 내려온다고 가정
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

        // 🔧 예측 API가 죽었을 때 임시 더미 데이터 (마지막 매출 기준 7일만)
        if (dailyRevenue.length) {
          const last = dailyRevenue[dailyRevenue.length - 1];
          const dummy = Array.from({ length: 7 }).map((_, i) => {
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

  // 3) 실제 + 예측 합친 전체 데이터
  const chartData = useMemo(() => {
    const map = new Map();

    dailyRevenue.forEach((d) => {
      map.set(d.date, { date: d.date, actual: d.revenue, predicted: null });
    });

    forecastData.forEach((f) => {
      const prev = map.get(f.date) || { date: f.date, actual: null };
      map.set(f.date, { ...prev, predicted: f.predicted });
    });

    return Array.from(map.values()).sort((a, b) =>
      a.date > b.date ? 1 : -1
    );
  }, [dailyRevenue, forecastData]);

  // 4) 기간(주간/월간/연간)에 따라 보여줄 데이터만 슬라이싱
  const filteredChartData = useMemo(() => {
    if (!chartData.length) return [];

    const sorted = [...chartData].sort(
      (a, b) => toDate(a.date) - toDate(b.date)
    );
    const last = sorted[sorted.length - 1];
    const lastDate = toDate(last.date);

    let days = 7;
    if (period === "month") days = 30;
    else if (period === "year") days = 365;

    const from = new Date(lastDate);
    from.setDate(from.getDate() - (days - 1)); // 최근 N일

    return sorted.filter((d) => {
      const dt = toDate(d.date);
      return dt >= from && dt <= lastDate;
    });
  }, [chartData, period]);

  // 5) 카테고리별 매출 / 주문수 집계
  const categoryStats = useMemo(() => {
    const map = new Map();

    (orders || []).forEach((o) => {
      if (!o) return;

      // o.product 에 이름만 들고 있고, products 에 전체 정보가 있다고 가정
      const product = (products || []).find(
        (p) => p.name === o.product || p.productName === o.product
      );
      const category = product?.category || product?.categoryName || "기타";

      const amount =
        Number(o.total ?? o.totalPrice ?? o.orderTotalPrice ?? 0) || 0;
      const qty = Number(o.quantity ?? o.orderQuantity ?? 1) || 1;

      const prev = map.get(category) || { category, revenue: 0, count: 0 };
      map.set(category, {
        category,
        revenue: prev.revenue + amount,
        count: prev.count + qty,
      });
    });

    return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue);
  }, [orders, products]);

  // 6) 상단 요약 카드 지표
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
      totalRevenue,
      predictedSum,
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
          {filteredChartData.length === 0 ? (
            <S.InfoText>표시할 매출 데이터가 없습니다.</S.InfoText>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={filteredChartData}
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
          )}
        </S.ChartWrapper>
      </S.ChartSection>

      {/* 카테고리별 매출 / 주문 수 */}
      <S.ChartSection>
        <S.SectionTitle>카테고리별 매출 / 주문 수</S.SectionTitle>

        <S.ChartGrid>
          <S.ChartWrapper>
            {categoryStats.length === 0 ? (
              <S.InfoText>카테고리별 집계할 주문 데이터가 없습니다.</S.InfoText>
            ) : (
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
            )}
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
