// 📄 PostWriteContent.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
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

  // ✅ 로그인 정보
  const { currentUser, isLogin } = useSelector((state) => state.user);

  const draftId = new URLSearchParams(location.search).get("draftId");
  const mode = draftId ? "draft" : "new";
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // ✅ 참여 중 솜 카테고리 목록 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!isLogin || !currentUser?.id) {
          alert("로그인이 필요한 기능입니다.");
          navigate("/main/post/all");
          return;
        }

        const res = await fetch(`${BASE_URL}/private/post/categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!res.ok) throw new Error("카테고리 조회 실패");
        const data = await res.json();
        setCategories(data);

        if (draftId) {
          fetchDraft(data);
        }
      } catch (err) {
        console.error("카테고리 로드 오류:", err);
      }
    };

    const fetchDraft = async (categoryList) => {
      try {
        const res = await fetch(`${BASE_URL}/private/post/draft/${draftId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!res.ok) throw new Error("임시저장 글 불러오기 실패");
        const result = await res.json();

        if (result.data) {
          const titleValue = result.data.postDraftTitle ?? "";
          const contentValue = result.data.postDraftContent ?? "";
          const somIdValue = result.data.somId
            ? result.data.somId.toString()
            : "";

          setTitle(titleValue);
          setCategory(somIdValue);

          const matchedCategory = categoryList.find(
            (cat) => String(cat.id) === somIdValue
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
  }, [draftId, isLogin, currentUser, navigate, openModal]);

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

      const res = await fetch(`${BASE_URL}/upload/post-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
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

  // ✅ 임시저장 (유효성 검사 없음)
  const handleTempSave = async (e) => {
    e.preventDefault();
    if (!isLogin || !currentUser?.id) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    const content = editorRef.current?.getInstance().getMarkdown().trim() || "";

    const draft = {
      postDraftTitle: title || null,
      postDraftContent: content || null,
      memberId: currentUser.id,
      somId: category ? parseInt(category) : null,
    };

    try {
      const res = await fetch(`${BASE_URL}/private/post/draft`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
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

  // ✅ 작성 완료 / 등록 (유효성 검사 O)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin || !currentUser?.id) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    const content = editorRef.current?.getInstance().getMarkdown().trim() || "";

    // ✅ 작성 완료 버튼 클릭 시 필수값 검사
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

    try {
      const post = {
        postTitle: title || null,
        postContent: content || null,
        memberId: currentUser.id,
        somId: category ? parseInt(category) : null,
        imageUrls,
      };

      const res = await fetch(`${BASE_URL}/private/post/write`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(post),
      });

      if (!res.ok) throw new Error("게시글 등록 실패");

      const result = await res.json();
      const newPostId = result.data?.postId || result.data?.id;

      openModal({
        title: "등록 완료",
        message:
          mode === "draft"
            ? "임시저장 글이 등록되었습니다."
            : "게시글이 등록되었습니다.",
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
      <S.PageTitle>
        {mode === "draft" ? "임시저장 글 이어쓰기" : "오늘의 솜 작성"}
      </S.PageTitle>

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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">참여 중인 솜을 선택해주세요</option>

            {categories.map((cat) => (
              <option
                key={cat.id}
                value={cat.id}
                disabled={cat.somDayDiff < 1} 도전 전 솜 비활성화
              >
                {/* 예: 학습 - 하루 한 문제 풀기 (도전 3일차) */}
                {categoryMap[cat.somCategory] || cat.somCategory}
                {" - "}
                {cat.somTitle}
                {" "}
                {cat.somDayDiff < 1
                  ? "(예정)" 
                  : `(도전 ${cat.somDayDiff}일차)`} 
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