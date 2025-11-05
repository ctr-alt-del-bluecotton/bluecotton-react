import React from 'react';
import S from './style';
import FloatingMenuContent from './flaotingMenuContent/FloatingMenuContent';

const FloatingMenu = ({
  somMenuPage, setSomMenuPage,
  somMenuContent, setSomMenuContent,
  isDisplayFloatingMenu, setIsDisplayFloatingMenu
}) => {
  return (
    <S.floatingMenuContainer>
      <S.floatingCloseButton src={`${process.env.PUBLIC_URL}/assets/icons/floating_close_button.png`} alt='닫기버튼' onClick={() => setIsDisplayFloatingMenu(!isDisplayFloatingMenu)}/>
      <FloatingMenuContent 
        somMenuPage={somMenuPage}
        setSomMenuPage={setSomMenuPage}
        somMenuContent={somMenuContent}
        setSomMenuContent={setSomMenuContent}/>
    </S.floatingMenuContainer>
  );
};

export default FloatingMenu;