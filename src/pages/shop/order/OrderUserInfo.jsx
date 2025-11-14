// src/pages/shop/order/OrderUserInfo.jsx
import React, { useEffect, useRef, useState } from "react";
import S from "./style";
import DeliveryAddressModal from "../deliveryAddress/DeliveryAddressModal";
import { useSelector } from "react-redux";

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
  const { currentUser, isLogin } = useSelector((s) => s.user);


  const [addrModalOpen, setAddrModalOpen] = useState(false);
  const [recipient, setRecipient] = useState(currentUser.memberNickname);
  const [phone, setPhone] = useState(currentUser.memberPhone);
  const [zip, setZip] = useState("");
  const [addr1, setAddr1] = useState(currentUser.memberAddress);
  const [addr2, setAddr2] = useState("");

  
  const [customMemo, setCustomMemo] = useState("");
  const deliveryRequest = select === "직접 입력" ? customMemo : select;

  const applyCustomMemo = () => {
  if (!customMemo.trim()) return;

  setSelect(customMemo);
  setOpen(false);
};


  const handleSelect = (text) => {
  setSelect(text);

  if (text !== "직접 입력") {
    setCustomMemo("");
    setOpen(false);
  } else {
    setOpen(true);
  }
};

  const selectedLabel = select === "직접 입력" && customMemo ? customMemo : select;


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

  const handleSaveAddress = (v) => {
    setRecipient(v.recipient);
    setPhone(v.phone);
    setZip(v.zip);
    setAddr1(v.addr1);
    setAddr2(v.addr2);
    setAddrModalOpen(false);
  };

  return (
    <S.UserInfoWrapper>
      <S.UserInfoContainer>
        <S.UserContainer>
          <S.UserInfoName>
            <S.UserName>{recipient}</S.UserName>
            <S.UserInfoTag>
              <S.TagName>기본 배송지</S.TagName>
            </S.UserInfoTag>
              <S.UserFix type="button" onClick={() => setAddrModalOpen(true)}>
              배송지 변경
            </S.UserFix>
          </S.UserInfoName>

          <S.UserAddressContainer>
            <S.UserAddress>
              {addr1}
              {addr2 ? `, ${addr2}` : ""}
            </S.UserAddress>
            <S.UserAddress>
              {phone}
            </S.UserAddress>

            <S.DropdownWrapper ref={dropdown}>
              <S.UserAddressButton
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                $open={open}
              >
                <S.UserAddress as="span">{selectedLabel}</S.UserAddress>
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

            {select === "직접 입력" && (
              <S.CustomMemoRow>
                <S.CustomInput
                  id="delivery-memo"
                  type="text"
                  value={customMemo}
                  placeholder="예: 초인종 누르지 말아주세요"
                  onChange={(e) => setCustomMemo(e.target.value)}
                  onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    applyCustomMemo(); // 엔터 누르면 적용 및 닫기
                  }
                }}
                  autoFocus
                />
              </S.CustomMemoRow>
            )}
          </S.UserAddressContainer>
        </S.UserContainer>
      </S.UserInfoContainer>

      <DeliveryAddressModal
        open={addrModalOpen}
        onClose={() => setAddrModalOpen(false)}
        onSave={handleSaveAddress}
        values={{ recipient, phone, zip, addr1, addr2 }}
      />
    </S.UserInfoWrapper>
  );

};

export default OrderUserInfo;
