import styled from "styled-components";
import { basic, flexCenter, primary, smallText3Regular, title, white } from "../../../../../../../styles/common";

const S = {};

S.floatingPageContainer = styled.div`
  ${basic}
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

S.floatingFormWrap = styled.div`
  display: ${({index, somMenuPage}) => index == somMenuPage ? "flex" : "none"};
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

export default S;