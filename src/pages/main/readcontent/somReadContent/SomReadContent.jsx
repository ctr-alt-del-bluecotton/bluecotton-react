import React from 'react';
import S from './style'
import SomInfoContent from './somInfoContent/SomInfoContent';

const SomReadContent = ({
  somMemberList,
  infoMenuSelect, 
  setInfoMenuSelect,
  somLeader,
  somInfo,
  somContent,
  somReviews
}) => {

  const { somImageName, somImagePath } = somInfo;

  const somInfoMenu = [
    { title: "정보", name: "info", onClick: () => {setInfoMenuSelect("info");} },
    { title: "함께하는 멤버", name: "memberList", onClick: () => {setInfoMenuSelect("memberList");} },
    { title: "팀장", name: "leader", onClick: () => setInfoMenuSelect("leader") }
  ]

  return (
    <S.somReadContentContainer>
      <S.somInfoMenuWrap>
        <S.somImage src={somImagePath} alt={somImageName}/>
        <S.somInfoMenu>
          {somInfoMenu.map((menu, index) => (
            <S.somButton key={index} $active={infoMenuSelect === menu.name} onClick={menu.onClick}>{menu.title}</S.somButton>
          ))}
        </S.somInfoMenu>

      </S.somInfoMenuWrap>
      <SomInfoContent somLeader={somLeader} somContent={somContent} somReviews={somReviews} infoMenuSelect={infoMenuSelect} somMemberList={somMemberList} setSomMemberList={somMemberList}/>
    </S.somReadContentContainer>
  );
};

export default SomReadContent;