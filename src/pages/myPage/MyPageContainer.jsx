import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getUserId } from './utils/getUserId';
import S from './style';

const MyPageContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = localStorage.getItem("accessToken");
      
      // accessToken이 없으면 로그인 페이지로 리다이렉트
      if (!accessToken) {
        navigate("/login");
        return;
      }
      
      try {
        // 사용자 ID 가져오기
        const userId = await getUserId();
        if (!userId) {
          localStorage.removeItem("accessToken");
          navigate("/login");
          return;
        }
        
        // /private/my-page/read-member API로 사용자 정보 가져오기
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/my-page/read-member?id=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          }
        });
        
        if (!response.ok) {
          // 토큰 만료 시 refresh 시도
          try {
            const refreshResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/refresh`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              credentials: 'include',
              body: JSON.stringify({
                accessToken: accessToken
              })
            });
            
            if (!refreshResponse.ok) {
              localStorage.removeItem("accessToken");
              navigate("/login");
              return;
            }
            
            const refreshData = await refreshResponse.json();
            const newAccessToken = refreshData.data.accessToken;
            localStorage.setItem("accessToken", newAccessToken);
            
            // 새 토큰으로 다시 사용자 정보 가져오기
            const retryResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/my-page/read-member?id=${userId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${newAccessToken}`
              }
            });
            
            if (!retryResponse.ok) {
              localStorage.removeItem("accessToken");
              navigate("/login");
              return;
            }
            
            const retryData = await retryResponse.json();
            console.log("[DEBUG] 사용자 정보 응답:", retryData);
            setCurrentUser(retryData.data);
          } catch (refreshError) {
            console.error("토큰 갱신 실패:", refreshError);
            localStorage.removeItem("accessToken");
            navigate("/login");
            return;
          }
        } else {
          const data = await response.json();
          console.log("[DEBUG] 사용자 정보 응답:", data);
          console.log("[DEBUG] memberPicturePath:", data.data?.memberPicturePath);
          console.log("[DEBUG] memberPictureName:", data.data?.memberPictureName);
          setCurrentUser(data.data);
        }
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
        localStorage.removeItem("accessToken");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserInfo();
  }, [navigate]);
  
  // 로딩 중이면 로딩 표시
  if (loading) {
    return (
      <S.MyPageWrapper>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px'
        }}>
          로딩 중...
        </div>
      </S.MyPageWrapper>
    );
  }

  // 현재 경로에 따라 활성 상태 결정
  const isActive = (path) => {
    if (path === '/main/my-page/my-info') {
      return location.pathname === path || location.pathname.startsWith('/main/my-page/my-info');
    }
    return location.pathname.startsWith(path);
  };

  // 프로필 이미지 URL 생성
  // memberPicturePath는 이미 전체 URL (https://image-server.ideaflow.co.kr/uploads/mypage_profile/2025/11/12/)
  const getProfileImageUrl = () => {
    if (currentUser?.memberPicturePath && currentUser?.memberPictureName) {
      // memberPicturePath가 이미 전체 URL이므로 그대로 사용
      const imageUrl = currentUser.memberPicturePath.endsWith('/') 
        ? `${currentUser.memberPicturePath}${currentUser.memberPictureName}`
        : `${currentUser.memberPicturePath}/${currentUser.memberPictureName}`;
      console.log("[DEBUG] 프로필 이미지 URL:", imageUrl);
      return imageUrl;
    }
    console.log("[DEBUG] 프로필 이미지 없음 - memberPicturePath:", currentUser?.memberPicturePath, "memberPictureName:", currentUser?.memberPictureName);
    return null;
  };

  // 첫 글자를 대문자로 변환하는 함수
  const capitalize = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // 닉네임 가져오기
  const getNickname = () => {
    if (currentUser?.memberNickname) {
      return capitalize(currentUser.memberNickname);
    }
    return '게스트';
  };

  // 등급별 색상 설정
  const rankColorMap = {
    rookie: '#00C853',
    silver: '#B0BEC5',
    gold: '#DAB24C',
    diamond: '#00E5FF',
    master: '#FF1744'
  };

  // 등급 가져오기 (대문자로 변환)
  const getGrade = () => {
    if (currentUser?.memberRank) {
      const rank = currentUser.memberRank.toUpperCase();
      // 등급 매핑 (필요시 수정)
      const rankMap = {
        'ROOKIE': 'R',
        'BRONZE': 'B',
        'SILVER': 'S',
        'GOLD': 'G',
        'PLATINUM': 'P',
        'DIAMOND': 'D',
        'MASTER': 'M'
      };
      return rankMap[rank] || rank.charAt(0);
    }
    return 'S'; // 기본 등급
  };

  // 등급 색상 가져오기
  const getGradeColor = () => {
    if (currentUser?.memberRank) {
      const rank = currentUser.memberRank.toLowerCase();
      return rankColorMap[rank] || rankColorMap.silver;
    }
    return rankColorMap.silver; // 기본 색상
  };

  const profileImageUrl = getProfileImageUrl();
  const nickname = getNickname();
  const grade = getGrade();
  const gradeColor = getGradeColor();

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
                  borderRadius: '8px'
                }} 
              />
            ) : (
              <S.ProfileImage />
            )}
          </S.ProfileImageWrapper>
          <S.UserNameContainer>
            <S.GradeBadge $bgColor={gradeColor}>{grade}</S.GradeBadge>
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
