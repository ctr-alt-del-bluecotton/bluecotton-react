import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../components/modal";
import S from "./style";
import Report from "../../../components/Report/Report";

// 영어 → 한글 매핑 테이블
const categoryMap = {
  study: "학습",
  health: "건강",
  social: "소셜",
  hobby: "취미",
  life: "생활",
  rookie: "루키",
};

// excerpt에서 텍스트만 추출하는 함수
const extractTextOnly = (htmlOrMd) => {
  if (!htmlOrMd) return "";

  let text = htmlOrMd;

  // 1) Markdown 이미지 제거 ![](url)
  text = text.replace(/!\[.*?\]\(.*?\)/g, "");

  // 2) HTML 이미지 제거
  text = text.replace(/<img[^>]*>/g, "");

  // 3) Markdown 링크 제거 [text](url)
  text = text.replace(/\[.*?\]\(.*?\)/g, "");

  // 4) 모든 HTML 태그 제거
  text = text.replace(/<[^>]+>/g, "");

  // 5) &nbsp; 등 HTML 엔티티 제거
  text = text.replace(/&[a-z]+;/gi, " ");

  // 6) 연속 공백/줄바꿈 정리
  text = text.replace(/\s+/g, " ").trim();

  return text;
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
  liked,
  onClick,
}) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [isLiked, setIsLiked] = useState(!!liked);
  const [likeCount, setLikeCount] = useState(likes ?? 0);

  const { currentUser, isLogin } = useSelector((state) => state.user);
  const { openModal } = useModal();
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // props 변화 시 상태 동기화
  useEffect(() => {
    setIsLiked(!!liked);
  }, [liked]);

  useEffect(() => {
    setLikeCount(likes ?? 0);
  }, [likes]);

  // 공통 로그인 필요 모달
  const requireLoginModal = () => {
    openModal({
      title: "로그인이 필요합니다",
      message: "이 기능은 로그인 후 이용하실 수 있습니다.",
      confirmText: "로그인하기",
      cancelText: "취소",
      onConfirm: () => navigate("/login"),
    });
  };

  // 좋아요 토글 핸들러 (JWT)
  const handleLikeClick = async (e) => {
    e.stopPropagation();

    if (!isLogin || !currentUser?.id) {
      requireLoginModal();
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${BASE_URL}/private/post/like/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId: id }),
      });

      if (!response.ok) {
        throw new Error(`좋아요 요청 실패 (status: ${response.status})`);
      }

      // UI 즉시 반영
      setIsLiked((prev) => {
        setLikeCount((prevCount) => (prev ? prevCount - 1 : prevCount + 1));
        return !prev;
      });
    } catch (err) {
      console.error("좋아요 토글 실패:", err);
      openModal({
        title: "오류 발생",
        message: "좋아요 처리 중 문제가 발생했습니다.",
        confirmText: "확인",
      });
    }
  };

  const translatedCategory =
    categoryMap[category?.toLowerCase()] || category || "기타";

  // excerpt → 텍스트만 남기기
  const cleanedExcerpt = extractTextOnly(excerpt || "");
  const finalExcerpt =
    cleanedExcerpt.length > 150
      ? cleanedExcerpt.substring(0, 150) + "..."
      : cleanedExcerpt;

  return (
    <S.Card onClick={onClick} role="button" tabIndex={0}>
      {/* 좋아요 버튼 */}
      <S.LikeButton $liked={isLiked} onClick={handleLikeClick} />

    {/* 썸네일 */}
    <S.ThumbWrap>
      <img
        loading="lazy"
        src={
          imageUrl?.startsWith("http")
            ? imageUrl + "?w=300"
            : `http://localhost:10000${
                imageUrl?.startsWith("/") ? imageUrl : "/" + imageUrl
              }?w=300`
        }
        alt="썸네일"
        onError={(e) => {
          if (!e.target.dataset.fallback) {
            e.target.dataset.fallback = "true";
            e.target.src = "/assets/images/postDefault.jpg";
          }
        }}
      />
    </S.ThumbWrap>

      {/* 본문 */}
      <S.Body>
        <S.MetaTop>
          <span className="category">{translatedCategory}</span>
          <span className="bar">|</span>
          <span className="challenge">도전 {challengeDay}일</span>
          <span className="bar">|</span>
          <span className="somtitle">{somTitle}</span>
        </S.MetaTop>

        <S.Title>{title}</S.Title>

        {/* 텍스트만 보여주는 excerpt */}
        <S.Excerpt>{finalExcerpt}</S.Excerpt>

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

      {showReportModal && <Report onClose={() => setShowReportModal(false)} />}
    </S.Card>
  );
};

export default PostCard;
