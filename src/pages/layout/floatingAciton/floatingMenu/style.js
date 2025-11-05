import styled from "styled-components";
import { flexCenter, flexCenterColumn, primary, smallText3Regular, title, white } from "../../../../styles/common";

const S = {};

S.floatingMenuContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: flex-start;
  width: 500px;
  overflow: visible;
  height: 850px;
  border-radius: 30px;
  box-shadow: -15px 15px 20px 0px #00000030;
  background-color: white;
`



S.floatingCloseButton = styled.img`
  width: 16px;
  height: 16px;
  right: 30px;
  top: 30px;
  cursor: pointer;
  position: absolute;
  z-index: 10;
`


export default S;