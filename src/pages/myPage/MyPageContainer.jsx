import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MyPageWrapper, MainContentContainer, SidebarContainer, ProfileContainer, ProfileImageWrapper, ProfileImage, SomBadge, UserNameContainer, GradeBadge, UserName, NavigationList, NavLink } from './style';

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
    <MyPageWrapper>
      <SidebarContainer>
        <ProfileContainer>
          <ProfileImageWrapper>
            <ProfileImage />
          </ProfileImageWrapper>
          <UserNameContainer>
            <GradeBadge>S</GradeBadge>
            <UserName>zl존준서</UserName>
          </UserNameContainer>
        </ProfileContainer>
        <NavigationList>
          <NavLink to="/main/my-page/my-som/auth" $active={isActive('/main/my-page/my-som')}>
            마이 솜
          </NavLink>
          <NavLink to="/main/my-page/my-shop/like" $active={isActive('/main/my-page/my-shop')}>
            마이 샵
          </NavLink>
          <NavLink to="/main/my-page/my-post/write" $active={isActive('/main/my-page/my-post')}>
            게시판
          </NavLink>
          <NavLink to="/main/my-page/my-info" $active={isActive('/main/my-page/my-info')}>
            회원관리
          </NavLink>
        </NavigationList>
      </SidebarContainer>
      <MainContentContainer>
        <Outlet />
      </MainContentContainer>
    </MyPageWrapper>
  );
};

export default MyPageContainer;
