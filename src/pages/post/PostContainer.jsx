import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation, useSearchParams, matchPath } from "react-router-dom";
import S from "./style";
import PostCategory from "./postcategory/PostCategory";
import PostCard from "./postCard/PostCard";
import PostNumberSelect from "./postNumberSelect/PostNumberSelect";

const PostContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ 작성/읽기 화면에선 목록 API 호출 스킵(초기 에디터 충돌 예방)
  const isWrite = matchPath("/main/post/write", location.pathname);
  const isRead  = matchPath("/main/post/read/:id", location.pathname);

  // ✅ 게시글 데이터
  const [posts, setPosts] = useState([]);
  const [orderType, setOrderType] = useState("latest");
  const postsPerPage = 9;

  // ✅ 카테고리 추출 (/main/post/:category)
  const category = location.pathname.split("/").pop(); // ex) 'all', 'health', 'study'

  // ✅ URL ←→ 상태: page/q
  const keyword = (searchParams.get("q") || "").trim();
  const urlPage = parseInt(searchParams.get("page") || "1", 10);
  const pageNumber = Number.isNaN(urlPage) || urlPage < 1 ? 1 : urlPage;

  // ✅ 한글 매핑 객체
  const categoryMap = {
    STUDY: "학습",
    HEALTH: "건강",
    SOCIAL: "소셜",
    LIFE: "생활",
    HOBBIES: "취미",
    ROOKIE: "루키",
  };

  // ✅ 검색/정렬/카테고리 바뀌면 page=1로 (URL 동기화)
  useEffect(() => {
    if (isWrite || isRead) return;
    const next = new URLSearchParams(searchParams);
    let changed = false;

    // page=1 보정
    if ((searchParams.get("page") || "1") !== "1") {
      next.set("page", "1");
      changed = true;
    }
    // q 동기화는 헤더 SearchBar가 관리하므로 여기선 안 건드림
    if (changed) setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, orderType, keyword]);

  // ✅ 게시글 데이터 fetch
  useEffect(() => {
    if (isWrite || isRead) return; // 작성/읽기 화면에서는 스킵

    const fetchPosts = async () => {
      try {
        const baseUrl =
          (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_BACKEND_URL) ||
          process.env.REACT_APP_BACKEND_URL ||
          "http://localhost:8080";

        const params = new URLSearchParams();
        params.set("page", String(pageNumber - 1)); // 프론트 1-based → 서버 0-based
        params.set("size", String(postsPerPage));
        params.set("orderType", orderType);
        if (keyword) params.set("q", keyword);
        if (category !== "all") params.set("somCategory", category.toUpperCase());

        const endpoint = `${baseUrl}/main/post/all?${params.toString()}`;
        console.log("📡 요청 URL:", endpoint);

        const response = await fetch(endpoint, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const result = await response.json();
        console.log("📦 API 응답:", result);

        const mappedPosts = (result.data || []).map((post) => ({
          ...post,
          somCategory:
            categoryMap[post.somCategory?.trim()] || post.somCategory || "기타",
        }));

        setPosts(mappedPosts);
      } catch (err) {
        console.error("❌ 게시글 불러오기 실패:", err);
      }
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, orderType, keyword, pageNumber]);

  // ✅ 페이지네이션 slice (서버가 이미 페이지네이션하면 사실상 그대로 사용)
  const startIndex = (pageNumber - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  // ✅ 좋아요 토글 (프론트 임시용)
  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.postId === id
          ? {
              ...p,
              postIsLike: p.postIsLike ? 0 : 1,
              postLikeCount: p.postIsLike ? p.postLikeCount - 1 : p.postLikeCount + 1,
            }
          : p
      )
    );
  };

  // ✅ 페이지 변경 시 URL도 함께 업데이트
  const handleChangePage = (nextPage) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
  };

  return (
    <S.Container>
      {/* === 배너 === */}
      <S.Banner>
        <div className="banner-inner"></div>
      </S.Banner>

      {/* === 카테고리 + 드롭다운 === */}
      <PostCategory orderType={orderType} setOrderType={setOrderType} />

      {/* === 카드형 게시판 === */}
      <S.Grid>
        {currentPosts.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "50px" }}>
            {keyword ? `검색 결과가 없습니다: "${keyword}"` : "게시글이 없습니다."}
          </p>
        ) : (
          currentPosts.map((post) => (
            <PostCard
              key={post.postId}
              id={post.postId}
              category={post.somCategory}
              challengeDay={post.postSomDay}
              title={post.postTitle}
              excerpt={post.postContent}
              avatar={post.memberProfileUrl}
              nickname={post.memberNickname}
              date={post.postCreateAt?.slice(0, 10)}
              comments={post.postCommentCount}
              likes={post.postLikeCount}
              liked={post.postIsLike === 1}
              views={post.postReadCount}
              imageUrl={post.postImageUrl}
              onLike={handleLike}
              onClick={() => navigate(`/main/post/read/${post.postId}`)}
            />
          ))
        )}
      </S.Grid>

      {/* === 글쓰기 버튼 === */}
      <S.WriteButtonWrapper>
        <button className="write-btn" onClick={() => navigate("/main/post/write")}>
          오늘의 솜 작성하기
        </button>
      </S.WriteButtonWrapper>

      {/* === 페이지네이션 === */}
      <PostNumberSelect
        postList={posts}
        pageNumber={pageNumber}
        setPageNumber={handleChangePage} // ← URL까지 동기화
      />

      <Outlet />
    </S.Container>
  );
};

export default PostContainer;
