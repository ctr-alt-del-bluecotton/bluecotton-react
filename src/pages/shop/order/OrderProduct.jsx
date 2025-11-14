// OrderProduct.jsx
import React from "react";
import S from "./style";
import { useLocation } from "react-router-dom";

const OrderProduct = () => {
  const location = useLocation();

  // ✅ 장바구니에서 넘겨준 스냅샷
  const snapshot = location.state?.snapshot;
  const items = snapshot?.items || [];
  const totalPrice = snapshot?.totalPrice || 0;

  // 총 수량
  const totalCount = items.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0
  );

  const formatPrice = (v) =>
    v.toLocaleString("ko-KR", { maximumFractionDigits: 0 }) + "원";

  return (
    <S.OrderProductWrap>
      <S.OrderProductContainer>
        <S.OrderProductText>주문 상품 {totalCount}개</S.OrderProductText>

        {items.map((item) => (
          <S.ProductRow key={item.productId}>
            <S.ProductThumb
              src={item.imageUrl || "/assets/images/default_product.png"}
              alt={item.name}
            />
            <S.ProductContent>
              <S.ContentText1>{item.name}</S.ContentText1>
              <S.ContentText2>
                {formatPrice(item.unitPrice)} / {item.quantity}개
              </S.ContentText2>
            </S.ProductContent>
          </S.ProductRow>
        ))}

        {items.length === 0 && (
          <S.EmptyText>주문할 상품이 없습니다.</S.EmptyText>
        )}
      </S.OrderProductContainer>
    </S.OrderProductWrap>
  );
};

export default OrderProduct;
