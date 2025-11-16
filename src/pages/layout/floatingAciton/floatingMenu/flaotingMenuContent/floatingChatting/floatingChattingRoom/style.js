import styled from "styled-components";
import { basic, flexStartColumn, smallText0Regular, smallText1Regular, smallText2Regular, smallText3Regular, title, white } from "../../../../../../../styles/common";
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
  padding: 10px 20px;
`;

S.backButton = styled.div`
  ${smallText2Regular}
  ${white}
  background-color: ${({ theme }) => theme.PALLETE.primary.main}; 
  position: absolute;
  left: 0;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px 15px;
  transition: all 0.2s;

  &:hover{
    background-color: ${({ theme }) => theme.PALLETE.primary.dark}; 
  }

`

S.Title = styled.h3`
  ${smallText3Regular}
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

  /* 스크롤바 - Chrome, Edge, Safari */
  &::-webkit-scrollbar {
    width: 8px;         /* 스크롤바 너비 */
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);  /* 트랙 배경 */
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.PALLETE.primary.light0};  /* 색상 */
    border-radius: 4px;                                       /* 둥글기 */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.PALLETE.primary.dark1}; /* hover 색상 */
  }

  /* Firefox 전용 */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.PALLETE.primary.light1} transparent;
`;

S.ChatContent = styled.div`
  ${flexStartColumn}
  ${basic}
`

S.chatSenderName = styled.div`
  display: ${({ isUser }) => isUser ? 'none' : 'block'} 
`

S.systemMessage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${basic}
`

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
