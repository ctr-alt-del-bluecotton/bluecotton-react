import styled from "styled-components";
import * as C from "../../../../styles/common";

const S = {};

/* 하단 상세 정보 (ShopInfo.jsx) */
S.InfoTextWrap = styled.div`
  margin-top: 20px;
  text-align: left;
`;

S.InfoKicker = styled.p`
  ${C.paragraphRegular};
  color: ${({ theme }) => theme.PALLETE.secondary.main};
  margin-bottom: 8px;
`;

S.InfoTitle = styled.h2`
  ${C.accent};
  margin-bottom: 12px;
`;

S.InfoDesc = styled.p`
  ${C.smallText3Regular};
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 40px;
`;

S.InfoImage = styled.div`
  width: 100%;
  margin-bottom: 16px;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

/* 상품 정보 (사진 하단) */
S.SpecSection = styled.section`
  width: 680px;
  margin: 60px 0 48px;
`;

S.SpecTitle = styled.h3`
  ${C.subtitleRegular};
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 28px;
`;

S.SpecList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

S.SpecRow = styled.div`
  display: flex;
  align-items: baseline;
`;

S.SpecLabel = styled.div`
  ${C.smallText2Regular};
  color: ${({ theme }) => theme.PALLETE.basic};
`;

S.SpecValue = styled.div`
  ${C.smallText2Regular};
  padding-left: 4px;
  color: ${({ theme }) => theme.PALLETE.basic};
`;

/* 유의사항 */
S.CautionBox = styled.div`
  width: 100%;
  margin-top: 32px;
  padding: 24px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.PALLETE.grey.greyScale0};
`;

S.CautionTitle = styled.p`
  ${C.smallText1Bold};
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  margin-bottom: 12px;
`;

S.CautionText = styled.p`
  ${C.smallText1Regular};
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  line-height: 1.8;
  white-space: pre-line;
  margin: 0;
`;

/* 판매자 정보 */
S.SellerSection = styled.section`
  width: 680px;
  margin: 48px 0 40px;
`;

S.SellerTitle = styled.h3`
  ${C.subtitleRegular};
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 24px;
`;

S.SellerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

S.SellerRow = styled.div`
  display: flex;
  align-items: flex-start;
  min-width: 0;
`;

S.SellerLabel = styled.div`
  ${C.smallText2Regular};
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  flex: 0 0 168px;
  display: inline-flex;
  align-items: baseline;
  white-space: nowrap;
  position: relative;
  padding-right: 12px;
  line-height: 1.7;
`;

S.SellerValue = styled.div`
  ${C.smallText2Regular};
  color: ${({ theme }) => theme.PALLETE.grey.greyScale6};
  flex: 1;
  line-height: 1.7;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

/* 상세정보 토글 버튼 */
S.ToggleBox = styled.button`
  width: 100%;
  padding: 14px 16px;
  margin-top: 16px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  background: #fff;
  display: flex;
  align-items: center;
  font-family: 'Daeojamjil', sans-serif;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`;

S.ToggleText = styled.span`
  ${C.smallText2Light};
  ${C.basic};
  display: inline-block;
`;

S.ToggleIcon = styled.img`
  width: 10px;
  height: 5px;
  margin-left: 6px;
  object-fit: contain;
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
  transition: none;
  align-self: center;
`;

export default S;
