import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import S from "./style";

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

const API = process.env.REACT_APP_BACKEND_URL || "";
const fmt = (n) =>
  Number(n || 0).toLocaleString("ko-KR", { maximumFractionDigits: 0 });

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

        const url = new URL(`${API}/api/admin/revenue/forecast`);
        url.searchParams.set("horizon", horizon);

        const res = await fetch(url.toString(), {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const body = await res.json();
        const data = body?.data ?? body;

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
                  <CartesianGrid strokeDasharray="3 10" />
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
                    animationDuration={3500}
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

  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState("all");
  const [reviewStatusFilter, setReviewStatusFilter] = useState("all");

  const [deliveryData, setDeliveryData] = useState([]);
  const [loadingDeliveries, setLoadingDeliveries] = useState(false);
  const [deliveryError, setDeliveryError] = useState(null);

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailOrder, setDetailOrder] = useState(null);
  const [detailItems, setDetailItems] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);

  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const reviewReports = [
    {
      id: 1,
      reviewId: 101,
      orderId: 3,
      orderNumber: "ORD-000003",
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
      orderNumber: "ORD-000002",
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
      orderNumber: "ORD-000001",
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

  const formatDate = (value) => {
    if (!value) return "-";
    const str = String(value);
    if (str.length >= 10) return str.slice(0, 10);
    return str;
  };

  const toOrderStatusKey = (deliveryStatus) => {
    switch (deliveryStatus) {
      case "READY":
        return "pending";
      case "SHIPPING":
        return "shipped";
      case "COMPLETED":
        return "delivered";
      case "CANCELLED":
        return "cancelled";
      default:
        return "pending";
    }
  };

  const toDeliveryStatusKey = (deliveryStatus) => {
    switch (deliveryStatus) {
      case "READY":
        return "preparing";
      case "SHIPPING":
        return "shipped";
      case "COMPLETED":
        return "delivered";
      case "CANCELLED":
        return "cancelled";
      default:
        return "preparing";
    }
  };

  const safeTime = (value) => {
    if (!value || value === "-") return 0;
    const t = new Date(value).getTime();
    return Number.isNaN(t) ? 0 : t;
  };

  const paginate = (list) => {
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    return list.slice(indexOfFirst, indexOfLast);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeTab,
    searchTerm,
    orderStatusFilter,
    deliveryStatusFilter,
    reviewStatusFilter,
    sortOrder,
  ]);

  const fetchDeliveries = async () => {
    try {
      setLoadingDeliveries(true);
      setDeliveryError(null);

      const res = await fetch(`${API}/admin/deliveries/lists`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Delivery list HTTP error:", res.status);
        throw new Error(`HTTP ${res.status}`);
      }

      const body = await res.json();
      const list = body?.data || [];

      console.log("[OrderManagement] Delivery List:", list);
      setDeliveryData(list);
    } catch (e) {
      console.error("[OrderManagement] 배송/주문 목록 조회 실패:", e);
      setDeliveryError("배송/주문 목록을 불러오는 데 실패했습니다.");
      setDeliveryData([]);
    } finally {
      setLoadingDeliveries(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const orders = useMemo(() => {
    return (deliveryData || []).map((d) => {
      const items = d.adminOrderItemDTOList || [];
      const quantity = items.reduce(
        (sum, item) => sum + (item.orderQuantity || 0),
        0
      );
      const productNames = items.map((item) => item.productName).join(", ");

      return {
        id: d.orderId,
        deliveryId: d.id,
        orderNumber: `ORD-${String(d.orderId).padStart(6, "0")}`,
        user: d.memberNickname,
        product: productNames || "-",
        quantity,
        total: d.paymentPrice ?? 0,
        status: toOrderStatusKey(d.deliveryStatus),
        orderDate: formatDate(d.paymentCreateAt),
      };
    });
  }, [deliveryData]);

  const deliveries = useMemo(() => {
    return (deliveryData || []).map((d) => {
      const items = d.adminOrderItemDTOList || [];
      const productNames = items.map((item) => item.productName).join(", ");

      return {
        id: d.id,
        orderId: d.orderId,
        orderNumber: `ORD-${String(d.orderId).padStart(6, "0")}`,
        user: d.memberNickname,
        product: productNames || "-",
        productPurchaseType: d.productPurchaseType,
        address: d.deliveryAddress,
        deliveryRequest: d.deliveryRequest,
        paymentDate: formatDate(d.paymentCreateAt),
        status: toDeliveryStatusKey(d.deliveryStatus),
      };
    });
  }, [deliveryData]);

  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(term) ||
      order.user.toLowerCase().includes(term) ||
      order.product.toLowerCase().includes(term);
    const matchesFilter =
      orderStatusFilter === "all" || order.status === orderStatusFilter;
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
      (delivery.productPurchaseType &&
        delivery.productPurchaseType.toLowerCase().includes(term)) ||
      (delivery.deliveryRequest &&
        delivery.deliveryRequest.toLowerCase().includes(term));
    const matchesFilter =
      deliveryStatusFilter === "all" ||
      delivery.status === deliveryStatusFilter;
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
    const matchesFilter =
      reviewStatusFilter === "all" || report.status === reviewStatusFilter;
    return matchesSearch && matchesFilter;
  });

  const sortedOrders = useMemo(() => {
    const arr = [...filteredOrders];
    arr.sort((a, b) => {
      const diff = safeTime(a.orderDate) - safeTime(b.orderDate);
      return sortOrder === "asc" ? diff : -diff;
    });
    return arr;
  }, [filteredOrders, sortOrder]);

  const sortedDeliveries = useMemo(() => {
    const arr = [...filteredDeliveries];
    arr.sort((a, b) => {
      const diff = safeTime(a.paymentDate) - safeTime(b.paymentDate);
      return sortOrder === "asc" ? diff : -diff;
    });
    return arr;
  }, [filteredDeliveries, sortOrder]);

  const sortedReviewReports = useMemo(() => {
    const arr = [...filteredReviewReports];
    arr.sort((a, b) => {
      const diff = safeTime(a.reportDate) - safeTime(b.reportDate);
      return sortOrder === "asc" ? diff : -diff;
    });
    return arr;
  }, [filteredReviewReports, sortOrder]);

  const pageOrders = paginate(sortedOrders);
  const pageDeliveries = paginate(sortedDeliveries);
  const pageReviewReports = paginate(sortedReviewReports);

  const renderPagination = (totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "center",
          gap: "4px",
        }}
      >
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid black",
            backgroundColor: currentPage === 1 ? "#f5f5f5" : "#fff",
            cursor: currentPage === 1 ? "default" : "pointer",
            fontSize: "12px",
          }}
        >
          이전
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setCurrentPage(p)}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              backgroundColor: currentPage === p ? "#726EF0" : "#fff",
              color: currentPage === p ? "#fff" : "#333",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          onClick={() =>
            setCurrentPage((p) => Math.min(totalPages, p + 1))
          }
          disabled={currentPage === totalPages}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            backgroundColor:
              currentPage === totalPages ? "#f5f5f5" : "#fff",
            cursor: currentPage === totalPages ? "default" : "pointer",
            fontSize: "12px",
          }}
        >
          다음
        </button>
      </div>
    );
  };

  const changeDeliveryStatus = async (deliveryId, statusEnum) => {
    try {
      const url = new URL(`${API}/admin/deliveries/status/${deliveryId}`);
      url.searchParams.set("status", statusEnum);

      const res = await fetch(url.toString(), {
        method: "PUT",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("changeDeliveryStatus HTTP error:", res.status);
        throw new Error(`HTTP ${res.status}`);
      }

      await fetchDeliveries();
    } catch (e) {
      console.error("배송 상태 변경 실패:", e);
      alert("배송 상태 변경에 실패했습니다.");
    }
  };

  const handleProductStatusChange = (productId, newStatus) => {
    console.log(`상품 ${productId} 상태 변경: ${newStatus}`);
  };

  const handleAddProduct = () => {
    console.log("상품 등록 모달 열기");
  };

  const handleDeliveryStatusChange = (deliveryId, nextStatusEnum) => {
    changeDeliveryStatus(deliveryId, nextStatusEnum);
  };

  const handleReviewReportResolve = (reportId) => {
    console.log(`리뷰 신고 ${reportId} 처리 완료`);
  };

  const handleReviewDelete = (reviewId) => {
    console.log(`리뷰 ${reviewId} 삭제`);
  };

  const openOrderDetail = async (order) => {
    try {
      setDetailOpen(true);
      setDetailOrder(order);
      setDetailItems([]);
      setDetailError(null);
      setDetailLoading(true);

      const res = await fetch(
        `${API}/admin/deliveries/items/${order.id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const body = await res.json();
      const items = body?.data ?? body ?? [];

      setDetailItems(Array.isArray(items) ? items : []);
    } catch (e) {
      console.error("[OrderManagement] 주문 상세 조회 실패:", e);
      setDetailError("주문 상품 목록을 불러오는 데 실패했습니다.");
      setDetailItems([]);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeOrderDetail = () => {
    setDetailOpen(false);
    setDetailOrder(null);
    setDetailItems([]);
    setDetailError(null);
  };

  const getItemPrice = (item) =>
    item.orderPrice ?? item.paymentPrice ?? item.productPrice ?? 0;

  return (
    <S.ManagerWrapper>
      <S.ManagerContainer>
        <S.Header>
          <S.BackButton onClick={() => navigate("/main/manager")}>
            ← 뒤로가기
          </S.BackButton>
          <S.Title>관리자 센터</S.Title>
          <S.Subtitle>
            {activeTab === "dashboard"
              ? "운영 현황 대시보드"
              : "주문 및 상품 관리"}
          </S.Subtitle>
        </S.Header>

        <S.TabContainer>
          <S.TabButton
            $active={activeTab === "dashboard"}
            onClick={() => {
              setActiveTab("dashboard");
              setSearchTerm("");
              setOrderStatusFilter("all");
              setDeliveryStatusFilter("all");
              setReviewStatusFilter("all");
            }}
          >
            대시보드
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "orders"}
            onClick={() => {
              setActiveTab("orders");
              setSearchTerm("");
              setOrderStatusFilter("all");
            }}
          >
            주문 관리
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "deliveries"}
            onClick={() => {
              setActiveTab("deliveries");
              setSearchTerm("");
              setDeliveryStatusFilter("all");
            }}
          >
            배송 관리
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "products"}
            onClick={() => {
              setActiveTab("products");
              setSearchTerm("");
            }}
          >
            상품 등록/관리
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "reviewReports"}
            onClick={() => {
              setActiveTab("reviewReports");
              setSearchTerm("");
              setReviewStatusFilter("all");
            }}
          >
            리뷰 신고
          </S.TabButton>
        </S.TabContainer>

        {activeTab === "dashboard" && (
          <DashboardContent orders={orders} products={products} />
        )}

        {(activeTab === "orders" || activeTab === "deliveries") && (
          <>
            {loadingDeliveries && (
              <S.EmptyState>주문/배송 데이터를 불러오는 중...</S.EmptyState>
            )}
            {deliveryError && <S.ErrorBox>{deliveryError}</S.ErrorBox>}
          </>
        )}

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
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
              >
                <option value="all">전체 상태</option>
                <option value="pending">준비중</option>
                <option value="shipped">배송중</option>
                <option value="delivered">배송완료</option>
              </S.FilterSelect>
              <button
                type="button"
                onClick={() =>
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
                style={{
                  marginLeft: "8px",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                {sortOrder === "asc" ? "오래된순" : "최신순"}
              </button>
            </S.FilterBar>

            {pageOrders.length === 0 &&
              !loadingDeliveries &&
              !deliveryError && (
                <S.EmptyState>표시할 주문이 없습니다.</S.EmptyState>
              )}

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
                {pageOrders.map((order) => (
                  <S.TableRow key={`${order.id}-${order.deliveryId}`}>
                    <S.TableCell>{order.orderNumber}</S.TableCell>
                    <S.TableCell>{order.user}</S.TableCell>
                    <S.TableCell>{order.product}</S.TableCell>
                    <S.TableCell>{order.quantity}</S.TableCell>
                    <S.TableCell>
                      {order.total.toLocaleString()}원
                    </S.TableCell>
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
                        <S.SecondaryButton
                          onClick={() => openOrderDetail(order)}
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

            {renderPagination(sortedOrders.length)}
          </S.ContentSection>
        )}

        {activeTab === "deliveries" && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="주문번호, 사용자, 상품명, 구매 타입, 요청사항으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.FilterSelect
                value={deliveryStatusFilter}
                onChange={(e) => setDeliveryStatusFilter(e.target.value)}
              >
                <option value="all">전체 상태</option>
                <option value="preparing">준비중</option>
                <option value="shipped">배송중</option>
                <option value="delivered">배송완료</option>
              </S.FilterSelect>
              <button
                type="button"
                onClick={() =>
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
                style={{
                  marginLeft: "8px",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid black",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                {sortOrder === "asc" ? "오래된순" : "최신순"}
              </button>
            </S.FilterBar>

            {pageDeliveries.length === 0 &&
              !loadingDeliveries &&
              !deliveryError && (
                <S.EmptyState>표시할 배송 정보가 없습니다.</S.EmptyState>
              )}

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>배송 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>주문번호</S.TableHeaderCell>
                  <S.TableHeaderCell>사용자</S.TableHeaderCell>
                  <S.TableHeaderCell>상품</S.TableHeaderCell>
                  <S.TableHeaderCell>상품 구매 타입</S.TableHeaderCell>
                  <S.TableHeaderCell>배송 주소</S.TableHeaderCell>
                  <S.TableHeaderCell>배송 요청사항</S.TableHeaderCell>
                  <S.TableHeaderCell>결제일</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {pageDeliveries.map((delivery) => (
                  <S.TableRow key={delivery.id}>
                    <S.TableCell>{delivery.id}</S.TableCell>
                    <S.TableCell>{delivery.orderNumber}</S.TableCell>
                    <S.TableCell>{delivery.user}</S.TableCell>
                    <S.TableCell>{delivery.product}</S.TableCell>
                    <S.TableCell>
                      {delivery.productPurchaseType || "-"}
                    </S.TableCell>
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
                    <S.TableCell
                      style={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {delivery.deliveryRequest || "-"}
                    </S.TableCell>
                    <S.TableCell>{delivery.paymentDate || "-"}</S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge $status={delivery.status}>
                        {delivery.status === "preparing"
                          ? "준비중"
                          : delivery.status === "shipped"
                          ? "배송중"
                          : delivery.status === "delivered"
                          ? "배송완료"
                          : "취소됨"}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>
                      <S.ButtonGroup>
                        {delivery.status === "preparing" && (
                          <S.Button
                            onClick={() =>
                              handleDeliveryStatusChange(
                                delivery.id,
                                "SHIPPING"
                              )
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
                                "COMPLETED"
                              )
                            }
                            style={{ padding: "6px 12px", fontSize: "12px" }}
                          >
                            배송완료
                          </S.Button>
                        )}
                      </S.ButtonGroup>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>

            {renderPagination(sortedDeliveries.length)}
          </S.ContentSection>
        )}

        {activeTab === "products" && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="상품명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            <S.Button
              onClick={handleAddProduct}
              style={{ marginLeft: "12px" }}
            >
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
                    <S.TableCell>
                      {product.price.toLocaleString()}원
                    </S.TableCell>
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
                value={reviewStatusFilter}
                onChange={(e) => setReviewStatusFilter(e.target.value)}
              >
                <option value="all">전체 상태</option>
                <option value="pending">대기중</option>
                <option value="resolved">처리완료</option>
              </S.FilterSelect>
              <button
                type="button"
                onClick={() =>
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
                style={{
                  marginLeft: "8px",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                {sortOrder === "asc" ? "오래된순" : "최신순"}
              </button>
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
                {pageReviewReports.map((report) => (
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

            {renderPagination(sortedReviewReports.length)}
          </S.ContentSection>
        )}

        {detailOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
            onClick={closeOrderDetail}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "20px",
                width: "600px",
                maxHeight: "80vh",
                overflowY: "auto",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ marginBottom: "8px", fontSize: "20px" }}>
                주문 상세
              </h3>
              {detailOrder && (
                <p style={{ marginBottom: "12px", color: "#666" }}>
                  주문번호: <b>{detailOrder.orderNumber}</b> / 사용자:{" "}
                  <b>{detailOrder.user}</b>
                </p>
              )}

              {detailLoading && (
                <S.EmptyState>주문 상품을 불러오는 중...</S.EmptyState>
              )}
              {detailError && <S.ErrorBox>{detailError}</S.ErrorBox>}

              {!detailLoading && !detailError && detailItems.length === 0 && (
                <S.EmptyState>주문 상품이 없습니다.</S.EmptyState>
              )}

              {!detailLoading && !detailError && detailItems.length > 0 && (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "8px",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: "1px solid #eee",
                          padding: "8px 4px",
                        }}
                      >
                        상품명
                      </th>
                      <th
                        style={{
                          textAlign: "right",
                          borderBottom: "1px solid #eee",
                          padding: "8px 4px",
                        }}
                      >
                        수량
                      </th>
                      <th
                        style={{
                          textAlign: "right",
                          borderBottom: "1px solid #eee",
                          padding: "8px 4px",
                        }}
                      >
                        금액
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailItems.map((item) => (
                      <tr
                        key={item.id ?? `${item.productId}-${item.orderId}`}
                      >
                        <td
                          style={{
                            padding: "8px 4px",
                            borderBottom: "1px solid #f5f5f5",
                          }}
                        >
                          {item.productName ?? "-"}
                        </td>
                        <td
                          style={{
                            padding: "8px 4px",
                            textAlign: "right",
                            borderBottom: "1px solid #f5f5f5",
                          }}
                        >
                          {item.orderQuantity ?? 0}
                        </td>
                        <td
                          style={{
                            padding: "8px 4px",
                            textAlign: "right",
                            borderBottom: "1px solid #f5f5f5",
                          }}
                        >
                          {fmt(getItemPrice(item))}원
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "16px",
                }}
              >
                <button
                  onClick={closeOrderDetail}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#726EF0",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
      </S.ManagerContainer>
    </S.ManagerWrapper>
  );
};

export default OrderManagementContainer;
