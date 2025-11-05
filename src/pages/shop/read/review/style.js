import styled from "styled-components";
import * as C from "../../../../styles/common";

const S = {};

S.ReviewSection = styled.section`
  width: 680px;
  margin: 60px 0 120px;
`;

/* 제목 + 드롭다운 정렬 */
S.ReviewRatingTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
`;

S.ReviewTitle = styled.h3`
  ${C.subtitleRegular};
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 20px;
`;

S.ReviewProduct = styled.h3`
  ${C.subtitleRegular};
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-top: 80px;
`;

S.ReviewProductWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

/* 드롭다운 */
S.DropdownArea = styled.div`
  display: flex;
  gap: 10px;
`;

S.Dropdown = styled.div`
  position: relative;
  ${C.smallText2Regular};
  padding: 8px 12px;
  width: 120px;
  background: #fff;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.PALLETE.primary.main : theme.PALLETE.grey.greyScale1};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.ArrowIcon = styled.img`
  width: 12px;
  height: 8px;
`;

S.DropdownList = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,.12);
  z-index: 10;
  overflow: hidden;
`;

S.DropdownItem = styled.li`
  padding: 8px 12px;
  ${C.smallText2Regular};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.PALLETE.primary.light0};
    color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

S.ReviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.ReviewLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

S.ReviewAverage = styled.p`
  ${C.heading3};
  color: ${({ theme }) => theme.PALLETE.basic};
`;

S.ReviewCount = styled.div`
  ${C.smallText1Light};
  display: flex;
  align-items: center;
  gap: 8px;
  img { 
    width: 18px; 
    height: 18px; 
  }

  span {
    display: inline-block;
    transform: translateY(1px);
  }
`;

S.ReviewRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

S.ReviewRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

S.ReviewLabel = styled.span`
  ${C.smallText2Regular};
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  width: 16px;
  text-align: right;
  margin-right: 7px; 
`;

S.ReviewBar = styled.div`
  width: 500px;
  height: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
  overflow: hidden;
`;

S.ReviewFill = styled.div`
  height: 100%;
  width: ${({ percent }) => percent + "%"};
  background-color: ${({ theme }) => theme.PALLETE.review};
  border-radius: 10px;
  transition: width 0.3s ease;
`;

S.ReviewCountText = styled.span`
  ${C.smallText2Regular};
  color: ${({ theme }) => theme.PALLETE.basic};
  width: 16px;
  text-align: right;
  min-width: 40px;
`;



/* 리뷰 아이템 */
S.ReviewItem = styled.div`
  padding: 30px 0 0;
`;

S.ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

S.ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

S.UserInfoWrap = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

S.StarRow = styled.div`
  display: flex;
  gap: 2px;
`;

S.StarIcon = styled.img`
  width: 19px;
  height: 18px;
  object-fit: contain;
  ${({ $filled }) =>
    !$filled &&
    `
      filter: grayscale(1) brightness(0.7);
    `}
`;

S.UserMeta = styled.div`
  display: flex;
  align-items: center;
  line-height: 1;
`;

S.UserName = styled.span`
  ${C.smallText2Light};
  color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
`;

S.Dot = styled.span`
  color: ${({ theme }) => theme.PALLETE.grey.greyScale2};
  margin: 0 6px;
`;

S.ReviewDate = styled.span`
  ${C.smallText2Light};
  color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
`;

S.ReportButton = styled.button`
  ${C.smallText2Light};
  color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
  background: none;
  border: 0;
  display: inline-flex;  
  cursor: pointer;
`;

S.ReviewImage = styled.div`
  margin-top: 12px;
  width: 145px;
  height: 145px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  background: #f6f6f6;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

S.ReviewText = styled.p`
  ${C.smallText3Light};
  color: ${({ theme }) => theme.PALLETE.basic};
  margin: 12px 0 0;
  white-space: pre-line;
`;


S.HelpfulButton = styled.button`
  ${C.smallText2Light};
  font-family: 'Daeojamjil', sans-serif;
  width: 108px;
  height: 38px;
  border-radius: 4px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.PALLETE.primary.main : theme.PALLETE.grey.greyScale1};
  background: ${({ $active, theme }) =>
    $active ? theme.PALLETE.primary.main : "#fff"};
  color: ${({ $active, theme }) => ($active ? "#fff" : theme.PALLETE.basic)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  gap: 6px;
  cursor: pointer;

  img {
    width: 14px;
    height: 14px;
    object-fit: contain;
    filter: ${({ $active }) => ($active ? "invert(1) brightness(1.8)" : "none")};
    transition: filter 0.2s ease;
  }
`;

S.ReviewDivider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.PALLETE.grey.greyScale1};
  margin-top: 24px;
`;

S.ReviewFilters = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

S.ReviewSelect = styled.select`
  min-width: 80px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
  background-color: #fff;
  padding: 0 32px 0 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
  color: ${({ theme }) => theme.PALLETE.basic};
  cursor: pointer;
  appearance: none;

  background-image: url("/assets/icons/drop_down.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 10px 5px;

  &:focus {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
    outline: none;
    background-image: url("/assets/icons/drop_down_acv.svg");
  }

  &:focus-visible {
    outline: none;
  }
`;

export default S;
