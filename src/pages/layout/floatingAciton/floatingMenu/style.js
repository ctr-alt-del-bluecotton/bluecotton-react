import styled from "styled-components";
import { flexCenterColumn, primary, title } from "../../../../styles/common";

const S = {};

S.floatingMenuContainer = styled.div`
  ${flexCenterColumn}
  position: relative;
  width: 500px;
  height: 850px;
  border-radius: 20px;
  box-shadow: -15px 15px 20px 0px #00000030;
  background-color: white;
`

S.floatingCloseButton = styled.img`
  width: 16px;
  height: 16px;
  right: 50px;
  top: 50px;
  cursor: pointer;
  position: absolute;
`

S.floatingMenuWrap = styled.div`
  ${primary}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

`

S.floatingTitle = styled.div`
  ${title}
`

export default S;