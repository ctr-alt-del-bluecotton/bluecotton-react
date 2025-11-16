import React, { useState } from "react";
import S from "./style";
import { useNavigate } from "react-router-dom";
import { useMain } from "../../../context/MainContext";

const SomContent = ({ content }) => {
  const nav = useNavigate();
  const { formatDate, 
    somLikeUpdate } = useMain();
  const {
    id,
    somTitle,
    somAddress,
    somStartDate,
    somType,
    somEndDate,
    somCount,
    isSomLike,
    somLikeCount,
    memberSomLeader,
    somTitleImagePath,
    somTitleImageName
  } = content;
  const [ isLike, setIsLike ] = useState(isSomLike);
  const [ likeCount, setLikeCount ] = useState(somLikeCount);

  const isLikeButtonOnclick = async (e) => {
    await somLikeUpdate(id, isLike)
    .then((res) => res)
    .then(async (res) => {
      const resData = await res.json();
      setIsLike(resData.data.resultLike)
      setLikeCount(resData.data.likeCount)
    })
  }


  const somTypeText = somType === "solo" ? "솔로솜" : "파티솜"
  const isLikeButton = isLike ?
  <S.LikeButton onClick={isLikeButtonOnclick} $isLike={true}>
    <S.somLikeIcon src="../../assets/icons/som_read_like_active.png" alt="좋아요 아이콘"/> {/* 여기 하트 아이콘 들어갈 자리 ♥ */}
    <span>
      {likeCount}
    </span>
  </S.LikeButton> :
  <S.LikeButton onClick={isLikeButtonOnclick} $isLike={false}>
    <S.somLikeIcon src="../../assets/icons/som_read_like_inactive.png" alt="좋아요 아이콘"/> {/* 여기 하트 아이콘 들어갈 자리 ♡ */}
    <span>
      {likeCount}
    </span>
  </S.LikeButton> ;

  const somOnClick = () => nav(`/main/som/read/${id}`);

  const somButton = somType === "solo" ? <S.SomButton onClick={somOnClick}>참여 - {somTypeText}({somCount})</S.SomButton> 
  : <S.PartySomButton onClick={somOnClick}>참여 - {somTypeText}({somCount})</S.PartySomButton>
  ;

  return (
    <S.Card>
      <S.SomImage onClick={somOnClick} bgsrc={somTitleImagePath} alt={somTitleImageName} />
      <S.SomInfo>
        <S.SomTitleArea onClick={somOnClick}>
          <img src={memberSomLeader.memberPicturePath + memberSomLeader.memberPictureName} alt={memberSomLeader.memberPictureName} />
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
        {somType === "solo" && <S.SomButton onClick={() => somOnClick()}>귓솜말하기</S.SomButton>}
        {somButton}
        {isLikeButton}
      </S.SomButtonArea>
    </S.Card>
  );
};

export default SomContent;
