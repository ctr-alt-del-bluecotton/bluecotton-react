import React, { useEffect, useState } from "react";
import S from "./style";
import Report from "../../../components/Report/Report";
import { useModal } from "../../../components/modal";
import { useSelector } from "react-redux";


const PostComment = ({
  showComments,
  setShowComments,
  comments,
  setComments,
  comment,
  setComment,
  replyInputs,
  setReplyInputs,
  showReplyTarget,
  setShowReplyTarget,
  deleteTarget,
  setDeleteTarget,
  showReportModal,
  setShowReportModal,
  reportTarget,
  setReportTarget,
  postId,
  fetchPostDetail,   // ⭐️ 추가됨: 상위(PostReadContent)에서 전달받음
}) => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const { openModal } = useModal();
  const { currentUser, isLogin } = useSelector((state) => state.user);
  const [localProfileImage, setLocalProfileImage] = useState(null);

  // 프로필사진 실시간 업데이트
  useEffect(() => {
  const fetchProfile = async () => {
    if (!isLogin || !currentUser?.id) return;

    try {
      const res = await fetch(
        `${BASE_URL}/member/profile?memberId=${currentUser.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!res.ok) throw new Error("프로필 불러오기 실패");

      const result = await res.json();
      const data = result.data;

      // 서버에서 주는 path + name
      setLocalProfileImage(data.memberProfilePath + data.memberProfileName);
    } catch (err) {
      console.error(err);
      setLocalProfileImage("/images/default_profile.png");
    }
  };

    fetchProfile();
  }, [isLogin, currentUser?.id]);
  
  /* ===========================================================
     1) 좋아요 토글 → 서버 → fetchPostDetail() 호출로 최신 상태 반영
  ============================================================ */
  const handleLike = async (targetId, isReply = false) => {
    if (!isLogin) {
      return openModal({
        title: "로그인이 필요합니다",
        message: "좋아요를 누르려면 로그인이 필요합니다.",
        confirmText: "확인",
      });
    }

    const endpoint = isReply
      ? `${BASE_URL}/private/post/reply/like/toggle`
      : `${BASE_URL}/private/post/comment/like/toggle`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          memberId: currentUser.id,
          ...(isReply ? { replyId: targetId } : { commentId: targetId }),
        }),
      });

      if (!res.ok) throw new Error("좋아요 요청 실패");

      // ⭐️ 댓글 상태 새로 불러오기
      fetchPostDetail();
    } catch (err) {
      console.error("좋아요 실패:", err);
    }
  };

  /* ===========================================================
     2) 멘션 강조 처리
  ============================================================ */
  const renderTextWithTags = (text = "") => {
    const parts = text.split(/(@\S+)/g);
    return parts.map((part, i) =>
      part.startsWith("@") ? <S.Mention key={i}>{part}</S.Mention> : part
    );
  };

  /* ===========================================================
     3) 댓글 등록 → 서버 → fetchPostDetail()
  ============================================================ */
  const handleCommentSubmit = async () => {
    if (!isLogin) {
      return openModal({
        title: "로그인이 필요합니다",
        message: "댓글을 작성하려면 로그인이 필요합니다.",
        confirmText: "확인",
      });
    }

    if (!comment.trim()) return;

    try {
      const res = await fetch(`${BASE_URL}/private/post/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          postCommentContent: comment,
          postId,
          memberId: currentUser.id,
        }),
      });

      if (!res.ok) throw new Error("댓글 등록 실패");

      setComment("");
      fetchPostDetail(); // ⭐ 새로 불러오기
    } catch (err) {
      console.error("댓글 등록 실패:", err);
    }
  };

  /* ===========================================================
     4) 답글 등록 → 서버 → fetchPostDetail()
  ============================================================ */
  const handleReplySubmit = async (parentId, targetId) => {
    const text = (replyInputs[targetId] || "").trim();
    if (!text) return;

    if (!isLogin) {
      return openModal({
        title: "로그인이 필요합니다",
        message: "답글을 작성하려면 로그인이 필요합니다.",
        confirmText: "확인",
      });
    }

    try {
      const res = await fetch(`${BASE_URL}/private/post/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          postReplyContent: text,
          postCommentId: parentId,
          memberId: currentUser.id,
        }),
      });

      if (!res.ok) throw new Error("답글 등록 실패");

      setReplyInputs((prev) => ({ ...prev, [targetId]: "" }));
      setShowReplyTarget(null);

      fetchPostDetail(); // ⭐ 최신 상태 반영
    } catch (err) {
      console.error("답글 등록 실패:", err);
    }
  };

  /* ===========================================================
     5) 답글 입력창 토글
  ============================================================ */
  const handleReplyClick = (parentId, targetId, nickname, type) => {
    setShowReplyTarget((prev) => {
      if (
        prev &&
        prev.parentId === parentId &&
        prev.targetId === targetId &&
        prev.type === type
      ) {
        return null;
      }
      return { parentId, targetId, nickname, type };
    });

    setReplyInputs((prev) => ({
      ...prev,
      [targetId]: prev[targetId] || `@${nickname} `,
    }));
  };

  /* ===========================================================
     6) 댓글/답글 삭제 → 서버 → fetchPostDetail()
  ============================================================ */
  const handleCommentDelete = async () => {
    if (!deleteTarget) return;

    const { type, id } = deleteTarget;

    if (!isLogin) {
      return openModal({
        title: "로그인이 필요합니다",
        message: "삭제 기능은 로그인 후 이용 가능합니다.",
        confirmText: "확인",
      });
    }

    openModal({
      title: type === "comment" ? "댓글 삭제" : "답글 삭제",
      message: "정말 삭제하시겠습니까?",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          const endpoint =
            type === "comment"
              ? `${BASE_URL}/private/post/comment/${id}`
              : `${BASE_URL}/private/post/reply/${id}`;

          const res = await fetch(endpoint, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });

          if (!res.ok) throw new Error("삭제 실패");

          setDeleteTarget(null);
          fetchPostDetail(); // ⭐ 삭제 후 최신 데이터 불러오기
        } catch (err) {
          console.error("삭제 실패:", err);
        }
      },
    });
  };

  const formatDate = (date) =>
    new Date(date)
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(/\.\s/g, ".")
      .replace(/\.$/, "");

  return (
    <S.CommentSection>
      <S.CommentHeader onClick={() => setShowComments(!showComments)}>
        <h3>
          <span className="pink">댓글 달기</span>
        </h3>
        <S.ToggleButton $open={showComments}>
          <img
            src={
              showComments
                ? "/assets/icons/drop_down_acv.svg"
                : "/assets/icons/drop_down.svg"
            }
            alt="드롭다운"
          />
        </S.ToggleButton>
      </S.CommentHeader>

      {showComments && (
        <>
          <S.CommentList>
            {comments.map((c) => (
              <React.Fragment key={c.id}>
                <S.CommentItem>
                  <div className="left">
                    <img
                      src={
                        c.memberProfileUrl
                          ? c.memberProfileUrl.startsWith("/upload/")
                            ? `http://localhost:10000${c.memberProfileUrl}`
                            : c.memberProfileUrl
                          : "/images/default_profile.png"
                      }
                      alt="프로필"
                      className="profile"
                    />
                    <div className="text-box">
                      <div className="header-row">
                        <div className="writer">{c.memberNickname}</div>

                        <S.LikeButton
                          $liked={c.liked}
                          onClick={() => handleLike(c.id, false)}
                        >
                          <img
                            src={
                              c.liked
                                ? "/assets/icons/favorite_acv.svg"
                                : "/assets/icons/favorite_gray.svg"
                            }
                            alt="좋아요"
                          />
                          {c.postCommentLikeCount}
                        </S.LikeButton>
                      </div>

                      <div className="content">
                        {renderTextWithTags(c.postCommentContent)}
                      </div>

                      <div className="meta-row">
                        <span>{formatDate(c.postCommentCreateAt)}</span>
                        {(!isLogin || currentUser?.id !== c.memberId) && (
                          <>
                            <span> | </span>
                            <span
                              className="report"
                              onClick={() => {
                                if (!isLogin)
                                  return openModal({
                                    title: "로그인이 필요합니다",
                                    message: "신고 기능은 로그인 후 이용 가능합니다.",
                                    confirmText: "확인",
                                  });

                                setReportTarget({ type: "comment", id: c.id });
                                setShowReportModal(true);
                              }}
                            >
                              신고
                            </span>
                          </>
                        )}

                        {isLogin && currentUser?.id === c.memberId && (
                          <>
                            <span> | </span>
                            <span
                              className="delete"
                              onClick={() => {
                                setDeleteTarget({ type: "comment", id: c.id });
                                handleCommentDelete();
                              }}
                            >
                              삭제
                            </span>
                          </>
                        )}
                      </div>

                      <div className="reply-row">
                        <button
                          className="reply"
                          onClick={() =>
                            handleReplyClick(
                              c.id,
                              c.id,
                              c.memberNickname,
                              "comment"
                            )
                          }
                        >
                          답글
                        </button>
                      </div>
                    </div>
                  </div>
                </S.CommentItem>

                {/* === 댓글의 답글 입력창 === */}
                {showReplyTarget?.type === "comment" &&
                  showReplyTarget?.targetId === c.id &&
                  showReplyTarget?.parentId === c.id && (
                    <S.CommentForm $indent>
                      <div className="avatar">
                        <img
                          src={
                            c.memberProfileUrl
                              ? c.memberProfileUrl.startsWith("/upload/")
                                ? `http://localhost:10000${c.memberProfileUrl}`
                                : c.memberProfileUrl
                              : "/images/default_profile.png"
                          }
                          alt="내 프로필"
                        />
                        <span className="nickname">
                          {currentUser?.memberNickname}
                        </span>
                      </div>
                    <div className="input-wrap">
                      <textarea
                        placeholder="답글을 입력하세요"
                        maxLength={300}
                        value={replyInputs[c.id] || ""}
                        onChange={(e) =>
                          setReplyInputs((prev) => ({
                            ...prev,
                            [c.id]: e.target.value,
                          }))
                        }
                      />
                      <span className="count">
                        {(replyInputs[c.id]?.length || 0)}/300
                      </span>
                    </div>
                    <button
                      className="submit-btn"
                      onClick={() => handleReplySubmit(c.id, c.id)}
                    >
                      등록
                    </button>
                  </S.CommentForm>
                )}

                {/* === 대댓글 목록 === */}
                {c.replies?.map((r) => (
                  <React.Fragment key={r.id}>
                    <S.CommentItem indent>
                      <div className="left">
                        <img
                          src={
                            r.memberProfileUrl
                              ? r.memberProfileUrl.startsWith("/upload/")
                                ? `http://localhost:10000${r.memberProfileUrl}`
                                : r.memberProfileUrl
                              : "/images/default_profile.png"
                          }
                          alt="프로필"
                          className="profile"
                        />
                        <div className="text-box">
                          <div className="header-row">
                            <div className="writer">{r.memberNickname}</div>

                            <S.LikeButton
                              $liked={r.liked}
                              onClick={() => handleLike(r.id, true)}
                            >
                              <img
                                src={
                                  r.liked
                                    ? "/assets/icons/favorite_acv.svg"
                                    : "/assets/icons/favorite_gray.svg"
                                }
                                alt="좋아요"
                              />
                              {r.postReplyLikeCount}
                            </S.LikeButton>
                          </div>

                          <div className="content">
                            {renderTextWithTags(r.postReplyContent)}
                          </div>

                          <div className="meta-row">
                            <span>{formatDate(r.postReplyCreateAt)}</span>

                            {/* 신고: 본인 아닐 때 */}
                            {(!isLogin || currentUser?.id !== r.memberId) && (
                              <>
                                <span> | </span>
                                <span
                                  className="report"
                                  onClick={() => {
                                    if (!isLogin)
                                      return openModal({
                                        title: "로그인이 필요합니다",
                                        message:
                                          "신고 기능은 로그인 후 이용 가능합니다.",
                                        confirmText: "확인",
                                      });

                                    setReportTarget({ type: "reply", id: r.id });
                                    setShowReportModal(true);
                                  }}
                                >
                                  신고
                                </span>
                              </>
                            )}

                            {/* 삭제: 본인일 때만 */}
                            {isLogin && currentUser?.id === r.memberId && (
                              <>
                                <span> | </span>
                                <span
                                  className="delete"
                                  onClick={() => {
                                    setDeleteTarget({ type: "reply", id: r.id });
                                    handleCommentDelete();
                                  }}
                                >
                                  삭제
                                </span>
                              </>
                            )}
                          </div>

                          <div className="reply-row">
                            <button
                              className="reply"
                              onClick={() =>
                                handleReplyClick(
                                  c.id,
                                  r.id,
                                  r.memberNickname,
                                  "reply"
                                )
                              }
                            >
                              답글
                            </button>
                          </div>
                        </div>
                      </div>
                    </S.CommentItem>

                    {/* === 대댓글의 답글 입력창 === */}
                    {showReplyTarget?.type === "reply" &&
                      showReplyTarget?.targetId === r.id &&
                      showReplyTarget?.parentId === c.id && (
                        <S.CommentForm $nested>
                          <div className="avatar">
                          <img
                            src={
                              c.memberProfileUrl
                                ? c.memberProfileUrl.startsWith("/upload/")
                                  ? `http://localhost:10000${c.memberProfileUrl}`
                                  : c.memberProfileUrl
                                : "/images/default_profile.png"
                            }
                            alt="내 프로필"
                          />
                            <span className="nickname">
                              {currentUser?.memberNickname}
                            </span>
                          </div>
                          <div className="input-wrap">
                            <textarea
                              placeholder="답글을 입력하세요"
                              maxLength={300}
                              value={replyInputs[r.id] || ""}
                              onChange={(e) =>
                                setReplyInputs((prev) => ({
                                  ...prev,
                                  [r.id]: e.target.value,
                                }))
                              }
                            />
                            <span className="count">
                              {(replyInputs[r.id]?.length || 0)}/300
                            </span>
                          </div>
                          <button
                            className="submit-btn"
                            onClick={() => handleReplySubmit(c.id, r.id)}
                          >
                            등록
                          </button>
                        </S.CommentForm>
                      )}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </S.CommentList>

          {/* === 일반 댓글 입력창 === */}
          <S.CommentForm>
            <div className="avatar">
              <img
                src={localProfileImage || "/images/default_profile.png"}
                alt="내 프로필"
              />
              <span className="nickname">
                {currentUser?.memberNickname || "익명"}
              </span>
            </div>

            <div className="input-wrap">
              <textarea
                placeholder="마음이 따뜻해지는 착한 댓글만 달아주세요!"
                maxLength={300}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <span className="count">{comment.length}/300</span>
            </div>

            <button className="submit-btn" onClick={handleCommentSubmit}>
              등록
            </button>
          </S.CommentForm>
        </>
      )}

      {/* === 신고 모달 === */}
      {showReportModal && (
        <Report
          target={reportTarget}
          onClose={() => setShowReportModal(false)}
          onSubmit={(reason) => {
            console.log("신고 완료:", reason);
            setShowReportModal(false);
          }}
        />
      )}
    </S.CommentSection>
  );
};

export default PostComment;
