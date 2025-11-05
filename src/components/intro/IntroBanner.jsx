import React from "react";
import IntroStyle from "./styleIntro";
import { useNavigate } from "react-router-dom";

const IntroBanner = () => {

    const navigate = useNavigate();

    const handleGoSom = () => {
        navigate("/main/som/all");
    };


    return (
        <IntroStyle.IntroBannerWarp>
            <IntroStyle.IntroBannerContainer>
                <IntroStyle.IntroBannerText1>
                    <p>함께 <IntroStyle.IntroBannerText2>'솜'</IntroStyle.IntroBannerText2>하며 도전하는 우리</p>
                    <p>블루코튼에서 쉽고 간편하게</p>
                </IntroStyle.IntroBannerText1>
                <IntroStyle.IntroBannerButtonContainer>
                    <IntroStyle.IntroBannerButton onClick={handleGoSom}>솜 둘러보기</IntroStyle.IntroBannerButton>
                    <IntroStyle.IntroBannerButton onClick={handleGoSom}>솜 하러가기</IntroStyle.IntroBannerButton>
                </IntroStyle.IntroBannerButtonContainer>
            </IntroStyle.IntroBannerContainer>
        </IntroStyle.IntroBannerWarp>

    );
};

export default IntroBanner;