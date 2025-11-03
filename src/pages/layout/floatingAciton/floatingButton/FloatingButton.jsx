import React from 'react';
import S from './style';

const FloatingButton = () => {
  return (
    <S.floatingActionButtonWrap>
      <S.menuButton>
        <S.menuPlusIcon src="../../../assets/icons/plusIcon.svg" />
      </S.menuButton>
    </S.floatingActionButtonWrap>
  );
};

export default FloatingButton;