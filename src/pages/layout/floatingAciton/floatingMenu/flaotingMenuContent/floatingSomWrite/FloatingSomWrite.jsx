import React from 'react';
import S from './style';
import FloatingSomWritePages from './floatingSomWriteCotent/FloatingSomWriteFloatingSomWriteCotent';

const FloatingSomWrite = ({somMenuPage ,setSomMenuPage}) => {
  const beforeButton = <S.floatingMenuButton onClick={() => setSomMenuPage((prev) => --prev)}>이전</S.floatingMenuButton>;
  const nextButton = <S.floatingMenuButton onClick={() => setSomMenuPage((prev) => ++prev)}>다음</S.floatingMenuButton>;
  const sumbitButton = <S.floatingMenuButton>완료</S.floatingMenuButton>;
  const visibleButton = <S.floatingMenuButtonVisible>이전</S.floatingMenuButtonVisible>
  const buttonList = [
    <S.floatingMenuButtonWrap>
        {visibleButton}
        {nextButton}
    </S.floatingMenuButtonWrap>, 
    <S.floatingMenuButtonWrap>
        {beforeButton}
        {nextButton}
    </S.floatingMenuButtonWrap>,  
    <S.floatingMenuButtonWrap>
        {beforeButton}
        {sumbitButton}
    </S.floatingMenuButtonWrap>]
  const buttonGroup = buttonList[somMenuPage];

  return (
    <S.floatingMenuWrap>
      <S.floatingFormWrap>
        <S.floatingTitle>솜 작성</S.floatingTitle>
        <S.floatingPageWrap>
          <FloatingSomWritePages 
            somMenuPage={somMenuPage}
            setSomMenuPage={setSomMenuPage}/>
        </S.floatingPageWrap>

        <S.floatingMenuButtonWrap>
          {buttonGroup}
        </S.floatingMenuButtonWrap>

      </S.floatingFormWrap>
    </S.floatingMenuWrap>

  );
};

export default FloatingSomWrite;