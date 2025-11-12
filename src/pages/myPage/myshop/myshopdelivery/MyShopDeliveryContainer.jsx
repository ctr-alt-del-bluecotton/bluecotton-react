import React, { useMemo, useState, useEffect } from "react"; // ⬅️ [변경] useEffect 추가
import S from "../style";
import ReviewModal from "../review/ReviewModal";
import { useSelector } from "react-redux";
import { resolveUrl } from "../../../../utils/url"; // ⬅️ [추가] 이미지 경로 변환 훅 임포트

// formatDotDate를 화살표 함수로 변경 (기존 유지)
const formatDotDate = (str) => {
  if (!str) return ""; // ⬅️ [수정] 날짜가 null일 경우 방어 로직 추가
  return str.split("T")[0].replace(/-/g, ".");
};

// ⬅️ [추가] 백엔드 DTO를 React 컴포넌트가 사용하기 쉬운 형태로 변환하는 함수
const toClient = (dto) => ({
  id: dto.orderId, // 주문 ID를 리스트의 key로 사용
  deliveryId: dto.deliveryId, // 배송 ID
  productId: dto.productId, // 상품 ID (리뷰 모달용)
  name: dto.productName || "상품명 없음", // null 방어
  date: dto.orderCreatedAt, // YYYY-MM-DD 형식의 문자열
  status: dto.deliveryStatus.toLowerCase(), // "PAID" -> "paid"
  imageUrl: resolveUrl(dto.productMainImageUrl) || "/assets/images/abc.png", // 상품 이미지 (resolveUrl 사용)
});


const MyShopDeliveryContainer = () => {
  // ⬅️ [변경] activeFilter 초기값을 백엔드 Enum에 맞춰 "paid"로 변경
  const [activeFilter, setActiveFilter] = useState("paid");

  // ⬅️ [변경] Redux useSelector 훅을 사용하여 현재 유저 정보 가져오기 (위치 변경)
  const { currentUser, isLogin } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState(null);

  // ⬅️ [추가] API 데이터를 저장할 state
  const [allItems, setAllItems] = useState([]); // 서버에서 받은 원본 데이터
  const [loading, setLoading] = useState(true); // ⬅️ [추가] 로딩 상태
  const [error, setError] = useState(null);    // ⬅️ [추가] 에러 상태

  // ⬅️ [추가] API 호출 로직 (useEffect 안으로 이동)
  useEffect(() => {
    const fetchDeliveries = async () => {
      // ⬅️ [추가] 로그인이 안됐거나, memberId가 없으면 요청 중단
      if (!isLogin || !currentUser?.id) { // currentUser가 null일 경우 방어
        setAllItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null); // 에러 초기화
      
      try {
        const memberId = currentUser.id;

        const url = `${process.env.REACT_APP_BACKEND_URL}/mypage/myshop/delivery/${memberId}`;
        
        const res = await fetch(url);

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "배송 정보를 불러오지 못했습니다.");
        }

        const json = await res.json();
        

        const transformedData = Array.isArray(json.data) ? json.data.map(toClient) : [];
        setAllItems(transformedData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, [isLogin, currentUser?.id]); 


  const openReview = (item) => {
    setTarget(item);
    setOpen(true);
  };


  const closeReview = () => {
    setOpen(false);
    setTarget(null);
  };


  const items = useMemo(
    () => allItems.filter((it) => it.status === activeFilter),
    [activeFilter, allItems] 
  );

 
  const label = {
    paid: "구매완료",    
    shipping: "배송 중",
    completed: "배송완료",
  };


  if (loading) {
    return <div style={{ padding: 20, textAlign: "center" }}>로딩 중...</div>;
  }

  if (error) {
    return <div style={{ padding: 20, textAlign: "center", color: "red" }}>에러: {error}</div>;
  }

  return (
    <div>
      <S.FilterContainer>
        <S.FilterButton
          $active={activeFilter === "paid"}
          onClick={() => setActiveFilter("paid")}
        >
          {label.paid}
        </S.FilterButton>
        <S.FilterButton
          $active={activeFilter === "shipping"}
          onClick={() => setActiveFilter("shipping")}
        >
          {label.shipping}
        </S.FilterButton>
        <S.FilterButton
          $active={activeFilter === "completed"}
          onClick={() => setActiveFilter("completed")}
        >
          {label.completed}
        </S.FilterButton>
      </S.FilterContainer>

      {/* 제목 */}
      <S.ListHeader>
        {label[activeFilter] || "배송현황"}({items.length}개) 
      </S.ListHeader>

      <S.ListContainer>

        {items.length === 0 && !loading && (
          <div style={{ padding: 20, textAlign: "center" }}>
            {label[activeFilter]} 내역이 없습니다.
          </div>
        )}

        {items.map((item) => (

          <S.ListItem key={item.id}> 
            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
              <S.DeliveryItemImage style={{ backgroundImage: `url("${item.imageUrl}")` }} />

              <S.ItemContent>
                <div>상품</div>
                <S.OrderProductName>{item.name}</S.OrderProductName>
                <div>구매 일자</div>
                <S.PurchaseDate>{formatDotDate(item.date)}</S.PurchaseDate>
              </S.ItemContent>

              <div>
                {activeFilter === "paid" && (
                  <S.ActionButton>구매 취소</S.ActionButton>
                )}

                {activeFilter === "completed" && (
                  <S.ActionButton primary onClick={() => openReview(item)}>
                    리뷰하기
                  </S.ActionButton>
                )}
              </div>
            </div>
          </S.ListItem>
        ))}
      </S.ListContainer>

      <S.Pagination>
        <S.PageButton disabled>&lt; 이전</S.PageButton>
        <S.PageNumber>1</S.PageNumber>
        <S.PageButton>다음 &gt;</S.PageButton>
      </S.Pagination>


      <ReviewModal
        open={open}
        onClose={closeReview}
        mode="create"
        product={{ 
          id: target?.productId, // 상품 ID
          name: target?.name, 
          imageUrl: target?.imageUrl // 상품 이미지
        }}
        onSubmit={closeReview} 
      />
    </div>
  );
};

export default MyShopDeliveryContainer;