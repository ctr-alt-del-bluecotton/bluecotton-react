import styled from "styled-components";
import {
  basic,
  fontGreyScale4,
  smallText0Light,
  smallText1Regular,
  smallText3Bold,
  smallText3Regular,
} from "../../../styles/common";
import { motion } from "framer-motion";

const S = {};

/* 주문자 정보*/
S.UserInfoWrapper = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

S.UserInfoContainer = styled.div`
  width: 1120px;
  display: flex;
  flex-direction: column;
`;

S.UserContainer = styled.div`
  width: 720px;
  margin-bottom: 27px;
  border-bottom: 1px solid #E0E0E0;
  display: flex;
  flex-direction: column;
`;

S.UserInfoName = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
`;

S.UserName = styled.div`
  /* ${smallText3Regular} */
  color: ${basic};
  font-size: 18px;
`;

S.UserInfoTag = styled.button`
  width: 64px;
  height: 18px;
  border-radius: 4px;
  background-color: #e0e0e0;
  border: 1px solid #e0e0e0;
  margin-top: 2px;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

S.TagName = styled.div`
  ${smallText0Light}
  ${fontGreyScale4}
  font-family: inherit;
`;

S.UserFix = styled.button`
  width: 76px;
  height: 26px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  margin-left: auto;
  border-radius: 4px;
  ${smallText1Regular}
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #0015FF;
  }
`;

S.UserFixText = styled.div`
  ${basic}
  ${smallText1Regular}
  font-family: inherit;
`;

S.UserAddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 27px;
  margin-bottom: 28px;
`;

S.UserAddress = styled.div`
  ${basic}
  /* ${smallText1Regular} */
  font-size: 16px;
`;

/* 드롭다운 */
S.DropdownWrapper = styled.div`
  position: relative;
  padding-top: 20px;
  width: 100%;
`;

S.UserAddressButton = styled.button`
  width: 720px;
  height: 39px;
  background-color: #ffffff;
  border: 1px solid ${(p) => (p.$open ? "var(--brand-main)" : "#e0e0e0")};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 0 10px;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-main);
  }

  &::after {
    content: "";
    width: 12px;
    height: 8px;
    background-color: ${(p) => (p.$open ? "var(--brand-main)" : "#000000")};
    mask-image: url("/assets/icons/drop_down.svg");
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;
    transform: rotate(${(p) => (p.$open ? "180deg" : "0deg")});
    transition: transform 0.15s ease, background-color 0.2s ease;
    flex: 0 0 auto;
    pointer-events: none;
  }
`;

S.DropdownMenu = styled(motion.ul)`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  max-height: 260px;
  overflow-y: auto;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: -3px 3px 12px rgba(0, 0, 0, 0.25);
  z-index: 20;
  padding: 6px 0;
  list-style: none;
`;

S.DropdownItem = styled.li`
  ${smallText1Regular}
  padding: 10px 14px;
  color: ${basic};
  cursor: pointer;
  background: ${(p) => (p.$active ? "var(--brand-main)" : "transparent")};
  color: ${(p) => (p.$active ? "#FFFFFF" : "inherit")};

  &:hover {
    background: var(--brand-main);
    color: #FFFFFF;
  }
`;

/* 직접 입력 영역 */
S.CustomMemoRow = styled.div`
  width: 720px;
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 10px;
`;

S.CustomInput = styled.input`
  flex: 1 1 auto;
  height: 38px;
  padding: 0 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  outline: none;
  font-family: inherit;

  &:focus {
    border-color: var(--brand-main);
  }
`;

S.CustomApply = styled.button`
  height: 38px;
  padding: 0 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: #f7f7f7;
  cursor: pointer;
  white-space: nowrap;
  font-family: inherit;
  transition: 0.2s;

  &:hover {
    border-color: var(--brand-main);
    background: #ffffff;
  }
`;


/* 상품정보 */
S.OrderProductWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

S.OrderProductContainer = styled.div`
  width: 1120px;
  display: flex;
  flex-direction: column;
`;

S.OrderProductText = styled.div`
  ${smallText3Regular}
  ${basic}
`;

S.ProductRow = styled.div`
  width: 720px;
  display: flex;
  gap: 14px;
  padding: 20px 0 30px;
  border-bottom: 1px solid #e0e0e0;
`;

S.ProductThumb = styled.img`
  width: 92px;
  height: 110px;
  object-fit: cover;
  border-radius: 4px;
