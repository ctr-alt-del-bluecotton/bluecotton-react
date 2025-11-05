import React from 'react';
import S from './style'

const FloatingSomWritePage1 = () => {
  return (
    <S.floatingFormWrap>
      <S.floatingInputWrap>
        <S.floatingInputTitles>제목</S.floatingInputTitles>
        <S.floatingInputs placeholder='제목을 입력하세요'/>
      </S.floatingInputWrap>
      <S.floatingInputWrap>
        <S.floatingInputTitles>카테고리</S.floatingInputTitles>
        <S.floatingInputs placeholder='제목을 입력하세요' type='combobox'/>
      </S.floatingInputWrap>
      <S.floatingInputWrap>
        <S.floatingInputTitles>장소</S.floatingInputTitles>
        <S.floatingSomAddressInputWrap>
          <S.floatingInputs placeholder='주소를 입력하세요'/>
          <S.floatingSomAddressButton>주소 검색</S.floatingSomAddressButton>
        </S.floatingSomAddressInputWrap>
      </S.floatingInputWrap>
      <S.floatingInputWrap>
        <S.floatingInputTitles>날짜</S.floatingInputTitles>
        <S.floatingSomDateSelectWrap>
          <S.floatingDateInputs placeholder='시작 날짜를 입력하세요'/>
          <S.floatingDateInputs placeholder='종료 날짜를 입력하세요'/>
        </S.floatingSomDateSelectWrap>
      </S.floatingInputWrap>
      <S.floatingInputWrap>
        <S.floatingInputTitles>인원 수</S.floatingInputTitles>
        <S.floatingInputs />
      </S.floatingInputWrap>
    </S.floatingFormWrap>
  );
};

export default FloatingSomWritePage1;