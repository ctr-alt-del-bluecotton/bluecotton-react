import React, { useEffect, useMemo } from "react";
import S from "./style";
import { useLocation } from "react-router-dom";
import { resolveUrl } from "../../../utils/url";

const OrderProduct = ({ onTotalPriceChange }) => {
  const location = useLocation();

  console.log("[OrderProduct] location.state:", location.state);

  const state = location.state || {};
  const snapshot = state.snapshot || {};


  const rawItems = Array.isArray(snapshot.items) ? snapshot.items : [];


  const items = useMemo(
  () =>
    rawItems.map((item) => ({
      productId: item.productId ?? item.id,
      name: item.name ?? item.productName,
      unitPrice: item.unitPrice ?? item.productPrice ?? 0,
      quantity: item.quantity ?? 1,
      productMainImageUrl: resolveUrl(
        item.productMainImageUrl || item.productImageUrl || item.imageUrl
      ),
    })),
  [rawItems]
);

  const totalPrice = useMemo(
    () =>
      typeof snapshot.totalPrice === "number"
        ? snapshot.totalPrice
        : items.reduce(
            (sum, it) => sum + (Number(it.unitPrice) || 0) * (it.quantity ?? 1),
            0
          ),
    [items, snapshot.totalPrice]
  );

  console.log("[OrderProduct] snapshot:", snapshot);
  console.log("[OrderProduct] rawItems:", rawItems);
  console.log("[OrderProduct] mapped items:", items);


  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + (item.quantity ?? 1), 0),
    [items]
  );

  const formatPrice = (v) =>
    (Number(v) || 0).toLocaleString("ko-KR", {
      maximumFractionDigits: 0,
    }) + "원";
  
    

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
          <S.ProductRow key={item.productId}>
            <S.ProductThumb
              src={item.productMainImageUrl || "/assets/images/default_product.png"}
              alt={item.name || "상품 이미지"}
            />
            <S.ProductContent>
              <S.ContentText1>{item.name}</S.ContentText1>
              <S.ContentText2>
                {formatPrice(item.unitPrice)} / {item.quantity ?? 1}개
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
