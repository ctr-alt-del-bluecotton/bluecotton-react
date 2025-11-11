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

  // 로그인 안 되어 있으면 페이지 렌더 막기
  if (!isLogin) return null;

  // 로그인 되어 있으면 하위 라우트 렌더링
  return <Outlet />;
};

export default LoginLayOut;
