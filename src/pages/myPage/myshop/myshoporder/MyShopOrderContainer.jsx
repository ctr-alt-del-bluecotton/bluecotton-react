import React from "react";
import S from "../style";
import ReviewModal from "../review/ReviewModal";
import { useSelector } from "react-redux";
import { resolveUrl } from "../../../../utils/url";


const formatDotDate = (str) => (str ? str.split("T")[0].replace(/-/g, ".") : "");

const MyShopOrderContainer = () => {
  const { currentUser } = useSelector((state) => state.user);
  const memberId = currentUser?.id;

  console.log(memberId);

  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // 모달
  const [open, setOpen] = React.useState(false);
  const [target, setTarget] = React.useState(null); 
  const openReview = (order) => {
    setTarget({
      id: order.orderId,
      productId:order.productId,
      name: order.productName,
      date: order.orderCreateAt,
      image: order.productMainImageUrl,
    });
    setOpen(true);
  };
  const closeReview = () => {
    setOpen(false);
    setTarget(null);
  };

  // 실제 데이터 요청
  React.useEffect(() => {
    if (!memberId) return;
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const base = process.env.REACT_APP_BACKEND_URL || "";
        const res = await fetch(`${base}/mypage/myshop/order?memberId=${memberId}`, {
          headers: { "Content-Type": "application/json" },
          method: "GET",
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = await res.json();

        const list = Array.isArray(json?.data) ? json.data : [];

        setOrders(list);
      } catch (e) {
        setError(e.message || "주문 조회 실패");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [memberId]);

  const totalCount = orders[0]?.orderTotalCount ?? orders.length;

  const handleSubmit = async () => {
    // 리뷰 등록 API 붙일 자리
    closeReview();
  };

  if (!memberId) {
    return <div>로그인 정보가 없습니다.</div>;
  }


  return (
    <div>
      <S.ListHeader>구매내역({totalCount}개)</S.ListHeader>

      <S.ListContainer>
        {orders.map((order) => {
          const src = resolveUrl(order.productMainImageUrl);

          return (
            <S.ListItem key={order.orderId}>
              <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                <S.OrderItemImage as="img" src={src} alt={order.productName} />
                <S.ItemContent>
                  <div>상품</div>
                  <S.OrderProductName>{order.productName}</S.OrderProductName>
                  <div>구매 일자</div>
                  <S.PurchaseDate>{formatDotDate(order.orderCreateAt)}</S.PurchaseDate>
                </S.ItemContent>

                <S.OrderActionButton onClick={() => openReview(order)}>
                  리뷰하기
                </S.OrderActionButton>
              </div>
            </S.ListItem>
          );
        })}

        {orders.length === 0 && <div>구매내역이 없습니다.</div>}
      </S.ListContainer>

      {/* 간단 페이징(추후 서버/클라이언트 페이징 붙일 자리) */}
      <S.Pagination>
        <S.PageButton disabled>&lt; 이전</S.PageButton>
        <S.PageNumber>1</S.PageNumber>
        <S.PageButton disabled>다음 &gt;</S.PageButton>
      </S.Pagination>

      {/* 리뷰 모달 */}
      <ReviewModal
        open={open}
        onClose={closeReview}
        mode="create"
         product={{ id: target?.productId, name: target?.name, imageUrl: target?.image }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default MyShopOrderContainer;
