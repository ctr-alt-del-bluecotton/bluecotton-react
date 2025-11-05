import styled from "styled-components";
import { fontGreyScale4, smallText2Light } from "../../../../styles/common";

const S = {};

S.SearchBarWrapper = styled.div`
  width: 350px;
  height: 40px;
  display: flex;
  align-items: center;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  overflow: hidden;
  background: #FFFFFF;
`

S.Input = styled.input`
  flex: 1 1 auto;
  height: 100%;
  padding: 0 16px;
  border: none;
  outline: none;
  ${smallText2Light}

  &::placeholder {
    ${fontGreyScale4}
  }

  font-family: inherit;
`
S.IconButton = styled.button`
  width: 63px;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  /* display: grid; */
  place-items: center;
  cursor: pointer;
  border-left: 1px solid #E0E0E0; 
`

export default S;
