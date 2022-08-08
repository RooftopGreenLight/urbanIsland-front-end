import { useContext, useEffect } from "react"
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom"

import BaseTemplate from "components/template/BaseTemplate"
import { HomeContainer } from "pages/Container/HomeContainer"
import { LoginContainer } from "pages/Container/LoginContainer"
import { SignupContainer } from "pages/Container/SignupContainer"

import { MypageContainer } from "./Container/MypageContainer"
import { AuthDispatchContext, AuthStateContext } from "module/Auth"


// 오직 로그인이 되었을때만 접근이 가능하도록 하는 Route
const PrivateRoute = ({ isLogin }) => {
  return isLogin ? <Outlet /> : <Navigate to="/" replace />
}

// 로그인이 되지 않았을 경우에만 접근이 가능하도록 하는 Route
const RestrictedRoute = ({ isLogin }) => {
  return isLogin ? <Navigate to="/" replace /> : <Outlet />
}

const MainPage = () => {
  const authState = useContext(AuthStateContext)
  const authDispatch = useContext(AuthDispatchContext)
  //  화면이 새로 로딩될 때, localStorage에 access_token이 있는지를 체크.
  //  만약 토큰이 있다면 이를 자동으로 Context API에 추가하도록 설정.
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token")
    if (accessToken) {
      authDispatch({
        type: "SET_TOKEN",
        token: accessToken,
      })
    }
  }, [])

  return (

    <BrowserRouter>
      <BaseTemplate>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/mypage/:section" element={<MypageContainer />} />
          <Route element={<RestrictedRoute />} isLogin={authState.authenticated}>
            <Route path="/login" element={<LoginContainer />} />
            <Route path="/signup" element={<SignupContainer />} />
          </Route>
        </Routes>
      </BaseTemplate>
    </BrowserRouter>
  )
}

export default MainPage
