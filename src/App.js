import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/global";
import theme from "./styles/theme";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ModalProvider } from "./components/modal/useModal";
import ConfirmModal from "./components/modal/ConfirmModal";

function App() {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("8205d77659532bf75b85e3424590d6bc");
      console.log("✅ Kakao SDK Initialized");
    } else {
      console.warn("⚠️ Kakao SDK가 로드되지 않았습니다.");
    }
  }, []);

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
