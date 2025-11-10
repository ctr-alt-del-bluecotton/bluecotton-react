import React, { useState } from "react";
import S from "./style";
import Report from "../../../components/Report/Report";

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
  liked, // ✅ 찜 여부 상태
  onClick,
  onLike, // ✅ 찜 클릭 이벤트
}) => {
  const [showReportModal, setShowReportModal] = useState(false);

  // ✅ onLike 안전 처리 (없을 때 에러 방지)
  const handleLikeClick = (e) => {
    e.stopPropagation(); // 카드 클릭 방지
    if (typeof onLike === "function") {
      onLike(id);
    } else {
      console.warn("onLike prop is not provided to PostCard.");
    }
  };

  

  return (
    <S.Card onClick={onClick} role="button" tabIndex={0}>
      {/* ✅ 찜 버튼 */}
      <S.LikeButton $liked={liked} onClick={handleLikeClick} />

      {/* 썸네일 */}
      <S.ThumbWrap>
        <img
          src={
            imageUrl?.startsWith("http")
              ? imageUrl
              : `http://localhost:10000${imageUrl?.startsWith("/") ? imageUrl : "/" + imageUrl}`
          }
          alt="썸네일"
          onError={(e) => {
            e.target.src = "http://localhost:10000/upload/default/default_post.jpg";
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
          <span className="category">{category}</span>
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
              <S.IconHeart /> {likes}
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
