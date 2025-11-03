import React, { useState } from 'react';
import S from './style';
import OrderUserInfo from './OrderUserInfo';
import OrderProduct from './OrderProduct';
import PaymentMethod from './PaymentMathod';
import ChoosePayment from './ChoosePayment';

const ShopOrderMenu = () => {
  const [payType, setPayType] = useState(null);
  const isCandy = payType === 'candy';

  return (
    <S.OrderPageWrap className={isCandy ? 'candy-mode' : ''}>
      <S.OrderMainSection>
        <OrderUserInfo />
        <OrderProduct />
        <PaymentMethod value={payType} onChange={setPayType} />
        {payType === 'general' && <ChoosePayment />}
      </S.OrderMainSection>
      <S.OrderSideSection>
        <S.SideContainer>
          <S.SideTitle>결제 예정금액</S.SideTitle>
          <S.SideRow>
            <span>상품금액</span>
            <span>13,000원</span>
          </S.SideRow>
          <S.SideRow>
            <span>배송비</span>
            <span>3,000원</span>
          </S.SideRow>
          <S.SideTotal>
            <span>합계</span>
            <span className="price">16,000원</span>
          </S.SideTotal>
          <S.PayButton>16,000원 결제하기</S.PayButton>
        </S.SideContainer>
      </S.OrderSideSection>
    </S.OrderPageWrap>
  );
};

export default ShopOrderMenu;
