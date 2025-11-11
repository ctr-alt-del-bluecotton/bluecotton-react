
import styled from "styled-components";
import { flexCenter, primary, smallText3Regular, title, white } from "../../../../../../styles/common";

const S = {};


S.floatingMenuWrap = styled.div`
  ${primary};
  position: relative;
  width: 100%;
  height: 850px;
  margin: 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* ✅ 위, 아래 고정 */
  align-items: center;
  overflow: hidden; /* or scroll, 상황에 따라 조정 */

`

S.floatingFormWrap = styled.form`
  display:flex;
  width: 100%;
  height: calc(100% - 130px);
  flex-direction: column;
  justify-content: space-between; /* ✅ 위, 아래 고정 */
  align-items: center;
  margin:65px 0;
`

S.floatingPageWrap = styled.div`
  width: 100%;
  display: flex;
  margin-top: 30px;
  height: calc(100% - 30px);
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: auto;
`;

S.floatingTitle = styled.div`
  ${title}
  user-select: none;
`

S.floatingMenuButtonWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`


S.floatingMenuButton = styled.div`
  ${flexCenter}
  ${white}
  ${smallText3Regular}
  background-color: ${({theme}) => theme.PALLETE.primary.main};
  cursor: pointer;
  width: 95px;
  border-radius: 4px;
  height: 50px;
  user-select: none;
  transition: background-color 0.2s ;

  &:hover {
    background-color: ${({theme}) => theme.PALLETE.primary.dark};
  }

`

S.floatingMenuButtonVisible = styled.div`
  ${flexCenter}
  ${white}
  ${smallText3Regular}
  visibility: hidden;
  background-color: ${({theme}) => theme.PALLETE.primary.main};
  cursor: pointer;
  width: 95px;
  border-radius: 4px;
  height: 50px;
`

export default S;