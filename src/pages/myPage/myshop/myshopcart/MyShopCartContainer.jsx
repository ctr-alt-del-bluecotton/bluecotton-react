import React, { useEffect, useMemo, useState } from "react";
import {
  ListHeader,
  FilterContainer,
  FilterButton,
  ListContainer,
  CartHeader,
  SelectAll,
  CartItem,
  ItemImage,
  ItemInfo,
  ItemName,
  QuantityControl,
  QuantityButton,
  Quantity,
  PriceInfo,
  PriceRow,
  PriceValue,
  OrderSummary,
  SummaryRow,
  OrderButton,
  Checkbox as SCheckbox,
} from "../style";
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
      confirmText: "삭제하기",
      cancelText: "취소",
      onConfirm: () => setCurrentItems((prev) => prev.filter((it) => it.id !== id)),
    });
  };

  return (
    <div>
      <ListHeader>장바구니</ListHeader>

      {/* 탭 전환 */}
      <FilterContainer>
        <FilterButton active={tab === "general"} onClick={() => setTab("general")}>
          일반 상품
        </FilterButton>
        <FilterButton active={tab === "candy"} onClick={() => setTab("candy")}>
          캔디 상품
        </FilterButton>
      </FilterContainer>

      {/* 상단 전체선택/삭제(선택해제) */}
      <CartHeader>
        <SelectAll>
          <SCheckbox checked={allChecked} onChange={toggleAll} aria-label="전체선택" />
          전체선택
        </SelectAll>
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#E0E0E0",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
          onClick={() => setCheckedIds(new Set())}
        >
          선택해제
        </button>
      </CartHeader>

      {/* 아이템 리스트 */}
      <ListContainer>
        {currentItems.map((item) => {
          const q = qtyMap[item.id] || 1;
          const itemTotal = item.price * q;

          return (
            <CartItem key={item.id}>
              <SCheckbox
                checked={checkedIds.has(item.id)}
                onChange={toggleOne(item.id)}
                aria-label={`${item.name} 선택`}
              />
              <ItemImage />
              <ItemInfo>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <ItemName>{item.name}</ItemName>
                    <div
                      style={{ color: "#757575", fontSize: 14, marginBottom: 8, cursor: "pointer" }}
                      onClick={() => handleDelete(item.id)} 
                    >
                      삭제
                    </div>

                    <QuantityControl>
                      <QuantityButton onClick={() => dec(item.id)} disabled={q <= 1}>
                        -
                      </QuantityButton>
                      <Quantity>{q}</Quantity>
                      <QuantityButton onClick={() => inc(item.id)}>+</QuantityButton>
                    </QuantityControl>
                  </div>

                  <PriceInfo>
                    <PriceRow>
                      상품금액({q}개) <PriceValue>{item.price.toLocaleString()}{unit}</PriceValue>
                    </PriceRow>
                    <PriceRow>
                      할인금액 <PriceValue>0{unit}</PriceValue>
                    </PriceRow>
                    <PriceRow>
                      주문금액 <PriceValue>{itemTotal.toLocaleString()}{unit}</PriceValue>
                    </PriceRow>
                  </PriceInfo>
                </div>
              </ItemInfo>
            </CartItem>
          );
        })}
      </ListContainer>

      <OrderSummary>
        <SummaryRow>
          <span>선택 상품 금액</span>
          <span>{selectedTotal.toLocaleString()}{unit}</span>
        </SummaryRow>
        <SummaryRow>
          <span>+ 총 배송비</span>
          <span>{shippingText}</span>
        </SummaryRow>
        <SummaryRow>
          <span>- 할인 예상 금액</span>
          <span>0{unit}</span>
        </SummaryRow>
        <SummaryRow>
          <span>주문 금액(배송비 별도)</span>
          <span>{selectedTotal.toLocaleString()}{unit}</span>
        </SummaryRow>
      </OrderSummary>

      <Link to="/main/shop/order" style={{ textDecoration: "none" }}>
        <OrderButton>주문하기</OrderButton>
      </Link>
    </div>
  );
};

export default MyShopCartContainer;
