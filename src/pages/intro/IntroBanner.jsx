import React from "react";
import S from "./style";
import { useNavigate } from "react-router-dom";

const IntroBanner = () => {

    const navigate = useNavigate();

    const handleGoSom = () => {
        navigate("/main/som/all");
    };


    return (
        <S.IntroBannerWarp>
            <S.IntroBannerContainer>
                <S.IntroBannerText1>
                    <p>함께 <S.IntroBannerText2>'솜'</S.IntroBannerText2>하며 도전하는 우리</p>
                    <p>블루코튼에서 쉽고 간편하게</p>
                </S.IntroBannerText1>
                <S.IntroBannerButtonContainer>
                    <S.IntroBannerButton onClick={handleGoSom}>솜 둘러보기</S.IntroBannerButton>
                    <S.IntroBannerButton onClick={handleGoSom}>솜 하러가기</S.IntroBannerButton>
                </S.IntroBannerButtonContainer>
            </S.IntroBannerContainer>
        </S.IntroBannerWarp>

    );
};

export default IntroBanner;