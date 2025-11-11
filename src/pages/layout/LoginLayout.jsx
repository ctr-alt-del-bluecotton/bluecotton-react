// src/routes/ProtectedRoute.jsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useModal } from "../../components/modal";

const LoginLayOut = () => {
  const { isLogin } = useSelector((state) => state.user);
  const { openModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      openModal({
        title: "로그인이 필요합니다",
        message: "로그인 후 이용해주세요.",
        confirmText: "확인",
        onConfirm: () => navigate("/login"),
      });
    }
  }, [isLogin]);

  if (!isLogin) return null;

  return <Outlet />;
};

export default LoginLayOut;
