// import React, { useEffect, useMemo, useState } from "react";
// import S from "../style";
// import { Link } from "react-router-dom";
// import { useModal } from "../../../../components/modal/useModal"; 

// const MyShopCartContainer = () => {
//   const { openModal } = useModal(); 


//   /* 탭(일반/캔디) */
//   const [tab, setTab] = useState("general");
//   const [generalItems, setGeneralItems] = useState([]);
//   const [candyItems, setCandyItems] = useState([]);
//   const currentItems = tab === "general" ? generalItems : candyItems;
//   const setCurrentItems = tab === "general" ? setGeneralItems : setCandyItems;
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [productName, setProductName] = useState('');
//   const [productPrice, setProductPrice] = useState('');
//   const [productPurchaseType, setProductPurchaseType] = useState('');

//   useEffect(() => {
//     const url = `${process.env.REACT_APP_BACKEND_URL}/cart/list?memberId=1`

//     setLoading(true);
//     setError(null);
    
//     fetch (url , {
//       method : "GET",
//       headers: {
//         'Content-Type' : 'application/json',
//       },
//     })
//     .then((res) => {
//       if(!res.ok) {
//         throw new Error('네트워크 응답 실패');
//       }
//       return res.json();
//     })
//     .then((data) => {
//       setProducts(data);
//       setLoading(false);
      
    
//       const mappedData = data.map(item => ({
//         id: item.productId,
//         name : item.productName,
//         price : item.productPrice,
//         productPurchaseType : item.productPurchaseType,
//       }));
      
//       const general = data.filter(item => item.productPurchaseType === 'general');
//       const candy = data.filter(item => item.productPurchaseType === 'candy');


//       setGeneralItems(general);
//       setCandyItems(candy);
//     })
//     .catch((error) => {
//       setError(error);
//       setLoading(false);
//     })
//   },[])

//   const unit = tab === "general" ? "원" : "캔디";
//   const shippingText = tab === "candy" ? "무료배송" : "3,000원";

//   /* 선택/수량 상태 */
//   const [checkedIds, setCheckedIds] = useState(new Set());
//   const [qtyMap, setQtyMap] = useState({});

//   useEffect(() => {
//     const nextQty = {};
//     currentItems.forEach((it) => (nextQty[it.id] = 1));
//     setQtyMap(nextQty);
//     setCheckedIds(new Set());
//   }, [tab, currentItems]);

//   /* 전체선택/개별선택 */
//   const allChecked = checkedIds.size === currentItems.length && currentItems.length > 0;

//   const toggleAll = (e) => {
//     if (e.target.checked) {
//       setCheckedIds(new Set(currentItems.map((it) => it.id)));
//     } else {
//       setCheckedIds(new Set());
//     }
//   };

//   const toggleOne = (id) => (e) => {
//     setCheckedIds((prev) => {
//       const next = new Set(prev);
//       e.target.checked ? next.add(id) : next.delete(id);
//       return next;
//     });
//   };

//   const inc = (id) => setQtyMap((p) => ({ ...p, [id]: (p[id] || 1) + 1 }));
//   const dec = (id) => setQtyMap((p) => ({ ...p, [id]: Math.max(1, (p[id] || 1) - 1) }));

//   const selectedTotal = currentItems
//     .filter((it) => checkedIds.has(it.id))
//     .reduce((sum, it) => sum + it.price * (qtyMap[it.id] || 1), 0);

 
//   const handleDelete = (id) => {
//     const item = currentItems.find((it) => it.id === id);
//     openModal({
//       title: "상품을 삭제하시겠습니까?",
//       message: `${item?.name ?? "선택한 상품"}을(를) 장바구니에서 삭제합니다.`,
//       confirmText: "삭제",
//       cancelText: "취소",
//       onConfirm: () => setCurrentItems((prev) => prev.filter((it) => it.id !== id)),
//     });
//   };

