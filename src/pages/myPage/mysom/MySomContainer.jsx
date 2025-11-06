import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import S from './style';

const MySomContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'auth', label: '인증', path: '/main/my-page/my-som/auth' },
    { id: 'solo', label: '솔로솜', path: '/main/my-page/my-som/solo' },
    { id: 'party', label: '파티솜', path: '/main/my-page/my-som/party' },
    { id: 'candy', label: '캔디솜', path: '/main/my-page/my-som/candy' },
    { id: 'rank', label: '솜등급', path: '/main/my-page/my-som/rank' }
  ];

  const getActiveTab = () => {
    if (location.pathname.includes('/auth')) return 'auth';
    if (location.pathname.includes('/solo')) return 'solo';
    if (location.pathname.includes('/party')) return 'party';
    if (location.pathname.includes('/candy')) return 'candy';
    if (location.pathname.includes('/rank')) return 'rank';
    return 'auth';
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  // check 경로에서는 탭을 표시하지 않음
  const isCheckPage = location.pathname.includes('/my-som-check');

  // 각 탭별 제목과 부제목 설정
  const getTitleContent = () => {
    const activeTab = getActiveTab();
    const titleMap = {
      auth: { title: '인증 현황이 궁금하세요?', subtitle: '인증 현황을 확인할 수 있어요.' },
      solo: { title: '솔로 솜 현황이 궁금하세요?', subtitle: '솔로 솜 현황을 확인할 수 있어요.' },
      party: { title: '파티 솜 현황이 궁금하세요?', subtitle: '파티 솜 현황을 확인할 수 있어요.' },
      candy: { title: '캔디 현황이 궁금하세요?', subtitle: '캔디 현황을 확인할 수 있어요.' },
      rank: { title: '솜 등급 현황이 궁금하세요?', subtitle: '솜 등급 현황을 확인할 수 있어요.' }
    };
    return titleMap[activeTab];
  };

  const titleContent = getTitleContent();

  return (
    <div>
      {!isCheckPage && (
        <>
          <S.ContentTitle>{titleContent.title}</S.ContentTitle>
          <S.ContentSubtitle>{titleContent.subtitle}</S.ContentSubtitle>
        </>
      )}
      {!isCheckPage && (
        <S.TabContainer>
          {tabs.map(tab => (
            <S.Tab
              key={tab.id}
              active={getActiveTab() === tab.id}
              onClick={() => handleTabClick(tab.path)}
            >
              {tab.label}
            </S.Tab>
          ))}
        </S.TabContainer>
      )}
      
      <Outlet />
    </div>
  );
};

export default MySomContainer;
