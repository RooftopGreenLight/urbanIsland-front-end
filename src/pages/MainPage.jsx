import { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { Routes, Route, Outlet, Navigate } from "react-router-dom"

import { AuthCheckLogin, AuthConfirmLogin } from "module/Auth"

import { HomeContainer } from "pages/Container/HomeContainer"
import { MypageContainer } from "pages/Container/MypageContainer"

import Login from "components/main/Login/Login"
import Signup from "components/main/Signup/Signup"
import SocialAuthConfirm from "components/main/Auth/SocialAuthConfirm"

// 오직 로그인이 되었을때만 접근이 가능하도록 하는 Route
const PrivateRoute = ({ isLogin }) => {
  return isLogin ? <Outlet /> : <Navigate to="/" replace />
}

// 로그인이 되지 않았을 경우에만 접근이 가능하도록 하는 Route
const RestrictedRoute = ({ isLogin }) => {
  return isLogin ? <Navigate to="/" replace /> : <Outlet />
}

const MainPage = () => {
  const confirmLogin = useSetRecoilState(AuthConfirmLogin)
  const isLogin = useRecoilValue(AuthCheckLogin)
  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (token) {
      confirmLogin({ authenticated: true, token })
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<HomeContainer />} />
      <Route element={<RestrictedRoute isLogin={isLogin} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth2/login">
          <Route path="google" element={<SocialAuthConfirm site={"google"} />} />
          <Route path="naver" element={<SocialAuthConfirm site={"naver"} />} />
          <Route path="kakao" element={<SocialAuthConfirm site={"kakao"} />} />
        </Route>
      </Route>
      <Route element={<PrivateRoute isLogin={isLogin} />}>
        <Route path="/mypage/*" element={<MypageContainer />} />
      </Route>
    </Routes>
  )
}

export default MainPage
