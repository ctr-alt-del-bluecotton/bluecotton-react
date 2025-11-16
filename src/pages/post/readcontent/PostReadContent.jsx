import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import S from "./style";
import { useModal } from "../../../components/modal";
import PostComment from "../commentcomponent/PostComment";
import { marked } from "marked";

const PostReadContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();

  const { currentUser, isLogin } = useSelector((state) => state.user);

  const [post, setPost] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [replyInputs, setReplyInputs] = useState({});
  const [showReplyTarget, setShowReplyTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);
  const [showComments, setShowComments] = useState(true);

  const requireLoginModal = () => {
    openModal({
      title: "로그인이 필요합니다",
      message: "이 기능은 로그인 후 이용하실 수 있습니다.",
      confirmText: "로그인하기",
      cancelText: "취소",
      onConfirm: () => navigate("/login"),
    });
  };

  /** 🔥 Kakao init */
  useEffect(() => {
    const initKakao = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init("8cb2100ec330f00d05688be83f2361af");
      }
    };

    if (window.Kakao) initKakao();
    else {
      const t = setInterval(() => {
        if (window.Kakao) {
          clearInterval(t);
          initKakao();
        }
      }, 300);
      return () => clearInterval(t);
    }
  }, []);

  /** 🔥 게시글 + 댓글 + prev/next 전체 불러오기 */
  const fetchPostDetail = useCallback(async () => {
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

      if (!response.ok) throw new Error("조회 실패");

      const result = await response.json();
      if (!result.data) throw new Error("데이터 오류");

      const fetchedPost = result.data.post;
      const fetchedPrev = result.data.prev;
      const fetchedNext = result.data.next;

      setPost(fetchedPost);
      setPrevPost(fetchedPrev);
      setNextPost(fetchedNext);

      /** 🔥 DTO → 프론트 UI 변환 */
      const mappedComments = (fetchedPost.comments || []).map((c) => ({
        ...c,
        liked: c.isCommentLiked === 1,
        replies: (c.replies || []).map((r) => ({
          ...r,
          liked: r.isReplyLiked === 1,
        })),
      }));

      setComments(mappedComments);
    } catch (err) {
      console.error(err);
      openModal({
        title: "오류",
        message: "게시글을 불러오는 중 문제가 발생했습니다.",
        confirmText: "확인",
        onConfirm: () => navigate("/main/post/all"),
      });
    } finally {
      setLoading(false);
    }
  }, [id, navigate, openModal]);

  /** 🔥 최초 로드 */
  useEffect(() => {
    fetchPostDetail();
  }, [fetchPostDetail]);

  /** 🔥 최근 본 글 등록 */
  useEffect(() => {
    const register = async () => {
      const BASE_URL = process.env.REACT_APP_BACKEND_URL;
      const token = localStorage.getItem("accessToken");
      if (!isLogin || !token || !post) return;

      try {
        await fetch(`${BASE_URL}/private/post/recent/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch {}
    };

    if (post) register();
  }, [post, id, isLogin]);

  const handleDelete = async () => {
    if (!isLogin || !currentUser?.id) return requireLoginModal();

    openModal({
      title: "게시글 삭제",
      message: "삭제된 게시글은 복구할 수 없습니다.",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          const BASE_URL = process.env.REACT_APP_BACKEND_URL;
          const token = localStorage.getItem("accessToken");

          const response = await fetch(
            `${BASE_URL}/private/post/withdraw?id=${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const result = await response.json();
          if (!response.ok) throw new Error(result.message);

          openModal({
            title: "삭제 완료",
            message: "게시글이 삭제되었습니다.",
            confirmText: "확인",
            onConfirm: () => navigate("/main/post/all"),
          });
        } catch (err) {
          openModal({
            title: "삭제 실패",
            message: err.message,
          });
        }
      },
    });
  };

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
        hour12: false,
      })
      .replace(/\.\s?/g, ".")
      .replace(/\.$/, "");
  };

  const goPrev = () => prevPost && navigate(`/main/post/read/${prevPost.id}`);
  const goNext = () => nextPost && navigate(`/main/post/read/${nextPost.id}`);
  const goList = () => navigate("/main/post/all");

  if (loading) return <S.Container>로딩 중...</S.Container>;
  if (!post) return <S.Container>게시글이 없습니다.</S.Container>;

  let raw = post.postContent || "";
  let htmlContent = marked.parse(raw);

  /** 🔥 공유용 썸네일 함수 */
  const getThumbnail = () => {
    if (post.postImageList && post.postImageList.length > 0) {
      const img = post.postImageList[0];
      const url = `${img.postImagePath}${img.postImageName}`;
      if (url.startsWith("http")) return url;
      return `http://localhost:10000${url.startsWith("/") ? url : "/" + url}`;
    }
    return "/assets/images/postDefault.jpg";
  };

  const thumbnail = getThumbnail();

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
            <span onClick={() => navigate(`/main/post/modify/${id}`)}>
              수정
            </span>{" "}
            | <span onClick={handleDelete}>삭제</span>
          </S.EditBox>
        )}

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </S.Content>

      {/* 신고 + 공유 */}
      <S.PostSocialBox>
        {isLogin && currentUser?.id !== post.memberId && (
          <S.ReportButton
            onClick={() => {
              if (!isLogin) return requireLoginModal();
              setReportTarget({ type: "post", id });
              setShowReportModal(true);
            }}
          >
            <img src="/assets/icons/report.svg" alt="신고하기" />
            <span>신고</span>
          </S.ReportButton>
        )}

        <S.ShareButton
          onClick={() => {
            if (!window.Kakao) return;

            const shareUrl = `${window.location.origin}/main/post/read/${id}`;

            window.Kakao.Share.sendDefault({
              objectType: "feed",
              content: {
                title: post.postTitle,
                description: `${post.memberNickname}의 오늘한 도전이 보고싶다면!?`,
                imageUrl: thumbnail,
                link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
              },
            });
          }}
        >
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
        postId={id}
        showReportModal={showReportModal}
        setShowReportModal={setShowReportModal}
        reportTarget={reportTarget}
        setReportTarget={setReportTarget}
        fetchPostDetail={fetchPostDetail}
      />

      {/* prev/next */}
      <S.NavList>
        <S.NavItem onClick={goNext} $disabled={!nextPost}>
          <div className="label">
            <S.NavArrow src="/assets/icons/drop_down.svg" $up />
            다음 글
          </div>
          <div className="title">
            {nextPost ? nextPost.postTitle : "다음 글이 없습니다."}
          </div>
        </S.NavItem>

        <S.NavItem onClick={goPrev} $disabled={!prevPost}>
          <div className="label">
            <S.NavArrow src="/assets/icons/drop_down.svg" />
            이전 글
          </div>
          <div className="title">
            {prevPost ? prevPost.postTitle : "이전 글이 없습니다."}
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
