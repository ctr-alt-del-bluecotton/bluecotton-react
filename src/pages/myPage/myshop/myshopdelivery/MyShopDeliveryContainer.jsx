import React, { useMemo, useState } from "react";
import {
  FilterContainer,
  FilterButton,
  ListHeader,
  ListContainer,
  ListItem,
  Pagination,
  PageButton,
  PageNumber,
  DeliveryItemImage,
  ItemContent,
  OrderProductName,
  PurchaseDate,
  ActionButton
} from "../style";
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
      <FilterContainer>
        <FilterButton
          active={activeFilter === "pending"}
          onClick={() => setActiveFilter("pending")}
        >
          {label.pending}
        </FilterButton>
        <FilterButton
          active={activeFilter === "shipping"}
          onClick={() => setActiveFilter("shipping")}
        >
          {label.shipping}
        </FilterButton>
        <FilterButton
          active={activeFilter === "completed"}
          onClick={() => setActiveFilter("completed")}
        >
          {label.completed}
        </FilterButton>
      </FilterContainer>

      {/* 제목 */}
      <ListHeader>
        {label[activeFilter]}({items.length}개)
      </ListHeader>

      <ListContainer>
        {items.map((item) => (
          <ListItem key={item.id}>
            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
              <DeliveryItemImage />

              <ItemContent>
                <div>상품</div>
                <OrderProductName>{item.name}</OrderProductName>
                <div>구매 일자</div>
                <PurchaseDate>{formatDotDate(item.date)}</PurchaseDate>
              </ItemContent>

              <div>
                {activeFilter === "pending" && (
                  <ActionButton>구매 취소</ActionButton>
                )}

                {activeFilter === "completed" && (
                  <ActionButton primary onClick={() => openReview(item)}>
                    리뷰하기
                  </ActionButton>
                )}
                {/* 배송중은 버튼 없음 */}
              </div>
            </div>
          </ListItem>
        ))}
      </ListContainer>

      {/* 페이지네이션 */}
      <Pagination>
        <PageButton disabled>&lt; 이전</PageButton>
        <PageNumber>1</PageNumber>
        <PageButton>다음 &gt;</PageButton>
      </Pagination>

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
