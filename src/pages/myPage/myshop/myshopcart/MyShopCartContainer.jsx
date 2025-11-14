import React, { useEffect, useState } from "react";
import S from "../style";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../../components/modal/useModal";
import { useSelector } from "react-redux";

const MyShopCartContainer = () => {
  const { openModal } = useModal();
  const { currentUser, isLogin } = useSelector((s) => s.user);
  const navigate = useNavigate();

 
  const [tab, setTab] = useState("general"); // "general" | "candy"
  const [generalItems, setGeneralItems] = useState([]);
  const [candyItems, setCandyItems] = useState([]);
  const currentItems = tab === "general" ? generalItems : candyItems;
  const setCurrentItems = tab === "general" ? setGeneralItems : setCandyItems;


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const [checkedIds, setCheckedIds] = useState(new Set());
  const [qtyMap, setQtyMap] = useState({});
  const memberId = currentUser?.id;

  const safeJson = async (res) => {
    try {
      return await res.json();
    } catch {
      return null;
    }
  };

 
  const handleOrder = async () => {
    if (!isLogin || !memberId) {
      openModal({
        title: "로그인이 필요합니다",
        message: "주문하려면 먼저 로그인해 주세요.",
        confirmText: "로그인하기",
        onConfirm: () => navigate("/login"),
      });
      return;
    }

 
    const itemsToOrder = currentItems
      .filter((item) => checkedIds.has(item.id)) 
      .map((item) => ({
        productId: item.productId,
        orderQuantity: qtyMap[item.id] || 1,
      }));

    if (itemsToOrder.length === 0) {
      openModal({
        title: "주문할 상품을 선택해 주세요",
        confirmText: "확인",
      });
      return;
    }

    
    const snapshotItems = currentItems
      .filter((item) => checkedIds.has(item.id))
      .map((item) => {
        const q = qtyMap[item.id] || 1;
        const unitPrice = Number(item.productPrice) || 0;
        return {
          productId: item.productId,
          name: item.productName,
          imageUrl: item.productImageUrl ?? null,
          unitPrice,
          quantity: q,
          purchaseType: String(item.productPurchaseType || "CASH")
            .toUpperCase()
            .trim(),
          lineTotal: unitPrice * q,
        };
      });

    const snapshotTotal = snapshotItems.reduce((s, v) => s + v.lineTotal, 0);


    const payload = {
      memberId,
      id: null,
      items: itemsToOrder, 
    };

    console.log("장바구니 확인용 payload:", payload);

    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/order/cart`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await safeJson(response);

      if (!response.ok) {
        const msg = body?.message || `주문 실패 - ${response.status}`;
        throw new Error(msg);
      }

      const finalOrderId = body?.data ?? "";

      openModal({
        title: "주문 성공",
        message: `${itemsToOrder.length}개 상품의 주문이 접수되었습니다.`,
        confirmText: "확인",
        onConfirm: () => {
          navigate(`/main/shop/order?orderId=${finalOrderId}`, {
            state: {
              snapshot: {
                items: snapshotItems,
                totalPrice: snapshotTotal,
              },
            },
          });
        },
      });
    } catch (err) {
      console.error("주문 오류:", err);
      openModal({
        title: "주문 실패",
        message: err?.message || "주문이 실패했습니다.",
        confirmText: "확인",
      });
    }
  };

  // ✅ 장바구니 목록 불러오기
  useEffect(() => {
    if (!memberId) return;

    let isMounted = true;
    const url = `${process.env.REACT_APP_BACKEND_URL}/cart/list?memberId=${memberId}`;
    setLoading(true);
    setError(null);

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`네트워크 응답 실패: ${res.status}`);
        return safeJson(res);
      })
      .then((data) => {
        if (!isMounted) return;

        const items = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];

        const normalized = items.map((item) => ({
          id: item.id, // 장바구니 row ID
          productId: item.productId,
          productName: item.productName,
          productPrice: Number(item.productPrice) || 0,
          productPurchaseType: String(item.productPurchaseType || "")
            .toUpperCase()
            .trim(), // "CASH" | "CANDY"
          productImageUrl: item.productImageUrl || null,
        }));

        const general = normalized.filter(
          (it) => it.productPurchaseType === "CASH"
        );
        const candy = normalized.filter(
          (it) => it.productPurchaseType === "CANDY"
        );

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
  }, [memberId]);

  // ✅ 탭/목록 변경 시 선택/수량 초기화
  useEffect(() => {
    const nextQty = {};
    currentItems.forEach((it) => (nextQty[it.id] = 1));
    setQtyMap(nextQty);
    setCheckedIds(new Set());
  }, [tab, currentItems]);

  // ✅ 체크/수량 관련 계산/핸들러
  const allChecked =
    checkedIds.size === currentItems.length && currentItems.length > 0;

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

  const inc = (id) =>
    setQtyMap((p) => ({
      ...p,
      [id]: (p[id] || 1) + 1,
    }));

  const dec = (id) =>
    setQtyMap((p) => ({
      ...p,
      [id]: Math.max(1, (p[id] || 1) - 1),
    }));

  const selectedTotal = currentItems
    .filter((it) => checkedIds.has(it.id))
    .reduce((sum, it) => sum + it.productPrice * (qtyMap[it.id] || 1), 0);

  const unit = tab === "general" ? "원" : "캔디";
  const hasSelection = selectedTotal > 0;
  
  const shippingFee =
  tab === "candy"
    ? 0
    : !hasSelection
    ? 0
    : selectedTotal >= 30000
    ? 0
    : 3000;
  const shippingText = shippingFee === 0 ? hasSelection ? "30,000원 이상 무료배송" : "0원" :`${shippingFee.toLocaleString()}원`;
  const totalOrderAmount = selectedTotal + shippingFee;
  
  const handleDelete = (id) => {
    const item = currentItems.find((it) => it.id === id);
    openModal({
      title: "상품을 삭제하시겠습니까?",
      message: `${item?.productName ?? "선택한 상품"}을(를) 장바구니에서 삭제합니다.`,
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          const url = `${process.env.REACT_APP_BACKEND_URL}/cart/delete?memberId=${memberId}&productId=${item.productId}`;
          const response = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });

          const payload = await safeJson(response);

          if (!response.ok) {
            const msg = payload?.message || `삭제 실패: ${response.status}`;
            throw new Error(msg);
          }

          
          setCurrentItems((prev) => prev.filter((it) => it.id !== id));
        
          setCheckedIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
          setQtyMap((prev) => {
            const next = { ...prev };
            delete next[id];
            return next;
          });
        } catch (err) {
          console.error(err);
          openModal({
            title: "삭제 실패",
            message: err?.message || "삭제 중 오류가 발생했습니다.",
            confirmText: "확인",
          });
        }
      },
    });
  };

  if (loading) return <div>불러오는 중…</div>;
  if (error) return <div>에러: {String(error.message || error)}</div>;

  return (
    <div>
      <S.ListHeader>장바구니</S.ListHeader>

      
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

      
      <S.CartHeader>
        <S.SelectAll>
          <S.Checkbox
            checked={allChecked}
            onChange={toggleAll}
            aria-label="전체선택"
          />
          전체선택
        </S.SelectAll>

        <S.ResetButton
          $active={checkedIds.size > 0}
          onClick={() => setCheckedIds(new Set())}
        >
          선택해제
        </S.ResetButton>
      </S.CartHeader>

   
      <S.ListContainer>
        {currentItems.map((item) => {
          const q = qtyMap[item.id] || 1;
          const itemTotal = item.productPrice * q;

          return (
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
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                )}
              </S.ItemImage>
              <S.ItemInfo>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <S.ItemName>{item.productName}</S.ItemName>
                    <div
                      style={{
                        color: "#757575",
                        fontSize: 14,
                        marginBottom: 8,
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(item.id)}
                    >
                      삭제
                    </div>

                    <S.QuantityControl>
                      <S.QuantityButton
                        onClick={() => dec(item.id)}
                        disabled={q <= 1}
                      >
                        -
                      </S.QuantityButton>
                      <S.Quantity>{q}</S.Quantity>
                      <S.QuantityButton onClick={() => inc(item.id)}>
                        +
                      </S.QuantityButton>
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
            {totalOrderAmount.toLocaleString()}
            {unit}
          </span>
        </S.SummaryRow>
      </S.OrderSummary>

      <S.OrderButton onClick={handleOrder}>주문하기</S.OrderButton>
    </div>
  );
};

export default MyShopCartContainer;
