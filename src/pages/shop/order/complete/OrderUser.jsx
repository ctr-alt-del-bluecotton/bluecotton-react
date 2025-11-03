import React from "react";
import S from "./style";

const OrderUser = () => {

  return (
    <S.UserInfoWrapper>
      <S.UserInfoContainer>
        <S.UserContainer>
          <S.UserInfoName>
            <S.UserName>최준서</S.UserName>
            <S.UserInfoTag>
              <S.TagName>기본 배송지</S.TagName>
            </S.UserInfoTag>
          </S.UserInfoName>
          <S.UserAddressContainer>
            <S.UserAddress>서울 서초구 강남대로 47-6</S.UserAddress>
            <S.UserAddress>010-1234-5678</S.UserAddress>
          </S.UserAddressContainer>
        </S.UserContainer>
      </S.UserInfoContainer>
    </S.UserInfoWrapper>
  );
};

export default OrderUser;
