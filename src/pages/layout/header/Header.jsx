import React from "react";
import S from "./style.js";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  }

  const isIntroPage = pathname === "/";
  const isSomPage  = pathname.startsWith("/main/som");
  const isShopPage = pathname.startsWith("/main/shop");
  const isMyPage   = pathname.startsWith("/main/my-page/");
  const isPostPage = pathname.startsWith("/main/post");
  const isMapPage  = pathname.startsWith("/main/map");

  const goToLinkName =
    isSomPage  ? "솜" :
    isShopPage ? "샵" :
    isMyPage   ? "마이페이지" :
    isPostPage ? "오늘의 솜" :  
    isMapPage  ? "주변 솜" : "";

  const Categories = (
    <>
      <S.NavLink to="/main/som/all">솜</S.NavLink>
      <S.NavLink to="/main/shop">블루코튼 샵</S.NavLink>
      <S.NavLink to="/main/post/all">오늘의 솜</S.NavLink>
    </>
  );

  return (
    <S.HeaderWrap>
      <S.HeaderContainer>
        <S.HeaderRow>
          <S.LeftGroup>
            <S.Logo to="/">blue cotton</S.Logo>
            {!isIntroPage && goToLinkName && (
              <>
                <S.Bar>|</S.Bar>
                <S.SectionName>{goToLinkName}</S.SectionName>
              </>
            )}
          </S.LeftGroup>
          <S.CenterGroup>
            {isIntroPage && Categories}
          </S.CenterGroup>
          <S.RightGroup>
            <S.LoginButton onClick={handleLoginClick}>
              <span><img style={{width:"21px", height:"24px", marginTop:"5px"}} src="/assets/icons/login.svg" alt="프로필아이콘" /></span>
              <span style={{color:"#0051FF"}}>로그인</span>
            </S.LoginButton>
          </S.RightGroup>
        </S.HeaderRow>
      </S.HeaderContainer>
    </S.HeaderWrap>
  );
};

export default Header;
