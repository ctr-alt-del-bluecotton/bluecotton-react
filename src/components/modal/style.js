import styled from "styled-components";
const S = {};

S.ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

S.ModalBox = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 28px 30px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  z-index: 10001;

  h3 {
    font-size: ${({ theme }) => theme.FONT_SIZE.paragraph};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    margin-bottom: 10px;
  }

  p {
    font-size: ${({ theme }) => theme.FONT_SIZE.smallText2};
    color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
    margin-bottom: 22px;
  }

  .button-row {
    display: flex;
    justify-content: center;
    gap: 10px;

    button {
      border: none;
      border-radius: 6px;
      padding: 8px 16px;
      cursor: pointer;
      transition: 0.15s;
      font-size: ${({ theme }) => theme.FONT_SIZE.smallText2};
    }

    .cancel {
      background: ${({ theme }) => theme.PALLETE.grey.greyScale0};
      color: ${({ theme }) => theme.PALLETE.basic};

      &:hover {
        background: ${({ theme }) => theme.PALLETE.grey.greyScale1};
      }
    }

    .confirm {
      background: ${({ theme }) => theme.PALLETE.primary.main};
      color: #fff;

      &:hover {
        background: ${({ theme }) => theme.PALLETE.primary.dark};
      }
    }
  }
`;

export default S;
