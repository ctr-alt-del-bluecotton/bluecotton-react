// src/pages/shop/order/OrderUserInfo.jsx
import React, { useEffect, useRef, useState } from "react";
import S from "./style";

const DELIVERY_OPTIONS = [
  "문 앞에 놔주세요",
  "경비실에 맡겨주세요",
  "택배함에 맡겨주세요",
  "배송전에 연락주세요",
  "직접 입력",
];

const OrderUserInfo = () => {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(DELIVERY_OPTIONS[0]);
  const dropdown = useRef(null);

  useEffect(() => {
    const onClickOutSide = (e) => {
      if (open && dropdown.current && !dropdown.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("mousedown", onClickOutSide);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onClickOutSide);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleSelect = (text) => {
    setSelect(text);
    setOpen(false);
  };

  return (
    <S.UserInfoWrapper>
      <S.UserInfoContainer>
        <S.UserContainer>
          <S.UserInfoName>
            <S.UserName>최준서</S.UserName>
            <S.UserInfoTag>
              <S.TagName>기본 배송지</S.TagName>
            </S.UserInfoTag>
            <S.UserFix>
              <S.UserAddress>배송지 변경</S.UserAddress>
            </S.UserFix>
          </S.UserInfoName>

          <S.UserAddressContainer>
            <S.UserAddress>서울 서초구 강남대로 47-6</S.UserAddress>
            <S.UserAddress>010-1234-5678</S.UserAddress>

            <S.DropdownWrapper ref={dropdown}>
              <S.UserAddressButton
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                $open={open}
              >
                <S.UserAddress as="span">{select}</S.UserAddress>
              </S.UserAddressButton>

              {open && (
                <S.DropdownMenu
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  role="listbox"
                >
                  {DELIVERY_OPTIONS.map((opt) => (
                    <S.DropdownItem
                      key={opt}
                      role="option"
                      aria-selected={select === opt}
                      $active={select === opt}
                      onClick={() => handleSelect(opt)}
                    >
                      {opt}
                    </S.DropdownItem>
                  ))}
                </S.DropdownMenu>
              )}
            </S.DropdownWrapper>
          </S.UserAddressContainer>
        </S.UserContainer>
      </S.UserInfoContainer>
    </S.UserInfoWrapper>
  );
};

export default OrderUserInfo;
