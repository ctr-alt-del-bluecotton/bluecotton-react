import styled from "styled-components";

const S = {};

S.floatingActionContainer = styled.div`
    position: fixed;
    display: flex;              /* ✅ 가로 배치 */
    flex-direction: row;        /* 좌우 나란히 */
    align-items: flex-end;  /* ✅ 하단선 기준으로 정렬 */
    gap: 170px;             /* ✅ 간격 확보 */
    bottom: 50px;
    right: 50px;
    z-index: 9999;
`

S.floatingActionMenuWrap = styled.div`
    display: ${({isDisplayFloatingMenu}) => isDisplayFloatingMenu ? "flex" : "none"};
`


export default S;