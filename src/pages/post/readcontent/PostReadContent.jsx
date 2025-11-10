import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import S from "./style";
import { useModal } from "../../../components/modal";
import PostComment from "../commentcomponent/PostComment";

const PostReadContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal(); // ✅ 전역 모달 훅 사용

  const [showComments, setShowComments] = useState(true);
  const [comment, setComment] = useState("");
  const [replyInputs, setReplyInputs] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showReplyTarget, setShowReplyTarget] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);

  // ✅ 게시글 좋아요 상태
  const [postLiked, setPostLiked] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState(8);

  // ✅ 댓글 데이터
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "지존준서",
      date: "2025.10.9 21:31",
      text: "손흥민짱!!",
      profile: "/postImages/profile.png",
      likes: 1,
      liked: true,
      replies: [
        {
          id: 101,
          name: "초이준서",
          date: "2025.10.9 22:00",
          text: "@지존준서 완전 공감합니다!",
          profile: "/postImages/profile.png",
          likes: 0,
          liked: false,
        },
      ],
    },
  ]);

  const currentId = Number(id);
  const prevId = currentId > 1 ? currentId - 1 : null;
  const nextId = currentId + 1;

  const goList = () => navigate("/main/post/all");
  const goPrev = () => prevId && navigate(`/main/post/read/${prevId}`);
  const goNext = () => navigate(`/main/post/read/${nextId}`);

  // ✅ 게시글 좋아요 토글
  const handlePostLike = () => {
    setPostLiked((prev) => !prev);
    setPostLikeCount((prev) => (postLiked ? prev - 1 : prev + 1));
  };

  // ✅ 카카오 공유
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("8205d77659532bf75b85e3424590d6bc");
      console.log("✅ Kakao SDK Initialized");
    } else {
      console.warn("⚠️ Kakao SDK가 로드되지 않았습니다.");
    }
  }, []);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/main/post/read/${id}`;

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "10일차 러닝 도전!",
        description: `지존준서님의 오늘의 솜 기록 🌱`,
        imageUrl: "https://yourdomain.com/assets/som-share-thumbnail.png",
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: "지금 참여하기",
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    });
  };

  // 댓글/대댓글 좋아요
  const handleLike = (cid, isReply = false, parentId = null) => {
    setComments((prev) =>
      prev.map((c) => {
        if (isReply && c.id === parentId) {
          return {
            ...c,
            replies: c.replies.map((r) =>
              r.id === cid
                ? {
                    ...r,
                    liked: !r.liked,
                    likes: r.liked ? r.likes - 1 : r.likes + 1,
                  }
                : r
            ),
          };
        }
        if (!isReply && c.id === cid)
          return {
            ...c,
            liked: !c.liked,
            likes: c.liked ? c.likes - 1 : c.likes + 1,
          };
        return c;
      })
    );
  };

  // 📝 댓글 등록
  const handleCommentSubmit = () => {
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now(),
      name: "지존준서",
      date: "2025.10.26 22:00",
      text: comment,
      profile: "/postImages/profile.png",
      likes: 0,
      liked: false,
      replies: [],
    };
    setComments((prev) => [...prev, newComment]);
    setComment("");
  };

  // 🧩 대댓글 등록
  const handleReplySubmit = (parentId, targetId) => {
    const text = (replyInputs[targetId] || "").trim();
    if (!text) return;

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: [
              ...c.replies,
              {
                id: Date.now(),
                name: "지존준서",
                date: "2025.10.26 22:10",
                text,
                profile: "/postImages/profile.png",
                likes: 0,
                liked: false,
              },
            ],
          };
        }
        return c;
      })
    );

    setReplyInputs((prev) => ({ ...prev, [targetId]: "" }));
    setShowReplyTarget(null);
  };

  // 답글 버튼 클릭
  const handleReplyClick = (parentId, targetId, nickname) => {
    setShowReplyTarget((prev) =>
      prev && prev.targetId === targetId ? null : { parentId, targetId }
    );

    setReplyInputs((prev) => ({
      ...prev,
      [targetId]: prev[targetId]?.includes(`@${nickname}`)
        ? prev[targetId]
        : `@${nickname} `,
    }));
  };

  const renderTextWithTags = (text) => {
    const parts = text.split(/(@\S+)/g);
    return parts.map((part, i) =>
      part.startsWith("@") ? (
        <S.Mention key={i}>{part}</S.Mention>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      )
    );
  };

  // 🗑 게시글 삭제 (완성된 fetch 로직)
  const handleDelete = async () => {
    openModal({
      title: "게시글을 삭제하시겠습니까?",
      message: "삭제된 게시글은 복구할 수 없습니다.",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          const BASE_URL = process.env.REACT_APP_BACKEND_URL;

          const response = await fetch(`${BASE_URL}/main/post/withdraw?id=${id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "게시글 삭제 실패");
          }

          const result = await response.json();
          openModal({
            title: "삭제 완료",
            message: result.message || "게시글이 성공적으로 삭제되었습니다.",
            confirmText: "확인",
            onConfirm: () => navigate("/main/post/all"),
          });
        } catch (error) {
          console.error("삭제 오류:", error);
          openModal({
            title: "삭제 실패",
            message: "게시글 삭제 중 오류가 발생했습니다.",
            confirmText: "확인",
          });
        }
      },
    });
  };

  // 댓글/답글 삭제
  const handleCommentDelete = () => {
    if (!deleteTarget) return;

    openModal({
      title: "댓글을 삭제하시겠습니까?",
      message: "삭제된 댓글은 복구할 수 없습니다.",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: () => {
        setComments((prev) =>
          prev
            .map((c) => {
              if (deleteTarget.type === "comment" && c.id === deleteTarget.id)
                return null;
              if (deleteTarget.type === "reply") {
                return {
                  ...c,
                  replies: c.replies.filter((r) => r.id !== deleteTarget.id),
                };
              }
              return c;
            })
            .filter(Boolean)
        );
        setDeleteTarget(null);
      },
    });
  };

  return (
    <S.Container>
      <S.Title>{id}번 게시글 제목</S.Title>

      <S.MetaBox>
        <div className="writer">지존준서</div>
        <span className="divider">|</span>
        <div className="date">2025.10.26</div>
        <span className="divider">|</span>
        <div className="view">조회수 : 5,905</div>
      </S.MetaBox>

      <S.Content>
        <S.EditBox>
          <span onClick={() => navigate(`/main/post/modify/${id}`)}>수정</span> |{" "}
          <span onClick={handleDelete}>삭제</span>
        </S.EditBox>
        <p>{id}번 게시물 내용입니다.</p>
      </S.Content>

      {/* 공유 */}
      <S.PostSocialBox>
        <S.ReportButton
          onClick={() => {
            setReportTarget({ type: "post", id }); // 게시글 신고
            setShowReportModal(true);
          }}
        >
          <img src="/assets/icons/report.svg" alt="신고하기" />
          <span>신고</span>
        </S.ReportButton>
        <S.ShareButton onClick={handleShare}>
          <img src="/assets/icons/share_gray.svg" alt="공유하기" />
          <span>공유</span>
        </S.ShareButton>
      </S.PostSocialBox>

      {/* 💬 댓글 컴포넌트 */}
      <PostComment
        showComments={showComments}
        setShowComments={setShowComments}
        comments={comments}
        setComments={setComments}
        comment={comment}
        setComment={setComment}
        replyInputs={replyInputs}
        setReplyInputs={setReplyInputs}
        showReplyTarget={showReplyTarget}
        setShowReplyTarget={setShowReplyTarget}
        deleteTarget={deleteTarget}
        setDeleteTarget={setDeleteTarget}
        handleCommentDelete={handleCommentDelete}
        handleReplyClick={handleReplyClick}
        handleReplySubmit={handleReplySubmit}
        handleLike={handleLike}
        handleCommentSubmit={handleCommentSubmit}
        renderTextWithTags={renderTextWithTags}
        showReportModal={showReportModal}
        setShowReportModal={setShowReportModal}
        reportTarget={reportTarget}
        setReportTarget={setReportTarget}
      />

      {/* ✅ 이전/다음 글 */}
      <S.NavList>
        <S.NavItem onClick={goNext} $disabled={!nextId}>
          <div className="label">
            <S.NavArrow src="/assets/icons/drop_down.svg" alt="" $up />
            다음 글
          </div>
          <div className="title">{`${nextId}번 게시글 입니다.`}</div>
        </S.NavItem>

        <S.NavItem onClick={prevId ? goPrev : undefined} $disabled={!prevId}>
          <div className="label">
            <S.NavArrow src="/assets/icons/drop_down.svg" alt="" />
            이전 글
          </div>
          <div className="title">
            {prevId ? `${prevId}번 게시글 입니다.` : "이전 글이 없습니다."}
          </div>
        </S.NavItem>
      </S.NavList>

      <S.NavSection>
        <S.NavButton onClick={goList}>목록</S.NavButton>
      </S.NavSection>
    </S.Container>
  );
};

export default PostReadContent;
