import React, { useMemo, useState } from "react";
import {
  FilterContainer, FilterButton, ListHeader, ListContainer, ListItem,
  ItemDetails, ItemTitle, Pagination, PageButton, PageNumber,
  DeliveryItemImage, ActionButton
} from "../style";
import ReviewModal from "../review/ReviewModal";

export default function MyShopDeliveryContainer() {
  //  구매완료(pending) / 배송 중(shipping) / 배송완료(completed)
  const [activeFilter, setActiveFilter] = useState("completed");


  // 모달 상태
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState(null); // { id, name }

  // 모달 열기/닫기
  const openReview = (item) => { setTarget(item); setOpen(true); };
  const closeReview = () => { setOpen(false); setTarget(null); };

  const allItems = [
    { id: 1, name: "솜이 인형", date: "2025-09-11", status: "completed" },
    { id: 2, name: "솜이 인형", date: "2025-09-11", status: "completed" },
    { id: 3, name: "솜이 인형", date: "2025-09-11", status: "completed" },
    { id: 4, name: "솜이 인형", date: "2025-09-16", status: "completed" },
    { id: 5, name: "솜이 인형", date: "2025-09-11", status: "completed" },
    { id: 6, name: "솜이 키링", date: "2025-09-13", status: "shipping" },
    { id: 7, name: "솜이 메모지", date: "2025-09-14", status: "pending" },
  ];

  // 현재 탭에 맞는 목록만 출력
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
      {/* 탭 */}
      <FilterContainer>
        <FilterButton active={activeFilter === "pending"} onClick={() => setActiveFilter("pending")}>
          {label.pending}
        </FilterButton>
        <FilterButton active={activeFilter === "shipping"} onClick={() => setActiveFilter("shipping")}>
          {label.shipping}
        </FilterButton>
        <FilterButton active={activeFilter === "completed"} onClick={() => setActiveFilter("completed")}>
          {label.completed}
        </FilterButton>
      </FilterContainer>

      {/* 헤더(현재 탭 + 개수) */}
      <ListHeader>
        {label[activeFilter]}({items.length}개)
      </ListHeader>

      {/* 리스트 */}
      <ListContainer>
        {items.map((item) => (
          <ListItem key={item.id}>
            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
              <DeliveryItemImage />
              <ItemDetails style={{ flex: 1 }}>
                <div>상품</div>
                <ItemTitle>{item.name}</ItemTitle>
                <div>구매 일자</div>
                <div>{item.date}</div>
              </ItemDetails>

              <div>
                {activeFilter === "pending" && <ActionButton>구매 취소</ActionButton>}
                <ActionButton primary onClick={() => openReview(item)}>리뷰하기</ActionButton>
              </div>
            </div>
          </ListItem>
        ))}
      </ListContainer>

      <Pagination>
        <PageButton disabled>&lt; 이전</PageButton>
        <PageNumber>1</PageNumber>
        <PageButton>다음 &gt;</PageButton>
      </Pagination>

      {/* 모달창 렌더링 */}
       <ReviewModal open={open} onClose={closeReview} mode="create" product={{ id: target?.id, name: target?.name }}
        onSubmit={() => closeReview()}></ReviewModal>

    </div>
  );
}
