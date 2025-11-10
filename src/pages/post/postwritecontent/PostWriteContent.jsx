import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import S from "./style";
import { useModal } from "../../../components/modal";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const MAX_LENGTH = 1000;

const categoryMap = {
  study: "학습",
  health: "건강",
  social: "소셜",
  hobby: "취미",
  life: "생활",
  rookie: "루키",
};

const PostWriteContent = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const { openModal } = useModal();
  const navigate = useNavigate();
  const editorRef = useRef();
  const [imageUrls, setImageUrls] = useState([]);

  const location = useLocation();
  const draftId = new URLSearchParams(location.search).get("draftId");
  const mode = draftId ? "draft" : "new"; // 🧩 draft 모드 구분

  // ✅ 참여 중 솜 카테고리 목록 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`http://localhost:10000/main/post/categories/1`);
        if (!res.ok) throw new Error("카테고리 조회 실패");
        const data = await res.json();
        setCategories(data);

        // 🟢 draftId 있을 때 — 카테고리 리스트 먼저 불러오고 나중에 선택 반영되도록
        if (draftId) {
          fetchDraft(data);
        }
      } catch (err) {
        console.error("카테고리 로드 오류:", err);
      }
    };

    const fetchDraft = async (categoryList) => {
      try {
        const res = await fetch(`http://localhost:10000/main/post/draft/${draftId}`);
        if (!res.ok) throw new Error("임시저장 글 불러오기 실패");
        const result = await res.json();

        if (result.data) {
          const titleValue = result.data.postDraftTitle ?? "";
          const contentValue = result.data.postDraftContent ?? "";
          const somIdValue = result.data.somId ? result.data.somId.toString() : "";

          setTitle(titleValue);
          setCategory(somIdValue);

          // ✅ 카테고리 옵션 중 draft에서 저장된 somId에 해당하는 항목 선택 유지
          const matchedCategory = categoryList.find(
            (cat) => String(cat.somId) === somIdValue
          );
          if (matchedCategory) setCategory(matchedCategory.somId.toString());

          if (editorRef.current) {
            editorRef.current.getInstance().setMarkdown(contentValue);
          }
        }
      } catch (error) {
        console.error("임시저장 로드 오류:", error);
        openModal({
          title: "불러오기 실패",
          message: "임시저장된 글을 불러오지 못했습니다.",
          confirmText: "확인",
          onConfirm: () => navigate("/main/post/all"),
        });
      }
    };

    fetchCategories();
  }, [draftId, navigate, openModal]);

  // ✅ 글자 수 카운트
  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (!editorInstance) return;

    const handleChange = () => {
      const text = editorInstance.getMarkdown();
      const length = text.trim().length;
      if (length > MAX_LENGTH) {
        editorInstance.setMarkdown(text.substring(0, MAX_LENGTH));
        setCharCount(MAX_LENGTH);
      } else setCharCount(length);
    };

    editorInstance.on("change", handleChange);
    return () => editorInstance.off("change", handleChange);
  }, []);

  // ✅ 이미지 업로드
  const handleImageUpload = async (blob, callback) => {
    try {
      const formData = new FormData();
      formData.append("image", blob);

      const res = await fetch("http://localhost:10000/upload/post-image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("이미지 업로드 실패");

      const imageUrl = await res.text();
      setImageUrls((prev) => [...prev, imageUrl]);
      callback(imageUrl, "업로드된 이미지");
    } catch (err) {
      console.error("이미지 업로드 실패:", err);
      callback(URL.createObjectURL(blob), "임시 이미지");
    }
  };

  // ✅ 임시저장 (새글 모드에서는 null 허용)
  const handleTempSave = async (e) => {
    e.preventDefault();

    const content = editorRef.current?.getInstance().getMarkdown().trim() || "";

    const draft = {
      postDraftTitle: title || null,
      postDraftContent: content || null,
      memberId: 1,
      somId: category ? parseInt(category) : null,
    };

    try {
      const res = await fetch(`http://localhost:10000/main/post/draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!res.ok) throw new Error("임시저장 실패");

      openModal({
        title: "임시 저장 완료",
        message: "작성 중인 글이 임시 저장되었습니다.",
        confirmText: "확인",
        onConfirm: () => navigate("/main/post/all"),
      });
    } catch (err) {
      console.error(err);
      openModal({
        title: "오류",
        message: "임시 저장 중 문제가 발생했습니다.",
        confirmText: "확인",
      });
    }
  };

  // ✅ 등록 (임시저장 글에서만 유효성 검사)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = editorRef.current?.getInstance().getMarkdown().trim() || "";

    // draft 모드일 때만 검사
    if (mode === "draft") {
      if (!title.trim()) {
        return openModal({
          title: "제목을 입력해주세요",
          message: "등록하려면 제목이 필요합니다.",
          confirmText: "확인",
        });
      }
      if (!category.trim()) {
        return openModal({
          title: "카테고리를 선택해주세요",
          message: "등록하려면 솜 카테고리를 선택해야 합니다.",
          confirmText: "확인",
        });
      }
      if (!content.trim()) {
        return openModal({
          title: "내용을 입력해주세요",
          message: "등록하려면 본문 내용을 작성해야 합니다.",
          confirmText: "확인",
        });
      }
    }

    try {
      const post = {
        postTitle: title || null,
        postContent: content || null,
        memberId: 1,
        somId: category ? parseInt(category) : null,
        imageUrls,
      };

      const res = await fetch(`http://localhost:10000/main/post/write`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      if (!res.ok) throw new Error("게시글 등록 실패");

      const result = await res.json();
      const newPostId = result.data?.postId || result.data?.id;

      if (mode === "draft") {
        await fetch(`http://localhost:10000/main/post/draft/delete?id=${draftId}`, {
          method: "DELETE",
        });
      }

      openModal({
        title: "등록 완료",
        message: mode === "draft" ? "임시저장 글이 등록되었습니다." : "게시글이 등록되었습니다.",
        confirmText: "확인",
        onConfirm: () => navigate(`/main/post/read/${newPostId}`),
      });
    } catch (err) {
      console.error("게시글 등록 실패:", err);
      openModal({
        title: "오류",
        message: "등록 중 문제가 발생했습니다.",
        confirmText: "확인",
      });
    }
  };

  // ✅ 취소 버튼
  const handleCancel = () => {
    openModal({
      title: "작성 중인 내용이 사라집니다.",
      message: "정말 이동하시겠습니까?",
      confirmText: "이동",
      cancelText: "취소",
      onConfirm: () => navigate("/main/post/all"),
    });
  };

  return (
    <S.Container>
      <S.PageTitle>{mode === "draft" ? "임시저장 글 이어쓰기" : "오늘의 솜 작성"}</S.PageTitle>

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

        <S.FormGroup>
          <Editor
            ref={editorRef}
            previewStyle="vertical"
            height="400px"
            initialEditType="wysiwyg"
            hideModeSwitch={true}
            placeholder="솜을 하면서 느낀 점이나 기록하고 싶은 순간을 자유롭게 적어주세요"
            hooks={{ addImageBlobHook: handleImageUpload }}
          />
          <div className="char-count">
            {charCount}/{MAX_LENGTH}
          </div>
        </S.FormGroup>

        <S.ButtonBox>
          <button type="button" className="cancel" onClick={handleCancel}>
            취소
          </button>

          {mode === "new" && (
            <button type="button" className="temp-save" onClick={handleTempSave}>
              임시 저장
            </button>
          )}

          <button type="submit" className="submit">
            {mode === "draft" ? "등록하기" : "작성 완료"}
          </button>
        </S.ButtonBox>
      </S.Form>
    </S.Container>
  );
};

export default PostWriteContent;