//   return (
//     <div>
//       <S.ListHeader>장바구니</S.ListHeader>

//       {/* 탭 전환 */}
//       <S.FilterContainer>
//         <S.FilterButton $active={tab === "general"} onClick={() => setTab("general")}>
//           일반 상품
//         </S.FilterButton>
//         <S.FilterButton $active={tab === "candy"} onClick={() => setTab("candy")}>
//           캔디 상품
//         </S.FilterButton>
//       </S.FilterContainer>

//       {/* 상단 전체선택/삭제(선택해제) */}
//       <S.CartHeader>
//         <S.SelectAll>
//           <S.Checkbox checked={allChecked} onChange={toggleAll} aria-label="전체선택" />
//           전체선택
//         </S.SelectAll>

//       <S.ResetButton onClick={() => setCheckedIds(new Set())} >
//           선택해제
//       </S.ResetButton>
//       </S.CartHeader>


//       {/* 아이템 리스트 */}
//       <S.ListContainer>
//         {currentItems.map((item) => {
//           const q = qtyMap[item.id] || 1;
//           const itemTotal = item.productPrice *q;

//           return (
//             <S.CartItem key={item.id}>
//               <S.Checkbox
//                 checked={checkedIds.has(item.id)}
//                 onChange={toggleOne(item.id)}
//                 aria-label={`${item.productName} 선택`}
//               />
//               <S.ItemImage />
//               <S.ItemInfo>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//                   <div>
//                     <S.ItemName>{item.productName}</S.ItemName>
//                     <div
//                       style={{ color: "#757575", fontSize: 14, marginBottom: 8, cursor: "pointer" }}
//                       onClick={() => handleDelete(item.id)} 
//                     >
//                       삭제
//                     </div>

//                     <S.QuantityControl>
//                       <S.QuantityButton onClick={() => dec(item.id)} disabled={q <= 1}>
//                         -
//                       </S.QuantityButton>
//                       <S.Quantity>{q}</S.Quantity>
//                       <S.QuantityButton onClick={() => inc(item.id)}>+</S.QuantityButton>
//                     </S.QuantityControl>
//                   </div>

//                   <S.PriceInfo>
//                     <S.PriceRow>
//                       상품금액({q}개) <S.PriceValue>{item.productPrice.toLocaleString()}{unit}</S.PriceValue>
//                     </S.PriceRow>
//                     <S.PriceRow>
//                       할인금액 <S.PriceValue>0{unit}</S.PriceValue>
//                     </S.PriceRow>
//                     <S.PriceRow>
//                       주문금액 <S.PriceValue>{itemTotal.toLocaleString()}{unit}</S.PriceValue>
//                     </S.PriceRow>
//                   </S.PriceInfo>
//                 </div>
//               </S.ItemInfo>
//             </S.CartItem>
//           );
//         })}
//       </S.ListContainer>

//       <S.OrderSummary>
//         <S.SummaryRow>
//           <span>선택 상품 금액</span>
//           <span>{selectedTotal.toLocaleString()}{unit}</span>
//         </S.SummaryRow>
//         <S.SummaryRow>
//           <span>+ 총 배송비</span>
//           <span>{shippingText}</span>
//         </S.SummaryRow>
//         <S.SummaryRow>
//           <span>- 할인 예상 금액</span>
//           <span>0{unit}</span>
//         </S.SummaryRow>
//         <S.SummaryRow>
//           <span>주문 금액(배송비 별도)</span>
//           <span>{selectedTotal.toLocaleString()}{unit}</span>
//         </S.SummaryRow>
//       </S.OrderSummary>

//       <Link to="/main/shop/order" style={{ textDecoration: "none" }}>
//         <S.OrderButton>주문하기</S.OrderButton>
//       </Link>
//     </div>
//   );
// };

// export default MyShopCartContainer;

import React, { useEffect, useState } from "react";
import S from "../style";
import { Link } from "react-router-dom";
import { useModal } from "../../../../components/modal/useModal";

