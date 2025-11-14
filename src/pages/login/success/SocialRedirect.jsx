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
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/auth/oauth2/success?key=${key}`,
          { credentials: "include" }
        );

        const data = await res.json();

        localStorage.setItem("accessToken", data.accessToken);

        window.dispatchEvent(new Event("accessTokenUpdated"));

        setTimeout(() => {
          navigate("/main/som/all");
        }, 30);

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
