import React from 'react';
import {
  ListHeader,
  ListContainer,
  ListItem,
  Pagination,
  PageButton,
  PageNumber,
  OrderItemImage,
  ItemContent,
  OrderProductName,
  PurchaseDate,
  OrderActionButton,
  ReviewButton
} from '../style';
import ReviewModal from '../review/ReviewModal';

const MyShopOrderContainer = () => {
  const orders = [
    { id: 1, name: '솜이 인형', date: '2025-09-11' },
    { id: 2, name: '솜이 인형', date: '2025-09-11' },
    { id: 3, name: '솜이 인형', date: '2025-09-11' },
    { id: 4, name: '솜이 인형', date: '2025-09-11' },
    { id: 5, name: '솜이 인형', date: '2025-09-11' }
  ];

  // 모달창 
  const [open, setOpen] = React.useState(false);
  const [target, setTarget] = React.useState(null); // { id, name, date }

  const openReview = (order) => {
    setTarget(order);
    setOpen(true);
  };
  const closeReview = () => {
    setOpen(false);
    setTarget(null);
  };


  // 추후에 데이터 fectch로 요청함
  const handleSubmit = async (formDataOrPayload) => {
    closeReview();
  };

  return (
    <div>
      <ListHeader>구매내역(5개)</ListHeader>
      
      <ListContainer>
        {orders.map(order => (
          <ListItem key={order.id}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <OrderItemImage />
              <ItemContent>
                <div>상품</div>
                <OrderProductName>{order.name}</OrderProductName>
                <div>구매 일자</div>
                <PurchaseDate>{order.date}</PurchaseDate>
              </ItemContent>


              <OrderActionButton onClick={() => openReview(order)}>리뷰하기</OrderActionButton>
            </div>
          </ListItem>
        ))}
      </ListContainer>

      <Pagination>
        <PageButton disabled>&lt; 이전</PageButton>
        <PageNumber>1</PageNumber>
        <PageButton disabled={false}>다음 &gt;</PageButton>
      </Pagination>

      {/* 리뷰 모달: 렌더링 */}
      <ReviewModal
        open={open}
        onClose={closeReview}
        mode="create"
        product={{ id: target?.id, name: target?.name }}
        onSubmit={handleSubmit}/>

    </div>
  );
};

export default MyShopOrderContainer;
