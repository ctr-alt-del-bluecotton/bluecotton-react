import React from 'react';
import S from './style';
import FloatingSomWritePage1 from './floatingSomWritePages/FloatingSomWritePage1';

const FloatingSomWritePages = ({somMenuPage, setSomMenuPage}) => {

  const pages = [
    <FloatingSomWritePage1 />,
    "페이지 2",
    "페이지 3"
  ]


  return (
    <S.floatingPageContainer>
      {pages.map((page, index) => 
        <S.floatingFormWrap somMenuPage={somMenuPage} index={index} key={index}>
          {page}
        </S.floatingFormWrap>
      )}
    </S.floatingPageContainer>
  );
};

export default FloatingSomWritePages;