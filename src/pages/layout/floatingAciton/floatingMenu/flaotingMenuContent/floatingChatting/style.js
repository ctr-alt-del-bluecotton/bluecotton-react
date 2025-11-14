import styled from "styled-components";
import { flexCenterColumn, primary, title } from "../../../../../../styles/common";

const S = {};

S.floatingChattingContainer = styled.div`
  ${primary};
    position: relative;
    width: 100%;
    height: 850px;
    margin: 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: center; /* ✅ 위, 아래 고정 */
    align-items: center;
    overflow: hidden; /* or scroll, 상황에 따라 조정 */
`

S.floatingChatMenuWrap = styled.div`
  display:flex;
  width: 100%;
  height: calc(100% - 130px);
  flex-direction: column;
  justify-content: center; /* ✅ 위, 아래 고정 */
  align-items: center;
  margin:65px 0;
`

S.floatingChatListuWrap = styled.div`
  width: 100%;
  display: flex;
  margin-top: 30px;
  height: calc(100% - 30px);
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: auto;
`

S.floatingTitle = styled.div`
  ${title}
  user-select: none;
`

export default S;