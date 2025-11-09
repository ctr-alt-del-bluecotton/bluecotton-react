
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SocialRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get("key");

    if (!key) {
      alert("로그인에 실패했습니다.");
      navigate("/login");
      return;
    }

    (async () => {
      try {
        // key로 access token 가져오기
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/auth/oauth2/success?key=${key}`,
          { credentials: "include" } // refreshToken 쿠키 포함
        );

        const data = await res.json();

        // accessToken 저장 (localStorage or recoil / redux)
        localStorage.setItem("accessToken", data.accessToken);

        // 홈 또는 마이페이지로 이동
        navigate("/main/som/all");
      } catch (err) {
        console.error(err);
        alert("로그인 중 오류가 발생했습니다.");
        navigate("/login");
      }
    })();
  }, [navigate]);

  return <div>소셜 로그인 처리중...</div>;
};

export default SocialRedirect;
