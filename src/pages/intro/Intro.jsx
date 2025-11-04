import React from 'react';
// import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import IntroBanner from '../../components/intro/IntroBanner';
import IntroWhatIsSom from '../../components/intro/IntroWhatIsSom';
import IntroMap from '../../components/intro/IntroMap';
import IntroShop from '../../components/intro/IntroShop';
import IntroGrade from '../../components/intro/IntroGrade';
import IntroPost from '../../components/intro/IntroPost';
import IntroSom from '../../components/intro/IntroSom';
import Footer from '../../components/footer/Footer';
import FloatingAction from '../layout/floatingAciton/FloatingAction'

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