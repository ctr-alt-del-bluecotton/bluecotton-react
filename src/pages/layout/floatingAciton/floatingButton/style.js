import styled from "styled-components";
import { flexCenter, white } from "../../../../styles/common";

const S = {};

S.floatingActionButtonWrap = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

S.menuButton = styled.div`
  ${flexCenter}
  ${white}
  width: 50px;
  height: 50px;
  border-radius: 100%;
  cursor: pointer;
  background-color: ${({theme}) => theme.PALLETE.primary.main};
`

S.menuPlusIcon = styled.img`
  width: 16px;
  height: 16px;
  fill: ${({theme}) => theme.PALLETE.primary.main};
`

export default S;