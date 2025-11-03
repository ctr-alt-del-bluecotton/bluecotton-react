import React from "react";
import S from "./style";

const OrderCompleteInfo = () => {

  return (
    <S.UserInfoWrapper>
          <S.UserInfoContainer>
            <S.UserContainer>
              <S.UserInfoName>
                <S.UserName>결제 정보</S.UserName>
              </S.UserInfoName>
              <S.UserAddressContainer>
                <S.UserAddress>결제 수단</S.UserAddress>
              </S.UserAddressContainer>
              <S.UserAddressContainer>
                <S.UserAddress>총 결제 금액</S.UserAddress>
              </S.UserAddressContainer>
            </S.UserContainer>
          </S.UserInfoContainer>
        </S.UserInfoWrapper>

  );

};

export default OrderCompleteInfo;