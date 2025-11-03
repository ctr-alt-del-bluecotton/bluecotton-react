// src/pages/shop/order/OrderProduct.jsx
import React from "react";
import S from "./style";

const OrderProduct = () => {
  return (
    <S.OrderProductWrap>
      <S.OrderProductContainer>
        <S.OrderProductText>주문 상품 2개</S.OrderProductText>

        <S.ProductRow>
          <S.ProductThumb
            src="/assets/images/shop_related_product2.png"
            alt="솜이 레옹 키링"
          />
          <S.ProductContent>
            <S.ContentText>솜이 레옹 키링</S.ContentText>
            <S.ContentText>9,000원</S.ContentText>
          </S.ProductContent>
        </S.ProductRow>

        <S.ProductRow>
          <S.ProductThumb
            src="/assets/images/shop_related_product1.png"
            alt="솜이 메모지"
          />
          <S.ProductContent>
            <S.ContentText>솜이 메모지</S.ContentText>
            <S.ContentText>4,000원</S.ContentText>
          </S.ProductContent>
        </S.ProductRow>
      </S.OrderProductContainer>
    </S.OrderProductWrap>
  );
};

export default OrderProduct;
