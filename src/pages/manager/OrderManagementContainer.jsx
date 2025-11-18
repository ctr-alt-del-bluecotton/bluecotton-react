// src/pages/manager/order/OrderManagementContainer.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import S from "./style";

// Recharts 라이브러리 (npm install recharts)
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const API = process.env.REACT_APP_BACKEND_URL;
const fmt = (n) => Number(n || 0).toLocaleString("ko-KR", { maximumFractionDigits: 0 });



const DashboardContent = ({ orders = [], products = [] }) => {
 
  const [dailyRevenue, setDailyRevenue] = useState([]); 
  const [forecast, setForecast] = useState([]); 
  const [horizon, setHorizon] = useState(7);

  const [loadingRevenue, setLoadingRevenue] = useState(false);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [error, setError] = useState(null);

  const totalOrders = orders.length;
  const totalSales = useMemo(
    () => orders.reduce((sum, o) => sum + (o.total || 0), 0),
    [orders]
  );
  const activeProducts = useMemo(
    () => products.filter((p) => p.status === "active").length,
    [products]
  );

  const historyChartData = useMemo(
    () =>
      dailyRevenue.map((d) => ({
        date: d.date,
        displayDate: d.date?.slice(5) || d.date, 
        revenue: d.revenue,
      })),
    [dailyRevenue]
  );

  const forecastChartData = useMemo(
    () =>
      forecast.map((d) => ({
        date: d.date,
        displayDate: d.date?.slice(5) || d.date,
        revenue: d.revenue,
      })),
    [forecast]
  );

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoadingRevenue(true);
        setLoadingForecast(true);
        setError(null);

        const res = await axios.get(
          `${API}/api/admin/revenue/forecast?horizon=${horizon}`,
          { withCredentials: true }
        );

        const data = res.data;
        console.log("[DashboardContent] Integrated Data:", data);

        if (!data || !Array.isArray(data.history)) {
          throw new Error("백엔드 API가 history 데이터를 반환하지 않았습니다.");
        }

       
        setDailyRevenue(
          data.history.map((d) => ({
            date: d.date,
            revenue: Number(d.revenue ?? d.totalRevenue ?? d.amount ?? 0),
          }))
        );

        const forecastArray = Array.isArray(data.forecast) ? data.forecast : [];
        setForecast(
          forecastArray.map((d) => ({
            date: d.date,
            revenue: Number(d.predictRevenue ?? d.revenue ?? d.amount ?? 0),
          }))
        );
      } catch (e) {
        console.error("[DashboardContent] Dashboard Data Error:", e);
        setError(`데이터 로드 실패: ${e.message}`);
        setDailyRevenue([]);
        setForecast([]);
      } finally {
        setLoadingRevenue(false);
        setLoadingForecast(false);
      }
    };

    fetchDashboardData();
  }, [horizon]);

  return (
    <S.DashboardWrapper>
      <S.SectionTitle>관리자 대시보드</S.SectionTitle>

      <S.SummaryGrid>
        <S.SummaryCard>
          <S.SummaryLabel>총 주문 수</S.SummaryLabel>
          <S.SummaryValue style={{ color: "#333", fontSize: "24px" }}>
            {fmt(totalOrders)}건
          </S.SummaryValue>
        </S.SummaryCard>

        <S.SummaryCard>
          <S.SummaryLabel>총 매출 (주문 기준)</S.SummaryLabel>
          <S.SummaryValue style={{ color: "#333", fontSize: "24px" }}>
            {fmt(totalSales)}원
          </S.SummaryValue>
        </S.SummaryCard>

        <S.SummaryCard>
          <S.SummaryLabel>판매중 상품</S.SummaryLabel>
          <S.SummaryValue style={{ color: "#333", fontSize: "24px" }}>
            {fmt(activeProducts)}개
          </S.SummaryValue>
        </S.SummaryCard>
      </S.SummaryGrid>

      {error && <S.ErrorBox>에러: {error}</S.ErrorBox>}

 
      <S.ChartGrid>
        <S.ChartCard>
          <S.ChartHeader>
            <S.ChartTitle>일별 매출 (결제 기준)</S.ChartTitle>
          </S.ChartHeader>

          {loadingRevenue || loadingForecast ? (
            <S.EmptyState>데이터를 불러오는 중...</S.EmptyState>
          ) : dailyRevenue.length === 0 ? (
            <S.EmptyState>표시할 매출 데이터가 없습니다. (DB 확인)</S.EmptyState>
          ) : (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="displayDate" />
                  <YAxis tickFormatter={(v) => fmt(v)} width={80} />
                  <Tooltip
                    formatter={(value) => `${fmt(value)}원`}
                    labelFormatter={(label) => `날짜: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#726EF0"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </S.ChartCard>
        <S.ChartCard>
          <S.ChartHeader>
            <S.ChartTitle>매출 예측</S.ChartTitle>
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

          {loadingRevenue || loadingForecast ? (
            <S.EmptyState>예측 데이터를 불러오는 중...</S.EmptyState>
          ) : forecast.length === 0 ? (
            <S.EmptyState>표시할 예측 데이터가 없습니다. (API 응답 확인)</S.EmptyState>
          ) : (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={forecastChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="displayDate" />
                  <YAxis tickFormatter={(v) => fmt(v)} width={80} />
                  <Tooltip
                    formatter={(value) => `${fmt(value)}원`}
                    labelFormatter={(label) => `예측 날짜: ${label}`}
                  />
                  <Bar dataKey="revenue" fill="#726EF0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </S.ChartCard>
      </S.ChartGrid>
    </S.DashboardWrapper>
  );
};

const OrderManagementContainer = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const orders = [
    {
      id: 1,
      orderNumber: "ORD-001",
      user: "user1",
      product: "블루코튼 티셔츠",
      quantity: 2,
      total: 50000,
      status: "pending",
      orderDate: "2024-12-10",
    },
    {
      id: 2,
      orderNumber: "ORD-002",
      user: "user2",
      product: "블루코튼 후드",
      quantity: 1,
      total: 80000,
      status: "shipped",
      orderDate: "2024-12-09",
    },
    {
      id: 3,
      orderNumber: "ORD-003",
      user: "user3",
      product: "블루코튼 캡",
      quantity: 3,
      total: 45000,
      status: "delivered",
      orderDate: "2024-12-08",
    },
    {
      id: 4,
      orderNumber: "ORD-004",
      user: "user4",
      product: "블루코튼 가방",
      quantity: 1,
      total: 60000,
      status: "pending",
      orderDate: "2024-12-11",
    },
  ];

  const products = [
    {
      id: 1,
      name: "블루코튼 티셔츠",
      price: 25000,
      stock: 50,
      category: "의류",
      status: "active",
      createDate: "2024-11-01",
    },
    {
      id: 2,
      name: "블루코튼 후드",
      price: 80000,
      stock: 30,
      category: "의류",
      status: "active",
      createDate: "2024-11-05",
    },
    {
      id: 3,
      name: "블루코튼 캡",
      price: 15000,
      stock: 100,
      category: "악세서리",
      status: "active",
      createDate: "2024-11-10",
    },
    {
      id: 4,
      name: "블루코튼 가방",
      price: 60000,
      stock: 20,
      category: "악세서리",
      status: "inactive",
      createDate: "2024-11-15",
    },
  ];

  const deliveries = [
    {
      id: 1,
      orderNumber: "ORD-001",
      orderId: 1,
      user: "user1",
      product: "블루코튼 티셔츠",
      trackingNumber: "1234567890",
      address: "서울시 강남구 테헤란로 123",
      status: "preparing",
      shipDate: null,
      deliveryDate: null,
    },
    {
      id: 2,
      orderNumber: "ORD-002",
      orderId: 2,
      user: "user2",
      product: "블루코튼 후드",
      trackingNumber: "0987654321",
      address: "서울시 서초구 서초대로 456",
      status: "shipped",
      shipDate: "2024-12-09",
      deliveryDate: null,
    },
    {
      id: 3,
      orderNumber: "ORD-003",
      orderId: 3,
      user: "user3",
      product: "블루코튼 캡",
      trackingNumber: "1122334455",
      address: "서울시 송파구 올림픽로 789",
      status: "delivered",
      shipDate: "2024-12-08",
      deliveryDate: "2024-12-10",
    },
    {
      id: 4,
      orderNumber: "ORD-004",
      orderId: 4,
      user: "user4",
      product: "블루코튼 가방",
      trackingNumber: null,
      address: "서울시 마포구 홍대로 321",
      status: "preparing",
      shipDate: null,
      deliveryDate: null,
    },
  ];

  const reviewReports = [
    {
      id: 1,
      reviewId: 101,
      orderId: 3,
      orderNumber: "ORD-003",
      product: "블루코튼 캡",
      reviewContent: "부적절한 리뷰 내용입니다...",
      rating: 1,
      reportedUser: "user3",
      reporter: "user100",
      reason: "허위 리뷰",
      reportDate: "2024-12-10",
      status: "pending",
    },
    {
      id: 2,
      reviewId: 102,
      orderId: 2,
      orderNumber: "ORD-002",
      product: "블루코튼 후드",
      reviewContent: "욕설이 포함된 리뷰",
      rating: 2,
      reportedUser: "user2",
      reporter: "user101",
      reason: "욕설/비방",
      reportDate: "2024-12-09",
      status: "pending",
    },
    {
      id: 3,
      reviewId: 103,
      orderId: 1,
      orderNumber: "ORD-001",
      product: "블루코튼 티셔츠",
      reviewContent: "스팸 리뷰",
      rating: 5,
      reportedUser: "user1",
      reporter: "user102",
      reason: "스팸",
      reportDate: "2024-12-08",
      status: "resolved",
    },
  ];

  // ---- 필터링 ----
  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(term) ||
      order.user.toLowerCase().includes(term) ||
      order.product.toLowerCase().includes(term);
    const matchesFilter = filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDeliveries = deliveries.filter((delivery) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      delivery.orderNumber.toLowerCase().includes(term) ||
      delivery.user.toLowerCase().includes(term) ||
      delivery.product.toLowerCase().includes(term) ||
      (delivery.trackingNumber &&
        delivery.trackingNumber.toLowerCase().includes(term));
    const matchesFilter = filterStatus === "all" || delivery.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredReviewReports = reviewReports.filter((report) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      report.orderNumber.toLowerCase().includes(term) ||
      report.product.toLowerCase().includes(term) ||
      report.reviewContent.toLowerCase().includes(term) ||
      report.reportedUser.toLowerCase().includes(term) ||
      report.reporter.toLowerCase().includes(term);
    const matchesFilter = filterStatus === "all" || report.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // ---- 핸들러 (지금은 콘솔만) ----
  const handleOrderStatusChange = (orderId, newStatus) => {
    console.log(`주문 ${orderId} 상태 변경: ${newStatus}`);
    // TODO: API 연결
  };

  const handleProductStatusChange = (productId, newStatus) => {
    console.log(`상품 ${productId} 상태 변경: ${newStatus}`);
    // TODO: API 연결
  };

  const handleAddProduct = () => {
    console.log("상품 등록 모달 열기");
    // TODO: 상품 등록 모달 구현
  };

  const handleDeliveryStatusChange = (deliveryId, newStatus) => {
    console.log(`배송 ${deliveryId} 상태 변경: ${newStatus}`);
    // TODO: API 연결
  };

  const handleTrackingNumberUpdate = (deliveryId, trackingNumber) => {
    console.log(`배송 ${deliveryId} 추적번호 업데이트: ${trackingNumber}`);
    // TODO: API 연결
  };

  const handleReviewReportResolve = (reportId) => {
    console.log(`리뷰 신고 ${reportId} 처리 완료`);
    // TODO: API 연결
  };

  const handleReviewDelete = (reviewId) => {
    console.log(`리뷰 ${reviewId} 삭제`);
    // TODO: API 연결
  };

  return (
    <S.ManagerWrapper>
      <S.ManagerContainer>
        <S.Header>
          <S.BackButton onClick={() => navigate("/main/manager")}>
            ← 뒤로가기
          </S.BackButton>
          <S.Title>관리자 센터</S.Title>
          <S.Subtitle>
            {activeTab === "dashboard" ? "운영 현황 대시보드" : "주문 및 상품 관리"}
          </S.Subtitle>
        </S.Header>

        {/* 탭 영역 */}
        <S.TabContainer>
          <S.TabButton
            $active={activeTab === "dashboard"}
            onClick={() => {
              setActiveTab("dashboard");
              setSearchTerm("");
              setFilterStatus("all");
            }}
          >
            대시보드
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "orders"}
            onClick={() => {
              setActiveTab("orders");
              setSearchTerm("");
              setFilterStatus("all");
            }}
          >
            주문 관리
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "deliveries"}
            onClick={() => {
              setActiveTab("deliveries");
              setSearchTerm("");
              setFilterStatus("all");
            }}
          >
            배송 관리
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "products"}
            onClick={() => {
              setActiveTab("products");
              setSearchTerm("");
              setFilterStatus("all");
            }}
          >
            상품 등록/관리
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "reviewReports"}
            onClick={() => {
              setActiveTab("reviewReports");
              setSearchTerm("");
              setFilterStatus("all");
            }}
          >
            리뷰 신고
          </S.TabButton>
        </S.TabContainer>

        {/* 1) 대시보드 탭 */}
        {activeTab === "dashboard" && (
          <DashboardContent orders={orders} products={products} />
        )}

        {/* 2) 주문 관리 탭 */}
        {activeTab === "orders" && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="주문번호, 사용자, 상품명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.FilterSelect
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">전체 상태</option>
                <option value="pending">대기중</option>
                <option value="shipped">배송중</option>
                <option value="delivered">배송완료</option>
                <option value="cancelled">취소됨</option>
              </S.FilterSelect>
            </S.FilterBar>

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>주문번호</S.TableHeaderCell>
                  <S.TableHeaderCell>사용자</S.TableHeaderCell>
                  <S.TableHeaderCell>상품</S.TableHeaderCell>
                  <S.TableHeaderCell>수량</S.TableHeaderCell>
                  <S.TableHeaderCell>총액</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>주문일</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {filteredOrders.map((order) => (
                  <S.TableRow key={order.id}>
                    <S.TableCell>{order.orderNumber}</S.TableCell>
                    <S.TableCell>{order.user}</S.TableCell>
                    <S.TableCell>{order.product}</S.TableCell>
                    <S.TableCell>{order.quantity}</S.TableCell>
                    <S.TableCell>{order.total.toLocaleString()}원</S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge $status={order.status}>
                        {order.status === "pending"
                          ? "대기중"
                          : order.status === "shipped"
                          ? "배송중"
                          : order.status === "delivered"
                          ? "배송완료"
                          : "취소됨"}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>{order.orderDate}</S.TableCell>
                    <S.TableCell>
                      <S.ButtonGroup>
                        <S.Button
                          onClick={() =>
                            handleOrderStatusChange(order.id, "shipped")
                          }
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                          disabled={order.status !== "pending"}
                        >
                          배송시작
                        </S.Button>
                        <S.SecondaryButton
                          onClick={() =>
                            console.log(`주문 ${order.id} 상세보기`)
                          }
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          상세
                        </S.SecondaryButton>
                      </S.ButtonGroup>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
          </S.ContentSection>
        )}

        {/* 3) 배송 관리 탭 */}
        {activeTab === "deliveries" && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="주문번호, 사용자, 상품명, 추적번호로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.FilterSelect
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">전체 상태</option>
                <option value="preparing">준비중</option>
                <option value="shipped">배송중</option>
                <option value="delivered">배송완료</option>
              </S.FilterSelect>
            </S.FilterBar>

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>배송 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>주문번호</S.TableHeaderCell>
                  <S.TableHeaderCell>사용자</S.TableHeaderCell>
                  <S.TableHeaderCell>상품</S.TableHeaderCell>
                  <S.TableHeaderCell>배송 주소</S.TableHeaderCell>
                  <S.TableHeaderCell>추적번호</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>발송일</S.TableHeaderCell>
                  <S.TableHeaderCell>배송완료일</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {filteredDeliveries.map((delivery) => (
                  <S.TableRow key={delivery.id}>
                    <S.TableCell>{delivery.id}</S.TableCell>
                    <S.TableCell>{delivery.orderNumber}</S.TableCell>
                    <S.TableCell>{delivery.user}</S.TableCell>
                    <S.TableCell>{delivery.product}</S.TableCell>
                    <S.TableCell
                      style={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {delivery.address}
                    </S.TableCell>
                    <S.TableCell>{delivery.trackingNumber || "-"}</S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge $status={delivery.status}>
                        {delivery.status === "preparing"
                          ? "준비중"
                          : delivery.status === "shipped"
                          ? "배송중"
                          : "배송완료"}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>{delivery.shipDate || "-"}</S.TableCell>
                    <S.TableCell>{delivery.deliveryDate || "-"}</S.TableCell>
                    <S.TableCell>
                      <S.ButtonGroup>
                        {delivery.status === "preparing" && (
                          <S.Button
                            onClick={() =>
                              handleDeliveryStatusChange(delivery.id, "shipped")
                            }
                            style={{ padding: "6px 12px", fontSize: "12px" }}
                          >
                            배송시작
                          </S.Button>
                        )}
                        {delivery.status === "shipped" && (
                          <S.Button
                            onClick={() =>
                              handleDeliveryStatusChange(
                                delivery.id,
                                "delivered"
                              )
                            }
                            style={{ padding: "6px 12px", fontSize: "12px" }}
                          >
                            배송완료
                          </S.Button>
                        )}
                        <S.SecondaryButton
                          onClick={() => {
                            const trackingNumber =
                              window.prompt("추적번호를 입력하세요:");
                            if (trackingNumber) {
                              handleTrackingNumberUpdate(
                                delivery.id,
                                trackingNumber
                              );
                            }
                          }}
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          추적번호 입력
                        </S.SecondaryButton>
                      </S.ButtonGroup>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
          </S.ContentSection>
        )}

        {/* 4) 상품 관리 탭 */}
        {activeTab === "products" && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="상품명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.Button onClick={handleAddProduct} style={{ marginLeft: "12px" }}>
                + 상품 등록
              </S.Button>
            </S.FilterBar>

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>ID</S.TableHeaderCell>
                  <S.TableHeaderCell>상품명</S.TableHeaderCell>
                  <S.TableHeaderCell>가격</S.TableHeaderCell>
                  <S.TableHeaderCell>재고</S.TableHeaderCell>
                  <S.TableHeaderCell>카테고리</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>등록일</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {filteredProducts.map((product) => (
                  <S.TableRow key={product.id}>
                    <S.TableCell>{product.id}</S.TableCell>
                    <S.TableCell>{product.name}</S.TableCell>
                    <S.TableCell>{product.price.toLocaleString()}원</S.TableCell>
                    <S.TableCell>{product.stock}개</S.TableCell>
                    <S.TableCell>{product.category}</S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge $status={product.status}>
                        {product.status === "active" ? "판매중" : "판매중지"}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>{product.createDate}</S.TableCell>
                    <S.TableCell>
                      <S.ButtonGroup>
                        <S.Button
                          onClick={() =>
                            console.log(`상품 ${product.id} 수정`)
                          }
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          수정
                        </S.Button>
                        <S.SecondaryButton
                          onClick={() =>
                            handleProductStatusChange(
                              product.id,
                              product.status === "active"
                                ? "inactive"
                                : "active"
                            )
                          }
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          {product.status === "active"
                            ? "판매중지"
                            : "판매재개"}
                        </S.SecondaryButton>
                      </S.ButtonGroup>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
          </S.ContentSection>
        )}

        {/* 5) 리뷰 신고 탭 */}
        {activeTab === "reviewReports" && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="주문번호, 상품명, 리뷰 내용, 신고자, 피신고자로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.FilterSelect
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">전체 상태</option>
                <option value="pending">대기중</option>
                <option value="resolved">처리완료</option>
              </S.FilterSelect>
            </S.FilterBar>

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>신고 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>리뷰 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>주문번호</S.TableHeaderCell>
                  <S.TableHeaderCell>상품</S.TableHeaderCell>
                  <S.TableHeaderCell>리뷰 내용</S.TableHeaderCell>
                  <S.TableHeaderCell>평점</S.TableHeaderCell>
                  <S.TableHeaderCell>피신고자</S.TableHeaderCell>
                  <S.TableHeaderCell>신고자</S.TableHeaderCell>
                  <S.TableHeaderCell>신고 사유</S.TableHeaderCell>
                  <S.TableHeaderCell>신고일</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {filteredReviewReports.map((report) => (
                  <S.TableRow key={report.id}>
                    <S.TableCell>{report.id}</S.TableCell>
                    <S.TableCell>{report.reviewId}</S.TableCell>
                    <S.TableCell>{report.orderNumber}</S.TableCell>
                    <S.TableCell>{report.product}</S.TableCell>
                    <S.TableCell
                      style={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {report.reviewContent}
                    </S.TableCell>
                    <S.TableCell>{"⭐".repeat(report.rating)}</S.TableCell>
                    <S.TableCell>{report.reportedUser}</S.TableCell>
                    <S.TableCell>{report.reporter}</S.TableCell>
                    <S.TableCell>{report.reason}</S.TableCell>
                    <S.TableCell>{report.reportDate}</S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge $status={report.status}>
                        {report.status === "pending" ? "대기중" : "처리완료"}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>
                      <S.ButtonGroup>
                        <S.Button
                          onClick={() => handleReviewReportResolve(report.id)}
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                          disabled={report.status === "resolved"}
                        >
                          처리
                        </S.Button>
                        <S.SecondaryButton
                          onClick={() => handleReviewDelete(report.reviewId)}
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          삭제
                        </S.SecondaryButton>
                      </S.ButtonGroup>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
          </S.ContentSection>
        )}
      </S.ManagerContainer>
    </S.ManagerWrapper>
  );
};

export default OrderManagementContainer;
