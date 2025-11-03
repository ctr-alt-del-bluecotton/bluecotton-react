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

/* === 본문 내용 === */
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  textarea {
    border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
    border-radius: 4px;
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
    padding: 12px;
    height: 260px;
    resize: none;
    line-height: 1.6;
    color: ${({ theme }) => theme.PALLETE.basic};
    outline: none;
    font-family: inherit;

    &:focus {
      border-color: ${({ theme }) => theme.PALLETE.primary.main};
    }
  }

  .char-count {
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
    color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
    align-self: flex-end;
  }
`;

/* === 파일 첨부 === */
export const FileBox = styled.div`
  width: 100%;
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
  display: grid;
  grid-template-columns: 100px 1fr;
  column-gap: 16px;
  row-gap: 14px;

  .file-row {
    display: contents;
  }

  .file-row > label {
    grid-column: 1;
    font-size: ${({ theme }) => theme.FONT_SIZE["h6"]};
    color: ${({ theme }) => theme.PALLETE.basic};
    align-self: center;
  }

  .file-select {
    grid-column: 2;
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
    border-radius: 4px;
    background-color: #fff;
    padding-right: 8px;

    button {
      background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
      color: ${({ theme }) => theme.PALLETE.basic};
      font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
      border: none;
      border-right: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
      padding: 0 18px;
      height: 40px;
      cursor: pointer;
      transition: background 0.2s ease;

      &:hover {
        background-color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
      }
    }

    .file-name {
      flex: 1;
      font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
      color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .thumb-wrap img {
      width: 60px;
      height: 40px;
      border-radius: 4px;
      object-fit: cover;
      border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
    }
  }

  .file-info {
    grid-column: 2;
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
    color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  }

  /* === 추가/삭제 버튼 === */
  .file-actions {
    grid-column: 2;
    display: flex;
    align-items: center;
    gap: 8px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      height: 34px;
      padding: 0 12px;
      border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
      border-radius: 4px;
      background-color: #fff;
      color: ${({ theme }) => theme.PALLETE.basic};
      font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
      cursor: pointer;
      transition: background 0.2s ease;

      &:hover {
        background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
      }

      &::before {
        display: inline-block;
        width: 14px;
        height: 14px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        content: "";
      }

      &.add-btn::before {
        background-image: url("/assets/icons/add.svg");
      }

      &.remove-btn::before {
        background-image: url("/assets/icons/minus.svg");
      }
    }
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


