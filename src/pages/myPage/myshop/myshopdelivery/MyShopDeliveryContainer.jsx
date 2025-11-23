// src/pages/.../mypage/myshop/MyShopDeliveryContainer.jsx
import React, { useMemo, useState, useEffect } from "react";
import S from "../style";
import ReviewModal from "../review/ReviewModal";
import { useSelector } from "react-redux";
import { resolveUrl } from "../../../../utils/url";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../../components/modal/useModal";
import Pagination from "../../components/Pagination";

const formatDotDate = (str) => {
  if (!str) return "";
  return str.split("T")[0].replace(/-/g, ".");
};

const toClient = (dto) => ({
  id: dto.orderId, // ✅ [수정] deliveryId(NULL 가능) 대신 orderId(고유값)를 id로 사용
  orderId: dto.orderId, // 주문 ID는 별도 보관
  productId: dto.productId, // 상품 ID
  name: dto.productName || "상품명 없음",
  date: dto.orderCreateAt, // YYYY-MM-DD
  status: dto.deliveryStatus.toLowerCase(),
  imageUrl: resolveUrl(dto.productMainImageUrl) || "/assets/images/abc.png",
});

const MyShopDeliveryContainer = () => {
  const [activeFilter, setActiveFilter] = useState("paid");

  const { currentUser, isLogin } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState(null);

  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const { openModal } = useModal();

  // key: productId, value: true(이미 리뷰 있음) / false(리뷰 없음)
  const [reviewExists, setReviewExists] = useState({});

  // 배송 목록 조회
  useEffect(() => {
    const fetchDeliveries = async () => {
      if (!isLogin || !currentUser?.id) {
        setAllItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const memberId = currentUser.id;
        const url = `${process.env.REACT_APP_BACKEND_URL}/private/mypage/myshop/delivery/${memberId}`;

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "배송 정보를 불러오지 못했습니다.");
        }

        const json = await res.json();
        const transformedData = Array.isArray(json.data)
          ? json.data.map(toClient)
          : [];
        // 최신순 정렬 (date 기준 내림차순)
        const sortedData = transformedData.sort((a, b) => {
          const dateA = a.date ? new Date(a.date) : new Date(0);
          const dateB = b.date ? new Date(b.date) : new Date(0);
          return dateB - dateA; // 최신순 (내림차순)
        });
        setAllItems(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, [isLogin, currentUser?.id]);

  // 리뷰 존재 여부 조회 (배송완료 기준)
  useEffect(() => {
    if (!isLogin || !currentUser?.id) {
      setReviewExists({});
      return;
    }

    const memberId = currentUser.id;

    const completedItems = allItems.filter((it) => it.status === "completed");
    const productIds = [...new Set(completedItems.map((it) => it.productId))];

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
              // 실패하면 일단 "리뷰 없음"으로 처리
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
  }, [allItems, isLogin, currentUser?.id]);

  // ⚠️ 여기 수정: orderId 기준으로 삭제
  const handleCancel = (orderId) => {
    openModal({
      title: "구매를 취소하시겠습니까?",
      message: "취소 후에는 되돌릴 수 없습니다.",
      confirmText: "취소",
      cancelText: "닫기",
      onConfirm: async () => {
        try {
          const url = `${process.env.REACT_APP_BACKEND_URL}/private/mypage/myshop/delivery/${orderId}`;

          const res = await fetch(url, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || "구매 취소에 실패했습니다.");
          }

          // ✅ orderId로 필터링해서 해당 주문 row 제거
          setAllItems((prev) => prev.filter((it) => it.orderId !== orderId));
        } catch (e) {
          alert(e.message);
        }
      },
    });
  };

  const openReview = (item) => {
    setTarget(item);
    setOpen(true);
  };

  const closeReview = () => {
    setOpen(false);
    setTarget(null);
  };

  const handleReviewSubmit = () => {
    if (target?.productId) {
      setReviewExists((prev) => ({ ...prev, [target.productId]: true }));
    }
    closeReview();
  };

  // 현재 탭(activeFilter)에 해당하는 항목만 필터
  const filteredItems = useMemo(
    () => allItems.filter((it) => it.status === activeFilter),
    [activeFilter, allItems]
  );

  // 필터 변경 시 페이지를 1로 리셋
  useEffect(() => {
    setPageNumber(1);
  }, [activeFilter]);

  // 페이지네이션된 데이터 계산
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = filteredItems.slice(startIndex, endIndex);

  const label = {
    paid: "구매완료",
    shipping: "배송 중",
    completed: "배송완료",
  };

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
      <S.FilterContainer>
        <S.FilterButton
          $active={activeFilter === "paid"}
          onClick={() => setActiveFilter("paid")}
        >
          {label.paid}
        </S.FilterButton>
        <S.FilterButton
          $active={activeFilter === "shipping"}
          onClick={() => setActiveFilter("shipping")}
        >
          {label.shipping}
        </S.FilterButton>
        <S.FilterButton
          $active={activeFilter === "completed"}
          onClick={() => setActiveFilter("completed")}
        >
          {label.completed}
        </S.FilterButton>
      </S.FilterContainer>

      {/* 제목 */}
      <S.ListHeader>
        {label[activeFilter] || "배송현황"}({filteredItems.length}개)
      </S.ListHeader>

      <S.ListContainer>
        {items.length === 0 && !loading && (
          <div style={{ padding: 20, textAlign: "center" }}>
            {label[activeFilter]} 내역이 없습니다.
          </div>
        )}

        {items.map((item) => {
          const alreadyReviewed = reviewExists[item.productId] === true;

          return (
            <S.ListItem
              key={item.id} // ✅ 이제 deliveryId라서 중복 없음
              onClick={() => navigate(`/main/shop/read/${item.productId}`)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <S.DeliveryItemImage
                  style={{ backgroundImage: `url("${item.imageUrl}")` }}
                />

                <S.ItemContent>
                  <div>상품</div>
                  <S.OrderProductName>{item.name}</S.OrderProductName>
                  <div>구매 일자</div>
                  <S.PurchaseDate>{formatDotDate(item.date)}</S.PurchaseDate>
                </S.ItemContent>

                <div>
                  {activeFilter === "paid" && (
                    <S.ActionButton
                      onClick={(e) => {
                        e.stopPropagation();
                        // ✅ 주문 ID 기준으로 취소
                        handleCancel(item.orderId);
                      }}
                    >
                      구매 취소
                    </S.ActionButton>
                  )}

                  {activeFilter === "completed" && (
                    <S.ActionButton
                      primary
                      disabled={alreadyReviewed}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!alreadyReviewed) openReview(item);
                      }}
                    >
                      {alreadyReviewed ? "작성 완료" : "리뷰하기"}
                    </S.ActionButton>
                  )}
                </div>
              </div>
            </S.ListItem>
          );
        })}
      </S.ListContainer>

      <Pagination 
        totalPages={totalPages}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />

      <ReviewModal
        open={open}
        onClose={closeReview}
        mode="create"
        product={{
          id: target?.productId,
          name: target?.name,
          imageUrl: target?.imageUrl,
        }}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default MyShopDeliveryContainer;
