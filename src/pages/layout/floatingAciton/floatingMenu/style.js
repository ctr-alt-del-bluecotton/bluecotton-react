import styled from "styled-components";
import { flexCenter } from "../../../../styles/common";

const S = {};

S.floatingMenuContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: flex-start;
  overflow: visible;
  width: 500px;
  height: 850px;
  box-shadow: -15px 15px 20px 0px #00000030;
  background-color: white;
  border-radius: 20px;
`

S.floatingMenuBlock = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9;
  border-radius: 20px;
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