`;

S.ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
`;

S.ContentText1 = styled.div`
  ${smallText1Regular}
  font-size: 16px;
  ${basic}
`;

S.ContentText2 = styled.div`
  ${smallText3Bold}
  ${basic}
  font-size: 14px;
`

/* 결제 선택*/
S.PaymentWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

S.PaymentContainer = styled.div`
  width: 1120px;
  height: 400px;
  display: flex;
  flex-direction: column;
  padding-top: 29px;
`;

S.PaymentText1 = styled.div`
  ${smallText3Regular}
  ${basic}
  padding-bottom: 17px;
`;

S.PaymentButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

S.PaymentButtonArea = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding-bottom: 6px;

  input[type="radio"] {
    accent-color: var(--brand-main);
    cursor: pointer;
  }
`;

S.PaymentText2 = styled.div`
  ${smallText1Regular}
  ${fontGreyScale4}
`;

/* 결제 선택 */
S.ChoosePayWrap = styled.div`
  width: 100%;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

S.ChoosePayContainer = styled.div`
  max-width: 1000px;
  display: flex;
  justify-content: center;
  gap: 4px;
  flex-wrap: wrap;
`;

S.ChoosePaymentButton = styled.button`
  width: 246px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid ${(p) => (p.$active ? "var(--brand-main)" : "#e0e0e0")};
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    border-color: var(--brand-main);
  }
`;

S.ChoosePaymentText = styled.div`
  ${smallText1Regular}
  ${basic}
  font-family: inherit;
`;

S.ChooseCard = styled.div`
  width: 696px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 4px;
  background-color: #E0E0E0;
  padding: 12px;
  box-sizing: border-box;
  z-index: 10;
`;

S.ChooseInputContainer = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
`;

S.ChooseInput = styled.button`
  width: 100%;
  height: 100%;
  border: 1px solid ${(p) => (p.$open ? "var(--brand-main)" : "#BDBDBD")};
  border-radius: 4px;
  background: #FFFFFF;
  cursor: pointer;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  text-align: left;
  transition: border-color 0.15s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-main);
  }

  &::after {
    content: "";
    width: 12px;
    height: 8px;
    background-color: ${(p) => (p.$open ? "var(--brand-main)" : "#000000")};
    mask-image: url("/assets/icons/drop_down.svg");
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;
    transform: rotate(${(p) => (p.$open ? "180deg" : "0deg")});
    transition: transform 0.15s ease, background-color 0.2s ease;
    flex: 0 0 auto;
    pointer-events: none;
  }
`;

/* 사이드바 + 색 변수 */
S.OrderPageWrap = styled.div`

  --brand-main: #0051ff;
  --brand-hover: #003dcc;

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  margin-top: 40px;


  &.candy-mode {
    --brand-main: #f948b3;
    --brand-hover: #d33193;
  }
`;

S.OrderMainSection = styled.div`
  width: 720px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

S.OrderSideSection = styled.div`
  width: 360px;
  position: sticky;
  top: 120px;
`;

S.SideContainer = styled.div`
  width: 100%;
  /* border: 1px solid #e0e0e0; */
  padding: 24px;
  background: #fff;
`;

S.SideTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
`;

S.SideRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin-bottom: 10px;
  color: #333;
`;

S.SideTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 17px;
  font-weight: 700;
  margin-top: 16px;
  padding-top: 10px;
  border-top: 1px solid #ddd;

  .price {
    color: var(--brand-main);
  }
`;

S.PayButton = styled.button`
  width: 360px;
  height: 64px;
  margin-top: 24px;
  border: none;
  border-radius: 4px;
  background: var(--brand-main);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  font-family: inherit;

  &:hover {
    background: var(--brand-hover);
  }
`;

// 캔디샵
S.CandyWrap = styled.div`
  width: 720px;
  margin-left: 5%;
  gap: 6px;
`;

S.CandyRow = styled.div`
  display: flex;
  gap: 10px;
`;

S.CandyLabel = styled.span`
  ${smallText1Regular}
  ${basic}
`;

S.CandyValue = styled.span`
  ${smallText1Regular}
  color: var(--brand-main);  
  font-weight: 600;
`;

S.EmptyText = styled.p`
  margin-top: 12px;
  font-size: 14px;
  color: #999;
`;

S.OrderProductTotal = styled.p`
  margin-top: 16px;
  font-weight: 600;
  text-align: right;
`;



export default S;
