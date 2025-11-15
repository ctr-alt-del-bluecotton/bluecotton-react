import React from "react";
import S from "./style";
import IntroShopProductList from "./IntroShopProductList"; 

const IntroShop = () => {
  return (
    <S.IntroShopWrap>
      <S.IntroShopContainer>
        <S.IntroShopText1>캔디샵</S.IntroShopText1>

        <S.IntroShopImgcontainer>
          <IntroShopProductList />
        </S.IntroShopImgcontainer>

        <S.IntroShopTextContainer>
          <S.IntroShopText2>
            <p>챌린지를 완료해 캔디를 모아</p>
            <S.IntroShopPinkText2>
              <p>다양한 상품으로 교환해보세요</p>
            </S.IntroShopPinkText2>
          </S.IntroShopText2>
          <S.IntroShopText3>
            <p>
              솜을 완료하여 캔디를 받아보세요! 차곡차곡 모인 캔디는 다양한
            </p>
            <p>상품과 교환 할 수 있어요. 귀여운 솜이 굿즈부터 기프티콘까지</p>
            <p>원하는 상품을 골라보세요!</p>
          </S.IntroShopText3>
        </S.IntroShopTextContainer>
      </S.IntroShopContainer>
    </S.IntroShopWrap>
  );
};

export default IntroShop;
