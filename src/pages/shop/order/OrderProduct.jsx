import React, { useEffect } from "react";
import S from "./style";
import { useLocation } from "react-router-dom";

const OrderProduct = ({ onTotalPriceChange }) => {
  const location = useLocation();

  console.log("[OrderProduct] location.state:", location.state);

  const state = location.state || {};
  const snapshot = state.snapshot;

  let items = [];
  let totalPrice = 0;

  if (snapshot?.items?.length) {
    items = snapshot.items;
    totalPrice =
      snapshot.totalPrice ??
      snapshot.items.reduce(
        (sum, it) => sum + (it.unitPrice || 0) * (it.quantity ?? 1),
        0
      );
  }

  const totalCount = items.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0
  );

  const formatPrice = (v) =>
    (Number(v) || 0).toLocaleString("ko-KR", {
      maximumFractionDigits: 0,
    }) + "원";

  // 🔥 여기서 부모에게 "총 결제 금액" 알려줌
  useEffect(() => {
    if (typeof onTotalPriceChange === "function") {
      onTotalPriceChange(totalPrice);
    }
  }, [totalPrice, onTotalPriceChange]);

  return (
    <S.OrderProductWrap>
      <S.OrderProductContainer>
        <S.OrderProductText>주문 상품 {totalCount}개</S.OrderProductText>

        {items.map((item) => (
          <S.ProductRow key={item.productId || item.id}>
            <S.ProductThumb
              src={item.imageUrl || "/assets/images/default_product.png"}
              alt={item.name}
            />
            <S.ProductContent>
              <S.ContentText1>{item.name}</S.ContentText1>
              <S.ContentText2>
                {formatPrice(item.unitPrice || 0)} /{" "}
                {item.quantity ?? 1}개
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
