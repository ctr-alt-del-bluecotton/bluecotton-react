import React from 'react';
import S from './style';
import { useRead } from '../../../../../../context/ReadContext';

const SomLeaderInfo = () => {
    const { somLeader } = useRead();
    const {
        memberName,
        memberNickname,
        memberPicturePath,
        memberPictureName,
        somReviewList
    } = somLeader;
    

    const reviewList = somReviewList.length >= 5 ? somReviewList.slice(0,5).map(({somReviewContent}, index) => (
        <S.somLeaderReviewItem bgColor={index} key={index}>
            <S.somLeaderReviewContent>{somReviewContent}</S.somLeaderReviewContent>
        </S.somLeaderReviewItem> 
    )) : somReviewList.map(({somReviewContent}, index) => (
        <S.somLeaderReviewItem bgColor={index} key={index}>
            <S.somLeaderReviewContent>{somReviewContent}</S.somLeaderReviewContent>
        </S.somLeaderReviewItem> 
    ));


    return (
        <S.somLeaderContainer>
            <S.somLeaderTitleWrap>
                <S.somLeaderTitle>팀장 소개</S.somLeaderTitle>
                <S.somLeaderContent>함께할 팀장을 알려드릴게요</S.somLeaderContent>
            </S.somLeaderTitleWrap>
            <S.somLeaderInfoWrap>
                <S.somLeaderProfileWrap>
                    <S.somLeaderProfileImage src={memberPicturePath + memberPictureName} alt={memberPictureName}/>
                    <S.somLeaderProfileTitleWrap>
                        <S.somLeaderProfileTitle>{memberName}</S.somLeaderProfileTitle>
                        <S.somLeaderProfileSubTitle>{memberNickname}</S.somLeaderProfileSubTitle>
                    </S.somLeaderProfileTitleWrap>
                </S.somLeaderProfileWrap>
                <S.somLeaderProfileTitleWrap>
                    <S.somLeaderReviewCountWrap>
                        <S.somLeaderReviewCount>{somReviewList.length}명</S.somLeaderReviewCount>
                        <S.somLeaderReviewCountCotent>리뷰참여</S.somLeaderReviewCountCotent>
                    </S.somLeaderReviewCountWrap>
                    {somReviewList.length === 0 ? (
                        <S.somLeaderNoReview>아직 리뷰가 없어요.</S.somLeaderNoReview>
                    ) : (
                    <S.somLeaderReviewList>
                        {reviewList}
                    </S.somLeaderReviewList>
                    )}
                </S.somLeaderProfileTitleWrap>
            </S.somLeaderInfoWrap>
        </S.somLeaderContainer>
    );
};

export default SomLeaderInfo;