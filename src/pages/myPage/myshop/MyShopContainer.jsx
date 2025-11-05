import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import S from './style';

const MyShopContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'like', label: '찜', path: '/main/my-page/my-shop/like' },
    { id: 'cart', label: '장바구니', path: '/main/my-page/my-shop/cart' },
    { id: 'review', label: '마이리뷰', path: '/main/my-page/my-shop/review' },
    { id: 'delivery', label: '배송현황', path: '/main/my-page/my-shop/delivery' },
    { id: 'order', label: '구매내역', path: '/main/my-page/my-shop/order' }
  ];

  const getActiveTab = () => {
    if (location.pathname.includes('/like')) return 'like';
    if (location.pathname.includes('/cart')) return 'cart';
    if (location.pathname.includes('/review')) return 'review';
    if (location.pathname.includes('/delivery')) return 'delivery';
    if (location.pathname.includes('/order')) return 'order';
    return 'like';
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <div>
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

export default MyShopContainer;
