import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { useModal } from "../../../components/modal"; 

// ✅ Toast UI Editor import
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const PostWriteContent = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState([{ file: null, preview: null }]);
  const { openModal } = useModal();
  const navigate = useNavigate();
  const editorRef = useRef();

  // ✅ 페이지 진입 시 임시저장 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("tempPost");
    if (saved) {
      const temp = JSON.parse(saved);
      setTitle(temp.title || "");
      setCategory(temp.category || "");
      if (editorRef.current) {
        editorRef.current.getInstance().setHTML(temp.content || "");
      }
      setFiles(temp.files || [{ file: null, preview: null }]);
    }
  }, []);

  // ✅ 이미지 업로드 훅 (백엔드와 연동)
  const handleImageUpload = async (blob, callback) => {
    try {
      const formData = new FormData();
      formData.append("image", blob);

      const response = await fetch("http://localhost:8080/api/uploads", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      const imageUrl = result.imageUrl; // 서버가 반환한 이미지 경로
      callback(imageUrl, "업로드된 이미지");
      console.log("이미지 업로드 성공:", imageUrl);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);

      // 서버가 아직 없을 경우 — 임시 미리보기 대체
      const tempUrl = URL.createObjectURL(blob);
      callback(tempUrl, "임시 이미지");
    }
  };

  const handleTempSave = () => {
    const content = editorRef.current?.getInstance().getHTML() || "";
    const tempData = { title, category, content, files };
    localStorage.setItem("tempPost", JSON.stringify(tempData));

    openModal({
      title: "임시 저장 완료",
      message: "작성 중인 글이 임시 저장되었습니다.",
      confirmText: "확인",
      onConfirm: () => navigate("/main/post/all"),
    });
  };

  const handleSubmit = (e) => {
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

    openModal({
      title: "작성 완료",
      message: "게시글이 성공적으로 등록되었습니다.",
      confirmText: "확인",
      onConfirm: () => {
        localStorage.removeItem("tempPost");
        navigate("/main/post/all");
      },
    });
  };

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
            <option value="">하고 있는 솜의 카테고리를 선택해주세요</option>
            <option value="study">학습</option>
            <option value="health">건강</option>
            <option value="social">소셜</option>
            <option value="hobby">취미</option>
            <option value="life">생활</option>
            <option value="rookie">루키</option>
          </select>
        </S.FormRow>

        <S.FormGroup>
          <Editor
            ref={editorRef}
            previewStyle="vertical"
            height="500px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            hooks={{
              addImageBlobHook: handleImageUpload,
            }}
          />
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
