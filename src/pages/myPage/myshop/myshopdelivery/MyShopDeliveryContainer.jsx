import React, { useMemo, useState } from "react";
import S from "../style";
import ReviewModal from "../review/ReviewModal";

const formatDotDate = (str) => str.split("T")[0].replace(/-/g, ".");

export default function MyShopDeliveryContainer() {
  const [activeFilter, setActiveFilter] = useState("completed");

  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState(null);

  const openReview = (item) => {
    setTarget(item);
    setOpen(true);
  };
  const closeReview = () => {
    setOpen(false);
    setTarget(null);
  };

  const allItems = [
    { id: 1, name: "솜이 인형", date: "2025-09-11", status: "completed" },
    { id: 2, name: "솜이 인형", date: "2025-09-11", status: "completed" },
    { id: 3, name: "솜이 인형", date: "2025-09-11", status: "completed" },
    { id: 4, name: "솜이 인형", date: "2025-09-16", status: "completed" },
    { id: 5, name: "솜이 인형", date: "2025-09-11", status: "completed" },
    { id: 6, name: "솜이 키링", date: "2025-09-13", status: "shipping" },
    { id: 7, name: "솜이 메모지", date: "2025-09-14", status: "pending" },
  ];

  const items = useMemo(
    () => allItems.filter((it) => it.status === activeFilter),
    [activeFilter]
  );

  const label = {
    pending: "구매완료",
    shipping: "배송 중",
    completed: "배송완료",
  };

  return (
    <div>
      {/* 상태 필터 */}
      <S.FilterContainer>
        <S.FilterButton
          active={activeFilter === "pending"}
          onClick={() => setActiveFilter("pending")}
        >
          {label.pending}
        </S.FilterButton>
        <S.FilterButton
          active={activeFilter === "shipping"}
          onClick={() => setActiveFilter("shipping")}
        >
          {label.shipping}
        </S.FilterButton>
        <S.FilterButton
          active={activeFilter === "completed"}
          onClick={() => setActiveFilter("completed")}
        >
          {label.completed}
        </S.FilterButton>
      </S.FilterContainer>

      {/* 제목 */}
      <S.ListHeader>
        {label[activeFilter]}({items.length}개)
      </S.ListHeader>

      <S.ListContainer>
        {items.map((item) => (
          <S.ListItem key={item.id}>
            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
              <S.DeliveryItemImage />

              <S.ItemContent>
                <div>상품</div>
                <S.OrderProductName>{item.name}</S.OrderProductName>
                <div>구매 일자</div>
                <S.PurchaseDate>{formatDotDate(item.date)}</S.PurchaseDate>
              </S.ItemContent>

              <div>
                {activeFilter === "pending" && (
                  <S.ActionButton>구매 취소</S.ActionButton>
                )}

                {activeFilter === "completed" && (
                  <S.ActionButton primary onClick={() => openReview(item)}>
                    리뷰하기
                  </S.ActionButton>
                )}
                {/* 배송중은 버튼 없음 */}
              </div>
            </div>
          </S.ListItem>
        ))}
      </S.ListContainer>

      {/* 페이지네이션 */}
      <S.Pagination>
        <S.PageButton disabled>&lt; 이전</S.PageButton>
        <S.PageNumber>1</S.PageNumber>
        <S.PageButton>다음 &gt;</S.PageButton>
      </S.Pagination>

      {/* 리뷰 모달 */}
      <ReviewModal
        open={open}
        onClose={closeReview}
        mode="create"
        product={{ id: target?.id, name: target?.name }}
        onSubmit={() => closeReview()}
      />
    </div>
  );
}
