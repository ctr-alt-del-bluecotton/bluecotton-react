import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import S from './style';

const MyPageContainer = () => {
  const location = useLocation();

  // 현재 경로에 따라 활성 상태 결정
  const isActive = (path) => {
    if (path === '/main/my-page/my-info') {
      return location.pathname === path || location.pathname.startsWith('/main/my-page/my-info');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <S.MyPageWrapper>
      <S.SidebarContainer>
        <S.ProfileContainer>
          <S.ProfileImageWrapper>
            <S.ProfileImage />
          </S.ProfileImageWrapper>
          <S.UserNameContainer>
            <S.GradeBadge>S</S.GradeBadge>
            <S.UserName>zl존준서</S.UserName>
          </S.UserNameContainer>
        </S.ProfileContainer>
        <S.NavigationList>
          <S.NavLink to="/main/my-page/my-som/auth" $active={isActive('/main/my-page/my-som')}>
            마이 솜
          </S.NavLink>
          <S.NavLink to="/main/my-page/my-shop/like" $active={isActive('/main/my-page/my-shop')}>
            마이 샵
          </S.NavLink>
          <S.NavLink to="/main/my-page/my-post/write" $active={isActive('/main/my-page/my-post')}>
            게시판
          </S.NavLink>
          <S.NavLink to="/main/my-page/my-info" $active={isActive('/main/my-page/my-info')}>
            회원관리
          </S.NavLink>
        </S.NavigationList>
      </S.SidebarContainer>
      <S.MainContentContainer>
        <Outlet />
      </S.MainContentContainer>
    </S.MyPageWrapper>
  );
};

export default MyPageContainer;
