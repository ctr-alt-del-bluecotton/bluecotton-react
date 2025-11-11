import React from 'react';
import S from '../style';
import ReviewModal from '../review/ReviewModal';
import { useSelector } from 'react-redux';


const formatDotDate = (str) => str.split('T')[0].replace(/-/g, '.');

// 구매내역
const MyShopOrderContainer = () => {

   const { currentUser, isLogin } = useSelector((state) => state.user);
   const memberId = currentUser.id;

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

  // 추후에 데이터 fetch로 요청함
  const handleSubmit = async () => {
    closeReview();
  };

  return (
    <div>
      <S.ListHeader>구매내역(5개)</S.ListHeader>

      <S.ListContainer>
        {orders.map(order => (
          <S.ListItem key={order.id}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <S.OrderItemImage />
              <S.ItemContent>
                <div>상품</div>
                <S.OrderProductName>{order.name}</S.OrderProductName>
                <div>구매 일자</div>
                <S.PurchaseDate>{formatDotDate(order.date)}</S.PurchaseDate>
              </S.ItemContent>

              <S.OrderActionButton onClick={() => openReview(order)}>리뷰하기</S.OrderActionButton>
            </div>
          </S.ListItem>
        ))}
      </S.ListContainer>

      <S.Pagination>
        <S.PageButton disabled>&lt; 이전</S.PageButton>
        <S.PageNumber>1</S.PageNumber>
        <S.PageButton>다음 &gt;</S.PageButton>
      </S.Pagination>

      {/* 리뷰 모달: 렌더링 */}
      <ReviewModal
        open={open}
        onClose={closeReview}
        mode="create"
        product={{ id: target?.id, name: target?.name }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default MyShopOrderContainer;
