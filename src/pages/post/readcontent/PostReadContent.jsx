import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import S from "./style";
import { useModal } from "../../../components/modal";
import PostComment from "../commentcomponent/PostComment";

const PostReadContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();

  // ✅ Redux 로그인 유저 정보
  const { currentUser, isLogin } = useSelector((state) => state.user);
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

  // ✅ 공통 로그인 필요 모달 함수
  const requireLoginModal = () => {
    openModal({
      title: "로그인이 필요합니다",
      message: "이 기능은 로그인 후 이용하실 수 있습니다.",
      confirmText: "로그인하기",
      cancelText: "취소",
      onConfirm: () => navigate("/login"),
    });
  };

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
        const BASE_URL = process.env.REACT_APP_BACKEND_URL;
        const token = localStorage.getItem("accessToken");

        const headers = {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        };

        const response = await fetch(`${BASE_URL}/main/post/read/${id}`, {
          method: "GET",
          headers,
          credentials: "include",
        });

        if (!response.ok) throw new Error(`HTTP error ${response.status}`);

        const result = await response.json();
        if (result.data) {
          // ✅ 댓글·대댓글 좋아요 여부 매핑
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
          throw new Error("게시글 데이터를 불러오지 못했습니다.");
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
  }, [id, isLogin, currentUser, navigate, openModal]);

  // ✅ 상세조회 완료 후 → 최근 본 글 등록 (순차 실행 보장)
  useEffect(() => {
    const registerRecentPost = async () => {
      const BASE_URL = process.env.REACT_APP_BACKEND_URL;
      const token = localStorage.getItem("accessToken");

      if (!isLogin || !token || !id || !post) {
        console.warn("🚫 최근 본 글 등록 스킵 (조건 불충족)", { id, token, post });
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/private/post/recent/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.warn(`⚠️ 최근 본 글 등록 실패: ${response.status}`);
          return;
        }

        await response.json();
      } catch (err) {
        console.error("❌ 최근 본 글 등록 중 오류:", err);
      }
    };

    if (post) registerRecentPost();
  }, [post, id, isLogin]);

  // ✅ 댓글/대댓글 좋아요 토글
  const handleLike = async (commentId, isReply = false, parentId = null) => {
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    if (!isLogin || !currentUser?.id) {
      requireLoginModal();
      return;
    }

    try {
      const endpoint = !isReply
        ? `${BASE_URL}/private/post/comment/like/toggle`
        : `${BASE_URL}/private/post/reply/like/toggle`;

      const bodyData = !isReply
        ? { commentId, memberId: currentUser.id }
        : { replyId: commentId, memberId: currentUser.id };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) throw new Error("좋아요 요청 실패");

      setComments((prev) =>
        prev.map((c) => {
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
      openModal({
        title: "오류",
        message: "좋아요 처리 중 문제가 발생했습니다.",
        confirmText: "확인",
      });
    }
  };

  // ✅ 게시글 삭제
  const handleDelete = async () => {
    if (!isLogin || !currentUser?.id) {
      requireLoginModal();
      return;
    }

    openModal({
      title: "게시글을 삭제하시겠습니까?",
      message: "삭제된 게시글은 복구할 수 없습니다.",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          const BASE_URL = process.env.REACT_APP_BACKEND_URL;
          const token = localStorage.getItem("accessToken");

          if (!token) throw new Error("토큰 없음 또는 인증 실패");

          const response = await fetch(
            `${BASE_URL}/private/post/withdraw?id=${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            }
          );

          const result = await response.json();
          if (!response.ok) throw new Error(result.message || "삭제 실패");

          openModal({
            title: "삭제 완료",
            message: result.message || "게시글이 삭제되었습니다.",
            confirmText: "확인",
            onConfirm: () => navigate("/main/post/all"),
          });
        } catch (error) {
          console.error("삭제 실패:", error);
          openModal({
            title: "삭제 실패",
            message: error.message || "삭제 중 오류가 발생했습니다.",
            confirmText: "확인",
          });
        }
      },
    });
  };

  // ✅ 날짜 포맷 (24시간제)
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    if (isNaN(d)) return "";
    return d
      .toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // ✅ 24시간제
      })
      .replace(/\.\s?/g, ".")
      .replace(/\.$/, "");
  };

  // ✅ 카카오 공유
  const handleShare = () => {
    if (!window.Kakao || !window.Kakao.Share) {
      openModal({
        title: "공유 불가",
        message: "카카오 SDK가 아직 초기화되지 않았습니다.",
        confirmText: "확인",
      });
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

  if (loading) return <S.Container>로딩 중...</S.Container>;
  if (!post)
    return <S.Container>게시글을 찾을 수 없습니다.</S.Container>;

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
        {isLogin && currentUser?.id === post.memberId && (
          <S.EditBox>
            <span onClick={() => navigate(`/main/post/modify/${id}`)}>수정</span>{" "}
            | <span onClick={handleDelete}>삭제</span>
          </S.EditBox>
        )}

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
            if (!isLogin || !currentUser?.id) {
              requireLoginModal();
              return;
            }

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
        handleLike={handleLike}
        postId={id}
        showReportModal={showReportModal}
        setShowReportModal={setShowReportModal}
        reportTarget={reportTarget}
        setReportTarget={setReportTarget}
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
