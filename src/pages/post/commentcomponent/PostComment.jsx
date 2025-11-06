import React from "react";
import S from "./style";
import Report from "../../../components/Report/Report";

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
  handleCommentDelete,
  handleReplyClick,
  handleReplySubmit,
  handleLike,
  handleCommentSubmit,
  renderTextWithTags,
  showReportModal,
  setShowReportModal,
  reportTarget,
  setReportTarget,
}) => {
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
                    <img src={c.profile} alt="프로필" className="profile" />
                    <div className="text-box">
                      <div className="writer">{c.name}</div>
                      <div className="content">{renderTextWithTags(c.text)}</div>
                      <div className="meta-row">
                        <span>{c.date}</span>|{" "}
                        <span
                          className="report"
                          onClick={() => {
                            setReportTarget({ type: "comment", id: c.id });
                            setShowReportModal(true);
                          }}
                        >
                          신고
                        </span>
                        |{" "}
                        <span
                          className="delete"
                          onClick={() => {
                            setDeleteTarget({ type: "comment", id: c.id });
                            handleCommentDelete();
                          }}
                        >
                          삭제
                        </span>
                      </div>
                      <div className="reply-row">
                        <button
                          className="reply"
                          onClick={() => handleReplyClick(c.id, c.id, c.name)}
                        >
                          답글
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <S.LikeButton
                      $liked={c.liked}
                      onClick={() => handleLike(c.id)}
                    >
                      <img
                        src={
                          c.liked
                            ? "/assets/icons/favorite_acv.svg"
                            : "/assets/icons/favorite_gray.svg"
                        }
                        alt="좋아요"
                      />
                      <span>{c.likes}</span>
                    </S.LikeButton>
                  </div>
                </S.CommentItem>

                {/* ✅ 대댓글 입력창 */}
                {showReplyTarget?.targetId === c.id && (
                  <S.CommentForm $indent>
                    <div className="avatar">
                      <img src="/postImages/profile.png" alt="내 프로필" />
                      <span className="nickname">지존준서</span>
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
                {c.replies.map((r) => (
                  <React.Fragment key={r.id}>
                    <S.CommentItem indent>
                      <div className="left">
                        <img src={r.profile} alt="프로필" className="profile" />
                        <div className="text-box">
                          <div className="writer">{r.name}</div>
                          <div className="content">
                            {renderTextWithTags(r.text)}
                          </div>
                          <div className="meta-row">
                            <span>{r.date}</span>|{" "}
                            <span
                              className="report"
                              onClick={() => {
                                setReportTarget({
                                  type: "reply",
                                  id: r.id,
                                });
                                setShowReportModal(true);
                              }}
                            >
                              신고
                            </span>
                            |{" "}
                            <span
                              className="delete"
                              onClick={() => {
                                setDeleteTarget({
                                  type: "reply",
                                  id: r.id,
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
                                handleReplyClick(c.id, r.id, r.name)
                              }
                            >
                              답글
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="right">
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
                          <span>{r.likes}</span>
                        </S.LikeButton>
                      </div>
                    </S.CommentItem>

                    {/* ✅ 대댓글 밑 답글 입력 */}
                    {showReplyTarget?.targetId === r.id && (
                      <S.CommentForm $indent $nested>
                        <div className="avatar">
                          <img src="/postImages/profile.png" alt="내 프로필" />
                          <span className="nickname">지존준서</span>
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

          {/* 일반 댓글 입력 */}
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

      {/* ✅ 신고 모달 */}
      {showReportModal && (
        <Report
          target={reportTarget}
          onClose={() => setShowReportModal(false)}
          onSubmit={(reason) => {
            console.log("신고 완료:", {
              target: reportTarget?.type,
              id: reportTarget?.id,
              reason,
            });
            setShowReportModal(false);
          }}
        />
      )}
    </S.CommentSection>
  );
};

export default PostComment;
