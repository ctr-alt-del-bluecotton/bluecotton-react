import React from 'react';
import IntroBanner from './IntroBanner';
import IntroWhatIsSom from './IntroWhatIsSom';
import IntroMap from './IntroMap';
import IntroShop from './IntroShop';
import IntroGrade from './IntroGrade';
import IntroPost from './IntroPost';
import IntroSom from './IntroSom';
import FloatingAction from '../layout/floatingAciton/FloatingAction';
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';

const Intro = () => {
  return (
    <div>
      <FloatingAction />
      <Header />
      {/* 소개페이지! */}
      <IntroBanner />
      <IntroWhatIsSom />
      <IntroMap />
      <IntroShop />
      <IntroGrade />
      <IntroPost />
      <IntroSom />
      {/* <div>
        <Link to={"/main/som/all"}>메인으로이동</Link>
      </div> */}
      <Footer />
    </div>
  );
};

export default Intro;