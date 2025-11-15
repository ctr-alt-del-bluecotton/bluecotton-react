// src/pages/shop/order/PaymentMathod.jsx
import React from "react";
import S from "./style";
import CandyPayment from "./CandyPayment";

const PaymentMethod = ({
  value,
  onChange,
  candyBalance = 0,
  candyPrice = 0,
}) => {
  const handleChange = (e) => onChange(e.target.value);

  const isCandySelected = value === "candy";

  return (
    <S.PaymentWrap>
      <S.PaymentContainer>
        <S.PaymentText1>결제 수단</S.PaymentText1>
        <S.PaymentButtonContainer>
          {/* 토스 */}
          <S.PaymentButtonArea as="label" htmlFor="pay-toss">
            <input
              type="radio"
              name="payType"
              id="pay-toss"
              value="toss"
              checked={value === "toss"}
              onChange={handleChange}
              style={{ width: 18, height: 18 }}
            />
            <img
              src="/assets/images/tossPay.png"
              alt="토스페이 로고"
              style={{ width: 20, height: 20 }}
            />
            <S.PaymentText2>토스페이</S.PaymentText2>
          </S.PaymentButtonArea>

          {/* 카카오 */}
          <S.PaymentButtonArea as="label" htmlFor="pay-kakao">
            <input
              type="radio"
              name="payType"
              id="pay-kakao"
              value="kakao"
              checked={value === "kakao"}
              onChange={handleChange}
              style={{ width: 18, height: 18 }}
            />
            <img
              src="/assets/images/kakaoPay.png"
              alt="카카오페이 로고"
              style={{ width: 20, height: 20 }}
            />
            <S.PaymentText2>카카오페이</S.PaymentText2>
          </S.PaymentButtonArea>

          {/* 캔디 결제 */}
          <S.PaymentButtonArea as="label" htmlFor="pay-candy">
            <input
              type="radio"
              name="payType"
              id="pay-candy"
              value="candy"
              checked={isCandySelected}
              onChange={handleChange}
              style={{ width: 18, height: 18, marginRight: 8 }}
            />
            <S.PaymentText2>캔디 결제</S.PaymentText2>
          </S.PaymentButtonArea>

          {/* 캔디 정보 표시 */}
          {isCandySelected && (
            <CandyPayment balance={candyBalance} price={candyPrice} />
          )}

          {/* 일반 결제 */}
          <S.PaymentButtonArea as="label" htmlFor="pay-general">
            <input
              type="radio"
              name="payType"
              id="pay-general"
              value="general"
              checked={value === "general"}
              onChange={handleChange}
              style={{ width: 18, height: 18, marginRight: 8 }}
            />
            <S.PaymentText2>일반 결제</S.PaymentText2>
          </S.PaymentButtonArea>
        </S.PaymentButtonContainer>
      </S.PaymentContainer>
    </S.PaymentWrap>
  );
};

export default PaymentMethod;
