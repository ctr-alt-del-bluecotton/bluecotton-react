import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

const PostWriteContent = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(""); // somId 저장용
  const [categories, setCategories] = useState([]); // 🔹 참여 중 솜 목록
  const [charCount, setCharCount] = useState(0);
  const { openModal } = useModal();
  const navigate = useNavigate();
  const editorRef = useRef();
  const [imageUrls, setImageUrls] = useState([]);

  // ✅ 참여 중 솜 카테고리 목록 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:10000/main/post/categories/2`);
        if (!response.ok) throw new Error("카테고리 조회 실패");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("카테고리 로드 오류:", err);
      }
    };
    fetchCategories();
  }, []);

  // ✅ 임시저장 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("tempPost");
    if (saved) {
      const temp = JSON.parse(saved);
      setTitle(temp.title || "");
      setCategory(temp.category || "");
      if (editorRef.current) {
        editorRef.current.getInstance().setMarkdown(temp.content || "");
      }
    }
  }, []);

  // ✅ 글자수 카운트
  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (!editorInstance) return;

    const handleContentChange = () => {
      const contentText = editorInstance.getMarkdown();
      const length = contentText.trim().length;
      if (length > MAX_LENGTH) {
        const trimmed = contentText.substring(0, MAX_LENGTH);
        editorInstance.setMarkdown(trimmed);
        setCharCount(MAX_LENGTH);
      } else {
        setCharCount(length);
      }
    };

    editorInstance.on("change", handleContentChange);
    return () => editorInstance.off("change", handleContentChange);
  }, []);

  // ✅ 이미지 업로드
  const handleImageUpload = async (blob, callback) => {
    try {
      const formData = new FormData();
      formData.append("image", blob);

      const response = await fetch("http://localhost:10000/upload/post-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("이미지 업로드 실패");

      const imageUrl = await response.text();
      setImageUrls((prev) => [...prev, imageUrl]);
      callback(imageUrl, "업로드된 이미지");
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      const tempUrl = URL.createObjectURL(blob);
      callback(tempUrl, "임시 이미지");
    }
  };

  // ✅ 임시 저장
  const handleTempSave = async () => {
    const content = editorRef.current?.getInstance().getMarkdown().trim() || "";
    const postDraft = {
      postDraftTitle: title,
      postDraftContent: content,
      memberId: 1,
      somId: category ? parseInt(category) : 2,
    };

    try {
      const BASE_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BASE_URL}/main/post/draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postDraft),
      });

      if (!response.ok) throw new Error("임시저장 실패");

      openModal({
        title: "임시 저장 완료",
        message: "작성 중인 글이 임시 저장되었습니다.",
        confirmText: "확인",
        onConfirm: () => navigate("/main/post/all"),
      });
    } catch (err) {
      openModal({
        title: "오류",
        message: "임시 저장 중 문제가 발생했습니다.",
        confirmText: "확인",
      });
    }
  };

  // ✅ 게시글 등록
  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = editorRef.current?.getInstance().getMarkdown().trim() || "";

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
      const postVO = {
        postTitle: title,
        postContent: content,
        memberId: 1,
        somId: parseInt(category),
        imageUrls,
      };

      const BASE_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BASE_URL}/main/post/write`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postVO),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "게시글 등록 실패");
      }

      openModal({
        title: "작성 완료",
        message: "게시글이 성공적으로 등록되었습니다.",
        confirmText: "확인",
        onConfirm: () => navigate("/main/post/all"),
      });
    } catch (err) {
      console.error("게시글 등록 실패:", err);
      openModal({
        title: "등록 실패",
        message: "게시글 등록 중 오류가 발생했습니다.",
        confirmText: "확인",
      });
    }
  };

  // ✅ 취소
  const handleCancel = () => {
    openModal({
      title: "작성 중인 내용이 사라집니다.",
      message: "정말 페이지를 이동하시겠습니까?",
      confirmText: "이동",
      cancelText: "취소",
      onConfirm: () => navigate("/main/post/all"),
    });
  };

  return (
    <S.Container>
      <S.PageTitle>오늘의 솜 작성</S.PageTitle>

      <S.Form onSubmit={handleSubmit}>
        <S.FormRow>
          <label>제목</label>
          <input
            type="text"
            placeholder="오늘의 솜의 제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </S.FormRow>

        <S.FormRow>
          <label>카테고리</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">참여 중인 솜을 선택해주세요</option>
            {categories.map((cat) => (
              <option key={cat.somId} value={cat.somId}>
                {categoryMap[cat.somCategory] || cat.somCategory}
              </option>
            ))}
          </select>
        </S.FormRow>

        {/* ✅ Toast UI Editor + 글자수 */}
        <S.FormGroup>
          <Editor
            ref={editorRef}
            previewStyle="vertical"
            height="400px"
            initialEditType="wysiwyg"
            hideModeSwitch={true}
            placeholder="솜을 하면서 느낀 점이나 기록하고 싶은 순간을 자유롭게 적어주세요"
            useCommandShortcut={true}
            hooks={{
              addImageBlobHook: handleImageUpload,
            }}
          />
          <div className="char-count">
            {charCount}/{MAX_LENGTH}
          </div>
        </S.FormGroup>

        <S.ButtonBox>
          <button type="button" className="cancel" onClick={handleCancel}>
            취소
          </button>
          <button type="button" className="temp-save" onClick={handleTempSave}>
            임시 저장
          </button>
          <button type="submit" className="submit">
            작성 완료
          </button>
        </S.ButtonBox>
      </S.Form>
    </S.Container>
  );
};

export default PostWriteContent;
