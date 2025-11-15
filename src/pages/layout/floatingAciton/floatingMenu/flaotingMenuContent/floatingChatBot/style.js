import styled from "styled-components";
import { basic, smallText3Regular, title } from "../../../../../../styles/common";

const S = {};

S.Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.PALLETE.white}
`;

S.Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 20px;
  margin-top: 50px;
`;


S.Title = styled.h3`
  ${title}
  color: ${({ theme }) => theme.PALLETE.primary.main};
  text-align: center;
  margin: 0;
`;

S.ChatBody = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.PALLETE.primary.light0};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

S.Bubble = styled.div`
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 8px; 
  line-height: 1.4;
  ${smallText3Regular}
  background-color: ${({theme}) => theme.PALLETE.white};
  ${basic};
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
`;

S.InputArea = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  background-color: #fff;
`;

S.Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
  background-color: transparent;
  ::placeholder {
    color: #aaa;
  }
`;

S.SendBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 18px;
  color: ${({ theme }) => theme.PALLETE.primary};
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

export default S;
