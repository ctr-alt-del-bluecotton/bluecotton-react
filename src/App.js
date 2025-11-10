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
  //  최초 한 번
  useEffect(() => {

    if(accessToken){
      const getUser = async () => {
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
      }

      getUser()
      .then((res) => {
        console.log("실행")
        console.log(res.data)
        dispatch(setUser(res.data))
        dispatch(setUserStatus(true ))
      })
      .catch(async(error) => {
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
            return alert("토큰 발급 실패")
          }

          const newResponseData = await resfreshResponse.json()
          let newAccessToken =  newResponseData.data.accessToken
          localStorage.setItem("accessToken", newAccessToken)
          setAccessToken(newAccessToken)
      })
    }
  }, [accessToken])

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
