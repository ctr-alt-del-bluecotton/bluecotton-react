// src/pages/shop/order/OrderUserInfo.jsx
import React, { useRef, useState } from "react";
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

const OrderUserInfo = ({ onDeliveryChange }) => {
  const { currentUser } = useSelector((s) => s.user);

  const [addrModalOpen, setAddrModalOpen] = useState(false);

  // 드롭다운
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 선택 옵션 / 실제 메모 값 분리
  const [memoOption, setMemoOption] = useState(DELIVERY_OPTIONS[0]);
  const [memo, setMemo] = useState(DELIVERY_OPTIONS[0]);
  const [customMemo, setCustomMemo] = useState("");

  const [viewInfo, setViewInfo] = useState({
    deliveryReceiverName: currentUser?.memberNickname || "",
    deliveryReceiverPhone: currentUser?.memberPhone || "",
    deliveryAddress: currentUser?.memberAddress || "",
    deliveryRequest: DELIVERY_OPTIONS[0],
  });

  const syncParent = (next) => {
    if (!onDeliveryChange) return;
    onDeliveryChange(next);
  };

  const handleOpenAddressModal = () => setAddrModalOpen(true);
  const handleCloseAddressModal = () => setAddrModalOpen(false);

  // 모달에서 배송지 선택 후 적용
  const handleConfirmAddress = (selected) => {
    const next = {
      deliveryReceiverName: selected.name,
      deliveryReceiverPhone: selected.phone,
      deliveryAddress: selected.addr1,
      deliveryRequest: memo,
    };
    setViewInfo(next);
    syncParent(next);
    setAddrModalOpen(false);
  };

  // 드롭다운에서 옵션 클릭
  const handleSelectOption = (opt) => {
    setMemoOption(opt);
    setDropdownOpen(false);

    // "직접 입력"이면 아래 입력창에서 적용 버튼 누를 때까지 대기
    if (opt !== "직접 입력") {
      setMemo(opt);
      const next = {
        ...viewInfo,
        deliveryRequest: opt,
      };
      setViewInfo(next);
      syncParent(next);
    }
  };

  // 직접 입력 텍스트 변경
  const handleChangeCustomMemo = (e) => {
    setCustomMemo(e.target.value);
  };

  // 직접 입력 적용 버튼
  const handleApplyCustomMemo = () => {
    const trimmed = customMemo.trim();
    if (!trimmed) return;

    setMemo(trimmed);
    const next = {
      ...viewInfo,
      deliveryRequest: trimmed,
    };
    setViewInfo(next);
    syncParent(next);
  };

  return (
    <>
      {/* 주문자/배송지 정보 전체 래퍼 */}
      <S.UserInfoWrapper>
        <S.UserInfoContainer>
          <S.UserContainer>
            {/* 이름 + 기본배송지 태그 + 배송지 변경 버튼 영역 */}
            <S.UserInfoName>
              <S.UserName>{viewInfo.deliveryReceiverName}</S.UserName>

              <S.UserInfoTag type="button">
                <S.TagName>기본 배송지</S.TagName>
              </S.UserInfoTag>

              <S.UserFix type="button" onClick={handleOpenAddressModal}>
                <S.UserFixText>배송지 변경</S.UserFixText>
              </S.UserFix>
            </S.UserInfoName>

            {/* 주소 / 연락처 */}
            <S.UserAddressContainer>
              <S.UserAddress>{viewInfo.deliveryAddress}</S.UserAddress>
              <S.UserAddress>{viewInfo.deliveryReceiverPhone}</S.UserAddress>
            </S.UserAddressContainer>

            {/* 배송 요청사항 드롭다운 */}
            <S.DropdownWrapper ref={dropdownRef}>
              <S.UserAddressButton
                type="button"
                $open={dropdownOpen}
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <span>{memo}</span>
              </S.UserAddressButton>

              {dropdownOpen && (
                <S.DropdownMenu>
                  {DELIVERY_OPTIONS.map((opt) => (
                    <S.DropdownItem
                      key={opt}
                      onClick={() => handleSelectOption(opt)}
                      $active={memoOption === opt}
                    >
                      {opt}
                    </S.DropdownItem>
                  ))}
                </S.DropdownMenu>
              )}
            </S.DropdownWrapper>

            {/* "직접 입력" 선택 시 노출되는 입력 영역 */}
            {memoOption === "직접 입력" && (
              <S.CustomMemoRow>
                <S.CustomInput
                  placeholder="배송 요청사항을 입력해 주세요."
                  value={customMemo}
                  onChange={handleChangeCustomMemo}
                />
                <S.CustomApply type="button" onClick={handleApplyCustomMemo}>
                  적용
                </S.CustomApply>
              </S.CustomMemoRow>
            )}
          </S.UserContainer>
        </S.UserInfoContainer>
      </S.UserInfoWrapper>

      {/* 배송지 모달 */}
      <DeliveryAddressModal
        open={addrModalOpen}
        onClose={handleCloseAddressModal}
        onConfirm={handleConfirmAddress}
      />
    </>
  );
};

export default OrderUserInfo;
