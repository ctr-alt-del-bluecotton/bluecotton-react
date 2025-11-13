import React from 'react';
import S from './style';
import { useFloatingAction } from '../../../../context/FloatingActionContext';

const FloatingButton = () => {
  const {
    isFloatingSelect,
    setIsFloatingSelect,
    isHoverButtons,
    setIsHoverButtons,
    somMenuSelect,
    setIsDisplayFloatingMenu
  } = useFloatingAction();

  const buttons = [
  {
    label: "챗봇",
    iconGroup: (
      <S.chatBotIcon
        src={`${process.env.PUBLIC_URL}/assets/icons/chat_bot_icon.png`}
      />
    ),
    isHover: isHoverButtons[0],
    onMouseEnter: () => setIsHoverButtons((prev) =>
      prev.map((isHover, i) => (i === 0 ? true : isHover))
    ),
    onMouseLeave: () => setIsHoverButtons((prev) =>
      prev.map((isHover, i) => (i === 0 ? false : isHover))
    ),
    onClick: () => somMenuSelect("chatBot")
  },
  {
    label: "채팅",
    iconGroup: (
      <S.chattingIcon
        src={`${process.env.PUBLIC_URL}/assets/icons/chatting_icon.png`}
      />
    ),
    isHover: isHoverButtons[1],
    onMouseEnter: () => setIsHoverButtons((prev) =>
      prev.map((isHover, i) => (i === 1 ? true : isHover))
    ),
    onMouseLeave: () => setIsHoverButtons((prev) =>
      prev.map((isHover, i) => (i === 1 ? false : isHover))
    ),
    onClick: () => somMenuSelect("chatting")
  },
  {
    label: "솜작성",
    iconGroup: (
      <S.somWriteIcon
        src={`${process.env.PUBLIC_URL}/assets/icons/som_write_icon.png`}
      />
    ),
    isHover: isHoverButtons[2],
    onMouseEnter: () => setIsHoverButtons((prev) =>
      prev.map((isHover, i) => (i === 2 ? true : isHover))
    ),
    onMouseLeave: () => setIsHoverButtons((prev) =>
      prev.map((isHover, i) => (i === 2 ? false : isHover))
    ),
    onClick: () => somMenuSelect("somWrite")
  },
];
  return (
    <S.floatingActionButtonWrap>
      <S.inner>  
        <S.topButton activeState={isFloatingSelect} onClick={() => window.scrollTo({top:0, behavior: 'smooth'})}>
          <S.toUpIcon src={`${process.env.PUBLIC_URL}/assets/icons/top_icon.png`} />
        </S.topButton>
        <S.menuHideButtonWrap activeState={isFloatingSelect}>
          {
            buttons.map(({label, onClick, iconGroup, isHover, onMouseEnter, onMouseLeave}, index) => 
              <S.buttonWrapper key={index} onClick={onClick} hover={isHover} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <S.buttonTextBubble hover={isHover}>
                  {label}
                </S.buttonTextBubble>
                <S.menuButtons>
                  {iconGroup}
                </S.menuButtons>
              </S.buttonWrapper>
            )
          }
        </S.menuHideButtonWrap>
        <S.menuButton activeState={isFloatingSelect} onClick={() => {setIsFloatingSelect((select) => !select); setIsDisplayFloatingMenu((prev) => isFloatingSelect === true ? false : prev )}}>
          <S.menuPlusIcon activeState={isFloatingSelect} src={`${process.env.PUBLIC_URL}/assets/icons/plus_icon.svg`} />
        </S.menuButton>
      </S.inner>
    </S.floatingActionButtonWrap>
  );
};

export default FloatingButton;