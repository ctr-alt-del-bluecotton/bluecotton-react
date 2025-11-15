// src/pages/.../mypage/myshop/MyShopOrderContainer.jsx
import React, { useEffect, useState } from "react";
import S from "../style";
import ReviewModal from "../review/ReviewModal";
import { useSelector } from "react-redux";
import { resolveUrl } from "../../../../utils/url";

const formatDotDate = (str) => (str ? str.split("T")[0].replace(/-/g, ".") : "");

// ✅ 주문 객체에서 상태 문자열 뽑기 (필드명 여러 경우 대비)
const getStatus = (order) =>
  order.paymentStatus ||
  order.orderStatus ||
  order.status ||
  order.payment_status ||
  "";

// ✅ "결제 완료"라고 볼 상태 판정
const isCompletedStatus = (status) => {
  const s = String(status || "").toUpperCase();

  if (!s) return false;

  // TODO: 여기 문자열은 실제 DB/DTO 값에 맞게 조정해도 됨
  // 예: PAYMENT_COMPLETED, PAY_COMPLETED 등
  const completedKeywords = ["COMPLETE", "SUCCESS", "PAID"];

  return completedKeywords.some((key) => s.includes(key));
};

const MyShopOrderContainer = () => {
  const { currentUser, isLogin } = useSelector((state) => state.user);
  const memberId = currentUser?.id;

  const [orders, setOrders] = useState([]); // 서버에서 온 "전체 주문"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //  key: productId, value: true(이미 리뷰 있음) / false(리뷰 없음)
  const [reviewExists, setReviewExists] = useState({});

  // 모달
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState(null);

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

  // ✅ 구매내역 가져오기 (일단 전체 가져옴)
  useEffect(() => {
    if (!memberId) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const base = process.env.REACT_APP_BACKEND_URL || "";
        const res = await fetch(
          `${base}/private/mypage/myshop/order?memberId=${memberId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            method: "GET",
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json = await res.json();
        const list = Array.isArray(json?.data) ? json.data : [];

        setOrders(list); // ✅ 원본 그대로 저장
      } catch (e) {
        setError(e.message || "주문 조회 실패");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [memberId]);

  // ✅ "결제 완료된 주문"만 필터링
  const completedOrders = orders.filter((o) => {
    const status = getStatus(o);
    return isCompletedStatus(status);
  });

  // ✅ 구매내역에 있는 productId 들에 대해 "리뷰 존재 여부" 조회
  useEffect(() => {
    if (!isLogin || !memberId) {
      setReviewExists({});
      return;
    }

    // ✅ 리뷰 체크도 "결제 완료된 주문들" 기준으로만
    const productIds = [...new Set(completedOrders.map((o) => o.productId))];

    if (productIds.length === 0) {
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

            if (!res.ok) {
              return [productId, false];
            }

            const json = await res.json();
            // data === 1 이면 이미 리뷰 있음
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
        console.error("리뷰 존재 여부 조회 실패:", e);
      }
    };

    fetchReviewExists();
  }, [completedOrders, isLogin, memberId]);

  // ✅ 실제 화면에 보이는 주문 개수 = "결제 완료된 주문" 개수
  const totalCount = completedOrders.length;

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
        {completedOrders.map((order) => {
          const src = resolveUrl(order.productMainImageUrl);
          const alreadyReviewed = reviewExists[order.productId] === true;

          return (
            <S.ListItem key={order.orderId}>
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
                  onClick={() => {
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

      <S.Pagination>
        <S.PageButton disabled>&lt; 이전</S.PageButton>
        <S.PageNumber>1</S.PageNumber>
        <S.PageButton disabled>다음 &gt;</S.PageButton>
      </S.Pagination>

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
