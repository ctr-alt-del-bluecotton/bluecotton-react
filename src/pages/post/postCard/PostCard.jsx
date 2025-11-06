import React, { useState } from "react";
import S from "./style";
import Report from "../../../components/Report/Report";

const PostCard = ({
  id,
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
        <img src={imageUrl} alt="썸네일" />
      </S.ThumbWrap>

      {/* 본문 */}
      <S.Body>
        {/* 상단 메타 */}
        <S.MetaTop>
          <span className="category">{category}</span>
          <span className="bar">|</span>
          <span className="challenge">도전 {challengeDay}일</span>
        </S.MetaTop>

        {/* 제목 */}
        <S.Title>{title}</S.Title>

        {/* 요약문 */}
        <S.Excerpt>{excerpt}</S.Excerpt>

        {/* 하단 정보 */}
        <S.MetaBottom>
          <div className="left">
            <img className="avatar" src={avatar} alt="프로필" />
            <span className="nick">{nickname}</span>
            <span className="bar">|</span>
            <span className="date">{date}</span>
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
    </S.Card>
  );
};

export default PostCard;
