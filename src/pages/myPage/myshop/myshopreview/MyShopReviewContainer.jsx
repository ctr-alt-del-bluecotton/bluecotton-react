import React, { useState } from "react";
import S from "../style";
import { useModal } from "../../../../components/modal/useModal"; 
import ReviewModal from "../review/ReviewModal";

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

const MyShopReviewContainer = () => {
  const { openModal } = useModal();

  // 임의 데이터
  const [reviews, setReviews] = useState([
    { id: 1, name: "솜이 레옹 키링", date: "2025-09-20", rating: 5, text: "기대 그 이상의 이상이에요 가방에 차고 다니니까 예뻐요!" },
    { id: 2, name: "솜이 레옹 키링", date: "2025-09-20", rating: 3, text: "기대 그 이상의 이상이에요 가방에 차고 다니니까 예뻐요!" },
    { id: 3, name: "솜이 쿠션",   date: "2025-09-28", rating: 4, text: "폭신폭신해서 좋아요!" }
  ]);

  // 리뷰 삭제
  const handleDelete = (id) => {
    openModal({
      title: "리뷰를 삭제하시겠습니까?",
      message: "삭제 후에는 되돌릴 수 없습니다.",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: () => setReviews((prev) => prev.filter((r) => r.id !== id)),
    });
  };

  // 리뷰 수정하기 모달 열기
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null); // 선택된 리뷰

  const openEdit = (review) => {
    setEditing(review);
    setEditOpen(true);
  };
  const closeEdit = () => setEditOpen(false);

  // ReviewModal의 onSubmit에서 값을 받음
  const handleEditSubmit = ({ rating, content  }) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === editing.id
          ? {
              ...r,
              rating,
              text: content,
             
            }
          : r
      )
    );
  };

  const pageNumber = 1;

  return (
    <div>
      <S.ListHeader>마이리뷰(5개)</S.ListHeader>

      <S.ListContainer>
        {reviews.map((review) => (
          <S.ListItem key={review.id}>
            <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
              <S.OrderItemImage />
              <S.ItemContent>
                <S.ReviewProductInfo>
                  <S.OrderProductName>{review.name}</S.OrderProductName>

                  {typeof review.rating === "number" ? (
                    <>
                      <StarRating rating={review.rating} />
                      <S.ReviewDate>{formatDotDate(review.date)}</S.ReviewDate>
                      {review.text && <S.ReviewText>{review.text}</S.ReviewText>}
                    </>
                  ) : (
                    review.purchaseDate && (
                      <S.PurchaseDate>구매 일자: {formatDotDate(review.purchaseDate)}</S.PurchaseDate>
                    )
                  )}
                </S.ReviewProductInfo>
              </S.ItemContent>

              <S.ReviewActionButtons>
                <S.ReviewButton primary onClick={() => openEdit(review)}>리뷰 수정</S.ReviewButton>
                <S.ReviewButton onClick={() => handleDelete(review.id)}>리뷰 삭제</S.ReviewButton>
              </S.ReviewActionButtons>
            </div>
          </S.ListItem>
        ))}
      </S.ListContainer>

      <S.Pagination>
        <S.PageButton disabled>&lt; 이전</S.PageButton>
        <S.PageNumber>{pageNumber}</S.PageNumber>
        <S.PageButton>다음 &gt;</S.PageButton>
      </S.Pagination>

      {/* 리뷰하기 모달 그대로 사용 mode="edit", initial 전달 */}
      <ReviewModal
        open={editOpen}
        onClose={closeEdit}
        mode="edit"
        product={{
          id: editing?.id ?? 0,
          name: editing?.name ?? "상품명",
          imageUrl: "/assets/images/shop_review_som_doll1.png",
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
