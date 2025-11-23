import React, { useEffect, useRef, useState } from "react";
import S from "./style.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isMyPageHovered, setIsMyPageHovered] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const hoverStyle = {
    borderRadius: "4px",
    backgroundColor: "#0015FF",
    color: "#FFFFFF",
  };

  const buttonBaseStyle = {
    width: "100%",
    padding: "8px 0",
    textAlign: "center",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "13px",
    transition: "background-color 0.1s",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { currentUser, isLogin } = useSelector((state) => state.user);

 
  const handleLoginClick = () => navigate("/login");

  const handleLogoutClick = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("chatMessages");
    window.location.reload();
  };

  const handleMyPage = () => {
    navigate("/main/my-page/my-som/auth");
    setIsOpen(false);
  };

  const isIntroPage = pathname === "/";
  const isSomPage = pathname.startsWith("/main/som");
  const isShopPage = pathname.startsWith("/main/shop");
  const isMyPage = pathname.startsWith("/main/my-page/");
  const isPostPage = pathname.startsWith("/main/post");
  const isMapPage = pathname.startsWith("/main/map");

  const goToLinkName = isSomPage
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
      <S.NavLink to="/main/post/all">오늘의 솜</S.NavLink>
      <S.NavLink to="/main/map">주변 솜</S.NavLink>
      <S.NavLink to="/main/shop">블루코튼 샵</S.NavLink>
    </>
  );

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isLogin || !currentUser?.id) return;

      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/member/profile?memberId=${currentUser.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!res.ok) throw new Error("프로필 로드 실패");

        const result = await res.json();
        const data = result.data;

        setProfileImage(data.memberProfilePath + data.memberProfileName);
      } catch (err) {
        console.error(err);
        setProfileImage("/assets/icons/login.svg");
      }
    };

    fetchProfile();
  }, [isLogin, currentUser?.id]);

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
              <div
                ref={dropdownRef}
                style={{ position: "relative", display: "inline-block" }}
              >
                <button
                  type="button"
                  onClick={toggleDropdown}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <img
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50px",
                      marginRight: "8px",
                    }}
                    src={profileImage || "/assets/icons/login.svg"}
                    alt="프로필아이콘"
                  />

                  <S.ProfileName >{currentUser.memberNickname}</S.ProfileName>
                </button>
                {isOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      marginTop: "8px",
                      backgroundColor: "#FFFFFF",
                      boxShadow: "0 3px 4px rgba(0,0,0,0.25)",
                      borderRadius: "4px",
                      minWidth: "85px",
                      zIndex: 300,
                    }}
                  >
                    <button
                      onClick={handleMyPage}
                      onMouseEnter={() => setIsMyPageHovered(true)}
                      onMouseLeave={() => setIsMyPageHovered(false)}
                      style={{
                        ...buttonBaseStyle,
                        ...(isMyPageHovered ? hoverStyle : {}),
                      }}
                    >
                      마이페이지
                    </button>

                    <button
                      onClick={handleLogoutClick}
                      onMouseEnter={() => setIsLogoutHovered(true)}
                      onMouseLeave={() => setIsLogoutHovered(false)}
                      style={{
                        ...buttonBaseStyle,
                        ...(isLogoutHovered ? hoverStyle : {}),
                      }}
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
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
