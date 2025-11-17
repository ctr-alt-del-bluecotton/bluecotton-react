import styled from "styled-components";
import { basic, fontGreyScale0,  fontGreyScale1,  fontGreyScale2,  fontGreyScale3, heading1, heading2, heading3, heading4, paragraphLight, paragraphRegular, paragraphStrong, primary, primaryLight1, secondary, secondaryDark, secondaryLight, smallText3Regular,title, titleBold, white } from "../../styles/common";
import {shapeCSS, sizeCSS } from "../../components/button/style";

const S = {};

// 소개페이지 배너
S.IntroBannerWarp = styled.div `
    width: 100%;
    height: 1177px;
    overflow: hidden;
    position: relative;
    z-index: 1;
    background: url("/assets/images/moveBanner.gif") center/cover no-repeat;
    
`

S.IntroBannerContainer = styled.div `
    max-width: 1920px;
    height: 100%;
    margin: 0 auto;
    padding: 0 16px;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
`

S.IntroBannerText1 = styled.div `
    ${heading2}
    ${basic}
    z-index: 2;
    position: absolute;
    top: 15%;
    left: 30%;
    text-align: center;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
`

S.IntroBannerText2 = styled.span `
    ${heading2}
    ${primary}
    z-index: 2;
`

S.IntroBannerButtonContainer = styled.div `
    /* width: 100%; */
    height: 50px;
    top: 33%; 
    left: 40%;
    position: absolute;
    z-index: 2;
    gap: 10px;
    display: flex;
`

S.IntroBannerButton = styled.button `
    ${sizeCSS.large2}
    background-color: #0051FF;
    border: none;
    border-radius: 4px;
    margin-right: 50px;
    padding: 3px;
    cursor: pointer;
    ${shapeCSS.small}
    ${smallText3Regular}
    color: #FFFFFF;
    font-family: inherit;
`

S.DeviceWrap = styled.div`
  position: relative;
  width: 300px;      // 원하는 크기
  height: auto;

  .device-img {
    width: 100%;
    display: block;
    z-index: 1;
  }

  .map-img {
    position: absolute;
    top: 56px;       // 디바이스 안쪽 화면의 Y 위치
    left: 27px;      // 디바이스 안쪽 화면의 X 위치
    width: 246px;    // 화면 크기에 맞춰 값 조정
    height: 532px;   // 필요한 경우 height도 조정
    border-radius: 24px; // 선택 (모서리 둥글게)
    z-index: 2;
    object-fit: cover;
  }
`;

// 소개 페이지 (솜이란?)
S.WhatIsSomWrap = styled.div `
    width: 100%;
    box-sizing: border-box;
    background-color: #6977F0; 
    
`
S.WhatIsSomContainer = styled.div `
    max-width: 1920px;
    height: 500px;
    margin: 0 auto;
    gap: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
 
`

S.WhatIsSomImg = styled.img `
    width: 370px;
    height: 392px;
`

S.WhatIsSomTextContainer = styled.div `
    display: flex;
    flex-direction: column;
    gap: 26px;
`

S.WhatIsSomText1 = styled.p `
    ${heading4}
    color: #FFFFFF;
`
S.WhatIsSomBlueText1 = styled.span `
    ${heading4}
    color: yellow;
`

S.WhatIsSomText2 = styled.p `
    ${heading1}
    color: #FFFFFF;
`

S.WhatIsSomBlueText2 = styled.span `
    ${heading1}
    color: yellow;
`
S.WhatIsSomBlueText3 = styled.div `
    ${title}
    color: #DBD7DE;
`

//인트로 - 주변 솜 찾기
S.IntroMapWrap = styled.div `
    width: 100%;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
` 

S.IntroMapContainer = styled.div `
    max-width: 1200px;
    height: 1772px;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 180px;
`

S.IntroMapImg = styled.img `
    width: 100%;
    height: auto;
    display: block;
    border-radius: 9%;
`

S.IntroMapImgAndText = styled.div `
    display: flex;
    flex-direction: column;
    /* justify-content: center;
    align-items: center; */
    /* gap: 70px; */
`

S.IntroMapBlueText1 = styled.p `
    ${titleBold}
    ${primaryLight1}
`

S.IntroMapText1 = styled.div `
    ${heading3}
    ${basic}
    margin: 40px 0 80px 0;
    padding: 0 auto;
    gap: 10px;
`
S.IntroMapText2 = styled.div `
    display: flex;
    flex-direction: column;
    ${paragraphRegular}
    ${basic}
    margin-top: 70px;
    align-items: center;
    justify-content: center;
`

//인트로 - 캔디샵
S.IntroShopWrap = styled.div `
    width: 100%;
    background-image: url("/assets/images/intro_shop_blob.svg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
`

S.IntroShopContainer = styled.div `
    max-width: 1200px;
    height: 1374px;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    /* padding-left: 270px; */
`

S.IntroShopText1 = styled.p `
    ${titleBold}
    ${white}
`

S.IntroShopImgcontainer = styled.div `
    width : 1172px;
    height : 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    background-color: #FFFFFF;

    & img {
        max-width: 100%; 
        max-height: 100%; 
        width: auto;      
        height: auto;     
        object-fit: contain; 
        display: block; 
        z-index: 2;
    }
`

