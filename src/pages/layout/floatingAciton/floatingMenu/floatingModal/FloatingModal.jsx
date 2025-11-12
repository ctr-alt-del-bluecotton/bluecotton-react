import React, { useEffect, useRef, useState } from "react";
import S from "./style";
import { useNavigate } from "react-router-dom";

const FloatingModal = () => {

  const nav = useNavigate();

  return (
    <S.ModalBackdrop>
      <S.ModalBox>
        <h3>로그인이 필요합니다</h3>
        <p>로그인하고 솜을 작성해봐요!</p>

        <div className="button-row">
          <button className="confirm" onClick={() => nav('/login')}>
            로그인 하러가기
          </button>
        </div>
      </S.ModalBox>
    </S.ModalBackdrop>
  );
};

export default FloatingModal;
