import React from 'react';
import S from './style';

const SomMemberContent = ({memberData}) => {
  const {
    memberName,
    memberProfilePath,
    memberProfileName
  } = memberData

  return (
    <S.memberInfoContainer>
      <S.memberInfoIamge src={memberProfilePath + memberProfileName} alt={memberProfileName}/>
      <S.memberInfoName>{memberName}</S.memberInfoName>
    </S.memberInfoContainer>
  );
};
export default SomMemberContent;