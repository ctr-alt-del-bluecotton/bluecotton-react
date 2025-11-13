
import S from './style'
import { useRead } from '../../../../context/ReadContext';
import { useSelector } from 'react-redux';

const SomReadInfo = () => {
  const { isLogin } = useSelector((state) => state.user);
  const { somInfo, somIsLike, setSomIsLike, formatDate, somJoinSoloSom, somJoin, somJoinNotLogin } = useRead();
  const {
    somTitle,
    somCategory,
    somAddress,
    somStartDate,
    somType,
    somEndDate,
    somCount,
    somLike
  } = somInfo

  

  // 증가 쿼리 fetch 예정
  const somLikeButtonOnclick = () => {
    setSomIsLike(!somIsLike);
  } 
  const somTypeText = somType === "solo" ? "솔로솜" : "파티솜";
  const somOnClick = somType !== "solo" ? () => { isLogin ? somJoin() :  somJoinNotLogin() } :  () => { somJoinSoloSom() };

  const somButton = somType !== "solo" ? <S.somButton onClick={somOnClick}>참여 - {somTypeText}({somCount})</S.somButton>
  : <S.fullSomButton onClick={somOnClick}>참여 - {somTypeText}({somCount})</S.fullSomButton> ;

  const somLikeButton =
    <S.somLikeButton onClick={somLikeButtonOnclick}>
      <S.somLikeIcon src='../../../../assets/icons/som_read_like_active.png' alt='솜 좋아요 true'/>
      <S.somLikeCount>{somLike}</S.somLikeCount>
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
          <S.somStartDate>{formatDate(somStartDate)}</S.somStartDate>
        </S.somStartDateWrap>
        <S.somEndDateWrap>
          <S.somDateIcon src='../../../../assets/icons/som_read_calendar.png'/>
          <S.somEndDateTitle>종료 날짜</S.somEndDateTitle>
          <S.somEndDate>{formatDate(somEndDate)}</S.somEndDate>
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