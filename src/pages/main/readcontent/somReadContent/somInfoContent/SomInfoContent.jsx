import React from 'react';
import S from './style';
import SomMemberList from './somMemberList/SomMemberList'
import SomLeaderInfo from './somLeader/SomLeaderInfo';
import { useRead } from '../../../../../context/ReadContext';

const SomInfoContent = () => {
  const { infoMenuSelect, somContent } = useRead();
  let content = ""

  if(infoMenuSelect === "info"){
    content = ( 
    <S.somContent dangerouslySetInnerHTML={{ __html: somContent }}>
    </S.somContent> 
    );
  } else if (infoMenuSelect === "memberList") {
    content = (
      <SomMemberList />
    )
  } else if (infoMenuSelect === "leader") {
    content = (
      <SomLeaderInfo />
    );
  } else {
    content = ( 
    <S.somContent dangerouslySetInnerHTML={{ __html: somContent }}>
    </S.somContent> 
    );
  }

  return (
    <S.somReadContentContainer>
      {content}
    </S.somReadContentContainer>
  );
};

export default SomInfoContent;