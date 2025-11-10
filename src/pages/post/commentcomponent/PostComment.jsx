// 📄 PostComment.jsx
import React from "react";
import S from "./style";
import Report from "../../../components/Report/Report";
import { useModal } from "../../../components/modal";

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
  const BASE_URL =
    process.env.REACT_APP_BACKEND_URL;
  const { openModal } = useModal();

  /* ✅ 좋아요 토글 */
  const handleLike = async (targetId, isReply = false, parentCommentId = null) => {
    const endpoint = isReply
      ? `${BASE_URL}/main/post/reply/like/toggle`
      : `${BASE_URL}/main/post/comment/like/toggle`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: 1,
          ...(isReply ? { replyId: targetId } : { commentId: targetId }),
        }),
      });

      if (!res.ok) throw new Error("좋아요 요청 실패");

      setComments((prev) =>
        prev.map((c) => {
          if (!isReply && c.commentId === targetId) {
            const liked = !c.liked;
            return {
              ...c,
              liked,
              commentLikeCount: c.commentLikeCount + (liked ? 1 : -1),
            };
          }
          if (isReply && c.replies) {
            const updatedReplies = c.replies.map((r) =>
              r.replyId === targetId
                ? {
                    ...r,
                    liked: !r.liked,
                    replyLikeCount: r.replyLikeCount + (!r.liked ? 1 : -1),
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
    if (!comment.trim()) return;

    try {
      const res = await fetch(`${BASE_URL}/main/post/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postCommentContent: comment,
          postId: postId,
          memberId: 1,
        }),
      });

      if (!res.ok) throw new Error("댓글 등록 실패");
      const result = await res.json();

      setComments((prev) => [
        ...prev,
        {
          commentId: result.data?.commentId || Date.now(),
          commentContent: comment,
          commentCreateAt: new Date().toISOString(),
          memberNickname: "지존준서",
          memberProfileUrl: "/images/default_profile.png",
          commentLikeCount: 0,
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

    try {
      const res = await fetch(`${BASE_URL}/main/post/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postReplyContent: text,
          postCommentId: parentId,
          memberId: 1,
        }),
      });

      if (!res.ok) throw new Error("답글 등록 실패");
      const result = await res.json();

      setComments((prev) =>
        prev.map((c) =>
          c.commentId === parentId
            ? {
                ...c,
                replies: [
                  ...(c.replies || []),
                  {
                    replyId: result.data?.replyId || Date.now(),
                    replyContent: text,
                    replyCreateAt: new Date().toISOString(),
                    memberNickname: "지존준서",
                    memberProfileUrl: "/images/default_profile.png",
                    replyLikeCount: 0,
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

  /* ✅ 답글 클릭 (type 추가로 중복 버그 완전 해결) */
  const handleReplyClick = (parentId, targetId, nickname, type) => {
    setShowReplyTarget((prev) => {
      if (
        prev &&
        prev.parentId === parentId &&
        prev.targetId === targetId &&
        prev.type === type
      ) {
        return null; // 동일 버튼 다시 클릭 시 닫기
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

    openModal({
      title: type === "comment" ? "댓글 삭제" : "답글 삭제",
      message: "정말 삭제하시겠습니까?",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          const endpoint =
            type === "comment"
              ? `${BASE_URL}/main/post/comment/${id}`
              : `${BASE_URL}/main/post/reply/${id}`;
          const res = await fetch(endpoint, { method: "DELETE" });
          if (!res.ok) throw new Error(`${type} 삭제 실패`);

          if (type === "comment") {
            setComments((prev) => prev.filter((c) => c.commentId !== id));
          } else {
            setComments((prev) =>
              prev.map((c) => ({
                ...c,
                replies: c.replies.filter((r) => r.replyId !== id),
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
              <React.Fragment key={c.commentId}>
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
                          onClick={() => handleLike(c.commentId, false)}
                        >
                          <img
                            src={
                              c.liked
                                ? "/assets/icons/favorite_acv.svg"
                                : "/assets/icons/favorite_gray.svg"
                            }
                            alt="좋아요"
                          />
                          {c.commentLikeCount}
                        </S.LikeButton>
                      </div>

                      <div className="content">
                        {renderTextWithTags(c.commentContent)}
                      </div>

                      <div className="meta-row">
                        <span>{formatDate(c.commentCreateAt)}</span> |{" "}
                        <span
                          className="report"
                          onClick={() => {
                            setReportTarget({
                              type: "comment",
                              id: c.commentId,
                            });
                            setShowReportModal(true);
                          }}
                        >
                          신고
                        </span>{" "}
                        |{" "}
                        <span
                          className="delete"
                          onClick={() => {
                            setDeleteTarget({
                              type: "comment",
                              id: c.commentId,
                            });
                            handleCommentDelete();
                          }}
                        >
                          삭제
                        </span>
                      </div>

                      <div className="reply-row">
                        <button
                          className="reply"
                          onClick={() =>
                            handleReplyClick(
                              c.commentId,
                              c.commentId,
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
                  showReplyTarget?.targetId === c.commentId &&
                  showReplyTarget?.parentId === c.commentId && (
                    <S.CommentForm $indent>
                      <div className="avatar">
                        <img src="/postImages/profile.png" alt="내 프로필" />
                        <span className="nickname">지존준서</span>
                      </div>
                      <div className="input-wrap">
                        <textarea
                          placeholder="답글을 입력하세요"
                          maxLength={300}
                          value={replyInputs[c.commentId] || ""}
                          onChange={(e) =>
                            setReplyInputs((prev) => ({
                              ...prev,
                              [c.commentId]: e.target.value,
                            }))
                          }
                        />
                        <span className="count">
                          {(replyInputs[c.commentId]?.length || 0)}/300
                        </span>
                      </div>
                      <button
                        className="submit-btn"
                        onClick={() =>
                          handleReplySubmit(c.commentId, c.commentId)
                        }
                      >
                        등록
                      </button>
                    </S.CommentForm>
                  )}

                {/* ✅ 대댓글 */}
                {c.replies?.map((r) => (
                  <React.Fragment key={r.replyId}>
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
                              onClick={() =>
                                handleLike(r.replyId, true, c.commentId)
                              }
                            >
                              <img
                                src={
                                  r.liked
                                    ? "/assets/icons/favorite_acv.svg"
                                    : "/assets/icons/favorite_gray.svg"
                                }
                                alt="좋아요"
                              />
                              {r.replyLikeCount}
                            </S.LikeButton>
                          </div>

                          <div className="content">
                            {renderTextWithTags(r.replyContent)}
                          </div>

                          <div className="meta-row">
                            <span>{formatDate(r.replyCreateAt)}</span> |{" "}
                            <span
                              className="report"
                              onClick={() => {
                                setReportTarget({
                                  type: "reply",
                                  id: r.replyId,
                                });
                                setShowReportModal(true);
                              }}
                            >
                              신고
                            </span>{" "}
                            |{" "}
                            <span
                              className="delete"
                              onClick={() => {
                                setDeleteTarget({
                                  type: "reply",
                                  id: r.replyId,
                                });
                                handleCommentDelete();
                              }}
                            >
                              삭제
                            </span>
                          </div>

                          <div className="reply-row">
                            <button
                              className="reply"
                              onClick={() =>
                                handleReplyClick(
                                  c.commentId,
                                  r.replyId,
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
                      showReplyTarget?.targetId === r.replyId &&
                      showReplyTarget?.parentId === c.commentId && (
                        <S.CommentForm $nested>
                          <div className="avatar">
                            <img
                              src="/postImages/profile.png"
                              alt="내 프로필"
                            />
                            <span className="nickname">지존준서</span>
                          </div>
                          <div className="input-wrap">
                            <textarea
                              placeholder="답글을 입력하세요"
                              maxLength={300}
                              value={replyInputs[r.replyId] || ""}
                              onChange={(e) =>
                                setReplyInputs((prev) => ({
                                  ...prev,
                                  [r.replyId]: e.target.value,
                                }))
                              }
                            />
                            <span className="count">
                              {(replyInputs[r.replyId]?.length || 0)}/300
                            </span>
                          </div>
                          <button
                            className="submit-btn"
                            onClick={() =>
                              handleReplySubmit(c.commentId, r.replyId)
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
              <img src="/postImages/profile.png" alt="내 프로필" />
              <span className="nickname">지존준서</span>
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
