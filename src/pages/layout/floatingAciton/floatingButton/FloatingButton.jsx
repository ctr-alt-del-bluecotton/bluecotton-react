import React from 'react';
import S from './style';

const FloatingButton = ({isFloatingSelect, setIsFloatingSelect}) => {
  return (
    <S.floatingActionButtonWrap>
      <S.menuButton>
        <S.menuPlusIcon active={isFloatingSelect} onClick={() => setIsFloatingSelect(!isFloatingSelect)} src="../../../assets/icons/plusIcon.svg" />
      </S.menuButton>
    </S.floatingActionButtonWrap>
  );
};

export default FloatingButton;