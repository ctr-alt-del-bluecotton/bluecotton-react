// src/pages/shop/order/ChoosePayment.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import S from "./style";
import { AnimatePresence } from "framer-motion";

const cards = [
  "국민카드",
  "신한카드",
  "비씨카드",
  "현대카드",
  "롯데카드",
  "우리카드",
  "농협카드",
];

const installments = ["일시불", "1개월", "2개월", "3개월", "4개월", "5개월"];

const menuVariants = {
  hidden: { opacity: 0, y: -6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.12 } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.1 } },
};

const ChoosePayment = () => {
  const [method, setMethod] = useState("card");
  const [openMenu, setOpenMenu] = useState({ card: false, inst: false });
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedInst, setSelectedInst] = useState("일시불");

  const cardWrapRef = useRef(null);
  const instWrapRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (
        cardWrapRef.current &&
        !cardWrapRef.current.contains(e.target) &&
        instWrapRef.current &&
        !instWrapRef.current.contains(e.target)
      ) {
        setOpenMenu({ card: false, inst: false });
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpenMenu({ card: false, inst: false });
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const cardLabel = useMemo(
    () => (selectedCard ? selectedCard : "카드를 선택해 주세요."),
    [selectedCard]
  );

  return (
    <S.ChoosePayWrap>
      <S.ChoosePayContainer>
        <S.ChoosePaymentButton
          $active={method === "card"}
          onClick={() => setMethod("card")}
        >
          <S.ChoosePaymentText>카드</S.ChoosePaymentText>
        </S.ChoosePaymentButton>
        <S.ChoosePaymentButton
          $active={method === "vbank"}
          onClick={() => setMethod("vbank")}
        >
          <S.ChoosePaymentText>가상계좌</S.ChoosePaymentText>
        </S.ChoosePaymentButton>
      </S.ChoosePayContainer>
      <S.ChoosePayContainer>
        <S.ChoosePaymentButton
          $active={method === "phone"}
          onClick={() => setMethod("phone")}
        >
          <S.ChoosePaymentText>휴대폰</S.ChoosePaymentText>
        </S.ChoosePaymentButton>
        <S.ChoosePaymentButton
          $active={method === "samsung"}
          onClick={() => setMethod("samsung")}
        >
          <S.ChoosePaymentText>삼성페이</S.ChoosePaymentText>
        </S.ChoosePaymentButton>
      </S.ChoosePayContainer>
      {method === "card" && (
        <S.ChoosePayContainer>
          <S.ChooseCard>
            <S.ChooseInputContainer ref={cardWrapRef}>
              <S.ChooseInput
                type="button"
                aria-haspopup="listbox"
                aria-expanded={openMenu.card}
                aria-label="카드 선택"
                onClick={() =>
                  setOpenMenu((s) => ({ card: !s.card, inst: false }))
                }
                $open={openMenu.card}
              >
                {cardLabel}
              </S.ChooseInput>
              <AnimatePresence>
                {openMenu.card && (
                  <S.DropdownMenu
                    role="listbox"
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    variants={menuVariants}
                  >
                    {cards.map((c) => (
                      <S.DropdownItem
                        role="option"
                        key={c}
                        onClick={() => {
                          setSelectedCard(c);
                          setOpenMenu({ card: false, inst: false });
                        }}
                        $active={selectedCard === c}
                      >
                        {c}
                      </S.DropdownItem>
                    ))}
                  </S.DropdownMenu>
                )}
              </AnimatePresence>
            </S.ChooseInputContainer>
            <S.ChooseInputContainer ref={instWrapRef}>
              <S.ChooseInput
                type="button"
                aria-haspopup="listbox"
                aria-expanded={openMenu.inst}
                aria-label="할부 선택"
                onClick={() =>
                  setOpenMenu((s) => ({ card: false, inst: !s.inst }))
                }
                $open={openMenu.inst}
              >
                {selectedInst}
              </S.ChooseInput>
              <AnimatePresence>
                {openMenu.inst && (
                  <S.DropdownMenu
                    role="listbox"
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    variants={menuVariants}
                  >
                    {installments.map((m) => (
                      <S.DropdownItem
                        role="option"
                        key={m}
                        onClick={() => {
                          setSelectedInst(m);
                          setOpenMenu({ card: false, inst: false });
                        }}
                        $active={selectedInst === m}
                      >
                        {m}
                      </S.DropdownItem>
                    ))}
                  </S.DropdownMenu>
                )}
              </AnimatePresence>
            </S.ChooseInputContainer>
          </S.ChooseCard>
        </S.ChoosePayContainer>
      )}
    </S.ChoosePayWrap>
  );
};

export default ChoosePayment;
