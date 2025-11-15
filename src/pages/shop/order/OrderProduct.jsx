// import React from "react";
// import S from "./style";
// import { useLocation } from "react-router-dom";

// const OrderProduct = () => {
//   const location = useLocation();

//   console.log("[OrderProduct] location.state:", location.state);

//   const state = location.state || {};

//   const snapshot = state.snapshot;

//   let items = [];
//   let totalPrice = 0;

//   if (snapshot?.items?.length) {
//     items = snapshot.items;
//     totalPrice =
//       snapshot.totalPrice ??
//       snapshot.items.reduce(
//         (sum, it) => sum + (it.unitPrice || 0) * (it.quantity ?? 1),
//         0
//       );
//   } else {
//     items = [];
//     totalPrice = 0;
//   }

//   const totalCount = items.reduce(
//     (sum, item) => sum + (item.quantity ?? 1),
//     0
//   );

//   const formatPrice = (v) =>
//     v.toLocaleString("ko-KR", { maximumFractionDigits: 0 }) + "원";

//   return (
//     <S.OrderProductWrap>
//       <S.OrderProductContainer>
//         <S.OrderProductText>주문 상품 {totalCount}개</S.OrderProductText>

//         {items.map((item) => (
//           <S.ProductRow key={item.productId}>
//             <S.ProductThumb
//               src={item.imageUrl || "/assets/images/default_product.png"}
//               alt={item.name}
//             />
//             <S.ProductContent>
//               <S.ContentText1>{item.name}</S.ContentText1>
//               <S.ContentText2>
//                 {formatPrice(item.unitPrice || 0)} /{" "}
//                 {item.quantity ?? 1}개
//               </S.ContentText2>
//             </S.ProductContent>
//           </S.ProductRow>
//         ))}

//         {items.length === 0 && (
//           <S.EmptyText>주문할 상품이 없습니다.</S.EmptyText>
//         )}
//       </S.OrderProductContainer>
//     </S.OrderProductWrap>
//   );
// };

// export default OrderProduct;

import React from "react";
import S from "./style";
import { useLocation } from "react-router-dom";

const OrderProduct = () => {
  const location = useLocation();

  console.log("[OrderProduct] location.state:", location.state);

  const state = location.state || {};

  // 1) 장바구니 → 주문 : { snapshot: { items: [...], totalPrice: ... } }
  //    혹은 { items: [...], totalPrice: ... } 로 바로 올 수도 있다고 가정
  const snapshot =
    state.snapshot ||
    (state.items
      ? {
          items: state.items,
          totalPrice: state.totalPrice,
        }
      : null);

  // 2) 단일 상품 → 주문
  //    - { state: { item: { ... } } }
  //    - { state: { product: { ... } } }
  //    - { state: { orderItem: { ... } } }
  //    - { state: { productId, productName, productPrice, ... } } (state 자체가 상품)
  let singleItem =
    state.item || state.product || state.orderItem || null;

  // 🔍 state 자체가 상품처럼 생겼으면 그것도 단일 상품으로 처리
  if (
    !singleItem &&
    (state.productId ||
      state.id ||
      state.productName ||
      state.name)
  ) {
    singleItem = state;
  }

  let items = [];
  let totalPrice = 0;

  if (snapshot?.items?.length) {
    // ✅ 장바구니/다중 상품에서 온 경우
    items = snapshot.items;
    totalPrice =
      snapshot.totalPrice ??
      snapshot.items.reduce(
        (sum, it) =>
          sum + (it.unitPrice || 0) * (it.quantity ?? 1),
        0
      );
  } else if (singleItem) {
    // ✅ 단일 상품에서 온 경우
    const normalized = {
      productId: singleItem.productId ?? singleItem.id,
      name:
        singleItem.name ||
        singleItem.productName ||
        singleItem.title ||
        "상품명 없음",
      unitPrice:
        singleItem.unitPrice ??
        singleItem.price ??
        singleItem.productPrice ??
        0,
      quantity: singleItem.quantity ?? singleItem.count ?? 1,
      imageUrl:
        singleItem.imageUrl ||
        singleItem.thumbnailUrl ||
        singleItem.mainImageUrl ||
        "/assets/images/default_product.png",
    };

    items = [normalized];
    totalPrice = (normalized.unitPrice || 0) * (normalized.quantity ?? 1);
  } else {
    // ❌ 어떤 데이터도 못 받은 경우
    items = [];
    totalPrice = 0;
  }

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

