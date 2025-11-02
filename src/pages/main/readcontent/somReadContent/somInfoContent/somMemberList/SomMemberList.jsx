import React from 'react';
import S from './style';
import SomMemberContent from '../somMemberContent/SomMemberContent';

const SomMemberList = ({somMemberList}) => {

  const list = somMemberList.map((data) => (
    <SomMemberContent memberData={data}/>
  ));

  return (
    <S.somMemberListContainer>
      <S.somMemberListTitleWrap>
        <S.somMemberListCountWrap>
          <S.somMemberListTitle>멤버 소개</S.somMemberListTitle>
          <S.somMemberCount>{somMemberList.length}명</S.somMemberCount>
        </S.somMemberListCountWrap>
        <S.somMemberListCotext>함께하는 멤버들을 알려드릴게요</S.somMemberListCotext>
      </S.somMemberListTitleWrap>
      <S.somMemberListContents>
        {list}
      </S.somMemberListContents>
    </S.somMemberListContainer>
  );
};

export default SomMemberList;