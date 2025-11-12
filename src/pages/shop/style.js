import styled from "styled-components";
import * as C from "../../styles/common";

const S = {};

/* ──────────────────────────────────────────────
   1) 페이지 레이아웃 / 컨테이너
────────────────────────────────────────────── */
S.Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

S.Container = styled.div`
  width: 1160px;
  margin: 0 auto;
  display: flex; 
  align-items: flex-start;
  justify-content: space-between;
  gap: 40px; 
`;

/* ──────────────────────────────────────────────
   2) 배너
────────────────────────────────────────────── */
S.Banner = styled.section`
  width: 1160px;
  position: relative;
  height: 250px;
  margin: 40px auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  background: url("/assets/images/shop_banner.png") center/cover no-repeat;
`;

S.BannerTextBox = styled.div`
  position: absolute;
  left: 80px;
  top: 50%;
  transform: translateY(-50%);
  color: #000;
`;

S.BannerTitle = styled.h2`
  ${C.heading4}
  ${C.basic}
  font-weight: 700;
  margin-bottom: 10px;
`;

S.BannerDesc = styled.p`
  ${C.smallText1Regular}
  ${C.basic}
  line-height: 1.5;
`;

/* ──────────────────────────────────────────────
   3) 정렬 바 (드롭다운 등)
────────────────────────────────────────────── */
S.SortTopLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
  margin-bottom: 10px;
`;

S.SortBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 4px; 
  padding-bottom: 0;
`;

S.SortSelect = styled.select`
  min-width: 10px;
  height: 30px;
  border: 0;
  background-color: transparent;
  padding: 0 32px 0 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
  color: ${({ theme }) => theme.PALLETE.basic};
  cursor: pointer;
  appearance: none;
  position: relative;
  top: 2px; 
  font-family: 'Daeojamjil', sans-serif;


  background-image: url("/assets/icons/drop_down.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 10px 5px;

  &:focus {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
    outline: none;
    background-image: url("/assets/icons/drop_down_acv.svg");
    background-size: 10px 5px;
  }

  &:focus-visible {
    outline: none;
  }

  &::-ms-expand {
    display: none;
  }
`;

S.DropdownWrap = styled.div`
  position: relative;
`;

S.DropdownButton = styled.button`
  width: 120px;
  height: 30px;
  
  ${C.smallText1Regular}
  ${C.basic}
  background: #fff;
  border: none;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

S.ArrowIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  height: 5px;

  img {
    width: 10px;
    height: 5px;
    display: block;
  }
`;

S.DropdownList = styled.ul`
  position: absolute;
  top: 40px;
  width: 120px;
  background: #fff;
  box-shadow: -3px 3px 12px rgba(0, 0, 0, 0.25);
  z-index: 10;
`;

S.DropdownItem = styled.li`
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  ${C.smallText1Light}
  ${C.basic}
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.main};
    color: #fff;
    font-weight: 700;
  }

  ${({ $active, theme }) =>
    $active &&
    `
    background-color: ${theme.PALLETE.primary.main};
    color: #fff;
    font-weight: 700;
  `}
`;

S.SortRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 30px;
  padding-right: 10px;
  ${C.smallText1Regular}
  ${C.fontGreyScale3}
`;

S.Total = styled.span`
  ${C.smallText1Bold}
  ${C.basic}
`;

S.SortBottomLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
  margin: 10px 0 32px 0;
`;

/* ──────────────────────────────────────────────
   4) 왼쪽 필터 영역
────────────────────────────────────────────── */
S.LeftFilter = styled.div`
  flex-shrink: 0;
  width: 200px;
`;

S.FilterGroup = styled.div`
  margin-bottom: 40px;
`;

S.FilterTitle = styled.h3`
  ${C.smallText3Bold}
  ${C.basic}
  margin-bottom: 20px;
`;

S.CatagoryTopBar = styled.div`
  width: 200px;
  height: 1px;
  ${C.backgroundGreyScale1}
  margin-bottom: 24px;
`;

S.Label = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 10px 0;
  cursor: pointer;
  ${C.smallText2Regular}
  ${C.basic}
  color: ${({ $active, theme }) => ($active ? theme.PALLETE.primary.main : "inherit")};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
`;

S.Checkbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 1px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  background-color: #fff;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }

  &:checked {
    background-color: ${({ theme }) => theme.PALLETE.primary.main};
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
    background-image: url("/assets/icons/checkicon.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 11px 9px;
  }
`;

/* ──────────────────────────────────────────────
   5) 상품 리스트 (오른쪽)
────────────────────────────────────────────── */
S.Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;


S.ProductArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

S.CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px 16px;
  justify-content: flex-start;
`;

S.Card = styled.article`
  width: 218px;
  position: relative;
`;

S.ProductImageBox = styled.div`
  width: 218px;
  height: 290px;
  position: relative;
  background-image: url(${props => props.$bg});
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat
  
`;

/* 찜 하기 버튼 */
S.LikeButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 2;

  background: url("/assets/icons/circle.svg") center/contain no-repeat;

  &::after {
    content: "";
    display: block;
    width: 14px;
    height: 13px;
    margin: 0 auto;
    background: url("/assets/icons/favorite.svg") center/contain no-repeat;
    transition: background-image 0.2s ease;
  }


  ${({ $active }) =>
    $active &&
    `
    &::after {
      background: url("/assets/icons/filedlike.svg") center/contain no-repeat;
    }
  `}
`;

/* ──────────────────────────────────────────────
   6) 상품 텍스트/가격
────────────────────────────────────────────── */
S.ProductTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
`;

S.ProductName = styled.p`
  ${C.smallText2Bold}
  ${C.basic}
`;

S.ProductPrice = styled.p`
  margin-top: 6px;
  margin-bottom: 16px;
  ${C.smallText3Bold}
  ${C.basic}
`;

S.NewTag = styled.span`
  ${C.smallText0Bold}
  padding: 1px 4px;
  display: inline-block;
  color: ${({ theme }) => theme.PALLETE.secondary.main};
  background-color: rgba(248, 59, 170, 0.1);
`;

S.BestTag = styled.span`
  ${C.smallText0Bold}
  padding: 1px 4px;
  display: inline-block;
  color: ${({ theme }) => theme.PALLETE.primary.main};
  background-color: rgba(0, 81, 255, 0.1);
`;

S.ProductSubInfo = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

S.IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
    
  img {
    width: 12px;   
    height: 12px;
    object-fit: contain;
    vertical-align: middle; 
    margin-bottom: 2px;
  }
`;

S.Text = styled.span`
  ${C.smallText1Regular}
  ${C.basic}
`;

S.Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0 80px;
`;

S.PageBtn = styled.button`
  min-width: 36px;
  height: 36px;
  margin: 0 4px;
  border-radius: 8px;
  border: 1px solid ${({ $active, theme }) => ($active ? theme.PALLETE.primary.main : "#ddd")};
  background: ${({ $active, theme }) => ($active ? theme.PALLETE.primary.main : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#333")};
  cursor: pointer;
`;



export default S;