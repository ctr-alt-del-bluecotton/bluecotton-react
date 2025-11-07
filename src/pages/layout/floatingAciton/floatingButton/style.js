import styled from "styled-components";
import { flexCenter, flexCenterColumn, smallText1Regular, smallText3Light, white } from "../../../../styles/common";

const S = {};

S.floatingActionButtonWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`

S.toUpIcon = styled.img`
  width: 15px;
  user-select: none;
`

S.chatBotIcon = styled.img`
  width: 45px;
  user-select: none;
`

S.chattingIcon = styled.img`
  width: 24px;
  user-select: none;
`

S.somWriteIcon = styled.img`
  width: 20px;
  padding-right: 1px;
  user-select: none;
`

S.menuButton = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "activeState"
})`
  ${flexCenterColumn}
  ${white}
  position: absolute;
  width: 50px;
  flex-shrink: 0;
  height: 50px;
  border-radius: 50px;
  cursor: pointer;
  align-self: flex-end;
  background-color: ${({activeState, theme}) => 
    activeState ? theme.PALLETE.grey.greyScale1 : theme.PALLETE.primary.main};
  transition: background-color 0.2s ease;
`

S.menuHideButtonWrap = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "activeState"
})`
  ${flexCenterColumn}
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 12px;
  opacity: ${({ activeState }) => (activeState ? 1 : 0)};
  transform: ${({ activeState }) => (activeState ? "translateY(0)" : "translateY(40px)")};
  pointer-events: ${({ activeState }) => (activeState ? "auto" : "none")};
  transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  transition: opacity 0.4s ease, transform 0.4s ease;
  bottom: 62px;
`;

S.buttonTextBubble = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "hover"
})`
  ${smallText3Light}
  display: flex;
  align-items: center; /* ✅ 텍스트 수직 중앙 */
  justify-content: center;
  align-self: center;
  justify-self: center;
  border-radius: 20px;
  padding: 5px 10px;
  transform: ${({ hover }) =>
    hover ? "translateX(0)" : "translateX(15px)"};
  opacity: ${({ hover }) => (hover ? 1 : 0)};
  pointer-events: none; /* 클릭 방지용 */
  transform-origin: center right;
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.25s ease;
  transition-delay: ${({ hover }) => (hover ? "0.05s" : "0s")};
`;

S.buttonWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "hover"
})`
  ${white}
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: flex-end;
  background-color: ${({theme}) => theme.PALLETE.primary.light1};
  overflow: hidden;
  position: relative;
  width: 50px;
  border-radius: 25px;
  transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);

  /* hover 시 label만 자연스럽게 드러나게 */
  &:hover {
    width: 120px;
  }

  /* 내부 아이콘 크기 고정 */
  & > div {
    flex-shrink: 0;
  }
`;

S.inner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

S.topButton = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "activeState"
})`
  ${flexCenter}
  ${white}
  position: absolute;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: ${({theme}) => theme.PALLETE.primary.main };
  transition: transform 1s ease;
  bottom: 62px;
  /* open 상태일 때만 위로 밀림 */
  transform: ${({ activeState }) => (activeState ? "translateY(-370%)" : "translateY(0)")};
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
`
S.menuButtons = styled.div`
  ${flexCenter}
  ${white}
  width: 50px;
  cursor: pointer;
  height: 50px;
  border-radius: 100%;
  background-color: ${({theme}) => theme.PALLETE.primary.main };
`

S.menuPlusIcon = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== "activeState"
})`
  width: 16px;
  height: 16px;
  filter: ${({ activeState }) =>
    activeState
      ? 'invert(100%) brightness(40%) contrast(200%)' // → 검정
      : 'invert(0%) brightness(100%) contrast(100%)'}; // → 흰색
  
  transform: ${({ activeState }) => (activeState ? "rotate(-45deg)" : "rotate(0deg)")};
  transition: all 0.2s ease;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
`

S.fullSomButton = styled.div`
  ${smallText1Regular}
  ${white}
  border-radius: 4px;
  width: 122px;
  height: 32px;
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default S;