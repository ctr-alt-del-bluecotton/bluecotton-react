// src/pages/shop/order/CandyPayment.jsx
import React from "react";

const CandyPayment = ({ balance = 0, price = 0 }) => {
  const fmt = (n) => Number(n || 0).toLocaleString("ko-KR");

  const isEnough = balance >= price;
  const diff = price - balance;

  console.log("[CandyPayment] balance =", balance, "price =", price);

  return (
    <div
      style={{
        marginTop: "12px",
        padding: "12px",
        borderRadius: "4px",
        border: "1px solid #0015FF",
        backgroundColor: "#FFFFFF",
        fontSize: "14px",
        lineHeight: 1.5,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "4px",
        }}
      >
        <span>보유 캔디</span>
        <span>{fmt(balance)} 캔디</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "4px",
        }}
      >
        <span>결제 필요</span>
        <span>{fmt(price)} 캔디</span>
      </div>

      {!isEnough && price > 0 && (
        <div style={{ marginTop: "6px", color: "#e74c3c", fontSize: "13px" }}>
          캔디가 {fmt(diff)}개 부족해요
        </div>
      )}
    </div>
  );
};

export default CandyPayment;
