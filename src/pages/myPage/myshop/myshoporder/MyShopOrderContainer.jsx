import React, { useEffect, useMemo, useState } from "react";
import S from "../style";
import ReviewModal from "../review/ReviewModal";
import { useSelector } from "react-redux";
import { resolveUrl } from "../../../../utils/url";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination"; 

const formatDotDate = (str) => (str ? str.split("T")[0].replace(/-/g, ".") : "");

const MyShopOrderContainer = () => {
  const { currentUser, isLogin } = useSelector((state) => state.user);
  const memberId = currentUser?.id;

  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 10;


  const [reviewExists, setReviewExists] = useState({});

  // 모달
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState(null);

  const navigate = useNavigate(); 

  const openReview = (order) => {
    setTarget({
      id: order.orderId,
      productId: order.productId,
      name: order.productName,
      date: order.orderCreateAt,
      image: resolveUrl(order.productMainImageUrl),
    });
    setOpen(true);
  };

  const closeReview = () => {
    setOpen(false);
    setTarget(null);
  };

  //  1) 구매내역 가져오기 (한 번만 / memberId 바뀔 때만)
  useEffect(() => {
    if (!memberId) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const base = process.env.REACT_APP_BACKEND_URL || "";
        const url = `${base}/private/mypage/myshop/order?memberId=${memberId}`;



        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          method: "GET",
        });


        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json = await res.json();


        const list = Array.isArray(json?.data) ? json.data : [];

        // 최신순 정렬 (orderCreateAt 기준 내림차순)
        const sortedList = list.sort((a, b) => {
          const dateA = a.orderCreateAt ? new Date(a.orderCreateAt) : new Date(0);
          const dateB = b.orderCreateAt ? new Date(b.orderCreateAt) : new Date(0);
          return dateB - dateA; // 최신순 (내림차순)
        });

        setOrders(sortedList);
      } catch (e) {
        console.error("MyShopOrder 주문 조회 실패:", e);
        setError(e.message || "주문 조회 실패");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [memberId]);


  const completedOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    const hasPaymentStatus = orders.some((o) => o.paymentStatus != null);

    if (!hasPaymentStatus) {
      console.warn(
        "[MyShopOrder] paymentStatus 필드가 없어서 전체 주문을 그대로 사용합니다. (백엔드에서 결제 상태 내려주도록 수정 필요)"
      );
      return orders; 
    }

    const filtered = orders.filter((o) => o.paymentStatus === "COMPLETED");

    console.log("----------------------------------------------------");
    console.log("[MyShopOrder] completedOrders 개수:", filtered.length);

    return filtered;
  }, [orders]);

 
  const productIds = useMemo(() => {
    const ids = [...new Set(completedOrders.map((o) => o.productId))];
    console.log("[MyShopOrder] review 체크용 productIds:", ids);
    return ids;
  }, [completedOrders]);


  useEffect(() => {

    if (!isLogin || !memberId) {
      setReviewExists({});
      return;
    }

    // 구매내역 없으면 초기화만
    if (productIds.length === 0) {
      console.log("[MyShopOrder] productIds 길이 0 → reviewExists 초기화");
      setReviewExists({});
      return;
    }

    const fetchReviewExists = async () => {
      try {
        const entries = await Promise.all(
          productIds.map(async (productId) => {
            const url = `${process.env.REACT_APP_BACKEND_URL}/private/mypage/myshop/review/exist/${productId}/${memberId}`;

            const res = await fetch(url, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            });
            console.log("테스트");
            console.log(res);

            if (!res.ok) {
              return [productId, false];
            }

            const json = await res.json();
            const exists = json.data === 1; 
            return [productId, exists];
          })
        );

        const nextMap = {};
        entries.forEach(([productId, exists]) => {
          nextMap[productId] = exists;
        });

        setReviewExists(nextMap);
      } catch (e) {

      }
    };

    fetchReviewExists();
  }, [isLogin, memberId, productIds]);

  const totalCount = completedOrders.length;

  // 페이지네이션된 데이터 계산
  const totalPages = Math.max(1, Math.ceil(completedOrders.length / itemsPerPage));
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = completedOrders.slice(startIndex, endIndex);

  const handleSubmit = ({ productId }) => {
    if (productId) {
      setReviewExists((prev) => ({
        ...prev,
        [productId]: true,
      }));
    }
    closeReview();
  };

  if (!memberId) {
    return <div>로그인 정보가 없습니다.</div>;
  }

  if (loading) {
    return <div style={{ padding: 20, textAlign: "center" }}>로딩 중...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: 20, textAlign: "center", color: "red" }}>
        에러: {error}
      </div>
    );
  }

  return (
    <div>
      <S.ListHeader>구매내역({totalCount}개)</S.ListHeader>

      <S.ListContainer>
        {paginatedOrders.map((order) => {
          const src = resolveUrl(order.productMainImageUrl);

          const alreadyReviewed = reviewExists[order.productId] === true;

          return (
            <S.ListItem
              key={order.orderId}
              onClick={() => navigate(`/main/shop/read/${order.productId}`)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <S.OrderItemImage as="img" src={src} alt={order.productName} />
                <S.ItemContent>
                  <div>상품</div>
                  <S.OrderProductName>{order.productName}</S.OrderProductName>
                  <div>구매 일자</div>
                  <S.PurchaseDate>
                    {formatDotDate(order.orderCreateAt)}
                  </S.PurchaseDate>
                </S.ItemContent>

                <S.OrderActionButton
                  disabled={alreadyReviewed}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!alreadyReviewed) openReview(order);
                  }}
                >
                  {alreadyReviewed ? "작성 완료" : "리뷰하기"}
                </S.OrderActionButton>
              </div>
            </S.ListItem>
          );
        })}

        {completedOrders.length === 0 && <div>구매내역이 없습니다.</div>}
      </S.ListContainer>

      <Pagination 
        totalPages={totalPages}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />

      {/* 리뷰 모달 */}
      <ReviewModal
        open={open}
        onClose={closeReview}
        mode="create"
        product={{
          id: target?.productId,
          name: target?.name,
          imageUrl: target?.image,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default MyShopOrderContainer;
