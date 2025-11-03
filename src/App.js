import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/global";
import theme from "./styles/theme";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ModalProvider } from "./components/modal/useModal";
import ConfirmModal from "./components/modal/ConfirmModal";

function App() {

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
