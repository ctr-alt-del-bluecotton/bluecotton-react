import React from 'react';
import S from './style'
import { useRead } from '../../../../context/ReadContext';

const SomReadInfo = () => {
  const { somInfo, somIsLike, setSomIsLike } = useRead();
  const {
    somTitle,
    somCategory,
    somAddress,
    somStartDate,
    somCount,
    somLikeCount
  } = somInfo


  // 증가 쿼리 fetch 예정
  const somLikeButtonOnclick = () => {
    setSomIsLike(!somIsLike);
  } 

  const somOnClick = () => { alert("참여쿼리 들어갈 곳") };

  const somButton = <S.somButton onClick={somOnClick}>참여 ({somCount}/10)</S.somButton> 
  ;

  const somLikeButton =
    <S.somLikeButton onClick={somLikeButtonOnclick}>
      <S.somLikeIcon src='../../../../assets/icons/som_read_like_active.png' alt='솜 좋아요 true'/>
      <S.somLikeCount>{somLikeCount}</S.somLikeCount>
    </S.somLikeButton>

  return (
    <S.somInfoWrap>
      <S.somCategoryWrap>
        <S.somCategoryIcon src='../../../../assets/icons/som_read_category_icon.png' alt="카테고리 아이콘"/>
        <S.somCategoryTitle>카테고리</S.somCategoryTitle>
        <span>{'>'}</span>
        <S.somCategory>{somCategory}</S.somCategory>
      </S.somCategoryWrap>
      <S.somTitle>{somTitle}</S.somTitle>
      <S.somCountWrap>
        <S.somCountIcon src='./../../../assets/icons/som_read_people_icon.png' alt="인원수 아이콘"/>
        <S.somCount>{somCount} 명</S.somCount>
      </S.somCountWrap>
      <S.somDateWrap>
        <S.somStartDateWrap>
          <S.somDateIcon src='../../../../assets/icons/som_read_calendar.png'/>
          <S.somStartDateTitle>시작 날짜</S.somStartDateTitle>
          <S.somStartDate>{somStartDate}</S.somStartDate>
        </S.somStartDateWrap>
        <S.somEndDateWrap>
          <S.somDateIcon src='../../../../assets/icons/som_read_calendar.png'/>
          <S.somEndDateTitle>종료 날짜</S.somEndDateTitle>
          <S.somEndDate>{somStartDate}</S.somEndDate>
        </S.somEndDateWrap>
      </S.somDateWrap>
      <S.somAddressWrap>
        <S.somAddressIcon src='../../../assets/icons/som_read_location.png'/>
        <S.somAddress>{somAddress}</S.somAddress>
      </S.somAddressWrap>
      <S.somButtonWrap>
        <S.somButton>귓솜말하기</S.somButton>
        {somButton}
        {somLikeButton}
      </S.somButtonWrap>
    </S.somInfoWrap>
  );
};

export default SomReadInfo;