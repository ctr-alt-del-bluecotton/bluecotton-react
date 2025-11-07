import React from 'react';
import S from './style';
import FloatingSomWritePage1 from './floatingSomWritePage1/FloatingSomWritePage1';
import FloatingSomWritePage2 from './floatingSomWritePage2/FloatingSomWritePage2';
import { useFloatingAction } from '../../../../../../../context/FloatingActionContext';

const FloatingSomWritePages = () => {
  const { somMenuPage } = useFloatingAction();

  const pages = [
    <FloatingSomWritePage1 />,
    <FloatingSomWritePage2 />
  ]


  return (
    <S.floatingPageContainer>
      {pages.map((page, index) => 
        <S.floatingFormWrap  $somMenuPage={somMenuPage} index={index} key={index}>
          {page}
        </S.floatingFormWrap>
      )}
    </S.floatingPageContainer>
  );
};

export default FloatingSomWritePages;