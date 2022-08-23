import { useContext, useEffect, useRef } from "react"
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom"

import { AuthDispatchContext } from "module/Auth"
import SocialAuthConfirm from "components/main/Auth/SocialAuthConfirm"

import { HomeContainer } from "pages/Container/HomeContainer"
import { MypageContainer } from "pages/Container/MypageContainer"

import Login from "components/main/Login/Login"
import Signup from "components/main/Signup/Signup"
import ChatRoomPage from "components/main/Chat/ChatRoomPage"

// 오직 로그인이 되었을때만 접근이 가능하도록 하는 Route
const PrivateRoute = ({ isLogin }) => {
  return isLogin ? <Outlet /> : <Navigate to="/" replace />
}

// 로그인이 되지 않았을 경우에만 접근이 가능하도록 하는 Route
const RestrictedRoute = ({ isLogin }) => {
  return isLogin ? <Navigate to="/" replace /> : <Outlet />
}

const MainPage = () => {
  const authDispatch = useContext(AuthDispatchContext)
  const isLogin = useRef(false)
  //  화면이 새로 로딩될 때, localStorage에 access_token이 있는지를 체크.
  //  만약 토큰이 있다면 이를 자동으로 Context API에 추가하도록 설정.
  useEffect(() => {
    const token = localStorage.getItem("access_token")
    const memberId = localStorage.getItem("memberId")
    if (token) {
      authDispatch({
        type: "SET_TOKEN",
        token,
        memberId,
      })
      isLogin.current = true
    }
  }, [])

  console.log(isLogin.current)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route element={<RestrictedRoute isLogin={isLogin.current} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/oauth2/login">
            <Route path="google" element={<SocialAuthConfirm site={"google"} />} />
            <Route path="naver" element={<SocialAuthConfirm site={"naver"} />} />
            <Route path="kakao" element={<SocialAuthConfirm site={"kakao"} />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute isLogin={isLogin.current} />}>
          <Route path="/chat" element={<ChatRoomPage />} />
          <Route path="/mypage/*" element={<MypageContainer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default MainPage