S.IntroShopImg = styled.img `
    z-index: 2;
`

S.IntroShopTextContainer = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 87px;
    margin: 0;
`

S.IntroShopText2 = styled.div `
    ${heading4}
    ${white}
`

S.IntroShopPinkText2 = styled.div `
    ${heading4}
    ${secondaryLight}
`

S.IntroShopText3 = styled.div `
    ${paragraphRegular}
    ${fontGreyScale0}
`

// 인트로 - 등급 / 혜택
S.IntroGradeWrpper = styled.div `
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #F9F9F9;
`

S.IntroGradeContainer = styled.div `
    max-width: 1200px;
    height: 1509px;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 135px;
    
`
S.IntroGradeUpContainer = styled.div `
    display: flex;
    flex-direction: row;
    gap: 185px;
`

S.IntroGradeDownContainer = styled.div `
    display: flex;
    flex-direction: row;
    gap: 185px;
`

S.IntroGradeTextContainer = styled.div `
    display: flex;
    flex-direction: column;
    gap: 45px;
`

S.IntroGradeCard = styled.div `
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 15px 22px rgba(0,0,0,0.1);
`

S.IntroGradeUpCard = styled(S.IntroGradeCard) `
    width: 613px;
    height: 430px;
    display: flex;
    align-items: center;
    justify-content: center;
`


S.IntroGradeBlueText1 = styled.div `
    ${titleBold}
    ${primary}
    padding-top: 30%;
`
S.IntroGradeText1 = styled.div `
    ${heading3}
    ${basic}
`
S.IntroGradePinkText1 = styled.span `
    ${heading3}
    ${secondary}
`

S.IntroGradePinkText2 = styled.span `
    ${heading3}
    ${secondaryDark}
`
S.IntroGradePinkText3 = styled.span `
    ${heading3}
    ${secondaryLight}
`

S.IntroGradeText2 = styled.div `
    ${paragraphLight}
    ${basic}
`

// 인트로 - 게시판
S.IntroPostWrapper = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 247px;
`

S.IntroPostContainer = styled.div `
    max-width: 1200px;
    height: 1900px;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    /* padding-left: 400px; */
`

S.IntroPostTextContainer = styled.div `
    display: flex;
    flex-direction: column;
    gap: 45px;
`

S.IntroPostBlueText1 = styled.div `
    ${primaryLight1}
    ${titleBold}
`

S.IntroPostText1 = styled.div `
    ${heading3}
    ${basic}
`

S.IntroPostContainer2 = styled.div `
    height: 950px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 83px;
`

S.IntroPostText2 = styled.div `
    ${paragraphStrong}
    ${basic}
`

S.IntroPostBord = styled.div `
  background: url("/assets/images/Device.png") no-repeat center/contain;
    position: relative;
  height: 932px;   
  width: 430px;    

  border-radius: 45px;

  overflow: hidden;
  box-shadow:
    0 20px 40px rgba(0,0,0,0.25),
    0 0 0 6px #111 inset; 

  display: flex;
  align-items: center;
  justify-content: center;
`


export const deviceImg = styled.img`
  width: 100%;
  display: block;
`;

export const mapImg = styled.img`
  position: absolute;
  top: 65px;      
  left: 28px;     
  width: 295px;   
  height: 570px; 
  object-fit: cover;
  border-radius: 20px;  
`;

S.Speaker = styled.div`
  width: 60px;
  height: 6px;

  background: black;
  border-radius: 3px;
  position: absolute;
  top: 24px;      
  left: 50%;
  transform: translateX(-50%);
  /* opacity: 0.7; */
  z-index: 10;
`;

S.IntroPostContainer3 = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 95px;
`
// 인트로 - 솜 등록하기
S.IntroSomWrpper = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 247px;
    background-color: #F9F9F9;
`

S.IntroSomContainer1 = styled.div `
    max-width: 1200px;
    height: 4250px;
    display: flex;
    margin: 0 auto;
    padding: 0 16px;
    /* padding-left: 400px; */
    
`

S.IntroSomTextContainer1 = styled.div `
    display: flex;
    flex-direction: column;
    gap: 56px;
`
S.IntroSomBlueText1 = styled.div `
    ${titleBold}
    ${primaryLight1}
`

S.IntroSomText1 = styled.div `
    ${heading3}
    ${basic}
`

S.IntroSomContainer2 = styled.div `
    /* height: 3500px; */
    /* width: 1000px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 147px;
    padding-left: 50px;
    padding-top: 50px;
    
`
S.IntroSomContainer3 = styled.div `
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 127px;
`
S.IntroSomTextContainer2 = styled.div `
    display: flex;
    flex-direction: column;
    gap: 25px;
`
S.IntroSomCard = styled.div `
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 15px 22px rgba(0, 0, 0, 0.1);
`
S.IntroSomRegisterCard = styled(S.IntroSomCard) `
    width: 417px;
    height: 292px;
    display: flex;
    align-items: center;
    justify-content: center;
`
S.IntroSomBlueText2 = styled.div `
    ${titleBold}
    ${primary}
`

S.IntroSomText2 = styled.div `
    ${heading3}
    ${basic}
`

S.IntroSomText3 = styled.div `
    ${paragraphLight}
    ${fontGreyScale3}
`


export default S;