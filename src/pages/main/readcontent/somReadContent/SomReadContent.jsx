import React from 'react';
import S from './style'
import SomInfoContent from './somInfoContent/SomInfoContent';
import { useRead } from '../../../../context/ReadContext';

const SomReadContent = () => {
  const { somInfo, infoMenuSelect, setInfoMenuSelect } = useRead();
  const { 
    somTitleImagePath,
    somTitleImageName 
  } = somInfo;

  const somInfoMenu = [
    { title: "정보", name: "info", onClick: () => {setInfoMenuSelect("info");} },
    { title: "함께하는 멤버", name: "memberList", onClick: () => {setInfoMenuSelect("memberList");} },
    { title: "팀장", name: "leader", onClick: () => setInfoMenuSelect("leader") }
  ]

  return (
    <S.somReadContentContainer>
      <S.somInfoMenuWrap>
        <S.somImage src={somTitleImagePath} alt={somTitleImageName}/>
        <S.somInfoMenu>
          {somInfoMenu.map((menu, index) => (
            <S.somButton key={index} $active={infoMenuSelect === menu.name} onClick={menu.onClick}>{menu.title}</S.somButton>
          ))}
        </S.somInfoMenu>

      </S.somInfoMenuWrap>
      <SomInfoContent />
    </S.somReadContentContainer>
  );
};

export default SomReadContent;