import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import S from "./style";
import { useModal } from "../../../components/modal";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const MAX_LENGTH = 1000;

// ✅ 영어 → 한글 매핑 테이블
const categoryMap = {
  STUDY: "학습",
  HEALTH: "건강",
  SOCIAL: "소셜",
  HOBBY: "취미",
  LIFE: "생활",
  ROOKIE: "루키",
};

const PostModifyContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const editorRef = useRef();

  // ✅ Redux 로그인 정보
  const { currentUser, isLogin } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [joinedCategories, setJoinedCategories] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ 비로그인 접근 방지
  useEffect(() => {
    if (!isLogin || !currentUser?.id) {
      openModal({
        title: "로그인이 필요한 기능입니다",
        message: "게시글 수정은 로그인 후 이용 가능합니다.",
        confirmText: "확인",
        onConfirm: () => navigate("/main/post/all"),
      });
    }
  }, [isLogin, currentUser, navigate, openModal]);

  // ✅ 기존 게시글 불러오기 (read API 사용)
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_BACKEND_URL;
        const res = await fetch(`${BASE_URL}/main/post/read/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const result = await res.json();
        const post = result.data;

        if (!post) {
          openModal({
            title: "존재하지 않는 게시글입니다.",
            confirmText: "확인",
            onConfirm: () => navigate("/main/post/all"),
          });
          return;
        }

        setTitle(post.postTitle || "");
        setCategory(post.somCategory || post.postCategory || "");

        // ✅ 에디터 내용 세팅
        setTimeout(() => {
          if (editorRef.current) {
            const editorInstance = editorRef.current.getInstance();
            editorInstance.setHTML(post.postContent || "");
            setCharCount(editorInstance.getMarkdown().trim().length);
          }
        }, 150);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
        openModal({
          title: "게시글 불러오기 실패",
          message: "게시글을 불러오는 중 문제가 발생했습니다.",
          confirmText: "확인",
          onConfirm: () => navigate("/main/post/all"),
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPostData();
  }, [id, navigate, openModal]);

  // ✅ 참여 중 솜 카테고리 목록 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!isLogin || !currentUser?.id) return;

        const BASE_URL = process.env.REACT_APP_BACKEND_URL;
        const res = await fetch(
          `${BASE_URL}/main/post/categories/${currentUser.id}`
        );

        if (!res.ok) throw new Error("카테고리 불러오기 실패");
        const result = await res.json();

        setJoinedCategories(result);
      } catch (err) {
        console.error("카테고리 목록 불러오기 실패:", err);
      }
    };

    fetchCategories();
  }, [isLogin, currentUser]);

  // ✅ 글자수 카운트
  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (!editorInstance) return;

    const handleChange = () => {
      const text = editorInstance.getMarkdown();
      const len = text.trim().length;
      if (len > MAX_LENGTH) {
        editorInstance.setMarkdown(text.substring(0, MAX_LENGTH));
        setCharCount(MAX_LENGTH);
      } else {
        setCharCount(len);
      }
    };

    editorInstance.on("change", handleChange);
    return () => editorInstance.off("change", handleChange);
  }, []);

  // ✅ 게시글 수정 요청
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin || !currentUser?.id) {
      openModal({
        title: "로그인이 필요한 기능입니다",
        message: "게시글 수정은 로그인 후 이용 가능합니다.",
        confirmText: "확인",
        onConfirm: () => navigate("/main/post/all"),
      });
      return;
    }

    const content = editorRef.current?.getInstance().getHTML() || "";

    if (!title.trim()) {
      openModal({ title: "제목을 입력해주세요.", confirmText: "확인" });
      return;
    }
    if (!category.trim()) {
      openModal({ title: "카테고리를 선택해주세요.", confirmText: "확인" });
      return;
    }
    if (!content.trim()) {
      openModal({ title: "내용을 입력해주세요.", confirmText: "확인" });
      return;
    }

    try {
      const BASE_URL = process.env.REACT_APP_BACKEND_URL;

      // ✅ 수정 요청 API — 실제 백엔드 매핑에 맞게
      const res = await fetch(`${BASE_URL}/private/post/modify/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postTitle: title,
          somCategory: category,
          postContent: content,
          memberId: currentUser.id,
        }),
      });

      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      const result = await res.json();

      openModal({
        title: "수정 완료",
        message: result.message || "게시글이 성공적으로 수정되었습니다.",
        confirmText: "확인",
        onConfirm: () => navigate(`/main/post/read/${id}`),
      });
    } catch (err) {
      console.error("게시글 수정 실패:", err);
      openModal({
        title: "수정 실패",
        message: "게시글 수정 중 문제가 발생했습니다.",
        confirmText: "확인",
      });
    }
  };

  // ✅ 취소
  const handleCancel = () => {
    openModal({
      title: "수정 중인 내용이 사라집니다.",
      message: "정말 취소하시겠습니까?",
      confirmText: "이동",
      cancelText: "취소",
      onConfirm: () => navigate("/main/post/all"),
    });
  };

  if (loading) return <S.Container>로딩 중...</S.Container>;

  return (
    <S.Container>
      <S.PageTitle>오늘의 솜 수정</S.PageTitle>

      <S.Form onSubmit={handleSubmit}>
        <S.FormRow>
          <label>제목</label>
          <input
            type="text"
            placeholder="게시글 제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </S.FormRow>

        <S.FormRow>
          <label>카테고리</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">카테고리를 선택해주세요</option>
            {joinedCategories.map((cat) => (
              <option key={cat.somId} value={cat.somCategory}>
                {categoryMap[cat.somCategory?.toUpperCase()] ||
                  cat.somTitle ||
                  cat.somCategory}
              </option>
            ))}
          </select>
        </S.FormRow>

        <S.FormGroup>
          <Editor
            ref={editorRef}
            previewStyle="vertical"
            height="400px"
            initialEditType="wysiwyg"
            hideModeSwitch={true}
            placeholder="수정할 내용을 자유롭게 입력해주세요"
            useCommandShortcut={true}
          />
          <div className="char-count">
            {charCount}/{MAX_LENGTH}
          </div>
        </S.FormGroup>

        <S.ButtonBox>
          <button type="button" className="cancel" onClick={handleCancel}>
            취소
          </button>
          <button type="submit" className="submit">
            수정 완료
          </button>
        </S.ButtonBox>
      </S.Form>
    </S.Container>
  );
};

export default PostModifyContent;
