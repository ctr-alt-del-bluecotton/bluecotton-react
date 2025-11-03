import styled from "styled-components";
import { backgroundGreyScale0, basic, fontGreyScale0, fontGreyScale3, heading1, heading2, heading3, heading4, heading6, paragraphLight, paragraphRegular, paragraphStrong, primary, primaryLight1, secondary, secondaryDark, secondaryLight, smallText3Regular, subtitle, subtitleRegular, titleBold, white } from "../../styles/common";
import {fontCSS, shapeCSS, sizeCSS } from "../button/style";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";

const IntroStyle = {};

// 소개페이지 배너
IntroStyle.IntroBannerWarp = styled.div `
    width: 100%;
    height: 1177px;
    overflow: hidden;
    position: relative;
    z-index: 1;
    background: url("/assets/images/moveBanner.gif") center/cover no-repeat;
    
`

IntroStyle.IntroBannerContainer = styled.div `
    max-width: 1920px;
    height: 100%;
    margin: 0 auto;
    padding: 0 16px;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
`

// IntroStyle.IntroBannerImage = styled.img `
//     position: absolute;
//     /* transform: translateX(-50%); */
//     top: 0;
//     left: 50%;
//     z-index: 1;
//     width: 1920px;
//     height: 1177px;
//     object-fit: cover;
// `

IntroStyle.IntroBannerText1 = styled.div `
    ${heading2}
    ${basic}
    z-index: 2;
    position: absolute;
    top: 15%;
    left: 29%;
    text-align: center;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
`

IntroStyle.IntroBannerText2 = styled.span `
    ${heading2}
    ${primary}
    z-index: 2;
`

IntroStyle.IntroBannerButtonContainer = styled.div `
    width: 100%;
    height: 50px;
    top: 33%; 
    left: 42%;
    position: absolute;
    z-index: 2;
    gap: 10px;
    display: flex;
`

IntroStyle.IntroBannerButton = styled.button `
    ${sizeCSS.large2}
    background-color: #0051FF;
    border: none;
    border-radius: 4px;
    padding: 3px;
    cursor: pointer;
    ${shapeCSS.small}
    ${smallText3Regular}
    color: #FFFFFF;
    
`

// 소개 페이지 (솜이란?)
IntroStyle.WhatIsSomWrap = styled.div `
    width: 100%;
    box-sizing: border-box;
    background-color: #E0E0E0; 
    
`
IntroStyle.WhatIsSomContainer = styled.div `
    max-width: 1920px;
    height: 500px;
    margin: 0 auto;
    gap: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
 
`

IntroStyle.WhatIsSomImg = styled.img `
    width: 255px;
    height: 392px;
`

IntroStyle.WhatIsSomTextContainer = styled.div `
    display: flex;
    flex-direction: column;
    gap: 26px;
`

IntroStyle.WhatIsSomText1 = styled.p `
    ${heading4}
    ${basic}
`
IntroStyle.WhatIsSomBlueText1 = styled.span `
    ${heading4}
    ${primary}
`

IntroStyle.WhatIsSomText2 = styled.p `
    ${heading1}
    ${basic}
`

IntroStyle.WhatIsSomBlueText2 = styled.span `
    ${heading1}
    ${primary}
`
IntroStyle.WhatIsSomBlueText3 = styled.div `
    ${titleBold}
    ${fontGreyScale3}
`

//인트로 - 주변 솜 찾기
IntroStyle.IntroMapWrap = styled.div `
    width: 100%;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
` 

IntroStyle.IntroMapContainer = styled.div `
    max-width: 1200px;
    height: 1772px;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 180px;
`

IntroStyle.IntroMapImg = styled.img `
    width: 430px;
    height: 932px;
`

IntroStyle.IntroMapImgAndText = styled.div `
    display: flex;
    flex-direction: column;
    gap: 70px;
`

IntroStyle.IntroMapBlueText1 = styled.p `
    ${titleBold}
    ${primaryLight1}
`

IntroStyle.IntroMapText1 = styled.div `
    ${heading3}
    ${basic}
    gap: 23px;
`
IntroStyle.IntroMapText2 = styled.div `
    ${paragraphRegular}
    ${basic}
`

//인트로 - 캔디샵
IntroStyle.IntroShopWrap = styled.div `
    width: 100%;
    background-image: url("/assets/images/intro_shop_blob.svg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
`

IntroStyle.IntroShopContainer = styled.div `
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

IntroStyle.IntroShopText1 = styled.p `
    ${titleBold}
    ${white}
`

IntroStyle.IntroShopImgcontainer = styled.div `
    width : 1172px;
    height : 700px;
    display: flex;
    justify-content: center;
    z-index: 1;
    background-color: #FFFFFF;
