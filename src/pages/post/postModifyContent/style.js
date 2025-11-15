import styled from "styled-components";
const S = {};

/* === 전체 컨테이너 === */
S.Container = styled.div`
  width: 1160px;
  margin: 80px auto 120px;
  display: flex;
  flex-direction: column;
`;

/* === 페이지 타이틀 === */
S.PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.FONT_SIZE["h5"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["bold"]};
  color: ${({ theme }) => theme.PALLETE.primary.main};
  margin-bottom: 30px;
`;

/* === 폼 전체 === */
S.Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

/* === 제목 / 카테고리 === */
S.FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  label {
    width: 100px;
    font-size: ${({ theme }) => theme.FONT_SIZE["h6"]};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};
    color: ${({ theme }) => theme.PALLETE.basic};
  }

  input,
  select {
    flex: 1;
    height: 40px;
    border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
    border-radius: 4px;
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
    color: ${({ theme }) => theme.PALLETE.basic};
    padding: 0 12px;
    outline: none;
    background-color: #fff;
    transition: border-color 0.2s ease;

    &::placeholder {
      color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
    }

    &:focus {
      border-color: ${({ theme }) => theme.PALLETE.primary.main};
    }
  }

  select {
    appearance: none;
    background-image: url("/assets/icons/drop_down.svg");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 16px;

    &:focus {
      background-image: url("/assets/icons/drop_down_acv.svg");
    }
  }
`;

/* === 본문 내용 (에디터 영역) === */
S.FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  /* 기본 UI */
  .toastui-editor-defaultUI {
    border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
    border-radius: 6px;
    overflow: hidden;
    transition: border-color 0.2s ease;
  }

  &:focus-within .toastui-editor-defaultUI {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }

  .toastui-editor-contents {
    font-family: inherit;
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
    color: ${({ theme }) => theme.PALLETE.basic};

    p,
    li,
    span {
      font-family: inherit;
      font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
      color: ${({ theme }) => theme.PALLETE.basic};
      line-height: 1.6;
    }
  }

  /* ✨ placeholder 색상 변경 */
  .toastui-editor-contents::before {
    color: ${({ theme }) => theme.PALLETE.grey.greyScale3} !important;
    opacity: 1 !important;
  }

  /* 🔥🔥🔥 이미지 크기 자동 조정 — 핵심 부분 */
  .toastui-editor-contents img {
    max-width: 100% !important;   /* 컨테이너 너비 안에서만 */
    height: auto !important;      /* 비율 유지 */
    display: block;
    border-radius: 10px;          /* 디자인 핏 업! */
    margin: 12px 0;
  }

  /* ✨ 글자 수 카운트 */
  .char-count {
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
    color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
    align-self: flex-end;
    margin-top: 6px;
  }
`;

/* === 버튼 === */
S.ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 30px;

  button {
    width: 130px;
    height: 40px;
    border-radius: 4px;
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
    cursor: pointer;
    transition: 0.2s;
  }

  .cancel {
    border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
    background: #fff;
    color: ${({ theme }) => theme.PALLETE.basic};
    &:hover {
      background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
    }
  }

  .temp-save {
    border: 1px solid ${({ theme }) => theme.PALLETE.primary.light1};
    background-color: #fff;
    color: ${({ theme }) => theme.PALLETE.basic};
    &:hover {
      background-color: ${({ theme }) => theme.PALLETE.primary.light0};
    }
  }

  .submit {
    border: none;
    background-color: ${({ theme }) => theme.PALLETE.primary.main};
    color: #fff;
    &:hover {
      background-color: ${({ theme }) => theme.PALLETE.primary.dark};
    }
  }
`;

export default S;
