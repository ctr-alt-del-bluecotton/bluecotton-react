import styled from "styled-components";

/* === 전체 컨테이너 === */
export const Container = styled.div`
  width: 1160px;
  margin: 80px auto 120px;
  display: flex;
  flex-direction: column;
`;

/* === 페이지 타이틀 === */
export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.FONT_SIZE["h5"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["bold"]};
  color: ${({ theme }) => theme.PALLETE.primary.main};
  margin-bottom: 30px;
`;

/* === 폼 전체 === */
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

/* === 제목 / 카테고리 === */
export const FormRow = styled.div`
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

/* === 본문 내용 (Toast UI Editor 통일 스타일) === */
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  /* ✅ Toast UI Editor 전체 감싸는 영역 */
  .toastui-editor-defaultUI {
    border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
    border-radius: 6px;
    overflow: hidden;
  }

  /* ✅ 에디터 내부 본문 스타일 통일 (textarea와 동일하게) */
  .toastui-editor-contents {
    font-family: inherit;
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
    line-height: 1.7;
    color: ${({ theme }) => theme.PALLETE.basic};
    font-family: inherit;
  
    p,
    li,
    span {
      font-family: inherit;
      font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
      color: ${({ theme }) => theme.PALLETE.basic};
      line-height: 1.6;
    }
  }

  /* ✅ 카운터 */
  .char-count {
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
    color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
    align-self: flex-end;
  }
`;

/* === 버튼 === */
export const ButtonBox = styled.div`
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