const MyShopCartContainer = () => {
  const { openModal } = useModal();

  /* 탭(일반/캔디) */
  const [tab, setTab] = useState("general");
  const [generalItems, setGeneralItems] = useState([]);
  const [candyItems, setCandyItems] = useState([]);
  const currentItems = tab === "general" ? generalItems : candyItems;
  const setCurrentItems = tab === "general" ? setGeneralItems : setCandyItems;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* 선택/수량 상태 */
  const [checkedIds, setCheckedIds] = useState(new Set());
  const [qtyMap, setQtyMap] = useState({});

  useEffect(() => {
    // 1. Unmount 후 상태 업데이트 방지 플래그 추가
    let isMounted = true;
    const url = `${process.env.REACT_APP_BACKEND_URL}/cart/list?memberId=11`;
    setLoading(true);
    setError(null);

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`네트워크 응답 실패: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return; 

        const items = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];

        const normalized = items.map((item) => ({
          id: item.id, 
          productId: item.productId,
          productName: item.productName,
          productPrice: Number(item.productPrice) || 0,
          productPurchaseType: String(item.productPurchaseType).toUpperCase(), // CASH | CANDY
          productImageUrl: item.productImageUrl || null,
        }));

        
        const general = normalized.filter((it) => it.productPurchaseType === "CASH");
        const candy = normalized.filter((it) => it.productPurchaseType === "CANDY");

        setGeneralItems(general);
        setCandyItems(candy);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return; 
        setError(err);
        setLoading(false);
      });
      
    
    return () => {
      isMounted = false;
    };
  }, []);

  // 탭/목록 변경 시 수량/선택 초기화
  useEffect(() => {
    const nextQty = {};
    currentItems.forEach((it) => (nextQty[it.id] = 1));
    setQtyMap(nextQty);
    setCheckedIds(new Set());
  }, [tab, currentItems]);

  /* 전체선택/개별선택 */
  const allChecked = checkedIds.size === currentItems.length && currentItems.length > 0;

  const toggleAll = (e) => {
    if (e.target.checked) {
      setCheckedIds(new Set(currentItems.map((it) => it.id)));
    } else {
      setCheckedIds(new Set());
    }
  };

  const toggleOne = (id) => (e) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      e.target.checked ? next.add(id) : next.delete(id);
      return next;
    });
  };

  /* 수량 변경 */
  const inc = (id) => setQtyMap((p) => ({ ...p, [id]: (p[id] || 1) + 1 }));
  const dec = (id) => setQtyMap((p) => ({ ...p, [id]: Math.max(1, (p[id] || 1) - 1) }));

  /* 합계 */
  const selectedTotal = currentItems
    .filter((it) => checkedIds.has(it.id))
    .reduce((sum, it) => sum + it.productPrice * (qtyMap[it.id] || 1), 0);

  const unit = tab === "general" ? "원" : "캔디";
  const shippingText = tab === "candy" ? "무료배송" : "3,000원";

  /* 삭제 */
  const handleDelete = (id) => {
    const item = currentItems.find((it) => it.id === id);
    openModal({
      title: "상품을 삭제하시겠습니까?",
      message: `${item?.productName ?? "선택한 상품"}을(를) 장바구니에서 삭제합니다.`,
      confirmText: "삭제",
      cancelText: "취소",
      // 실제 백엔드 삭제 로직이 필요하지만, 현재는 프론트엔드 상태만 업데이트
      onConfirm: () => setCurrentItems((prev) => prev.filter((it) => it.id !== id)),
    });
  };

  if (loading) return <div>불러오는 중…</div>;
  if (error) return <div>에러: {String(error.message || error)}</div>;

  return (
    <div>
      <S.ListHeader>장바구니</S.ListHeader>

      {/* 탭 전환 */}
      <S.FilterContainer>
        <S.FilterButton
          $active={tab === "general"}
          aria-pressed={tab === "general"}
          onClick={() => setTab("general")}
        >
          일반 상품
        </S.FilterButton>
        <S.FilterButton
          $active={tab === "candy"}
          aria-pressed={tab === "candy"}
          onClick={() => setTab("candy")}
        >
          캔디 상품
        </S.FilterButton>
      </S.FilterContainer>

      {/* 상단 전체선택/삭제(선택해제) */}
      <S.CartHeader>
        <S.SelectAll>
          <S.Checkbox checked={allChecked} onChange={toggleAll} aria-label="전체선택" />
          전체선택
        </S.SelectAll>

        <S.ResetButton $active={checkedIds.size > 0} onClick={() => setCheckedIds(new Set())}>
          선택해제
        </S.ResetButton>
      </S.CartHeader>

      {/* 아이템 리스트 */}
      <S.ListContainer>
        {currentItems.map((item) => {
          const q = qtyMap[item.id] || 1;
          const itemTotal = item.productPrice * q;

          return (
            // key={item.id}는 이제 장바구니 항목 고유 ID를 사용합니다.
            <S.CartItem key={item.id}>
              <S.Checkbox
                checked={checkedIds.has(item.id)}
                onChange={toggleOne(item.id)}
                aria-label={`${item.productName} 선택`}
              />
              <S.ItemImage>
                {item.productImageUrl && (
                  <img
                    src={item.productImageUrl}
                    alt={item.productName}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                  />
                )}
              </S.ItemImage>
              <S.ItemInfo>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <S.ItemName>{item.productName}</S.ItemName>
                    <div
                      style={{ color: "#757575", fontSize: 14, marginBottom: 8, cursor: "pointer" }}
                      onClick={() => handleDelete(item.id)}
                    >
                      삭제
                    </div>

                    <S.QuantityControl>
                      <S.QuantityButton onClick={() => dec(item.id)} disabled={q <= 1}>
                        -
                      </S.QuantityButton>
                      <S.Quantity>{q}</S.Quantity>
                      <S.QuantityButton onClick={() => inc(item.id)}>+</S.QuantityButton>
                    </S.QuantityControl>
                  </div>

                  <S.PriceInfo>
                    <S.PriceRow>
                      상품금액({q}개){" "}
                      <S.PriceValue>
                        {item.productPrice.toLocaleString()}
                        {unit}
                      </S.PriceValue>
                    </S.PriceRow>
                    <S.PriceRow>
                      할인금액 <S.PriceValue>0{unit}</S.PriceValue>
                    </S.PriceRow>
                    <S.PriceRow>
                      주문금액{" "}
                      <S.PriceValue>
                        {itemTotal.toLocaleString()}
                        {unit}
                      </S.PriceValue>
                    </S.PriceRow>
                  </S.PriceInfo>
                </div>
              </S.ItemInfo>
            </S.CartItem>
          );
        })}
      </S.ListContainer>

      <S.OrderSummary>
        <S.SummaryRow>
          <span>선택 상품 금액</span>
          <span>
            {selectedTotal.toLocaleString()}
            {unit}
          </span>
        </S.SummaryRow>
        <S.SummaryRow>
          <span>+ 총 배송비</span>
          <span>{shippingText}</span>
        </S.SummaryRow>
        <S.SummaryRow>
          <span>- 할인 예상 금액</span>
          <span>0{unit}</span>
        </S.SummaryRow>
        <S.SummaryRow>
          <span>주문 금액(배송비 별도)</span>
          <span>
            {selectedTotal.toLocaleString()}
            {unit}
          </span>
        </S.SummaryRow>
      </S.OrderSummary>

      <Link to="/main/shop/order" style={{ textDecoration: "none" }}>
        <S.OrderButton>주문하기</S.OrderButton>
      </Link>
    </div>
  );
};

export default MyShopCartContainer;
