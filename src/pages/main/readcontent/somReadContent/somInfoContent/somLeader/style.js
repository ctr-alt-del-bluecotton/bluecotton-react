import styled from "styled-components";

import { paragraphRegular, smallText3Regular } from '../../../../../../styles/common';

const S = {};

S.somLeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
`

S.somLeaderTitleWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    gap: 10px;
`

S.somLeaderTitle = styled.div`
    ${paragraphRegular}
    color: ${({ theme }) => theme.PALLETE.basic};
`

S.somLeaderInfoWrap = styled.div`
    display: flex;
    flex-direction: column;
    padding: 35px;
    gap: 10px;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
`


S.somLeaderContent = styled.div`
    ${smallText3Regular}
    color: ${({ theme }) => theme.PALLETE.grey.greyScale2};
`

S.somLeaderProfileWrap = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`

S.somLeaderProfileImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 100%;
    object-fit: cover;
    border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale3};
`

S.somLeaderReviewCountWrap = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    gap: 10px;
    margin-bottom: 10px;
`

S.somLeaderReviewCountCotent = styled.div`
    ${paragraphRegular}
    color: ${({ theme }) => theme.PALLETE.grey.greyScale2};
`

S.somLeaderReviewCount = styled.div`
    ${paragraphRegular}
    color: ${({ theme }) => theme.PALLETE.primary.light1};
`

S.somLeaderNoReview = styled.div`
    ${smallText3Regular}
    color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
`


S.somLeaderProfileTitleWrap = styled.div`

`

S.somLeaderProfileTitle = styled.div`

`

S.somLeaderProfileSubTitle = styled.div`

`

S.somLeaderName = styled.div`

`

S.somLeaderReviewList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

S.somLeaderReviewItem = styled.div`
    display: flex;
    border-radius: 4px;
    background-color: ${({ bgColor }) => {
        const colors = [ ({ theme }) => theme.PALLETE.primary.light1, "#5a9bf8", "#83b4fa", "#adcdfb", "#d6e6fd"];
        return colors[bgColor % colors.length];
    }};
    justify-content: space-between;
    padding: 15px 20px;
`

S.somLeaderReviewContent = styled.div`
    ${smallText3Regular}
    color: ${({ theme }) => theme.PALLETE.basic};
`

S.somLeaderReviewCotentCount = styled.div`
    ${smallText3Regular}
    color: ${({ theme }) => theme.PALLETE.basic};
`

export default S;