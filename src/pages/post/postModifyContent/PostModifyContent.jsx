import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./style";
import { useModal } from "../../../components/modal"; // ✅ 전역 모달

// ✅ Toast UI Editor import
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const PostModifyContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const editorRef = useRef();

  // ✅ 더미 데이터 (수정용)
  const dummyPosts = [
    {
      id: 1,
      title: "손흥민 선수 경기 분석",
      category: "hobby",
      content:
        "<p>오늘 손흥민 선수는 정말 대단했어요! ⚽ 골 결정력과 패스 모두 최고였습니다.</p>",
    },
    {
      id: 2,
      title: "건강 루틴 공유",
      category: "health",
      content:
        "<p>매일 아침 7시에 스트레칭과 명상을 합니다. 하루가 상쾌해요 ☀️</p>",
    },
  ];

  // ✅ 기존 게시글 데이터 불러오기
  useEffect(() => {
    const post = dummyPosts.find((p) => p.id === Number(id));
    if (post) {
      setTitle(post.title);
      setCategory(post.category);
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.getInstance().setHTML(post.content);
        }
      }, 100); // Editor 초기화 시점 보정
    } else {
      openModal({
        title: "존재하지 않는 게시글입니다.",
        confirmText: "확인",
        onConfirm: () => navigate("/main/post/all"),
      });
    }
  }, [id, navigate, openModal]);

  // ✅ 이미지 업로드 (백엔드 연동 훅)
  const handleImageUpload = async (blob, callback) => {
    try {
      const formData = new FormData();
      formData.append("image", blob);

      const response = await fetch("http://localhost:8080/api/uploads", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      callback(result.imageUrl, "업로드된 이미지");
      console.log("✅ 이미지 업로드 성공:", result.imageUrl);
    } catch (error) {
      console.error("❌ 이미지 업로드 실패:", error);
      const tempUrl = URL.createObjectURL(blob);
      callback(tempUrl, "임시 이미지");
    }
  };

  // ✅ 수정 완료 버튼
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
      title: "게시글 수정 완료",
      message: "게시글이 성공적으로 수정되었습니다.",
      confirmText: "확인",
      onConfirm: () => navigate("/main/post/all"),
    });
  };

  // ✅ 취소 버튼
  const handleCancel = () => {
    openModal({
      title: "수정 중인 내용이 사라집니다.",
      message: "정말 취소하시겠습니까?",
      confirmText: "이동",
      cancelText: "취소",
      onConfirm: () => navigate("/main/post/all"),
    });
  };

  return (
    <S.Container>
      <S.PageTitle>오늘의 솜 수정</S.PageTitle>

      <S.Form onSubmit={handleSubmit}>
        {/* 제목 */}
        <S.FormRow>
          <label>제목</label>
          <input
            type="text"
            placeholder="게시글 제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </S.FormRow>

        {/* 카테고리 */}
        <S.FormRow>
          <label>카테고리</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">카테고리를 선택해주세요</option>
            <option value="study">학습</option>
            <option value="health">건강</option>
            <option value="social">소셜</option>
            <option value="hobby">취미</option>
            <option value="life">생활</option>
            <option value="rookie">루키</option>
          </select>
        </S.FormRow>

        {/* ✅ Toast UI Editor */}
        <S.FormGroup>
          <Editor
            ref={editorRef}
            previewStyle="vertical"
            height="500px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            toolbarItems={[
              ["heading", "bold", "italic", "strike"],
              ["hr", "quote"],
              ["ul", "ol", "task", "indent", "outdent"],
              ["table", "image", "link"],
              ["code", "codeblock"],
            ]}
            hooks={{
              addImageBlobHook: handleImageUpload,
            }}
          />
        </S.FormGroup>

        {/* 버튼 */}
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
