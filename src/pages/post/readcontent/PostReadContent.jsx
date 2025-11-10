import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import S from "./style";
import { useModal } from "../../../components/modal";
import PostComment from "../commentcomponent/PostComment";

const PostReadContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [replyInputs, setReplyInputs] = useState({});
  const [showReplyTarget, setShowReplyTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);
  const [showComments, setShowComments] = useState(true);

  const currentId = Number(id);
  const prevId = currentId > 1 ? currentId - 1 : null;
  const nextId = currentId + 1;

  const goList = () => navigate("/main/post/all");
  const goPrev = () => prevId && navigate(`/main/post/read/${prevId}`);
  const goNext = () => navigate(`/main/post/read/${nextId}`);

  // ✅ Kakao SDK 초기화
  useEffect(() => {
    const initKakao = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init("8cb2100ec330f00d05688be83f2361af");
        console.log("✅ Kakao SDK Initialized:", window.Kakao.isInitialized());
      }
    };
    if (window.Kakao) {
      initKakao();
    } else {
      const check = setInterval(() => {
        if (window.Kakao) {
          clearInterval(check);
          initKakao();
        }
      }, 300);
      return () => clearInterval(check);
    }
  }, []);

  // ✅ 게시글 상세조회 (댓글 + 좋아요 여부 포함)
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const BASE_URL =
          process.env.REACT_APP_BACKEND_URL || "http://localhost:10000";
        const memberId = 1; // 임시 로그인

        const response = await fetch(
          `${BASE_URL}/main/post/read/${id}?memberId=${memberId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();

        if (result.data) {
          // ✅ 댓글 isCommentLiked → liked 변환
          const mappedComments = (result.data.comments || []).map((c) => ({
            ...c,
            liked: c.isCommentLiked === 1,
            replies: (c.replies || []).map((r) => ({
              ...r,
              liked: r.isReplyLiked === 1,
            })),
          }));

          setPost(result.data);
          setComments(mappedComments);
        } else {
          throw new Error(
            result.message || "게시글 데이터를 불러오지 못했습니다."
          );
        }
      } catch (err) {
        console.error("게시글 상세 불러오기 실패:", err);
        openModal({
          title: "오류",
          message: "게시글을 불러오는 중 문제가 발생했습니다.",
          confirmText: "확인",
          onConfirm: () => navigate("/main/post/all"),
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPostDetail();
  }, [id, navigate, openModal]);

  // ✅ 댓글/대댓글 좋아요 토글 (서버 반영)
  const handleLike = async (commentId, isReply = false, parentId = null) => {
    const BASE_URL =
      process.env.REACT_APP_BACKEND_URL || "http://localhost:10000";
    const memberId = 1;

    try {
      const endpoint = !isReply
        ? `${BASE_URL}/main/post/comment/like/toggle`
        : `${BASE_URL}/main/post/reply/like/toggle`;

      const bodyData = !isReply
        ? { commentId: commentId, memberId: memberId }
        : { replyId: commentId, memberId: memberId };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) throw new Error("좋아요 요청 실패");

      const result = await response.json();
      console.log("좋아요 토글 결과:", result);

      // ✅ UI 즉시 반영
      setComments((prevComments) =>
        prevComments.map((c) => {
          if (!isReply && c.commentId === commentId) {
            return {
              ...c,
              liked: !c.liked,
              commentLikeCount: c.liked
                ? c.commentLikeCount - 1
                : c.commentLikeCount + 1,
            };
          }

          if (isReply && c.commentId === parentId) {
            return {
              ...c,
              replies: c.replies.map((r) =>
                r.replyId === commentId
                  ? {
                      ...r,
                      liked: !r.liked,
                      replyLikeCount: r.liked
                        ? r.replyLikeCount - 1
                        : r.replyLikeCount + 1,
                    }
                  : r
              ),
            };
          }

          return c;
        })
      );
    } catch (err) {
      console.error("좋아요 토글 실패:", err);
    }
  };

  const handleReplyClick = (parentId, targetId, nickname) => {
    setShowReplyTarget((prev) =>
      prev?.targetId === targetId ? null : { parentId, targetId, nickname }
    );
  };

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;
    console.log("댓글 등록:", comment);
    setComment("");
  };

  const handleReplySubmit = (parentId, targetId) => {
    const text = (replyInputs[targetId] || "").trim();
    if (!text) return;
    console.log(`답글 등록: parent=${parentId}, target=${targetId}, text=${text}`);
    setReplyInputs((prev) => ({ ...prev, [targetId]: "" }));
  };

  const handleDelete = async () => {
    openModal({
      title: "게시글을 삭제하시겠습니까?",
      message: "삭제된 게시글은 복구할 수 없습니다.",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          const BASE_URL =
            process.env.REACT_APP_BACKEND_URL || "http://localhost:10000";
          const response = await fetch(`${BASE_URL}/main/post/withdraw?id=${id}`, {
            method: "DELETE",
          });

          let result = {};
          try {
            result = await response.json();
          } catch {
            result = {};
          }

          if (!response.ok)
            throw new Error(result.message || "게시글 삭제 실패");

          openModal({
            title: "삭제 완료",
            message: result.message || "게시글이 삭제되었습니다.",
            confirmText: "확인",
            onConfirm: () => navigate("/main/post/all"),
          });
        } catch (error) {
          console.error("게시글 삭제 중 오류:", error);
          openModal({
            title: "삭제 실패",
            message: "삭제 중 오류가 발생했습니다.",
            confirmText: "확인",
          });
        }
      },
    });
  };

  if (loading) return <S.Container>로딩 중...</S.Container>;
  if (!post) return <S.Container>게시글을 찾을 수 없습니다.</S.Container>;

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    if (isNaN(d)) return "";
    return d
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\.\s?/g, ".")
      .replace(/\.$/, "");
  };

  const handleShare = () => {
    if (!window.Kakao || !window.Kakao.Share) {
      alert("카카오 SDK가 아직 초기화되지 않았습니다.");
      return;
    }

    const shareUrl = `${window.location.origin}/main/post/read/${id}`;
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: post?.postTitle || "오늘의 솜",
        description: `${post?.memberNickname || "회원"}님의 도전 🌱`,
        imageUrl:
          post?.postImageUrl && !post.postImageUrl.includes("default_post.png")
            ? post.postImageUrl
            : "https://yourdomain.com/assets/som-share-thumbnail.png",
        link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
      },
      buttons: [
        {
          title: "BlueCotton에서 보기",
          link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
        },
      ],
    });
  };

  return (
    <S.Container>
      <S.Title>{post.postTitle}</S.Title>

      <S.MetaBox>
        <div className="writer">{post.memberNickname}</div>
        <span className="divider">|</span>
        <div className="date">{formatDate(post.postCreateAt)}</div>
        <span className="divider">|</span>
        <div className="view">조회수 : {post.postReadCount}</div>
      </S.MetaBox>

      <S.Content>
        <S.EditBox>
          <span onClick={() => navigate(`/main/post/modify/${id}`)}>수정</span> |{" "}
          <span onClick={handleDelete}>삭제</span>
        </S.EditBox>

        {post.postImageUrl &&
          !post.postImageUrl.includes("default_post.jpg") && (
            <img
              src={
                post.postImageUrl.startsWith("/upload/")
                  ? `http://localhost:10000${post.postImageUrl}`
                  : post.postImageUrl
              }
              alt="게시글 이미지"
              style={{ width: "100%", marginBottom: "20px" }}
              onError={(e) => {
                e.target.src =
                  "http://localhost:10000/upload/default/default_post.jpg";
              }}
            />
          )}

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.postContent }}
        />
      </S.Content>

      <S.PostSocialBox>
        <S.ReportButton
          onClick={() => {
            setReportTarget({ type: "post", id });
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
        handleCommentDelete={() => {}}
        handleReplyClick={handleReplyClick}
        handleReplySubmit={handleReplySubmit}
        handleLike={handleLike}
        handleCommentSubmit={handleCommentSubmit}
        renderTextWithTags={(text) => text}
        showReportModal={showReportModal}
        setShowReportModal={setShowReportModal}
        reportTarget={reportTarget}
        setReportTarget={setReportTarget}
        postId={id}
      />

      <S.NavList>
        <S.NavItem onClick={goNext}>
          <div className="label">
            <S.NavArrow src="/assets/icons/drop_down.svg" alt="" $up />
            다음 글
          </div>
          <div className="title">{`${nextId}번 게시글 입니다.`}</div>
        </S.NavItem>

        <S.NavItem onClick={goPrev} $disabled={!prevId}>
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
