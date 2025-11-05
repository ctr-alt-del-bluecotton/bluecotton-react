// src/pages/shop/order/OrderUserInfo.jsx
import React, { useEffect, useRef, useState } from "react";
import S from "./style";
import DeliveryAddressModal from "../deliveryAddress/DeliveryAddressModal";

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

  // ▼ 모달/배송지 상태 추가
  const [addrModalOpen, setAddrModalOpen] = useState(false);
  const [recipient, setRecipient] = useState("최준서");
  const [phone, setPhone] = useState("010-1234-5678");
  const [zip, setZip] = useState("");
  const [addr1, setAddr1] = useState("서울 서초구 강남대로 47-6");
  const [addr2, setAddr2] = useState("");

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

  // ▼ 모달에서 저장 눌렀을 때 값 반영
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
            <S.UserAddress>{addr1}{addr2 ? `, ${addr2}` : ""}</S.UserAddress>
            <S.UserAddress>{phone}</S.UserAddress>

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

      {/* ▼ 모달 마운트 */}
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
