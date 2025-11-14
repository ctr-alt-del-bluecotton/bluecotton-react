import styled from "styled-components";
import {  } from "../../../../../../../styles/common";

const S = {};

S.chattingListWrap = styled.div`
  width: 100%;
  display: flex;
  margin-top: 60px;
  height: calc(100% - 30px);
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: auto;
`;

export default S;