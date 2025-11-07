import React from 'react';
import S from './style';
import FloatingMenuContent from './flaotingMenuContent/FloatingMenuContent';
import { useFloatingAction } from '../../../../context/FloatingActionContext';

const FloatingMenu = () => {
  const { isDisplayFloatingMenu, setIsDisplayFloatingMenu } = useFloatingAction();
  return (
    <S.floatingMenuContainer>
      <S.floatingCloseButton src={`${process.env.PUBLIC_URL}/assets/icons/floating_close_button.png`} alt='닫기버튼' onClick={() => setIsDisplayFloatingMenu(!isDisplayFloatingMenu)}/>
      <FloatingMenuContent />
    </S.floatingMenuContainer>
  );
};

export default FloatingMenu;