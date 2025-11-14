import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/global";
import theme from "./styles/theme";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ModalProvider } from "./components/modal/useModal";
import ConfirmModal from "./components/modal/ConfirmModal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setUserStatus } from "./modules/user";

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [init, setInit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateToken = () => {
      const token = localStorage.getItem("accessToken");
      setAccessToken(token);
    };

    window.addEventListener("accessTokenUpdated", updateToken);
    return () => window.removeEventListener("accessTokenUpdated", updateToken);
  }, []);

  useEffect(() => {
    const initAuth = async () => {

      if (!accessToken) {
        dispatch(setUserStatus(false));
        setInit(true);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/private/members/me`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) throw new Error("토큰 만료");

        const data = await response.json();
        dispatch(setUser(data.data));
        dispatch(setUserStatus(true));
      } catch (error) {
        const refreshResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/auth/refresh`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ accessToken }),
          }
        );

        if (!refreshResponse.ok) {
          localStorage.removeItem("accessToken");
          dispatch(setUserStatus(false));
          setAccessToken(null);
          setInit(true);
          return;
        }

        const newResponseData = await refreshResponse.json();
        const newToken = newResponseData.data.accessToken;

        localStorage.setItem("accessToken", newToken);
        setAccessToken(newToken);

        window.dispatchEvent(new Event("accessTokenUpdated"));
      }

      setInit(true);
    };

    initAuth();
  }, [accessToken, dispatch]);

  if (!init) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        로딩 중...
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ModalProvider>
        <RouterProvider router={router} />
        <ConfirmModal />
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
