import React from "react";
import S from "./style.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  //  리덕스에있는 유저 정보 유저 상태
  const { currentUser, isLogin } = useSelector((state) => state.user);

  //  로그아웃
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  const isIntroPage = pathname === "/";
  const isSomPage = pathname.startsWith("/main/som");
  const isShopPage = pathname.startsWith("/main/shop");
  const isMyPage = pathname.startsWith("/main/my-page/");
  const isPostPage = pathname.startsWith("/main/post");
  const isMapPage = pathname.startsWith("/main/map");

  const goToLinkName =
    isSomPage
      ? "솜"
      : isShopPage
      ? "샵"
      : isMyPage
      ? "마이페이지"
      : isPostPage
      ? "오늘의 솜"
      : isMapPage
      ? "주변 솜"
      : "";

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


          <S.CenterGroup>{isIntroPage && Categories}</S.CenterGroup>


          <S.RightGroup>
            {isLogin ? (
              <>
                <S.ProfileBox>
                  <img
                    style={{
                      width: "21px",
                      height: "24px",
                      marginTop: "2px",
                    }}
                    src="/assets/icons/login.svg"
                    alt="프로필아이콘"
                  />
                  <S.ProfileName>{currentUser.memberNickname || "사용자"}</S.ProfileName>
                </S.ProfileBox>
                <S.LogoutButton onClick={handleLogoutClick}>
                  로그아웃
                </S.LogoutButton>
              </>
            ) : (
              <S.LoginButton onClick={handleLoginClick}>
                <img
                  style={{
                    width: "21px",
                    height: "24px",
                    marginTop: "2px",
                  }}
                  src="/assets/icons/login.svg"
                  alt="프로필아이콘"
                />
                <span>로그인</span>
              </S.LoginButton>
            )}
          </S.RightGroup>
        </S.HeaderRow>
      </S.HeaderContainer>
    </S.HeaderWrap>
  );
};

export default Header;
