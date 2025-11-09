import React from "react";
import S from "./style";
import { useNavigate } from "react-router-dom";
import { useMain } from "../../../context/MainContext";

const SomContent = ({ content, somisLike }) => {
  const nav = useNavigate();
  const { somisLikeList, setSomisLikeList, formatDate } = useMain();
  const {
    id,
    somTitle,
    somImagePath,
    somAddress,
    somStartDate,
    somEndDate,
    somCount,
    somLike,
    memberName,
    meberProfilePath
  } = content;

  // 증가 쿼리 예정
  const isLikeButtonOnclick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setSomisLikeList(
      somisLikeList.map((item) =>
        String(item.somId) === String(id)
          ? { ...item, isLike: !item?.isLike }
          : item
    ));
  }


  const isLike = somisLike?.isLike ?? false;
  const isLikeButton = isLike ?
  <S.LikeButton onClick={isLikeButtonOnclick} $isLike={true}>
    <S.somLikeIcon src="../../assets/icons/som_read_like_active.png" alt="좋아요 아이콘"/> {/* 여기 하트 아이콘 들어갈 자리 ♥ */}
    <span>
      {somLike}
    </span>
  </S.LikeButton> :
  <S.LikeButton onClick={isLikeButtonOnclick} $isLike={false}>
    <S.somLikeIcon src="../../assets/icons/som_list_like_inactive.png" alt="좋아요 아이콘"/> {/* 여기 하트 아이콘 들어갈 자리 ♡ */}
    <span>
      {somLike}
    </span>
  </S.LikeButton> ;

  const somOnClick = () => nav(`/main/som/read/${id}`);

  const somButton = <S.SomButton onClick={somOnClick}>참여 ({somCount}/)</S.SomButton> 
  ;

  return (
    <S.Card>
      <S.SomImage onClick={somOnClick} bgsrc={somImagePath} alt={somTitle} />
      <S.SomInfo>
        <S.SomTitleArea onClick={somOnClick}>
          <img src={meberProfilePath} alt={memberName} />
          <S.SomTitle>{somTitle}</S.SomTitle>
        </S.SomTitleArea>
        <S.SomExplanation>
          <S.SomExplantionArea>
            <S.SomExplanationInfo>
              <S.SomLocationIcon src="../../assets/icons/som_list_location_icon.png" alt="위치 아이콘"/>
              {somAddress}
            </S.SomExplanationInfo>
              {formatDate(somStartDate).split(' ')[0]}
          </S.SomExplantionArea>
          <S.SomExplantionArea>
            <S.SomExplanationInfo>
              <S.SomDateIcon src="../../assets/icons/som_list_date_icon.png" alt="날짜 아이콘"/>
              솜 마감일
            </S.SomExplanationInfo>
              {formatDate(somEndDate).split(' ')[0]}
          </S.SomExplantionArea>
        </S.SomExplanation>
      </S.SomInfo>
      <S.SomButtonArea>
        <S.SomButton>귓솜말하기</S.SomButton>
        {somButton}
        {isLikeButton}
      </S.SomButtonArea>
    </S.Card>
  );
};

export default SomContent;
