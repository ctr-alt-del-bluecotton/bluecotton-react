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
    pointer-events: none;

    /* 단, 자식 중 버튼은 클릭 가능하도록 예외 처리 */
    & > * {
      pointer-events: auto;
    }
`

S.floatingActionMenuWrap = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isDisplayFloatingMenu"
})`
    display: flex;
    visibility: ${({ isDisplayFloatingMenu }) =>
    isDisplayFloatingMenu ? "visible" : "hidden"};
    transform: ${({ isDisplayFloatingMenu }) =>
    isDisplayFloatingMenu ? "translateX(0)" : "translateX(15px)"};
    opacity: ${({ isDisplayFloatingMenu }) => (isDisplayFloatingMenu ? 1 : 0)};
    transition:
      transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.25s ease,
      visibility 0.25s ease;
    pointer-events: ${({ isDisplayFloatingMenu }) =>
    isDisplayFloatingMenu ? "auto" : "none"};
    border-radius: 20px;
`


export default S;