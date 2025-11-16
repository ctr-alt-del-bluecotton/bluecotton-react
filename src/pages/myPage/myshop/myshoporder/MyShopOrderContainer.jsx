// src/pages/.../mypage/myshop/MyShopOrderContainer.jsx
import React, { useEffect, useMemo, useState } from "react";
import S from "../style";
import ReviewModal from "../review/ReviewModal";
import { useSelector } from "react-redux";
import { resolveUrl } from "../../../../utils/url";

const formatDotDate = (str) => (str ? str.split("T")[0].replace(/-/g, ".") : "");

const MyShopOrderContainer = () => {
  const { currentUser, isLogin } = useSelector((state) => state.user);
  const memberId = currentUser?.id;

  const [orders, setOrders] = useState([]); // 서버에서 온 "전체 주문"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // key: productId, value: true(이미 리뷰 있음) / false(리뷰 없음)
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

  // ✅ 1) 구매내역 가져오기 (한 번만 / memberId 바뀔 때만)
  useEffect(() => {
    if (!memberId) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const base = process.env.REACT_APP_BACKEND_URL || "";
        const url = `${base}/private/mypage/myshop/order?memberId=${memberId}`;

        console.log("[MyShopOrder] 요청 URL:", url);

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
        console.log("[MyShopOrder] 응답 json:", json);

        const list = Array.isArray(json?.data) ? json.data : [];

        console.log("[MyShopOrder] 전체 orders length:", list.length);
        list.forEach((o, idx) => {
          console.log(
            `[MyShopOrder] orders[${idx}] => orderId=${o.orderId}, productId=${o.productId}, paymentStatus=${o.paymentStatus}, orderStatus=${o.orderStatus}`
          );
        });

        // 🔹 이 시점에서는 "전체 주문"을 그대로 저장
        setOrders(list);
      } catch (e) {
        console.error("[MyShopOrder] 주문 조회 실패:", e);
        setError(e.message || "주문 조회 실패");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [memberId]);

  // ✅ 2) 결제 완료(COMPLETED)인 주문만 걸러내기
  //    - paymentStatus 필드가 아예 없으면 전체 주문을 사용하도록 fallback
  const completedOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    const hasPaymentStatus = orders.some((o) => o.paymentStatus != null);

    if (!hasPaymentStatus) {
      console.warn(
        "[MyShopOrder] paymentStatus 필드가 없어서 전체 주문을 그대로 사용합니다. (백엔드에서 결제 상태 내려주도록 수정 필요)"
      );
      return orders; // 🔹 임시: 전부 보여주기
    }

    const filtered = orders.filter((o) => o.paymentStatus === "COMPLETED");

    console.log("----------------------------------------------------");
    console.log("[MyShopOrder] completedOrders 개수:", filtered.length);

    return filtered;
  }, [orders]);

  // ✅ 3) completedOrders 기준으로 productId 목록 계산 (useMemo로 안정화)
  const productIds = useMemo(() => {
    const ids = [...new Set(completedOrders.map((o) => o.productId))];
    console.log("[MyShopOrder] review 체크용 productIds:", ids);
    return ids;
  }, [completedOrders]);

  // ✅ 4) 리뷰 존재 여부 조회
  useEffect(() => {
    // 로그인 안 했거나 memberId 없으면 초기화만
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

            if (!res.ok) {
              return [productId, false];
            }

            const json = await res.json();
            const exists = json.data === 1; // data === 1 이면 이미 리뷰 있음
            return [productId, exists];
          })
        );

        const nextMap = {};
        entries.forEach(([productId, exists]) => {
          nextMap[productId] = exists;
        });

        console.log("[MyShopOrder] 리뷰 존재 여부 map:", nextMap);
        setReviewExists(nextMap);
      } catch (e) {
        console.error("리뷰 존재 여부 조회 실패:", e);
      }
    };

    fetchReviewExists();
  }, [isLogin, memberId, productIds]);

  // ✅ 화면에 보이는 주문 개수
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
