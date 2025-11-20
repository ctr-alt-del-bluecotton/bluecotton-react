import styled from "styled-components";
import { flexCenter, flexStartColumn, smallText2Light, smallText3Regular, white } from "../../../../../../../../styles/common";

const S = {};

S.floatingChattingContentContainer = styled.div`
  display: flex;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  ${white}
  gap: 5px;
  width: calc(100% - 60px);
  padding: 10px 30px;
  border-radius: 5px;
  cursor: pointer;
  
  transition: all 0.2s;

`

S.floatingTitleArea = styled.div`
  display: flex;
  flex-direction: column;
`

S.floatingChattingContent = styled.div`
  ${flexStartColumn}
  ${white}
  width: 80%;
  height: 100%;
  padding: 10px 30px;
  background-color: ${({theme}) => theme.PALLETE.primary.main};
  border-radius: 5px;
  justify-content: center;
  cursor: pointer;
  
  transition: all 0.2s;
  &:hover {
    background-color: ${({theme}) => theme.PALLETE.primary.dark};
  }

`

S.floatingChattingExitButton = styled.div`
  ${flexCenter}
  ${white}
  width: 20%;
  height: 100%;
  padding: 10px 30px;
  background-color: ${({theme}) => theme.PALLETE.warning};
  border-radius: 5px;
  cursor: pointer;
  
  transition: all 0.2s;
  &:hover {
    background-color: ${({theme}) => theme.PALLETE.primary.dark};
  }

`

S.floatingChattingContentTitle = styled.div`
  ${smallText3Regular}
`

S.floatingChattingContentType = styled.div`
  ${smallText2Light}
`

export default S;