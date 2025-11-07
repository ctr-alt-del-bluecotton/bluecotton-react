import styled from "styled-components";
import { basic } from "../../../../../../../styles/common";

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

S.floatingFormWrap = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "somMenuPage"
})`
  display: ${({index, $somMenuPage}) => index === $somMenuPage ? "flex" : "none"};
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

export default S;