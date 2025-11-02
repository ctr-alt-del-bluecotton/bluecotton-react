import React from 'react';
import S from './style';
import SomMemberList from './somMemberList/SomMemberList'
import SomLeaderInfo from './somLeader/SomLeaderInfo';

const SomInfoContent = ({
  infoMenuSelect, 
  somMemberList, 
  somLeader, 
  somReviews, 
  somContent
}) => {
  let content = ""

  if(infoMenuSelect === "info"){
    content = ( 
    <S.somContent dangerouslySetInnerHTML={{ __html: somContent }}>
    </S.somContent> 
    );
  } else if (infoMenuSelect === "memberList") {
    content = (
      <SomMemberList somMemberList={somMemberList} />
    )
  } else if (infoMenuSelect === "leader") {
    content = (
      <SomLeaderInfo somReviews={somReviews} somLeader={somLeader}/>
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