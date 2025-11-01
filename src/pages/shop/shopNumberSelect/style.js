import styled from "styled-components";
import { smallText1Regular, primary } from "../../../styles/common";

const S = {};

S.Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
`;

S.PageList = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 20px;

  button {
    ${smallText1Regular};
    padding: 6px 8px;
    border: none;
    background: none;
    cursor: pointer;

    &.active {
      ${primary};
      font-weight: 600;
    }
  }
`;

S.PrevButton = styled.button`
  ${smallText1Regular};
  padding: 6px 10px;
  border: none;
  background: none;
  cursor: pointer;
  position: relative;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

 
  &::after {
    content: "";
    position: absolute;
    right: -20px;
    transform: translateY(-50%);
    width: 1px;
    height: 9px;
    background-color: ${({theme}) => theme.PALLETE.grey.greyScale1 };
  }
`;

S.AfterButton = styled.button`
  ${smallText1Regular};
  padding: 6px 10px;
  border: none;
  background: none;
  cursor: pointer;
  position: relative;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }


  &::before {
    content: "";
    position: absolute;
    left: -20px; 
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 9px;
    background-color: ${({theme}) => theme.PALLETE.grey.greyScale1 };
  }
`;

export default S;
