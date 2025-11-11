import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import S from './style';

const MyPageContainer = () => {
  const location = useLocation();
  
  // Redux에서 현재 로그인한 사용자 정보 가져오기
  const { currentUser, isLogin } = useSelector((state) => state.user);

  // 현재 경로에 따라 활성 상태 결정
  const isActive = (path) => {
    if (path === '/main/my-page/my-info') {
      return location.pathname === path || location.pathname.startsWith('/main/my-page/my-info');
    }
    return location.pathname.startsWith(path);
  };

  // 프로필 이미지 URL 생성
  const getProfileImageUrl = () => {
    if (isLogin && currentUser?.memberPicturePath && currentUser?.memberPictureName) {
      return `${process.env.REACT_APP_BACKEND_URL}${currentUser.memberPicturePath}${currentUser.memberPictureName}`;
    }
    return null;
  };

  // 닉네임 가져오기
  const getNickname = () => {
    if (isLogin && currentUser?.memberNickname) {
      return currentUser.memberNickname;
    }
    return '게스트';
  };

  // 등급 가져오기 (대문자로 변환)
  const getGrade = () => {
    if (isLogin && currentUser?.memberRank) {
      const rank = currentUser.memberRank.toUpperCase();
      // 등급 매핑 (필요시 수정)
      const rankMap = {
        'ROOKIE': 'R',
        'BRONZE': 'B',
        'SILVER': 'S',
        'GOLD': 'G',
        'PLATINUM': 'P',
        'DIAMOND': 'D'
      };
      return rankMap[rank] || rank.charAt(0);
    }
    return 'S'; // 기본 등급
  };

  const profileImageUrl = getProfileImageUrl();
  const nickname = getNickname();
  const grade = getGrade();

  return (
    <S.MyPageWrapper>
      <S.SidebarContainer>
        <S.ProfileContainer>
          <S.ProfileImageWrapper>
            {profileImageUrl ? (
              <img 
                src={profileImageUrl} 
                alt="프로필" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '50%'
                }} 
              />
            ) : (
              <S.ProfileImage />
            )}
          </S.ProfileImageWrapper>
          <S.UserNameContainer>
            <S.GradeBadge>{grade}</S.GradeBadge>
            <S.UserName>{nickname}</S.UserName>
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
