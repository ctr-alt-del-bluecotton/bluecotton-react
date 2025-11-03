import React from "react";
import S from "./style";

const CandyPayment = ({ balance = 12000, price = 11000 }) => {
  const fmt = (n) => n.toLocaleString("ko-KR");

  return (
    <S.CandyWrap>
      <S.CandyRow>
        <S.CandyLabel>보유:</S.CandyLabel>
        <S.CandyValue>{fmt(balance)} 캔디</S.CandyValue>
      </S.CandyRow>

      <S.CandyRow>
        <S.CandyLabel>결제 금액:</S.CandyLabel>
        <S.CandyValue>{fmt(price)} 캔디</S.CandyValue>
      </S.CandyRow>
    </S.CandyWrap>
  );
};

export default CandyPayment;
