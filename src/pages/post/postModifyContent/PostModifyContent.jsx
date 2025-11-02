import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./style";
import { useModal } from "../../../components/modal"; // ✅ 전역 모달 훅 추가

const PostModifyContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();

  // 게시글 상태
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([{ file: null, preview: null }]);

  // ✅ 더미 데이터 (수정 페이지용)
  const dummyPosts = [
    {
      id: 1,
      title: "손흥민 선수 경기 분석",
      category: "hobby",
      content:
        "오늘 손흥민 선수는 정말 대단했어요! 골 결정력과 패스 모두 최고였습니다.",
      files: [
        { file: null, preview: "/postImages/son_analysis.png" }, // 예시 썸네일 경로
      ],
    },
    {
      id: 2,
      title: "건강 루틴 공유",
      category: "health",
      content: "매일 아침 7시에 스트레칭과 명상을 합니다. 하루가 상쾌해요 ☀️",
      files: [{ file: null, preview: "/postImages/routine.jpg" }],
    },
  ];

  // ✅ 기존 데이터 로드
  useEffect(() => {
    const post = dummyPosts.find((p) => p.id === Number(id));
    if (post) {
      setTitle(post.title);
      setCategory(post.category);
      setContent(post.content);
      setFiles(post.files || [{ file: null, preview: null }]);
    } else {
      openModal({
        title: "존재하지 않는 게시글입니다.",
        confirmText: "확인",
        onConfirm: () => navigate("/main/post/all"),
      });
    }
  }, [id, navigate, openModal]);

  // 파일 선택
  const handleFileChange = (index, e) => {
    const selectedFile = e.target.files[0];
    const newFiles = [...files];

    if (selectedFile) {
      newFiles[index] = {
        file: selectedFile,
        preview: selectedFile.type.startsWith("image/")
          ? URL.createObjectURL(selectedFile)
          : null,
      };
    } else {
      newFiles[index] = { file: null, preview: null };
    }
    setFiles(newFiles);
  };

  // 파일 추가
  const handleAddFile = () => {
    setFiles([...files, { file: null, preview: null }]);
  };

  // 파일 삭제
  const handleRemoveFile = () => {
    if (files.length === 1) {
      setFiles([{ file: null, preview: null }]);
    } else {
      setFiles(files.slice(0, -1));
    }
  };

  // ✅ 수정 완료 (모달 + 유효성 검사)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      openModal({
        title: "제목을 입력해주세요.",
        confirmText: "확인",
      });
      return;
    }

    if (!category.trim()) {
      openModal({
        title: "카테고리를 선택해주세요.",
        confirmText: "확인",
      });
      return;
    }

    if (!content.trim()) {
      openModal({
        title: "내용을 입력해주세요.",
        confirmText: "확인",
      });
      return;
    }

    openModal({
      title: "게시글 수정 완료",
      message: "게시글이 성공적으로 수정되었습니다.",
      confirmText: "확인",
      onConfirm: () => navigate("/main/post/all"),
    });
  };

  // ✅ 취소 (모달)
  const handleCancel = () => {
    openModal({
      title: "수정 중인 내용이 사라집니다.",
      message: "정말 수정을 취소하고 목록으로 이동하시겠습니까?",
      confirmText: "이동",
      cancelText: "취소",
      onConfirm: () => navigate("/main/post/all"),
    });
  };

  // input 클릭 트리거
  const triggerFileInput = (index) => {
    document.getElementById(`file-${index}`).click();
  };

  return (
    <S.Container>
      {/* 상단 타이틀 */}
      <S.PageTitle>오늘의 솜 수정</S.PageTitle>

      {/* 폼 */}
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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">카테고리를 선택해주세요</option>
            <option value="study">학습</option>
            <option value="health">건강</option>
            <option value="social">소셜</option>
            <option value="hobby">취미</option>
            <option value="life">생활</option>
            <option value="rookie">루키</option>
          </select>
        </S.FormRow>

        {/* 내용 */}
        <S.FormGroup>
          <textarea
            placeholder="수정할 내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={1000}
          />
          <div className="char-count">{content.length}/1000</div>
        </S.FormGroup>

        {/* 첨부파일 */}
        <S.FileBox>
          {files.map((f, index) => (
            <div className="file-row" key={index}>
              <label>{index === 0 ? "첨부" : ""}</label>
              <div className="file-select">
                <input
                  type="file"
                  id={`file-${index}`}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(index, e)}
                />
                <button type="button" onClick={() => triggerFileInput(index)}>
                  파일 선택
                </button>
                <span className="file-name">
                  {f.file ? f.file.name : "선택된 파일 없음"}
                </span>

                {f.preview && (
                  <div className="thumb-wrap">
                    <img src={f.preview} alt="썸네일 미리보기" />
                  </div>
                )}
              </div>
            </div>
          ))}

          <p className="file-info">용량이 50.0M 이하 파일만 업로드 가능</p>

          <div className="file-actions">
            <button type="button" className="add-btn" onClick={handleAddFile}>
              파일 추가
            </button>
            <button
              type="button"
              className="remove-btn"
              onClick={handleRemoveFile}
            >
              파일 삭제
            </button>
          </div>
        </S.FileBox>

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
