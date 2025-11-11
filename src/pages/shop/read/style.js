import styled from "styled-components";
import * as C from "../../../styles/common";

const S = {};

/*  페이지 전체 레이아웃 */
S.Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

/* 상품 상세 페이지 비율 */
S.DetailContainer = styled.div`
  width: 1160px;
  margin: 60px auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 40px;
`;

S.Left = styled.div``;

S.Right = styled.div`
  position: sticky;
  top: 100px;
  align-self: flex-start;
  height: fit-content;
`;

/* 메인 이미지 */
S.MainImage = styled.div`
  width: 680px;
  height: 680px;
  overflow: hidden;
  background: #f6f6f6;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;    
    object-position: center; 
    display: block;
  }
`;

S.SubImageArea = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  justify-content: flex-start;
`;

S.SubImage = styled.button`
  width: 100px;
  height: 100px;
  overflow: hidden;
  border: none;
  background: #fff;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/* 상품 정보 (우측) */
S.TagRow = styled.div`
  display: flex;
  gap: 4px;
`;

S.DetailNewTag = styled.span`
  ${C.smallText0Bold};
  color: ${({ theme }) => theme.PALLETE.secondary.main};
  background-color: rgba(248, 59, 170, 0.1);
  padding: 1px 4px;
`;

S.DetailBestTag = styled.span`
  ${C.smallText0Bold};
  color: ${({ theme }) => theme.PALLETE.primary.main};
  background-color: rgba(0, 81, 255, 0.1);
  padding: 1px 4px;
`;

S.Title = styled.h1`
  ${C.paragraphRegular};
  ${C.basic};
  margin-top: 12px;
  margin-bottom: 6px;
`;

S.DetailPrice = styled.div`
  ${C.titleBold};
  margin-bottom: 8px;
`;

S.DetailReviewWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  line-height: 1;
  margin-bottom: 40px;
`;

S.Icon = styled.img`
  width: 16px;
  height: 16px;
  display: block;
  object-fit: contain;
  margin-bottom: 2px;
`;

S.Text = styled.span`
  ${C.smallText2Light};
  
`;

/* 배송 정보 */
S.DeliveryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
`;

S.Divider = styled.div`
  width: 1px;
  height: 12px;
  background: ${({ theme }) => theme.PALLETE.grey.greyScale1};
`;

S.Delivery = styled.div`
  ${C.fontGreyScale4};
`;

S.DeliveryCharge = styled.div``;

S.DeliveryInfo = styled.div`
  ${C.smallText2Light};
  ${C.fontGreyScale3};
  margin-bottom: 14px;
`;

/* 수량 선택 */
S.CountWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 12px 0;
`;

S.DeliveryCount = styled.div`
  ${C.fontGreyScale4};
`;

S.CountBox = styled.div`
  width: 100px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  box-sizing: border-box;
`;

S.CountBtn = styled.button`
  ${C.smallText3Regular};
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  &.minus { left: 16px; }
  &.plus  { right: 16px; }
`;

S.CountNum = styled.span`
  ${C.smallText3Regular};
  padding: 8px;
  flex: 1;
  text-align: center;
`;

/* 총 상품 금액 */
S.ProductDetailBar = styled.div`
  width: 440px;
  height: 1px;
  background: ${({ theme }) => theme.PALLETE.grey.greyScale1};
`;

S.ProductRow = styled.div`
  width: 440px;
  display: flex;
  justify-content: space-between;
  margin: 12px 0 20px;
`;

S.ProductTotalCount = styled.div`
  ${C.fontGreyScale4};
`;

S.ProductTotalPrice = styled.div`
  ${C.basic};
`;

/* 버튼 */
S.ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  width: 440px;
  margin-top: 20px;
`;

S.ProductLikeButton = styled.button`
  width: 54px;
  height: 54px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  background: #fff;
  display: flex;
  flex-direction: column;
  font-family: 'Daeojamjil', sans-serif;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 22px;
    height: 22px;
    margin-top: 3px;
    object-fit: contain;
  }

  span {
    ${C.smallText2Regular};
    margin-top: 4px;
    color: #000;
  }
`;

S.CartButton = styled.button`
  ${C.subtitleRegular};
  flex: 1;
  height: 54px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  background: #fff;
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
`;

S.PurchaseButton = styled.button`
  ${C.subtitleRegular};
  ${C.white};
  flex: 1;
  height: 54px;
  border-radius: 4px;
  border: none;
  background: ${({ theme }) => theme.PALLETE.primary.main};
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
  

  &:hover {
    background-color: #003DB8;
    border-color: #003DB8;
  }
  
`;

/* 정보/리뷰 탭 */
S.InfoSection = styled.section`
  width: 680px;
  margin: 60px 0 120px;
  display: flex;
  flex-direction: column;
`;

S.InfoTabs = styled.div`
  display: flex;
  gap: 140px;
  justify-content: center;
  margin-bottom: 0px;
`;

S.InfoTab = styled.button`
  ${C.paragraphRegular};
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  gap: 14px;
  padding-bottom: 4px;
  font-family: 'Daeojamjil', sans-serif;
  padding-bottom: 14px;
  color: ${({ $active, theme }) =>
    $active ? theme.PALLETE.basic : theme.PALLETE.grey.greyScale3};

  ${({ $active, theme }) =>
    $active &&
    `
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${theme.PALLETE.basic};
  }
  `}
`;

S.InfoDivider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
  margin: 4px 0 24px;
`;

/* 관련 상품 (ShopRelated.jsx) */
S.RelatedSection = styled.section`
  width: 680px;
  margin: 80px 0 120px;
`;

S.RelatedTitleRow = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 28px;
`;

S.BrandLink = styled.span`
  ${C.subtitleRegular};
  color: ${({ theme }) => theme.PALLETE.primary.main};
  margin-right: 4px;
`;

S.RelatedTitle = styled.h3`
  ${C.subtitleRegular};
  color: ${({ theme }) => theme.PALLETE.basic};
`;

S.RelatedGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

S.RelatedCard = styled.div`
  width: 158px;
  display: flex;
  flex-direction: column;
`;

S.RelatedThumb = styled.div`
  width: 158px;
  height: 211px;
  background-color: #f6f6f6;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

S.RelatedName = styled.p`
  ${C.smallText1Bold};
  ${C.basic};
  margin-top: 10px;
`;

S.RelatedPrice = styled.p`
  ${C.smallText1Regular};
  ${C.basic};
  margin-top: 6px;
`;

/* 장바구니 팝업창 */
S.Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  align-items: center;
  justify-content: center;
`;

S.Dialog = styled.div`
  position: fixed;
  z-index: 1100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 302px;
  height: 140px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 8px 24px rgba(0,0,0,.12);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

S.DialogMsg = styled.p`
  ${C.subtitleRegular};
  ${C.basic};
  margin: 31px 12px 31px;
`;

S.DialogBtns = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center
`;

S.DialogBtnCancel = styled.button`
  ${C.smallText2Regular};
  width: 136px;
  height: 46px;
  margin-bottom: 12px;
  border-radius: 4px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  cursor: pointer;
`;

S.DialogBtnCart = styled.button`
  ${C.smallText2Regular};
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
  flex: 1;
  width: 136px;
  height: 46px;
  border-radius: 4px;
  border: 0;
  display: inline-flex;
  background: ${({ theme }) => theme.PALLETE.primary.main};
  color: #fff;
  cursor: pointer;
`;

export default S;
