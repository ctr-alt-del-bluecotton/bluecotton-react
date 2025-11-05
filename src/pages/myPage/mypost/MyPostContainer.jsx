import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import S from './style';

const MyPostContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'write', label: '작성한 글', path: '/main/my-page/my-post/write' },
    { id: 'like', label: '좋아요', path: '/main/my-page/my-post/like' },
    { id: 'comment', label: '나의 댓글', path: '/main/my-page/my-post/comment' },
    { id: 'save', label: '임시저장한 글', path: '/main/my-page/my-post/save' },
    { id: 'recent', label: '최근에 본 글', path: '/main/my-page/my-post/recent' }
  ];

  const getActiveTab = () => {
    if (location.pathname.includes('/write')) return 'write';
    if (location.pathname.includes('/like')) return 'like';
    if (location.pathname.includes('/comment')) return 'comment';
    if (location.pathname.includes('/save')) return 'save';
    if (location.pathname.includes('/recent')) return 'recent';
    return 'write';
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      <S.ContentTitle>오늘의 솜 현황이 궁금하세요?</S.ContentTitle>
      <S.ContentSubtitle>게시판 현황을 확인할 수 있어요.</S.ContentSubtitle>
      
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
      
      <Outlet />
    </div>
  );
};

export default MyPostContainer;
