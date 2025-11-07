import React from 'react';
import SomReadContent from './somReadContent/SomReadContent';
import SomReadInfo from './somReadInfo/SomReadInfo';
import S from './style'
import { ReadProvider, useRead } from '../../../context/ReadContext';

const ReadComponent = () => {
  const { loading } = useRead();

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <S.somReadContainer>
      <S.somReadWrap>
        <SomReadContent />
        <S.somInfoSticky>
          <SomReadInfo />
        </S.somInfoSticky>
      </S.somReadWrap>
    </S.somReadContainer>
  );
}

const ReadContent = () => {
  return (
    <ReadProvider>
      <ReadComponent />
    </ReadProvider>
  )
};

export default ReadContent;