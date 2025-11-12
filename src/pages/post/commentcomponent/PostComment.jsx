// 📄 PostComment.jsx
import React from "react";
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
}) => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const { openModal } = useModal();

  const { currentUser, isLogin } = useSelector((state) => state.user);

  /* ✅ 좋아요 토글 */
  const handleLike = async (targetId, isReply = false, parentCommentId = null) => {
    if (!isLogin || !currentUser?.id) {
      openModal({
        title: "로그인이 필요합니다",
        message: "좋아요를 누르려면 로그인이 필요합니다.",
        confirmText: "확인",
      });
      return;
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

      setComments((prev) =>
        prev.map((c) => {
          if (!isReply && c.id === targetId) {
            const liked = !c.liked;
            return {
              ...c,
              liked,
              postCommentLikeCount: c.postCommentLikeCount + (liked ? 1 : -1),
            };
          }
          if (isReply && c.replies) {
            const updatedReplies = c.replies.map((r) =>
              r.id === targetId
                ? {
                    ...r,
                    liked: !r.liked,
                    postReplyLikeCount: r.postReplyLikeCount + (!r.liked ? 1 : -1),
                  }
                : r
            );
            return { ...c, replies: updatedReplies };
          }
          return c;
        })
      );
    } catch (err) {
      console.error("좋아요 토글 실패:", err);
    }
  };

  /* ✅ 멘션 강조 */
  const renderTextWithTags = (text = "") => {
    const parts = text.split(/(@\S+)/g);
    return parts.map((part, i) =>
      part.startsWith("@") ? <S.Mention key={i}>{part}</S.Mention> : part
    );
  };

  /* ✅ 댓글 등록 */
  const handleCommentSubmit = async () => {
    if (!isLogin || !currentUser?.id) {
      openModal({
        title: "로그인이 필요합니다",
        message: "댓글을 작성하려면 로그인이 필요합니다.",
        confirmText: "확인",
      });
      return;
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
          postId: postId,
          memberId: currentUser.id,
        }),
      });

      if (!res.ok) throw new Error("댓글 등록 실패");
      const result = await res.json();

      setComments((prev) => [
        ...prev,
        {
          id: result.data?.commentId || Date.now(),
          postCommentContent: comment,
          postCommentCreateAt: new Date().toISOString(),
          memberNickname: currentUser.memberNickname || "익명",
          memberProfileUrl:
            currentUser.profilePath || "/images/default_profile.png",
          postCommentLikeCount: 0,
          liked: false,
          replies: [],
        },
      ]);
      setComment("");
    } catch (error) {
      console.error(error);
      openModal({
        title: "오류",
        message: "댓글 등록 중 문제가 발생했습니다.",
        confirmText: "확인",
      });
    }
  };

  /* ✅ 답글 등록 */
  const handleReplySubmit = async (parentId, targetId) => {
    const text = (replyInputs[targetId] || "").trim();
    if (!text) return;

    if (!isLogin || !currentUser?.id) {
      openModal({
        title: "로그인이 필요합니다",
        message: "답글을 작성하려면 로그인이 필요합니다.",
        confirmText: "확인",
      });
      return;
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
      const result = await res.json();

      setComments((prev) =>
        prev.map((c) =>
          c.id === parentId
            ? {
                ...c,
                replies: [
                  ...(c.replies || []),
                  {
                    id: result.data?.replyId || Date.now(),
                    postReplyContent: text,
                    postReplyCreateAt: new Date().toISOString(),
                    memberNickname: currentUser.memberNickname || "익명",
                    memberProfileUrl:
                      currentUser.profilePath || "/images/default_profile.png",
                    postReplyLikeCount: 0,
                    liked: false,
                  },
                ],
              }
            : c
        )
      );

      setReplyInputs((prev) => ({ ...prev, [targetId]: "" }));
      setShowReplyTarget(null);
    } catch (error) {
      console.error(error);
      openModal({
        title: "오류",
        message: "답글 등록 중 문제가 발생했습니다.",
        confirmText: "확인",
      });
    }
  };

  /* ✅ 답글 클릭  */
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

  /* ✅ 삭제 */
  const handleCommentDelete = async () => {
    if (!deleteTarget) return;
    const { type, id } = deleteTarget;

    if (!isLogin || !currentUser?.id) {
      openModal({
        title: "로그인이 필요합니다",
        message: "삭제 기능은 로그인 후 이용 가능합니다.",
        confirmText: "확인",
      });
      return;
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
          if (!res.ok) throw new Error(`${type} 삭제 실패`);

          if (type === "comment") {
            setComments((prev) => prev.filter((c) => c.id !== id));
          } else {
            setComments((prev) =>
              prev.map((c) => ({
                ...c,
                replies: c.replies.filter((r) => r.id !== id),
              }))
            );
          }

          setDeleteTarget(null);
        } catch (error) {
          console.error(error);
          openModal({
            title: "삭제 실패",
            message: "삭제 중 오류가 발생했습니다.",
            confirmText: "확인",
          });
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
                {/* ✅ 댓글 */}
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
                        <div className="writer">
                          {c.memberNickname || "익명"}
                        </div>
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
                                if (!isLogin || !currentUser?.id) {
                                  openModal({
                                    title: "로그인이 필요합니다",
                                    message: "신고 기능은 로그인 후 이용 가능합니다.",
                                    confirmText: "확인",
                                  });
                                  return;
                                }
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

                {/* ✅ 댓글의 답글 입력창 */}
                {showReplyTarget?.type === "comment" &&
                  showReplyTarget?.targetId === c.id &&
                  showReplyTarget?.parentId === c.id && (
                    <S.CommentForm $indent>
                      <div className="avatar">
                        <img
                          src={
                            currentUser?.profilePath ||
                            "/postImages/profile.png"
                          }
                          alt="내 프로필"
                        />
                        <span className="nickname">
                          {currentUser?.memberNickname || "익명"}
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

                {/* ✅ 대댓글 */}
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
                            <div className="writer">
                              {r.memberNickname || "익명"}
                            </div>
                            <S.LikeButton
                              $liked={r.liked}
                              onClick={() => handleLike(r.id, true, c.id)}
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

                            {/* ✅ 신고 버튼: 본인 댓글이 아닐 때만 표시 */}
                            {(!isLogin || currentUser?.id !== r.memberId) && (
                              <>
                                <span> | </span>
                                <span
                                  className="report"
                                  onClick={() => {
                                    if (!isLogin || !currentUser?.id) {
                                      openModal({
                                        title: "로그인이 필요합니다",
                                        message: "신고 기능은 로그인 후 이용 가능합니다.",
                                        confirmText: "확인",
                                      });
                                      return;
                                    }
                                    setReportTarget({ type: "reply", id: r.id });
                                    setShowReportModal(true);
                                  }}
                                >
                                  신고
                                </span>
                              </>
                            )}

                            {/* ✅ 삭제 버튼: 본인 댓글일 때만 표시 */}
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

                    {/* ✅ 대댓글의 답글 입력창 */}
                    {showReplyTarget?.type === "reply" &&
                      showReplyTarget?.targetId === r.id &&
                      showReplyTarget?.parentId === c.id && (
                        <S.CommentForm $nested>
                          <div className="avatar">
                            <img
                              src={
                                currentUser?.profilePath ||
                                "/postImages/profile.png"
                              }
                              alt="내 프로필"
                            />
                            <span className="nickname">
                              {currentUser?.memberNickname || "익명"}
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
                            onClick={() =>
                              handleReplySubmit(c.id, r.id)
                            }
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

          {/* ✅ 일반 댓글 입력 */}
          <S.CommentForm>
            <div className="avatar">
              <img
                src={currentUser?.profilePath || "/postImages/profile.png"}
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
