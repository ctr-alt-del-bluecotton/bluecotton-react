import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import S from "./style";
import { useModal } from "../../components/modal/useModal";

const API = process.env.REACT_APP_BACKEND_URL || "";

const formatDateTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const HH = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  return `${yyyy}.${MM}.${dd} ${HH}:${mm}:${ss}`;
};

const PostManagementContainer = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  const [activeTab, setActiveTab] = useState("posts");
  const [searchTerm, setSearchTerm] = useState("");

  const [postCategoryFilter, setPostCategoryFilter] = useState("all");
  const [postStatusFilter, setPostStatusFilter] = useState("all");
  const [postReportStatusFilter, setPostReportStatusFilter] =
    useState("all");
  const [commentStatusFilter, setCommentStatusFilter] = useState("all");

  const [posts, setPosts] = useState([]);
  const [postReports, setPostReports] = useState([]);
  const [commentReports, setCommentReports] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailPost, setDetailPost] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  const safeJson = async (res) => {
    try {
      return await res.json();
    } catch (e) {
      return null;
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API}/admin/posts/list`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("게시글 조회 실패");
      const body = await safeJson(res);
      const list = (body && body.data) || [];
      const normalized = list.map((p) => ({
        id: p.id,
        title: p.postTitle || p.title || "",
        author: p.memberNickname || p.author || "",
        category: p.category || "기타",
        status: p.status || "active",
        views: p.views || p.viewCount || p.postReadCount || 0,
        likes: p.likes || p.likeCount || p.postLikeCount || 0,
        createDate: p.postCreateAt || p.createDate || p.createdAt || "",
      }));
      setPosts(normalized);
    } catch (e) {
      setError(e.message || "게시글 조회 중 오류");
    }
  };

  const fetchPostReports = async () => {
    try {
      const res = await fetch(`${API}/admin/posts/reported`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("신고된 게시글 조회 실패");
      const body = await safeJson(res);
      const list = (body && body.data) || [];
      const normalized = list.map((r) => ({
        id: r.postId,
        postId: r.postId,
        postTitle: r.postTitle || "",
        writer: r.writerNickname || "",
        reportCount: r.reportCount || 0,
        lastReportAt: r.lastReportAt || "",
        status: r.status || "reported",
      }));
      setPostReports(normalized);
    } catch (e) {
      setError(e.message || "신고된 게시글 조회 중 오류");
    }
  };

  const fetchCommentReports = async () => {
    try {
      const res = await fetch(`${API}/admin/post/comments/reported`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("댓글 신고 조회 실패");
      const body = await safeJson(res);
      const list = (body && body.data) || [];
      const normalized = list.map((r) => ({
        id: r.postCommentReportId ?? r.id ?? r.postCommentId,
        commentId: r.postCommentId,
        postId: r.postId || null,
        postTitle: r.postTitle || "",
        commentContent: r.postCommentContent || r.commentContent || "",
        reportedUser: r.reportedUserNickname || r.commentedNickname || "",
        reporter: r.reporterNickname || r.reporter || "",
        reason: r.postCommentReportContent || r.reason || "",
        reportDate: r.reportDate || r.createdAt || "",
        status: r.status || "pending",
      }));
      setCommentReports(normalized);
    } catch (e) {
      setError(e.message || "댓글 신고 조회 중 오류");
    }
  };

  const fetchAll = async () => {
    setLoading(true);
    setError("");
    try {
      await Promise.all([
        fetchPosts(),
        fetchPostReports(),
        fetchCommentReports(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleOpenDetail = async (id) => {
    setDetailOpen(true);
    setDetailLoading(true);
    setDetailError("");
    setDetailPost(null);

    try {
      const res = await fetch(`${API}/admin/posts/select/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("게시글 상세 조회 실패");
      const body = await safeJson(res);
      const data = body && body.data;
      if (!data) throw new Error("게시글 상세 데이터가 없습니다.");
      setDetailPost({
        id: data.id,
        title: data.postTitle || "",
        content: data.postContent || "",
        author: data.memberNickname || "",
        createDate:
          data.postCreateAt || data.createDate || data.createdAt || "",
        views: data.postReadCount || 0,
      });
    } catch (e) {
      setDetailError(e.message || "게시글 상세 조회 중 오류");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleDelete = (id, type) => {
    openModal({
      title: "삭제 확인",
      message: `${type}을(를) 정말 삭제하시겠습니까?`,
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          let url = "";
          if (type === "게시글") {
            url = `${API}/admin/posts/delete/${id}`;
          } else {
            return;
          }

          const res = await fetch(url, {
            method: "DELETE",
            credentials: "include",
          });
          if (!res.ok) throw new Error("삭제 실패");

          if (type === "게시글") {
            setPosts((prev) => prev.filter((p) => p.id !== id));
            setPostReports((prev) => prev.filter((r) => r.postId !== id));
            setCommentReports((prev) => prev.filter((r) => r.postId !== id));
          }

          openModal({
            title: "완료",
            message: `${type} 삭제가 완료되었습니다.`,
            confirmText: "확인",
          });
        } catch (e) {
          openModal({
            title: "오류",
            message: e.message || `${type} 삭제 중 오류가 발생했습니다.`,
            confirmText: "확인",
          });
        }
      },
    });
  };

  const handleDeleteComment = (reportId, commentId) => {
    openModal({
      title: "삭제 확인",
      message: "댓글을 정말 삭제하시겠습니까?",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          if (!reportId) {
            throw new Error("신고 ID가 유효하지 않습니다.");
          }

          const url = `${API}/admin/post/comments/reported/${reportId}`;

          const res = await fetch(url, {
            method: "DELETE",
            credentials: "include",
          });
          if (!res.ok) throw new Error("댓글 삭제 실패");

          setCommentReports((prev) =>
            prev.filter((r) => r.id !== reportId && r.commentId !== commentId)
          );

          openModal({
            title: "완료",
            message: "댓글 삭제가 완료되었습니다.",
            confirmText: "확인",
          });
        } catch (e) {
          openModal({
            title: "오류",
            message: e.message || "댓글 삭제 중 오류가 발생했습니다.",
            confirmText: "확인",
          });
        }
      },
    });
  };

  const handleReportResolve = async (reportId, type) => {
    try {
      if (type !== "댓글") return;

      const url = `${API}/admin/post/comments/reports/${reportId}/resolve`;

      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("신고 처리 실패");

      setCommentReports((prev) =>
        prev.map((r) =>
          r.id === reportId ? { ...r, status: "resolved" } : r
        )
      );
    } catch (e) {
      openModal({
        title: "오류",
        message: e.message || `${type} 신고 처리 중 오류가 발생했습니다.`,
        confirmText: "확인",
      });
    }
  };

  const handleReportReject = async (reportId, type) => {
    try {
      if (type !== "댓글") return;

      const url = `${API}/admin/post/comments/reports/${reportId}/reject`;

      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("신고 기각 실패");

      setCommentReports((prev) =>
        prev.map((r) =>
          r.id === reportId ? { ...r, status: "resolved" } : r
        )
      );
    } catch (e) {
      openModal({
        title: "오류",
        message: e.message || `${type} 신고 기각 중 오류가 발생했습니다.`,
        confirmText: "확인",
      });
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      postCategoryFilter === "all" || post.category === postCategoryFilter;

    const isReported = postReports.some((r) => r.postId === post.id);
    const computedStatus = isReported ? "reported" : post.status || "active";

    const matchesStatus =
      postStatusFilter === "all" || computedStatus === postStatusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredPostReports = postReports.filter((report) => {
    const matchesSearch =
      (report.postTitle || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (report.writer || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      postReportStatusFilter === "all" ||
      report.status === postReportStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const mergedCommentReplyReports = commentReports
    .map((r) => ({
      ...r,
      targetType: "댓글",
      targetId: r.commentId,
      content: r.commentContent,
    }))
    .sort((a, b) => {
      const da = new Date(a.reportDate);
      const db = new Date(b.reportDate);
      return db - da;
    });

  const filteredCommentReplyReports = mergedCommentReplyReports.filter(
    (report) => {
      const matchesSearch =
        (report.postTitle || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (report.content || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (report.reportedUser || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (report.reporter || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        commentStatusFilter === "all" || report.status === commentStatusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  return (
    <S.ManagerWrapper>
      <S.ManagerContainer>
        <S.Header>
          <S.BackButton onClick={() => navigate("/main/manager")}>
            ← 뒤로가기
          </S.BackButton>
          <S.Title>게시글 관리</S.Title>
          <S.Subtitle>게시글 및 신고 관리</S.Subtitle>
        </S.Header>

        <S.TabContainer>
          <S.TabButton
            $active={activeTab === "posts"}
            onClick={() => setActiveTab("posts")}
          >
            게시글 관리
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "postReports"}
            onClick={() => setActiveTab("postReports")}
          >
            게시물 신고
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "commentReports"}
            onClick={() => setActiveTab("commentReports")}
          >
            댓글/대댓글 신고
          </S.TabButton>
        </S.TabContainer>

        {loading && <S.Subtitle>로딩 중...</S.Subtitle>}
        {error && <S.Subtitle>{error}</S.Subtitle>}

        {activeTab === "posts" && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="제목 또는 작성자로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.FilterSelect
                value={postCategoryFilter}
                onChange={(e) => setPostCategoryFilter(e.target.value)}
              >
                <option value="all">전체 카테고리</option>
                <option value="인증">인증</option>
                <option value="후기">후기</option>
                <option value="질문">질문</option>
                <option value="추천">추천</option>
              </S.FilterSelect>
              <S.FilterSelect
                value={postStatusFilter}
                onChange={(e) => setPostStatusFilter(e.target.value)}
              >
                <option value="all">전체 상태</option>
                <option value="active">활성</option>
                <option value="reported">신고됨</option>
              </S.FilterSelect>
            </S.FilterBar>

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>ID</S.TableHeaderCell>
                  <S.TableHeaderCell>제목</S.TableHeaderCell>
                  <S.TableHeaderCell>작성자</S.TableHeaderCell>
                  <S.TableHeaderCell>카테고리</S.TableHeaderCell>
                  <S.TableHeaderCell>조회수</S.TableHeaderCell>
                  <S.TableHeaderCell>좋아요</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>작성일</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {filteredPosts.map((post) => {
                  const isReported = postReports.some(
                    (r) => r.postId === post.id
                  );
                  const displayStatus = isReported
                    ? "reported"
                    : post.status || "active";

                  return (
                    <S.TableRow key={post.id}>
                      <S.TableCell>{post.id}</S.TableCell>
                      <S.TableCell>{post.title}</S.TableCell>
                      <S.TableCell>{post.author}</S.TableCell>
                      <S.TableCell>{post.category}</S.TableCell>
                      <S.TableCell>{post.views}</S.TableCell>
                      <S.TableCell>{post.likes}</S.TableCell>
                      <S.TableCell>
                        <S.StatusBadge $status={displayStatus}>
                          {displayStatus === "active" ? "활성" : "신고됨"}
                        </S.StatusBadge>
                      </S.TableCell>
                      <S.TableCell>
                        {formatDateTime(post.createDate)}
                      </S.TableCell>
                      <S.TableCell>
                        <S.ButtonGroup>
                          <S.Button
                            onClick={() => handleOpenDetail(post.id)}
                            style={{ padding: "6px 12px", fontSize: "12px" }}
                          >
                            상세
                          </S.Button>
                          <S.SecondaryButton
                            onClick={() => handleDelete(post.id, "게시글")}
                            style={{ padding: "6px 12px", fontSize: "12px" }}
                          >
                            삭제
                          </S.SecondaryButton>
                        </S.ButtonGroup>
                      </S.TableCell>
                    </S.TableRow>
                  );
                })}
              </tbody>
            </S.Table>
          </S.ContentSection>
        )}

        {activeTab === "postReports" && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="게시글 제목, 작성자로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.FilterSelect
                value={postReportStatusFilter}
                onChange={(e) => setPostReportStatusFilter(e.target.value)}
              >
                <option value="all">전체 상태</option>
                <option value="reported">신고됨</option>
              </S.FilterSelect>
            </S.FilterBar>

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>게시글 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>게시글 제목</S.TableHeaderCell>
                  <S.TableHeaderCell>작성자</S.TableHeaderCell>
                  <S.TableHeaderCell>신고 횟수</S.TableHeaderCell>
                  <S.TableHeaderCell>마지막 신고일</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {filteredPostReports.map((report) => (
                  <S.TableRow key={report.postId}>
                    <S.TableCell>{report.postId}</S.TableCell>
                    <S.TableCell>{report.postTitle}</S.TableCell>
                    <S.TableCell>{report.writer}</S.TableCell>
                    <S.TableCell>{report.reportCount}</S.TableCell>
                    <S.TableCell>
                      {formatDateTime(report.lastReportAt)}
                    </S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge $status={report.status}>
                        신고됨
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>
                      <S.ButtonGroup>
                        <S.Button
                          onClick={() => handleOpenDetail(report.postId)}
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          상세
                        </S.Button>
                        <S.SecondaryButton
                          onClick={() => handleDelete(report.postId, "게시글")}
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          삭제
                        </S.SecondaryButton>
                      </S.ButtonGroup>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
          </S.ContentSection>
        )}

        {activeTab === "commentReports" && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="게시글 제목, 내용, 신고자, 피신고자로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.FilterSelect
                value={commentStatusFilter}
                onChange={(e) => setCommentStatusFilter(e.target.value)}
              >
                <option value="all">전체 상태</option>
                <option value="pending">대기중</option>
                <option value="resolved">처리완료</option>
              </S.FilterSelect>
            </S.FilterBar>

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>신고 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>유형</S.TableHeaderCell>
                  <S.TableHeaderCell>댓글 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>게시글 제목</S.TableHeaderCell>
                  <S.TableHeaderCell>내용</S.TableHeaderCell>
                  <S.TableHeaderCell>피신고자</S.TableHeaderCell>
                  <S.TableHeaderCell>신고자</S.TableHeaderCell>
                  <S.TableHeaderCell>신고 사유</S.TableHeaderCell>
                  <S.TableHeaderCell>신고일</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {filteredCommentReplyReports.map((report, index) => (
                  <S.TableRow
                    key={`comment-report-${
                      report.id ?? report.commentId ?? `idx-${index}`
                    }`}
                  >
                    <S.TableCell>{report.id}</S.TableCell>
                    <S.TableCell>{report.targetType}</S.TableCell>
                    <S.TableCell>{report.commentId}</S.TableCell>
                    <S.TableCell>{report.postTitle}</S.TableCell>
                    <S.TableCell
                      style={{
                        maxWidth: "220px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {report.content}
                    </S.TableCell>
                    <S.TableCell>{report.reportedUser}</S.TableCell>
                    <S.TableCell>{report.reporter}</S.TableCell>
                    <S.TableCell>{report.reason}</S.TableCell>
                    <S.TableCell>
                      {formatDateTime(report.reportDate)}
                    </S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge $status={report.status}>
                        {report.status === "pending" ? "대기중" : "처리완료"}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>
                      <S.ButtonGroup>
                        <S.Button
                          onClick={() =>
                            handleReportResolve(report.id, report.targetType)
                          }
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                          disabled={report.status === "resolved"}
                        >
                          처리
                        </S.Button>
                        <S.SecondaryButton
                          onClick={() =>
                            handleDeleteComment(report.id, report.commentId)
                          }
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          삭제
                        </S.SecondaryButton>
                      </S.ButtonGroup>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
          </S.ContentSection>
        )}

        {detailOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                width: "640px",
                maxHeight: "80vh",
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: 700 }}>
                  게시글 상세
                </h3>
                <button
                  onClick={() => setDetailOpen(false)}
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>

              {detailLoading && <p>상세 정보를 불러오는 중입니다...</p>}
              {detailError && <p style={{ color: "red" }}>{detailError}</p>}

              {!detailLoading && !detailError && detailPost && (
                <>
                  <div>
                    <strong>ID:</strong> {detailPost.id}
                  </div>
                  <div>
                    <strong>제목:</strong> {detailPost.title}
                  </div>
                  <div>
                    <strong>작성자:</strong> {detailPost.author}
                  </div>
                  <div>
                    <strong>작성일:</strong>{" "}
                    {formatDateTime(detailPost.createDate)}
                  </div>
                  <div>
                    <strong>조회수:</strong> {detailPost.views}
                  </div>
                  <div style={{ marginTop: "12px" }}>
                    <strong>내용</strong>
                    <div
                      style={{
                        marginTop: "8px",
                        padding: "12px",
                        borderRadius: "8px",
                        backgroundColor: "#f7f7f7",
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.5,
                        fontSize: "14px",
                      }}
                    >
                      {detailPost.content}
                    </div>
                  </div>
                </>
              )}

              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "8px",
                }}
              >
                <button
                  onClick={() => setDetailOpen(false)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                  }}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
      </S.ManagerContainer>
    </S.ManagerWrapper>
  );
};

export default PostManagementContainer;
