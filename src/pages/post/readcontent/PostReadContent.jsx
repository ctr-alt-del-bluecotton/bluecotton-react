import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./style";
import Report from "../../../components/Report/Report";
import { useModal } from "../../../components/modal"; // ✅ 전역 모달 훅

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

  // ✅ 공유 버튼 (카카오 API 자리)
  const handleShare = () => {
    openModal({
      title: "공유하기",
      message: "공유 기능은 추후 업데이트될 예정입니다 😊",
      confirmText: "확인",
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

  // 🗑 게시글 삭제
  const handleDelete = () => {
    openModal({
      title: "게시글을 삭제하시겠습니까?",
      message: "삭제된 게시글은 복구할 수 없습니다.",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: () => navigate("/main/post/all"),
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

      {/* ✅ 좋아요 + 공유 (댓글 위쪽으로 이동) */}
      <S.PostSocialBox>
        <S.LikeButton $liked={postLiked} onClick={handlePostLike}>
          <img
            src={
              postLiked
                ? "/assets/icons/favorite_acv.svg"
                : "/assets/icons/favorite_gray.svg"
            }
            alt="좋아요"
          />
          <span>{postLikeCount}</span>
        </S.LikeButton>

        <S.ShareButton onClick={handleShare}>
          <img src="/assets/icons/share_gray.svg" alt="공유하기" />
          <span>공유</span>
        </S.ShareButton>
      </S.PostSocialBox>


      {/* 💬 댓글 섹션 */}
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
                        <div className="content">
                          {renderTextWithTags(c.text)}
                        </div>
                        <div className="meta-row">
                          <span>{c.date}</span>|
                          <span
                            className="report"
                            onClick={() => {
                              setReportTarget({ type: "comment", id: c.id });
                              setShowReportModal(true);
                            }}
                          >
                            신고
                          </span>
                          |
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
                            onClick={() =>
                              handleReplyClick(c.id, c.id, c.name)
                            }
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
                          <img
                            src={r.profile}
                            alt="프로필"
                            className="profile"
                          />
                          <div className="text-box">
                            <div className="writer">{r.name}</div>
                            <div className="content">
                              {renderTextWithTags(r.text)}
                            </div>
                            <div className="meta-row">
                              <span>{r.date}</span>|
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
                              |
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
                            onClick={() =>
                              handleLike(r.id, true, c.id)
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
                            <span>{r.likes}</span>
                          </S.LikeButton>
                        </div>
                      </S.CommentItem>

                      {/* ✅ 대댓글 아래 또 답글 입력 */}
                      {showReplyTarget?.targetId === r.id && (
                        <S.CommentForm $indent $nested>
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
      </S.CommentSection>

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

      <S.Divider />
      <S.NavSection>
        <S.NavButton onClick={goList}>목록</S.NavButton>
      </S.NavSection>
    </S.Container>
  );
};

export default PostReadContent;
