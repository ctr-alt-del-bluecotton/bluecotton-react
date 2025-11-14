import React from "react";
import S from "./style";

const Footer = () => {

    const LeftText = (
        <S.Text1>
            <p>Company Info</p>
            <p>Comporate Name.블루코튼 | Owner. 윤한민 | Bussiness License. 201-86-38817</p>
            <p>E-commerce Registration. 제2025-서울역삼-00623호 | Phone. 1533-1234 (Korea only)</p>
            <p>Contact Mail.
            <S.Text1Blue>bluecotton@naver.com</S.Text1Blue>
            </p>
            <p>
                Personal Information Manager. 최쭌서 (
                <S.Text1Blue>ljs862200@gmail.com</S.Text1Blue>
                )
            </p>
        </S.Text1>
    );

    const RightText = (
        <S.Text2>
            <S.IconContainer>
            <p style={{margin:"0 20px 20px"}}>Follow Us</p>
            </S.IconContainer>
            <S.IconContainer>
                <img style={{width:"25px", height:"15px" , padding:"0 auto", margin:"0 6px"}} src="/assets/icons/instagram.svg"/>
                <p>Instagram</p>
            </S.IconContainer>
            <S.IconContainer>
                <img style={{width:"20px", height:"28px" , padding:"0", margin:"0 9px"}} src="/assets/icons/youtube.svg" />
                <p>YouTube</p>
            </S.IconContainer>
            <S.IconContainer>
                <img style={{width:"18px", height:"15px" , padding:"0 auto", margin:"0 10px"}} src="/assets/icons/facebook.svg"/>
                <p>Facebook</p>
            </S.IconContainer>
            <S.IconContainer>
                <img style={{width:"15px", height:"20px" , padding:"0", margin:"0 12px"}} src="/assets/icons/twitter.svg" />
                <p>X</p>
            </S.IconContainer>
        </S.Text2>
    );

    const BottomText = (
        <S.Text3>
            <p>© 2025 BlueCotton. All rights reserved.</p>
        </S.Text3>
    );


    return (
        <S.Wrapper>
            <S.Container>
                {LeftText}
                {RightText}
            </S.Container>
            <S.BottomContainer>
                {BottomText}
            </S.BottomContainer>
        </S.Wrapper>

    );
}

export default Footer;