// src/pages/manager/order/AdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import S from "./style";

const API = process.env.REACT_APP_BACKEND_URL;
const fmt = (n) => Number(n || 0).toLocaleString("ko-KR");

const AdminDashboard = ({ orders = [], products = [] }) => {
  // ---- 매출 & 예측 상태 ----
  const [dailyRevenue, setDailyRevenue] = useState([]);      // [{ date, revenue }]
  const [forecast, setForecast] = useState([]);              // [{ date, revenue }]
  const [horizon, setHorizon] = useState(7);                 // 7/30/365

  const [loadingRevenue, setLoadingRevenue] = useState(false);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [error, setError] = useState(null);

  // ---- 요약 카드용 ----
  const totalOrders = orders.length;
  const totalSales = useMemo(
    () => orders.reduce((sum, o) => sum + (o.total || 0), 0),
    [orders]
  );
  const activeProducts = useMemo(
    () => products.filter((p) => p.status === "active").length,
    [products]
  );

  // ---- 차트용 가공 데이터 ----
  const historyChartData = useMemo(
    () =>
      dailyRevenue.map((d) => ({
        date: d.date?.slice(5) || d.date, // "YYYY-MM-DD" → "MM-DD"
        revenue: d.revenue,
      })),
    [dailyRevenue]
  );

  const forecastChartData = useMemo(
    () =>
      forecast.map((d) => ({
        date: d.date?.slice(5) || d.date,
        revenue: d.revenue,
      })),
    [forecast]
  );

  // =========================
  // 1) 일 매출 조회 (/daily)
  // =========================
  useEffect(() => {
    const fetchDailyRevenue = async () => {
      try {
        setLoadingRevenue(true);
        setError(null);

        const res = await fetch(`${API}/api/admin/revenue/daily`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("일 매출 조회에 실패했습니다.");
        }

        const data = await res.json();
        console.log("[AdminDashboard] dailyRevenue raw:", data);

        if (Array.isArray(data)) {
          setDailyRevenue(
            data.map((d) => ({
              date: d.date,
              revenue: Number(
                d.revenue ?? d.totalRevenue ?? d.amount ?? 0
              ),
            }))
          );
        } else {
          setDailyRevenue([]);
        }
      } catch (e) {
        console.error("[AdminDashboard] daily revenue error:", e);
        setError(e.message);
        setDailyRevenue([]);
      } finally {
        setLoadingRevenue(false);
      }
    };

    fetchDailyRevenue();
  }, []);

  // =========================
  // 2) 매출 예측 조회 (/forecast)
  // =========================
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoadingForecast(true);
      setError(null);

        const res = await fetch(
          `${API}/api/admin/revenue/forecast?horizon=${horizon}`,
          { credentials: "include" }
        );

        if (!res.ok) {
          throw new Error("매출 예측 조회에 실패했습니다.");
        }

        const data = await res.json();
        console.log("[AdminDashboard] forecast raw:", data);

        // 예상 응답 형태: { data: [ { date, predictRevenue }, ... ] }
        const forecastArray = Array.isArray(data.forecast)
          ? data.forecast
          : Array.isArray(data.data)
          ? data.data
          : [];

        setForecast(
          forecastArray.map((d) => ({
            date: d.date,
            revenue: Number(
              d.predictRevenue ?? d.revenue ?? d.amount ?? 0
            ),
          }))
        );
      } catch (e) {
        console.error("[AdminDashboard] forecast error:", e);
        setError(e.message);
        setForecast([]);
      } finally {
        setLoadingForecast(false);
      }
    };

    fetchForecast();
  }, [horizon]);

  return (
    <S.DashboardWrapper>
      <S.SectionTitle>대시보드</S.SectionTitle>

      {/* ---- 상단 요약 카드 ---- */}
      <S.SummaryGrid>
        <S.SummaryCard>
          <S.SummaryLabel>총 주문 수</S.SummaryLabel>
          <S.SummaryValue>{fmt(totalOrders)}건</S.SummaryValue>
        </S.SummaryCard>

        <S.SummaryCard>
          <S.SummaryLabel>총 매출 (주문 기준)</S.SummaryLabel>
          <S.SummaryValue>{fmt(totalSales)}원</S.SummaryValue>
        </S.SummaryCard>

        <S.SummaryCard>
          <S.SummaryLabel>판매중 상품</S.SummaryLabel>
          <S.SummaryValue>{fmt(activeProducts)}개</S.SummaryValue>
        </S.SummaryCard>
      </S.SummaryGrid>

      {error && <S.ErrorBox>에러: {error}</S.ErrorBox>}

      {/* ---- 하단: 매출 / 예측 ---- */}
      <S.ChartGrid>
        {/* 1) 일별 매출 */}
        <S.ChartCard>
          <S.ChartHeader>
            <S.ChartTitle>일별 매출 (결제 기준)</S.ChartTitle>
          </S.ChartHeader>

          {loadingRevenue ? (
            <S.EmptyState>일 매출 데이터를 불러오는 중...</S.EmptyState>
          ) : dailyRevenue.length === 0 ? (
            <S.EmptyState>표시할 매출 데이터가 없습니다.</S.EmptyState>
          ) : (
            <S.ChartBody>
              <S.SimpleList>
                {historyChartData.map((d) => (
                  <li key={d.date}>
                    <span>{d.date}</span>
                    <span>{fmt(d.revenue)}원</span>
                  </li>
                ))}
              </S.SimpleList>
            </S.ChartBody>
          )}
        </S.ChartCard>

        {/* 2) 매출 예측 (XGBoost) */}
        <S.ChartCard>
          <S.ChartHeader>
            <S.ChartTitle>매출 예측 (XGBoost)</S.ChartTitle>
            <S.HorizonButtons>
              {[7, 30, 365].map((h) => (
                <S.HorizonButton
                  key={h}
                  $active={horizon === h}
                  onClick={() => setHorizon(h)}
                >
                  {h === 7 ? "7일" : h === 30 ? "30일" : "1년"}
                </S.HorizonButton>
              ))}
            </S.HorizonButtons>
          </S.ChartHeader>

          {loadingForecast ? (
            <S.EmptyState>예측 데이터를 불러오는 중...</S.EmptyState>
          ) : forecast.length === 0 ? (
            <S.EmptyState>표시할 예측 데이터가 없습니다.</S.EmptyState>
          ) : (
            <S.ChartBody>
              <S.SimpleList>
                {forecastChartData.map((d) => (
                  <li key={d.date}>
                    <span>{d.date}</span>
                    <span>{fmt(d.revenue)}원</span>
                  </li>
                ))}
              </S.SimpleList>
            </S.ChartBody>
          )}
        </S.ChartCard>
      </S.ChartGrid>
    </S.DashboardWrapper>
  );
};

export default AdminDashboard;
