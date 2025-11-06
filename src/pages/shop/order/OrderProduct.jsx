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
            <S.ContentText1>솜이 레옹 키링</S.ContentText1>
            <S.ContentText2>9,000원</S.ContentText2>
          </S.ProductContent>
        </S.ProductRow>

        <S.ProductRow>
          <S.ProductThumb
            src="/assets/images/shop_related_product1.png"
            alt="솜이 메모지"
          />
          <S.ProductContent>
            <S.ContentText1>솜이 메모지</S.ContentText1>
            <S.ContentText2>4,000원</S.ContentText2>
          </S.ProductContent>
        </S.ProductRow>
      </S.OrderProductContainer>
    </S.OrderProductWrap>
  );
};

export default OrderProduct;
