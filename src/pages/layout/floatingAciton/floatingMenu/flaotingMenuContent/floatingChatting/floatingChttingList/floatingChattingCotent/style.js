import styled from "styled-components";
import { basic, flexStartColumn, smallText2Light, smallText3Regular, white } from "../../../../../../../../styles/common";

const S = {};

S.floatingChattingContent = styled.div`
  ${flexStartColumn}
  ${white}
  width: calc(100% - 60px);
  padding: 10px 30px;
  background-color: ${({theme}) => theme.PALLETE.primary.main};
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