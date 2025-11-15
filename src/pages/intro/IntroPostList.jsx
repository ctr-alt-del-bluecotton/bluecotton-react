import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PostCard from "../post/postCard/PostCard";

const IntroPostList = () => {
  const navigate = useNavigate();
  const { currentUser, isLogin } = useSelector((state) => state.user);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryMap = {
    study: "학습",
    health: "건강",
    social: "소셜",
    life: "생활",
    hobby: "취미",
    rookie: "루키",
  };

  useEffect(() => {
    const fetchPreviewPosts = async () => {
      try {
        const baseUrl = process.env.REACT_APP_BACKEND_URL;
        const params = new URLSearchParams();

        
        params.set("page", "0");
        params.set("size", "3");
        params.set("orderType", "latest");

        
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
      } catch (e) {
        console.error("인트로 게시글 프리뷰 조회 실패:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviewPosts();
  }, [isLogin, currentUser]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>게시글 불러오는 중...</p>;
  }

  if (posts.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "24px 0" }}>
        <p>아직 작성된 게시글이 없어요.</p>
        <button
          style={{
            marginTop: "12px",
            padding: "8px 16px",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => navigate("/main/post/write")}
        >
          첫 오늘의 솜 작성하러 가기
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxHeight: "900px",
        overflow: "hidden",
        padding: "0 8px 8px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
          gap: "16px",
        }}
      >
        {posts.map((post) => (
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
            onClick={() => navigate(`/main/post/read/${post.id}`)}
          />
        ))}
      </div>

      <div style={{ textAlign: "right", marginTop: "12px", paddingRight: "8px" }}>
        <button
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "14px",
          }}
          onClick={() => navigate("/main/post/all")}
        >
          전체 게시글 보러가기 →
        </button>
      </div>
    </div>
  );
};

export default IntroPostList;
