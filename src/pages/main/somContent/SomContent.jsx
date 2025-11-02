import React from "react";
import S from "./style";
import { useNavigate } from "react-router-dom";

const SomContent = ({ content, somisLike, setSomisLikeList, somisLikeList }) => {
  const nav = useNavigate();
  const {
    id,
    somTitle,
    somImagePath,
    somAddress,
    somStartDate,
    somEndDate,
    somCount,
    somLikeCount,
    memberName,
    meberProfilePath
  } = content;

  // 증가 쿼리 예정
  const isLikeButtonOnclick = () => {
    setSomisLikeList(
      somisLikeList.map((item) =>
        String(item.somId) === String(id)
          ? { ...item, isLike: !item.isLike }
          : item
    ));
  }


  const isLike = somisLike.isLike;
  const isLikeButton = isLike ?
  <S.LikeButton onClick={isLikeButtonOnclick} $isLike={true}>
    <S.somLikeIcon src="../../assets/icons/som_read_like_active.png" alt="좋아요 아이콘"/> {/* 여기 하트 아이콘 들어갈 자리 ♥ */}
    <span>
      {somLikeCount}
    </span>
  </S.LikeButton> :
  <S.LikeButton onClick={isLikeButtonOnclick} $isLike={false}>
    <S.somLikeIcon src="../../assets/icons/som_list_like_inactive.png" alt="좋아요 아이콘"/> {/* 여기 하트 아이콘 들어갈 자리 ♡ */}
    <span>
      {somLikeCount}
    </span>
  </S.LikeButton> ;

  const isFull = somCount === 10;
  const isFullOnClick = () => nav(`/main/som/read/${id}`);

  const isFullSomButton = isFull ? 
  <S.FullSomButton onClick={isFullOnClick}>참여 ({somCount}/10)</S.FullSomButton> :
  <S.SomButton onClick={isFullOnClick}>참여 ({somCount}/10)</S.SomButton> 
  ;

  console.log("somImagePath:", somImagePath);

  return (
    <S.Card>
      <S.SomImage onClick={isFullOnClick} bgsrc={somImagePath} alt={somTitle} />
      <S.SomInfo>
        <S.SomTitleArea onClick={isFullOnClick}>
          <img src={meberProfilePath} alt={memberName} />
          <S.SomTitle>{somTitle}</S.SomTitle>
        </S.SomTitleArea>
        <S.SomExplanation>
          <S.SomExplantionArea>
            <S.SomExplanationInfo>
              <S.SomLocationIcon src="../../assets/icons/som_list_location_icon.png" alt="위치 아이콘"/>
              {somAddress}
            </S.SomExplanationInfo>
              {somStartDate}
          </S.SomExplantionArea>
          <S.SomExplantionArea>
            <S.SomExplanationInfo>
              <S.SomDateIcon src="../../assets/icons/som_list_date_icon.png" alt="날짜 아이콘"/>
              솜 마감일
            </S.SomExplanationInfo>
              {somEndDate}
          </S.SomExplantionArea>
        </S.SomExplanation>
      </S.SomInfo>
      <S.SomButtonArea>
        <S.SomButton>귓솜말하기</S.SomButton>
        {isFullSomButton}
        {isLikeButton}
      </S.SomButtonArea>
    </S.Card>
  );
};

export default SomContent;
