import React, { useEffect, useState } from "react";
import S from "../style";
import { useModal } from "../../../../components/modal/useModal";
import ReviewModal from "../review/ReviewModal";
import { useSelector } from "react-redux";
import { resolveUrl } from "../../../../utils/url";

const formatDotDate = (str) => (str.includes(".") ? str : str.replace(/-/g, "."));

const StarRating = ({ rating = 0, size = 19 }) => (
  <S.ReviewStars>
    {Array.from({ length: 5 }).map((_, i) => (
      <img
        key={i}
        src="/assets/icons/review.svg"
        alt="별"
        style={{
          width: `${size}px`,
          height: `${size - 1}px`,
          marginRight: "2px",
          filter: i < rating ? "none" : "grayscale(1) brightness(1.0)",
        }}
      />
    ))}
  </S.ReviewStars>
);


const toClient = (dto) => ({
  id: dto.id,
  productId: dto.prouductId,
  name: dto.productName || "상품명 없음",
  date: dto.productReviewDate || "",
  rating: dto.productReviewRating || 0,
  text: dto.productReviewContent || "",
  imageUrl: resolveUrl(dto.productImageUrl) || "/assets/images/abc.png",
});

const MyShopReviewContainer = () => {
  const { openModal } = useModal();
  const { currentUser, isLogin } = useSelector((state) => state.user);

  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  // 마이리뷰 조회
  useEffect(() => {
    const fetchMyReviews = async () => {
      setError(null);
      try {
        const memberId = currentUser.id;
        const url = `${process.env.REACT_APP_BACKEND_URL}/private/mypage/myshop/review/${memberId}`;

        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" ,
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
           },
        });
        if (!res.ok) throw new Error("리뷰 조회 실패");

        const json = await res.json();
        const list = Array.isArray(json.data) ? json.data.map(toClient) : [];
        setReviews(list);
      } catch (err) {
        setError(err.message || "에러가 발생했습니다.");
      }
    };

    fetchMyReviews();
  }, [isLogin, currentUser.id]);

  // 리뷰 삭제 - 아직 미구현
  const handleDelete = (id) => {
    openModal({
      title: "리뷰를 삭제하시겠습니까?",
      message: "삭제 후에는 되돌릴 수 없습니다.",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: async () => {

        const url = `${process.env.REACT_APP_BACKEND_URL}/private/mypage/myshop/review/${id}`
        const res = await fetch(url, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" ,
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          },
        })

        setReviews((prev) => prev.filter((r) => r.id !== id));

      }
    });
  };

  // 리뷰 수정 모달
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const openEdit = (review) => {
    setEditing(review);
    setEditOpen(true);
  };
  const closeEdit = () => setEditOpen(false);


  const handleEditSubmit = async ({ rating, content }) => {


    const reviewUpdateData = {
      memberId: currentUser.id,
      rating: rating,
      content: content,
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/private/mypage/myshop/review/${editing.id}`

    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" ,
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(reviewUpdateData),
    });

    if (!res.ok) { 
    const errorData = await res.json();
    throw new Error(errorData.message || "리뷰 수정 실패");

    

}


    setReviews((prev) =>
      prev.map((r) => (r.id === editing.id ? { ...r, rating, text: content } : r))
    );
  };

  const pageNumber = 1;

  return (
    <div>
      <S.ListHeader>마이리뷰({reviews.length}개)</S.ListHeader>

      {error && (
        <div style={{ padding: 12, color: "red" }}>
          에러: {error}
        </div>
      )}

      <S.ListContainer>
        {reviews.map((review) => (
          <S.ListItem key={review.id}>
            <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
  
              <S.OrderItemImage style={{ backgroundImage: `url("${review.imageUrl}")` }} />

              <S.ItemContent>
                <S.ReviewProductInfo>
                  <S.OrderProductName>{review.name}</S.OrderProductName>
 
                  <StarRating rating={review.rating} />
                  <S.ReviewDate>{formatDotDate(review.date)}</S.ReviewDate>
                  {review.text && <S.ReviewText>{review.text}</S.ReviewText>}
                </S.ReviewProductInfo>
              </S.ItemContent>

              <S.ReviewActionButtons>
                <S.ReviewButton primary onClick={() => openEdit(review)}>
                  리뷰 수정
                </S.ReviewButton>
                <S.ReviewButton onClick={() => handleDelete(review.id)}>
                  리뷰 삭제
                </S.ReviewButton>
              </S.ReviewActionButtons>
            </div>
          </S.ListItem>
        ))}
      </S.ListContainer>

      {reviews.length === 0 && !error && (
        <div style={{ padding: 20, textAlign: "center" }}>작성한 리뷰가 없습니다.</div>
      )}

      <S.Pagination>
        <S.PageButton disabled>&lt; 이전</S.PageButton>
        <S.PageNumber>{pageNumber}</S.PageNumber>
        <S.PageButton>다음 &gt;</S.PageButton>
      </S.Pagination>

      {/* 리뷰 수정 모달 */}
      <ReviewModal
        open={editOpen}
        onClose={closeEdit}
        mode="edit"
        product={{
          id: editing?.productId ?? 0,
          name: editing?.name ?? "상품명",
          imageUrl: resolveUrl(editing?.imageUrl) 
        }}
        initial={{
          rating: editing?.rating ?? 0,
          content: editing?.text ?? "",
          files: [],
        }}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
};

export default MyShopReviewContainer;
