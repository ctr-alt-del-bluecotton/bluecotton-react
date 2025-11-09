import React, { useState } from "react";
import S from "./style";
import Report from "../../../components/Report/Report";

// ✅ 영어 → 한글 매핑 테이블
const categoryMap = {
  study: "학습",
  health: "건강",
  social: "소셜",
  hobby: "취미",
  life: "생활",
  rookie: "루키",
};

const PostCard = ({
  id,
  somTitle,
  category,
  challengeDay,
  title,
  excerpt,
  views,
  comments,
  likes,
  date,
  nickname,
  avatar,
  imageUrl,
  liked, // ✅ 서버에서 받은 찜 여부
  onClick,
}) => {
  const [showReportModal, setShowReportModal] = useState(false);

  // ✅ 좋아요 상태 & 개수 로컬 반영 (undefined 방지)
  const [isLiked, setIsLiked] = useState(!!liked);
  const [likeCount, setLikeCount] = useState(likes ?? 0);

  // ✅ (임시 로그인) 1번 유저로 고정
  const memberId = 1;

  const BASE_URL =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:10000";

  // ✅ 좋아요 토글 핸들러
  const handleLikeClick = async (e) => {
    e.stopPropagation();

    try {
      const response = await fetch(
        `${BASE_URL}/main/post/like/toggle`, // 🔹 백엔드 주소 확인!!
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: id,
            memberId: memberId,
          }),
        }
      );

      console.log("좋아요 응답 status:", response.status);

      if (!response.ok) throw new Error("좋아요 요청 실패");

      // 필요하면 서버 응답 내용도 확인
      const result = await response.json();
      console.log("좋아요 토글 결과:", result);

      // ✅ 서버 성공 시 즉시 UI 갱신
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("좋아요 토글 실패:", err);
    }
  };

  // ✅ 한영 변환된 카테고리 표시
  const translatedCategory =
    categoryMap[category?.toUpperCase()] || category || "기타";

  return (
    <S.Card onClick={onClick} role="button" tabIndex={0}>
      {/* ✅ 좋아요 버튼 */}
      <S.LikeButton $liked={isLiked} onClick={handleLikeClick} />

      {/* 썸네일 */}
      <S.ThumbWrap>
        <img
          src={
            imageUrl?.startsWith("http")
              ? imageUrl
              : `http://localhost:10000${
                  imageUrl?.startsWith("/") ? imageUrl : "/" + imageUrl
                }`
          }
          alt="썸네일"
          onError={(e) => {
            e.target.src =
              "http://localhost:10000/upload/default/default_post.jpg";
          }}
        />
      </S.ThumbWrap>

      {/* 본문 */}
      <S.Body>
        {/* 상단 메타 */}
        <S.MetaTop>
          <span className="category">{somTitle}</span>
          <span className="bar">|</span>
          <span className="challenge">도전 {challengeDay}일</span>
          <span className="bar">|</span>
          {/* ✅ 카테고리 한영 변환 적용 */}
          <span className="category">{translatedCategory}</span>
        </S.MetaTop>

        {/* 제목 */}
        <S.Title>{title}</S.Title>

        {/* ✅ HTML 태그가 적용된 요약문 */}
        <S.Excerpt
          dangerouslySetInnerHTML={{
            __html:
              excerpt?.length > 150
                ? excerpt.substring(0, 150) + "..."
                : excerpt || "",
          }}
        />

        {/* 하단 정보 */}
        <S.MetaBottom>
          <div className="left">
            <img className="avatar" src={avatar} alt="프로필" />
            <span className="nick">{nickname}</span>
            <span className="bar">|</span>
            <span className="date">{date?.replace(/-/g, ".")}</span>
          </div>

          <div className="right">
            <span className="stat">
              <S.IconComment /> {comments}
            </span>
            <span className="stat">
              <S.IconHeart /> {likeCount}
            </span>
            <span className="stat">
              <S.IconEye /> {views}
            </span>
          </div>
        </S.MetaBottom>
      </S.Body>

      {/* 신고 모달 */}
      {showReportModal && <Report onClose={() => setShowReportModal(false)} />}
    </S.Card>
  );
};

export default PostCard;
