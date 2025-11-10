import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./header/Header";
import HeaderCategory from "./header/mainCategory/HeaderCategory";
import Footer from "./footer/Footer";
import FloatingAction from "./floatingAciton/FloatingAction";
import ScrollToTop from "../../components/scrollTop/ScorllTop";
import { useModal } from "../../components/modal/useModal";

const LoginLayout = () => {
  const { isLogin } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { openModal } = useModal();

  useEffect(() => {
    if (!isLogin) {
      openModal({
        title: "로그인이 필요한 서비스입니다.",
        content: "해당 페이지를 이용하려면 로그인 후 이용해주세요.",
        confirmText: "로그인하기",
        onConfirm: () => navigate("/login"),
      });
    }
  }, [isLogin, navigate, openModal]);

  return (
    <div>
      <header>
        <Header />
        <HeaderCategory />
      </header>
      <main>
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
      <FloatingAction />
    </div>
  );
};

export default LoginLayout;
