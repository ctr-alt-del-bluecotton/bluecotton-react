import React from 'react';
import S from './style';

const FloatingMenu = ({isDisplayFloatingMenu ,setIsDisplayFloatingMenu}) => {
  return (
    <S.floatingMenuContainer>
      <S.floatingCloseButton src={`${process.env.PUBLIC_URL}/assets/icons/floating_close_button.png`} alt='닫기버튼' onClick={() => setIsDisplayFloatingMenu(!isDisplayFloatingMenu)}/>
      <S.floatingMenuWrap>
        <S.floatingTitle>솜 작성</S.floatingTitle>
      </S.floatingMenuWrap>
    </S.floatingMenuContainer>
  );
};

export default FloatingMenu;