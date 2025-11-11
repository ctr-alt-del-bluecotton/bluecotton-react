import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/global";
import theme from "./styles/theme";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ModalProvider } from "./components/modal/useModal";
import ConfirmModal from "./components/modal/ConfirmModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserStatus } from "./modules/user";
import { set } from "react-hook-form";

function App() {
 
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null)
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  console.log(user)
  
  //  최초 한 번 및 accessToken 변경 시 실행
  useEffect(() => {
    // accessToken이 없으면 실행하지 않음
    if(!accessToken) {
      return;
    }
    
    // 이미 로그인 상태이고 사용자 정보가 있으면 실행하지 않음
    if(user.isLogin && user.currentUser && user.currentUser.id) {
      return;
    }

    const getUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/members/me`, {
          method: "GET",
          headers: {
            "Authorization" : `Bearer ${accessToken}`
          }
        })
        if(!response.ok){
          throw new Error("토큰 만료")
        }
        const data = await response.json()
        return data
      } catch (error) {
        throw error;
      }
    }

    getUser()
    .then((res) => {
      console.log("실행")
      console.log(res.data)
      dispatch(setUser(res.data))
      dispatch(setUserStatus(true ))
    })
    .catch(async(error) => {
      try {
        const resfreshResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/refresh`, {
          method: "POST",
          headers:  {
            "Content-Type" : "application/json"
          },
          credentials: 'include',
          body: JSON.stringify({
            accessToken: accessToken
          })
        })

        if(!resfreshResponse.ok){
          // 토큰 갱신 실패 시 로그아웃 처리
          localStorage.removeItem("accessToken");
          setAccessToken(null);
          dispatch(setUserStatus(false));
          dispatch(setUser({}));
          return;
        }

        const newResponseData = await resfreshResponse.json()
        let newAccessToken =  newResponseData.data.accessToken
        localStorage.setItem("accessToken", newAccessToken)
        setAccessToken(newAccessToken)
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        localStorage.removeItem("accessToken");
        setAccessToken(null);
        dispatch(setUserStatus(false));
        dispatch(setUser({}));
      }
    })
  }, [accessToken, dispatch, user.isLogin])

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
