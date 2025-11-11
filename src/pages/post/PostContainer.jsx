// 📄 PostContainer.jsx
import React, { useEffect, useState } from "react";
import {
  Outlet,
  useNavigate,
  useLocation,
  useSearchParams,
  matchPath,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../../components/modal/useModal"
import S from "./style";
import PostCategory from "./postcategory/PostCategory";
import PostCard from "./postCard/PostCard";
import PostNumberSelect from "./postNumberSelect/PostNumberSelect";

const PostContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { openModal } = useModal(); // ✅ 모달 훅 사용 선언

  // ✅ Redux 로그인 유저 정보
  const { currentUser, isLogin } = useSelector((state) => state.user);

  // ✅ 작성/읽기 화면에선 목록 API 호출 스킵
  const isWrite = matchPath("/main/post/write", location.pathname);
  const isRead = matchPath("/main/post/read/:id", location.pathname);

  const [posts, setPosts] = useState([]);
  const [orderType, setOrderType] = useState("latest");
  const postsPerPage = 9;

  // ✅ 카테고리 추출
  const category = location.pathname.split("/").pop();
  const keyword = (searchParams.get("q") || "").trim();
  const urlPage = parseInt(searchParams.get("page") || "1", 10);
  const pageNumber = Number.isNaN(urlPage) || urlPage < 1 ? 1 : urlPage;

  const categoryMap = {
    study: "학습",
    health: "건강",
    social: "소셜",
    life: "생활",
    hobby: "취미",
    rookie: "루키",
  };

  // ✅ 검색/정렬/카테고리 변경 시 page=1로 보정
  useEffect(() => {
    if (isWrite || isRead) return;
    const next = new URLSearchParams(searchParams);
    let changed = false;

    if ((searchParams.get("page") || "1") !== "1") {
      next.set("page", "1");
      changed = true;
    }
    if (changed) setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, orderType, keyword]);

  // ✅ 게시글 목록 fetch
  useEffect(() => {
    if (isWrite || isRead) return;

    const fetchPosts = async () => {
      try {
        const baseUrl = process.env.REACT_APP_BACKEND_URL;
        const params = new URLSearchParams();

        params.set("page", String(pageNumber - 1));
        params.set("size", String(postsPerPage));
        params.set("orderType", orderType);
        if (keyword) params.set("q", keyword);
        if (category !== "all")
          params.set("somCategory", category.toUpperCase());

        // ✅ 로그인 상태면 memberId 전달
        if (isLogin && currentUser?.id) {
          params.set("memberId", currentUser.id);
        }

        const endpoint = `${baseUrl}/main/post/all?${params.toString()}`;
        const response = await fetch(endpoint, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = await response.json();

        const mappedPosts = (result.data || []).map((post) => ({
          ...post,
          somCategory:
            categoryMap[post.somCategory?.trim()] ||
            post.somCategory ||
            "기타",
        }));

        setPosts(mappedPosts);
      } catch (err) {
        console.error("게시글 목록 조회 실패:", err);
        openModal({
          title: "오류 발생",
          message: "게시글 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
          confirmText: "확인",
        });
      }
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, orderType, keyword, pageNumber, isLogin, currentUser]);

  // ✅ 페이지네이션 slice
  const startIndex = (pageNumber - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  // ✅ 좋아요 토글 (UI만 변경)
  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.postId === id
          ? {
              ...p,
              postIsLike: p.postIsLike ? 0 : 1,
              postLikeCount: p.postIsLike
                ? p.postLikeCount - 1
                : p.postLikeCount + 1,
            }
          : p
      )
    );
  };

  // ✅ 페이지 이동
  const handleChangePage = (nextPage) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
  };

  // ✅ 글쓰기 버튼 클릭
  const handleWriteClick = () => {
    if (!isLogin || !currentUser?.id) {
      openModal({
        title: "로그인이 필요합니다",
        message: "오늘의 솜을 작성하려면 로그인이 필요합니다.",
        confirmText: "확인",
      });
      return;
    }
    navigate("/main/post/write");
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
            {keyword
              ? `검색 결과가 없습니다: "${keyword}"`
              : "게시글이 없습니다."}
          </p>
        ) : (
          currentPosts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              somTitle={post.somTitle}
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
              onClick={() => navigate(`/main/post/read/${post.id}`)}
            />
          ))
        )}
      </S.Grid>

      {/* === 글쓰기 버튼 === */}
      <S.WriteButtonWrapper>
        <button className="write-btn" onClick={handleWriteClick}>
          오늘의 솜 작성하기
        </button>
      </S.WriteButtonWrapper>

      {/* === 페이지네이션 === */}
      <PostNumberSelect
        postList={posts}
        pageNumber={pageNumber}
        setPageNumber={handleChangePage}
      />

      <Outlet />
    </S.Container>
  );
};

export default PostContainer;
