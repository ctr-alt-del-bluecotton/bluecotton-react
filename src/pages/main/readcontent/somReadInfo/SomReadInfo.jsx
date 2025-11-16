
import S from './style'
import { useRead } from '../../../../context/ReadContext';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const SomReadInfo = () => {
  const { isLogin, currentUser } = useSelector((state) => state.user);
  const { somInfo, formatDate, 
    somJoinSoloSom, somJoin, 
    somJoinNotLogin, somLikeUpdate, 
    somMemberList, somCategoryInfo, 
    wisperSoloSom, isLater } = useRead();
  const {
    id,
    somTitle,
    somAddress,
    somStartDate,
    somType,
    isSomLike,
    somEndDate,
    somCount,
    somLikeCount
  } = somInfo

  const [ isLike, setIsLike ] = useState(isSomLike);
  const [ likeCount, setLikeCount ] = useState(somLikeCount); 
  
  

  // 증가 쿼리 fetch 예정
  const isLikeButtonOnclick = async (e) => {
    await somLikeUpdate(id, isLike)
    .then((res) => res)
    .then(async (res) => {
      const resData = await res.json();
      setIsLike(resData.data.resultLike)
      setLikeCount(resData.data.likeCount)
    })
  }
  const somTypeText = somType === "solo" ? "솔로솜" : "파티솜";
  
  // 참여 버튼 클릭 핸들러
  const somOnClick = () => {
    // 1. 솔로솜인 경우 - 솔로솜 모달 표시
    if (somType === "solo") {
      somJoinSoloSom();
      return;
    }
    
    // 2. 파티솜인 경우
    // 2-1. 로그인 안 되어 있으면 로그인 모달
    if (!isLogin) {
      somJoinNotLogin();
      return;
    }
    
    // 2-2. 이미 참여 중인지 확인
    const isAlreadyJoined = somMemberList && currentUser && somMemberList.some((member) => member.memberId === currentUser.id);
    if (isAlreadyJoined) {
      // 이미 참여중 모달 표시 (somJoin 함수에서 처리)
      somJoin();
      return;
    }
    
    // 2-3. 파티솜이고 로그인되어 있고 참여 안 되어 있으면 참여 쿼리 실행
    // somJoin 함수에서 참여 확인 모달을 띄우고 참여 쿼리 실행
    somJoin();
  };

  const isSolo = somType === "solo" ;
  const somButton = !isSolo ? <S.soloSomButton onClick={somOnClick}>참여 - {somTypeText}({somCount})</S.soloSomButton>
  : <S.fullSomButton onClick={somOnClick}>참여 - {somTypeText}({somCount})</S.fullSomButton> ;

  const somLikeButton = isLike ?
    <S.somLikeButton onClick={isLikeButtonOnclick}>
      <S.somLikeIcon src='../../../../assets/icons/som_read_like_active.png' alt='솜 좋아요 true'/>
      <S.somLikeCount>{likeCount}</S.somLikeCount>
    </S.somLikeButton> :
    <S.somLikeButton onClick={isLikeButtonOnclick}>
      <S.somLikeIcon src='../../../../assets/icons/som_read_like_inactive.png' alt='솜 좋아요 true'/>
      <S.somLikeCount>{likeCount}</S.somLikeCount>
    </S.somLikeButton>

  return (
    <S.somInfoWrap>
      <S.somCategoryWrap>
        <S.somCategoryIcon src='../../../../assets/icons/som_read_category_icon.png' alt="카테고리 아이콘"/>
        <S.somCategoryTitle>카테고리</S.somCategoryTitle>
        <span>{'>'}</span>
        <S.somCategory>{somCategoryInfo}</S.somCategory>
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
        { !isLater ? 
        '기간이 지난 솜입니다.' : 
        <>
          {isSolo && <S.somButton onClick={() => wisperSoloSom(somTitle)}>귓솜말하기</S.somButton>}
          {somButton}
          {somLikeButton}
        </>
        }
        
      </S.somButtonWrap>
    </S.somInfoWrap>
  );
};

export default SomReadInfo;