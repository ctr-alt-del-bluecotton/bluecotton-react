import React from 'react';
import S from './style';

const SomLeaderInfo = ({somLeader, somReviews}) => {
    const {
        memberName,
        memberInfo,
        memberProfilePath,
        memberProfileName
    } = somLeader;
    
    const reviewResult = [];

    const feedbackOptions = [
        '챌린지 난이도가 적당했어요',
        '미션 설명이 이해하기 쉬웠어요',
        '챌린지 기간이 적당했어요',
        '굿즈, 리워드가 만족스러워요',
        '팀장이 피드백을 자주 남겨줘요',
        '팀장이 응원과 칭찬을 많이 해줘요',
        '팀장이 미션 질문에 잘 답해줘요',
        '팀장이 전체 메시지를 잘 올려요',
        '팀장이 활동기록을 잘 정리해줘요',
        '팀장이 늦은 인증도 잘 관리해줘요',
        '팀장이 나에게 관심을 가져줘요',
        '팀장이 미션 실패자도 챙겨줘요',
        '팀장이 힘이 되어줘요',
        '팀장이 나의 일상을 응원해줘요',
        '팀장이 꼼꼼하고 세심해요',
        '팀장이 재밌고 유쾌해요',
        '팀장이 소통이 잘돼요',
        '팀장이 사진/글을 정성껏 남겨줘요',
        '팀장이 규칙을 잘 안내해줘요',
        '팀장이 팀원 참여율을 잘 관리해줘요'
    ];

    for(let i = 0; i < 20; i++){
        let trueValue = i + 1;
        reviewResult.push(
            {
                reviewContentId: trueValue,
                reviewContent: feedbackOptions[i], 
                reviewCount: somReviews.filter(({reviewContent}) => reviewContent === i).length
            } 
        );
    }

    const reviewList = reviewResult.sort((a,b) => b.reviewCount - a.reviewCount)
    .slice(0,5).map(({reviewContent, reviewCount}, index) => (
        <S.somLeaderReviewItem bgColor={index} key={index}>
            <S.somLeaderReviewContent>{reviewContent}</S.somLeaderReviewContent>
            <S.somLeaderReviewCotentCount>{reviewCount}</S.somLeaderReviewCotentCount>
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
                    <S.somLeaderProfileImage src={memberProfilePath} alt={memberProfileName}/>
                    <S.somLeaderProfileTitleWrap>
                        <S.somLeaderProfileTitle>{memberName}</S.somLeaderProfileTitle>
                        <S.somLeaderProfileSubTitle>{memberInfo}</S.somLeaderProfileSubTitle>
                    </S.somLeaderProfileTitleWrap>
                </S.somLeaderProfileWrap>
                <S.somLeaderProfileTitleWrap>
                    <S.somLeaderReviewCountWrap>
                        <S.somLeaderReviewCount>{somReviews.length}명</S.somLeaderReviewCount>
                        <S.somLeaderReviewCountCotent>리뷰참여</S.somLeaderReviewCountCotent>
                    </S.somLeaderReviewCountWrap>
                    <S.somLeaderReviewList>
                        {reviewList}
                    </S.somLeaderReviewList>
                </S.somLeaderProfileTitleWrap>
            </S.somLeaderInfoWrap>
        </S.somLeaderContainer>
    );
};

export default SomLeaderInfo;