`

IntroStyle.IntroShopImg = styled.img `
    z-index: 2;
`

IntroStyle.IntroShopTextContainer = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 87px;
    margin: 0;
`

IntroStyle.IntroShopText2 = styled.div `
    ${heading4}
    ${white}
`

IntroStyle.IntroShopPinkText2 = styled.div `
    ${heading4}
    ${secondaryLight}
`

IntroStyle.IntroShopText3 = styled.div `
    ${paragraphRegular}
    ${fontGreyScale0}
`

// 인트로 - 등급 / 혜택
IntroStyle.IntroGradeWrpper = styled.div `
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #F9F9F9;
`

IntroStyle.IntroGradeContainer = styled.div `
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
IntroStyle.IntroGradeUpContainer = styled.div `
    display: flex;
    flex-direction: row;
    gap: 185px;
`

IntroStyle.IntroGradeDownContainer = styled.div `
    display: flex;
    flex-direction: row;
    gap: 185px;
`

IntroStyle.IntroGradeTextContainer = styled.div `
    display: flex;
    flex-direction: column;
    gap: 45px;
`

IntroStyle.IntroGradeCard = styled.div `
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 15px 22px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.1);
`

IntroStyle.IntroGradeUpCard = styled(IntroStyle.IntroGradeCard) `
    width: 613px;
    height: 430px;
    display: flex;
    align-items: center;
    justify-content: center;
`


IntroStyle.IntroGradeBlueText1 = styled.div `
    ${titleBold}
    ${primary}
    padding-top: 30%;
`
IntroStyle.IntroGradeText1 = styled.div `
    ${heading3}
    ${basic}
`
IntroStyle.IntroGradePinkText1 = styled.span `
    ${heading3}
    ${secondary}
`

IntroStyle.IntroGradePinkText2 = styled.span `
    ${heading3}
    ${secondaryDark}
`
IntroStyle.IntroGradePinkText3 = styled.span `
    ${heading3}
    ${secondaryLight}
`

IntroStyle.IntroGradeText2 = styled.div `
    ${paragraphLight}
    ${basic}
`

// 인트로 - 게시판
IntroStyle.IntroPostWrapper = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 247px;
`

IntroStyle.IntroPostContainer = styled.div `
    max-width: 1200px;
    height: 1900px;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    /* padding-left: 400px; */
`

IntroStyle.IntroPostTextContainer = styled.div `
    display: flex;
    flex-direction: column;
    gap: 45px;
`

IntroStyle.IntroPostBlueText1 = styled.div `
    ${primaryLight1}
    ${titleBold}
`

IntroStyle.IntroPostText1 = styled.div `
    ${heading3}
    ${basic}
`

IntroStyle.IntroPostContainer2 = styled.div `
    height: 950px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 83px;
`

IntroStyle.IntroPostText2 = styled.div `
    ${paragraphStrong}
    ${basic}
`

IntroStyle.IntroPostBord = styled.div `
    height: 932px;
    width: 430px;
    border: 3px solid black;
    border-radius: 50px;
    background-color: #FFFFFF;
`

IntroStyle.IntroPostContainer3 = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 95px;
`
// 인트로 - 솜 등록하기
IntroStyle.IntroSomWrpper = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 247px;
    background-color: #F9F9F9;
`

IntroStyle.IntroSomContainer1 = styled.div `
    max-width: 1200px;
    height: 4250px;
    display: flex;
    margin: 0 auto;
    padding: 0 16px;
    /* padding-left: 400px; */
    
`

IntroStyle.IntroSomTextContainer1 = styled.div `
    display: flex;
    flex-direction: column;
    gap: 56px;
`
IntroStyle.IntroSomBlueText1 = styled.div `
    ${titleBold}
    ${primaryLight1}
`

IntroStyle.IntroSomText1 = styled.div `
    ${heading3}
    ${basic}
`

IntroStyle.IntroSomContainer2 = styled.div `
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
IntroStyle.IntroSomContainer3 = styled.div `
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 127px;
`
IntroStyle.IntroSomTextContainer2 = styled.div `
    display: flex;
    flex-direction: column;
    gap: 25px;
`
IntroStyle.IntroSomCard = styled.div `
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 15px 22px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.1);
`
IntroStyle.IntroSomRegisterCard = styled(IntroStyle.IntroSomCard) `
    width: 417px;
    height: 292px;
    display: flex;
    align-items: center;
    justify-content: center;
`
IntroStyle.IntroSomBlueText2 = styled.div `
    ${titleBold}
    ${primary}
`

IntroStyle.IntroSomText2 = styled.div `
    ${heading3}
    ${basic}
`

IntroStyle.IntroSomText3 = styled.div `
    ${paragraphLight}
    ${fontGreyScale3}
`



export default IntroStyle;