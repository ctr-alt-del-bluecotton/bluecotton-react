import React, { useEffect, useMemo, useState } from "react";
import S from "../style";
import { Link } from "react-router-dom";
import { useModal } from "../../../../components/modal/useModal"; 

const MyShopCartContainer = () => {
  const { openModal } = useModal(); 

  const generalData = useMemo(
    () => [
      { id: "g1", name: "솜이 레옹 키링", price: 5000 },
      { id: "g2", name: "솜이 메모지", price: 4000 },
      { id: "g3", name: "솜이 머그컵", price: 12000 },
    ],
    []
  );
  const candyData = useMemo(
    () => [
      { id: "c1", name: "솜이 스티커팩", price: 1200 },
      { id: "c2", name: "솜이 뱃지", price: 2500 },
    ],
    []
  );

  /* 탭(일반/캔디) */
  const [tab, setTab] = useState("general");
  const [generalItems, setGeneralItems] = useState(generalData);
  const [candyItems, setCandyItems] = useState(candyData);
  const currentItems = tab === "general" ? generalItems : candyItems;
  const setCurrentItems = tab === "general" ? setGeneralItems : setCandyItems;

  const unit = tab === "general" ? "원" : "캔디";
  const shippingText = tab === "candy" ? "무료배송" : "3,000원";

  /* 선택/수량 상태 */
  const [checkedIds, setCheckedIds] = useState(new Set());
  const [qtyMap, setQtyMap] = useState({});

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

  const inc = (id) => setQtyMap((p) => ({ ...p, [id]: (p[id] || 1) + 1 }));
  const dec = (id) => setQtyMap((p) => ({ ...p, [id]: Math.max(1, (p[id] || 1) - 1) }));

  const selectedTotal = currentItems
    .filter((it) => checkedIds.has(it.id))
    .reduce((sum, it) => sum + it.price * (qtyMap[it.id] || 1), 0);

 
  const handleDelete = (id) => {
    const item = currentItems.find((it) => it.id === id);
    openModal({
      title: "상품을 삭제하시겠습니까?",
      message: `${item?.name ?? "선택한 상품"}을(를) 장바구니에서 삭제합니다.`,
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: () => setCurrentItems((prev) => prev.filter((it) => it.id !== id)),
    });
  };

  return (
    <div>
      <S.ListHeader>장바구니</S.ListHeader>

      {/* 탭 전환 */}
      <S.FilterContainer>
        <S.FilterButton active={tab === "general"} onClick={() => setTab("general")}>
          일반 상품
        </S.FilterButton>
        <S.FilterButton active={tab === "candy"} onClick={() => setTab("candy")}>
          캔디 상품
        </S.FilterButton>
      </S.FilterContainer>

      {/* 상단 전체선택/삭제(선택해제) */}
      <S.CartHeader>
        <S.SelectAll>
          <S.Checkbox checked={allChecked} onChange={toggleAll} aria-label="전체선택" />
          전체선택
        </S.SelectAll>

      <S.ResetButton onClick={() => setCheckedIds(new Set())} >
          선택해제
      </S.ResetButton>
      </S.CartHeader>

      {/* 아이템 리스트 */}
      <S.ListContainer>
        {currentItems.map((item) => {
          const q = qtyMap[item.id] || 1;
          const itemTotal = item.price * q;

          return (
            <S.CartItem key={item.id}>
              <S.Checkbox
                checked={checkedIds.has(item.id)}
                onChange={toggleOne(item.id)}
                aria-label={`${item.name} 선택`}
              />
              <S.ItemImage />
              <S.ItemInfo>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <S.ItemName>{item.name}</S.ItemName>
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
                      상품금액({q}개) <S.PriceValue>{item.price.toLocaleString()}{unit}</S.PriceValue>
                    </S.PriceRow>
                    <S.PriceRow>
                      할인금액 <S.PriceValue>0{unit}</S.PriceValue>
                    </S.PriceRow>
                    <S.PriceRow>
                      주문금액 <S.PriceValue>{itemTotal.toLocaleString()}{unit}</S.PriceValue>
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
          <span>{selectedTotal.toLocaleString()}{unit}</span>
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
          <span>{selectedTotal.toLocaleString()}{unit}</span>
        </S.SummaryRow>
      </S.OrderSummary>

      <Link to="/main/shop/order" style={{ textDecoration: "none" }}>
        <S.OrderButton>주문하기</S.OrderButton>
      </Link>
    </div>
  );
};

export default MyShopCartContainer;
