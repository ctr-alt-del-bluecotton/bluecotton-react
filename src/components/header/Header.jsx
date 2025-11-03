import React from "react";
import HeaderStyle from "./styleHeader.js";
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
      <HeaderStyle.NavLink to="/main/som/all">솜</HeaderStyle.NavLink>
      <HeaderStyle.NavLink to="/main/shop">블루코튼 샵</HeaderStyle.NavLink>
      <HeaderStyle.NavLink to="/main/post/all">오늘의 솜</HeaderStyle.NavLink>
    </>
  );

  return (
    <HeaderStyle.HeaderWrap>
      <HeaderStyle.HeaderContainer>
        <HeaderStyle.HeaderRow>
          <HeaderStyle.LeftGroup>
            <HeaderStyle.Logo to="/">blue cotton</HeaderStyle.Logo>
            {!isIntroPage && goToLinkName && (
              <>
                <HeaderStyle.Bar>|</HeaderStyle.Bar>
                <HeaderStyle.SectionName>{goToLinkName}</HeaderStyle.SectionName>
              </>
            )}
          </HeaderStyle.LeftGroup>
          <HeaderStyle.CenterGroup>
            {isIntroPage && Categories}
          </HeaderStyle.CenterGroup>
          <HeaderStyle.RightGroup>
            <HeaderStyle.LoginButton onClick={handleLoginClick}>
              <span><img style={{width:"21px", height:"24px", marginTop:"5px"}} src="/assets/icons/login.svg" alt="프로필아이콘" /></span>
              <span style={{color:"#0051FF"}}>로그인</span>
            </HeaderStyle.LoginButton>
          </HeaderStyle.RightGroup>
        </HeaderStyle.HeaderRow>
      </HeaderStyle.HeaderContainer>
    </HeaderStyle.HeaderWrap>
  );
};

export default Header;
