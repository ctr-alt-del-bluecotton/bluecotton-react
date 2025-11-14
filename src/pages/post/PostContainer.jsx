import React, { useEffect, useState } from "react";
import {
  Outlet,
  useNavigate,
  useLocation,
  useSearchParams,
  matchPath,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../../components/modal/useModal";
import S from "./style";
import PostCategory from "./postcategory/PostCategory";
import PostCard from "./postCard/PostCard";
import PostNumberSelect from "./postNumberSelect/PostNumberSelect";

const PostContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { openModal } = useModal();
  const [totalCount, setTotalCount] = useState(0);

  const { currentUser, isLogin } = useSelector((state) => state.user);

  const isWrite = matchPath("/main/post/write", location.pathname);
  const isRead = matchPath("/main/post/read/:id", location.pathname);

  const [posts, setPosts] = useState([]);
  const [orderType, setOrderType] = useState("latest");
  const postsPerPage = 9;

  // 로그인 필요 모달
  const requireLoginModal = () => {
    openModal({
      title: "로그인이 필요합니다",
      message: "이 기능은 로그인 후 이용하실 수 있습니다.",
      confirmText: "로그인하기",
      cancelText: "취소",
      onConfirm: () => navigate("/login"),
    });
  };

  // category, keyword, page
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

  // 검색/정렬 변경 시 page=1로 보정
  useEffect(() => {
    if (isWrite || isRead) return;

    const next = new URLSearchParams(searchParams);
    let changed = false;

    if ((searchParams.get("page") || "1") !== "1") {
      next.set("page", "1");
      changed = true;
    }

    if (changed) setSearchParams(next, { replace: true });

    // eslint-disable-next-line
  }, [category, orderType, keyword]);

  // 게시글 목록 fetch
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

        // 로그인 시 memberId 포함
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

        const mappedPosts = (result.data.posts || []).map((post) => ({
          ...post,
          somCategory:
            categoryMap[post.somCategory?.trim()] ||
            post.somCategory ||
            "기타",
        }));

        setPosts(mappedPosts);
        setTotalCount(result.data.totalCount);

      } catch (err) {
        console.error("게시글 목록 조회 실패:", err);
        openModal({
          title: "오류 발생",
          message: "게시글 목록을 불러오지 못했습니다.",
          confirmText: "확인",
        });
      }
    };

    fetchPosts();

    // eslint-disable-next-line
  }, [category, orderType, keyword, pageNumber, isLogin, currentUser]);

  // 좋아요 토글 UI 반영
  const handleLike = (id) => {
    if (!isLogin || !currentUser?.id) {
      requireLoginModal();
      return;
    }

    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
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

  const handleChangePage = (nextPage) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
  };

  const handleWriteClick = () => {
    if (!isLogin || !currentUser?.id) {
      requireLoginModal();
      return;
    }
    navigate("/main/post/write");
  };

  return (
    <S.Container>
      <S.Banner>
        <div className="banner-inner"></div>
      </S.Banner>

      <PostCategory orderType={orderType} setOrderType={setOrderType} />

      <S.Grid>
        {posts.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "50px" }}>
            {keyword
              ? `검색 결과가 없습니다: "${keyword}"`
              : "게시글이 없습니다."}
          </p>
        ) : (
          posts.map((post) => (
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

      <S.WriteButtonWrapper>
        <button className="write-btn" onClick={handleWriteClick}>
          오늘의 솜 작성하기
        </button>
      </S.WriteButtonWrapper>

      <PostNumberSelect
        totalPages={Math.ceil(totalCount / postsPerPage)}
        pageNumber={pageNumber}
        setPageNumber={handleChangePage}
      />

      <Outlet />
    </S.Container>
  );
};

export default PostContainer;
