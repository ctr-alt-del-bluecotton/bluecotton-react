import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { useModal } from "../../../components/modal"; // ✅ 전역 모달

const PostWriteContent = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([{ file: null, preview: null }]);
  const { openModal } = useModal();
  const navigate = useNavigate();

  // ✅ 페이지 진입 시 임시저장 불러오기 (있을 때만)
  useEffect(() => {
    const saved = localStorage.getItem("tempPost");
    if (saved) {
      const temp = JSON.parse(saved);
      setTitle(temp.title || "");
      setCategory(temp.category || "");
      setContent(temp.content || "");
      setFiles(temp.files || [{ file: null, preview: null }]);
    }
  }, []);

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

  // ✅ 임시 저장 (모달 + 목록 이동)
  const handleTempSave = () => {
    const tempData = { title, category, content, files };
    localStorage.setItem("tempPost", JSON.stringify(tempData));

    openModal({
      title: "임시 저장 완료",
      message: "작성 중인 글이 임시 저장되었습니다.",
      confirmText: "확인",
      onConfirm: () => navigate("/main/post/all"),
    });
  };

  // ✅ 작성 완료 (유효성 검사 + 목록 이동)
  const handleSubmit = (e) => {
    e.preventDefault();

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

  // ✅ 취소 (모달 + 목록 이동)
  const handleCancel = () => {
    openModal({
      title: "작성 중인 내용이 사라집니다.",
      message: "정말 페이지를 이동하시겠습니까?",
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
      <S.PageTitle>오늘의 솜 작성</S.PageTitle>

      <S.Form onSubmit={handleSubmit}>
        {/* 제목 */}
        <S.FormRow>
          <label>제목</label>
          <input
            type="text"
            placeholder="오늘의 솜의 제목을 입력해주세요"
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
            <option value="">하고 있는 솜의 카테고리를 선택해주세요</option>
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
            placeholder="솜을 하면서 어떤 점을 느끼셨나요? 도전하는 동안 기억에 남는 순간을 적어주세요"
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
