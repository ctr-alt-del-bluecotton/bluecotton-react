import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [joinedCategories, setJoinedCategories] = useState([]); // ✅ 참여 중인 솜 카테고리 목록
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const memberId = 1; // ✅ 로그인 전 임시값

  // ✅ 기존 게시글 데이터 불러오기
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const BASE_URL =
          process.env.REACT_APP_BACKEND_URL || "http://localhost:10000";
        const res = await fetch(`${BASE_URL}/main/post/modify/${id}`);

        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const result = await res.json();
        const post = result.data;
        console.log("불러온 데이터:", post);

        if (!post) {
          openModal({
            title: "존재하지 않는 게시글입니다.",
            confirmText: "확인",
            onConfirm: () => navigate("/main/post/all"),
          });
          return;
        }

        setTitle(post.postTitle);
        setCategory(post.somCategory || post.postCategory || "");

        // ✅ 에디터 내용 설정
        setTimeout(() => {
          if (editorRef.current) {
            const editorInstance = editorRef.current.getInstance();
            editorInstance.setHTML(post.postContent || "");
            setCharCount(editorInstance.getMarkdown().trim().length);
          }
        }, 100);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
        openModal({
          title: "게시글을 불러오는 중 오류가 발생했습니다.",
          confirmText: "확인",
          onConfirm: () => navigate("/main/post/all"),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id, navigate, openModal]);

  // ✅ 회원이 참여 중인 솜 카테고리 목록 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const BASE_URL =
          process.env.REACT_APP_BACKEND_URL || "http://localhost:10000";
        const res = await fetch(`${BASE_URL}/main/post/categories/${memberId}`);
        if (!res.ok) throw new Error("카테고리 불러오기 실패");

        const result = await res.json();
        console.log("참여 중인 카테고리:", result);
        setJoinedCategories(result); // [{ somCategory: "STUDY", somTitle: "스터디 챌린지" }]
      } catch (err) {
        console.error("카테고리 목록 불러오기 실패:", err);
      }
    };

    fetchCategories();
  }, [memberId]);

  // ✅ 글자수 카운트 + 제한
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

  // ✅ 수정 완료
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const BASE_URL =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:10000";
      const res = await fetch(`${BASE_URL}/main/post/modify/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postTitle: title,
          postCategory: category,
          postContent: content,
        }),
      });

      if (!res.ok) throw new Error("수정 실패");
      const result = await res.json();

      openModal({
        title: "수정 완료",
        message: result.message || "게시글이 성공적으로 수정되었습니다.",
        confirmText: "확인",
        onConfirm: () => navigate(`/main/post/read/${id}`),
      });
    } catch (err) {
      openModal({
        title: "수정 실패",
        message: "게시글 수정 중 오류가 발생했습니다.",
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

            {/* ✅ 참여 중인 솜 카테고리만 표시 (영→한 변환 적용) */}
            {joinedCategories.map((cat) => (
              <option key={cat.somCategory} value={cat.somCategory}>
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
