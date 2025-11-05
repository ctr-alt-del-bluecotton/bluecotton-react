import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../../components/scrollTop/ScorllTop'; // ✅ 경로 주의!
import FloatingAction from './floatingAciton/FloatingAction';
import Header from './header/Header';
import Footer from './footer/Footer';
import HeaderCategory from './header/mainCategory/HeaderCategory';

const Layout = () => {
  return (
    <div>
      <header>
        <Header />
        <HeaderCategory />
      </header>
      <main>
        {/* 라우트 바뀔 때마다 스크롤을 맨 위로 */}
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
      <FloatingAction />
    </div>
  );
};

export default Layout;
