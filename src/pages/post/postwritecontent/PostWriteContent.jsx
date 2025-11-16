import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import S from "./style";
import { useModal } from "../../../components/modal";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const MAX_LENGTH = 3000;

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

  // ⭐ 이미지 URL 배열 제거됨 → PostImageIds로만 처리
  const [postImageIds, setPostImageIds] = useState([]);

  const location = useLocation();
  const { currentUser, isLogin } = useSelector((state) => state.user);

  const draftId = new URLSearchParams(location.search).get("draftId");
  const mode = draftId ? "draft" : "new";
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // 🔥 참여 중 솜 카테고리 + draft 자동불러오기
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

        if (draftId) fetchDraft(data);
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

        const result = await res.json();

        if (result.data) {
          setTitle(result.data.postDraftTitle ?? "");
          setCategory(String(result.data.somId ?? ""));

          if (editorRef.current) {
            editorRef.current.getInstance().setMarkdown(result.data.postDraftContent ?? "");
          }

          const matchedCategory = categoryList.find(
            (cat) => String(cat.id ?? cat.somId) === String(result.data.somId)
          );
          if (matchedCategory) {
            setCategory(String(matchedCategory.id ?? matchedCategory.somId));
          }
        }
      } catch (error) {
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

  // 🔥 글자 수 카운트
  useEffect(() => {
    const editor = editorRef.current?.getInstance();
    if (!editor) return;

    const handleChange = () => {
      const text = editor.getMarkdown();
      const length = text.trim().length;
      if (length > MAX_LENGTH) {
        editor.setMarkdown(text.substring(0, MAX_LENGTH));
        setCharCount(MAX_LENGTH);
      } else {
        setCharCount(length);
      }
    };

    editor.on("change", handleChange);
    return () => editor.off("change", handleChange);
  }, []);

  const handleImageUpload = async (blob, callback) => {
    try {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, "0");
      const d = String(now.getDate()).padStart(2, "0");

      const folderPath = `post/${y}/${m}/${d}`;

      const formData = new FormData();
      formData.append("file", blob);
      formData.append("folder", folderPath);

      const uploadRes = await fetch(`${BASE_URL}/file/upload-image`, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("이미지 서버 업로드 실패");

      const uploadJson = await uploadRes.json();

      const imgUrl = uploadJson.url;
      const imgName = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
      const imgPath = imgUrl.replace(imgName, "");

      const tempImageData = {
        postImagePath: imgPath,
        postImageName: imgName,
      };

      const tempRes = await fetch(`${BASE_URL}/post-image/insert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempImageData),
      });

      const tempJson = await tempRes.json();

      setPostImageIds((prev) => [...prev, tempJson.data.id]);

      callback(imgUrl, "image");
    } catch (err) {
      console.error("Toast UI 이미지 업로드 실패:", err);
      callback(URL.createObjectURL(blob), "임시 이미지");
    }
  };

  // 🔥 임시 저장
  const handleTempSave = async (e) => {
    e.preventDefault();

    if (!isLogin || !currentUser?.id) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    const content = editorRef.current.getInstance().getMarkdown().trim();
    const draft = {
      postDraftTitle: title || null,
      postDraftContent: content || null,
      memberId: currentUser.id,
      somId: category ? Number(category) : null,
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
    } catch {
      openModal({
        title: "오류",
        message: "임시 저장 중 문제가 발생했습니다.",
        confirmText: "확인",
      });
    }
  };

  // 🔥 게시글 등록
  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = editorRef.current.getInstance().getMarkdown().trim() || "";

    if (!title.trim()) {
      return openModal({ title: "제목을 입력해주세요", confirmText: "확인" });
    }
    if (!category.trim()) {
      return openModal({ title: "카테고리를 선택해주세요", confirmText: "확인" });
    }
    if (!content.trim()) {
      return openModal({ title: "내용을 입력해주세요", confirmText: "확인" });
    }

    const postData = {
      postTitle: title,
      postContent: content,
      memberId: currentUser.id,
      somId: Number(category),
      postImageIds: postImageIds,
      draftId: draftId ? Number(draftId) : null,
    };

    let res;
    try {
      res = await fetch(`${BASE_URL}/private/post/write`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(postData),
      });
    } catch (error) {
      return openModal({
        title: "네트워크 오류",
        message: "서버와 통신할 수 없습니다.",
        confirmText: "확인",
      });
    }

    const result = await res.json();

    // ⭐⭐⭐ 409 Conflict — 하루 1회 작성 제한
    if (res.status === 409) {
      return openModal({
        title: "작성 불가",
        message: result?.message || "오늘은 이미 게시글을 작성하셨습니다.",
        confirmText: "확인",
      });
    }

    // ⭐ 일반 실패
    if (!res.ok) {
      return openModal({
        title: "등록 실패",
        message: result?.message || "오류가 발생했습니다.",
        confirmText: "확인",
      });
    }

    // ⭐ 성공
    openModal({
      title: "등록 완료",
      message: mode === "draft" ? "임시저장 글이 등록되었습니다." : "게시글이 등록되었습니다.",
      confirmText: "확인",
      onConfirm: () => navigate(`/main/post/read/${result.data.postId}`),
    });
  };

  // 뒤로가기
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
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">참여 중인 솜을 선택해주세요</option>
            {categories.map((cat) => (
              <option
                key={cat.id ?? cat.somId}
                value={cat.id ?? cat.somId}
                disabled={cat.somDayDiff < 1}
              >
                {/* 예: 학습 - 코딩 30일 챌린지 - 도전 4일 */}
                {categoryMap[cat.somCategory] || cat.somCategory}
                {" : "}
                {cat.somTitle}
                {cat.somDayDiff > 0 ? ` [도전${cat.somDayDiff}일]` : ` [예정 D${cat.somDayDiff - 1}]`}
              </option>
            ))}
          </select>
        </S.FormRow>

        <S.FormGroup>
          <Editor
            ref={editorRef}
            previewStyle="vertical"
            height="800px"
            initialEditType="wysiwyg"
            hideModeSwitch={true}
            placeholder="솜을 하면서 느낀 점이나 기록하고 싶은 순간을 자유롭게 적어주세요"
            hooks={{ addImageBlobHook: handleImageUpload }}
          />
          <div className="char-count">{charCount}/{MAX_LENGTH}</div>
        </S.FormGroup>

        <S.ButtonBox>
          <button type="button" className="cancel" onClick={handleCancel}>취소</button>

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
