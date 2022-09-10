import { useRecoilValue } from "recoil"
import { Routes, Route, Outlet, Navigate } from "react-router-dom"

import { AuthCheckLogin } from "module/Auth"

import { HomeContainer } from "pages/Container/HomeContainer"
import { MypageContainer } from "pages/Container/MypageContainer"

import Login from "components/main/Login/Login"
import Signup from "components/main/Signup/Signup"
import SocialAuthConfirm from "components/main/Auth/SocialAuthConfirm"
import { ReservationContainer } from "pages/Container/ReservationContainer"
import { PaymentContainer } from "pages/Container/PaymentContainer"
import NotFound from "components/common/Modal/NotFound"

// 오직 로그인이 되었을때만 접근이 가능하도록 하는 Route
const PrivateRoute = ({ isLogin }) => {
  return isLogin ? <Outlet /> : <Navigate to="/login" replace />
}

// 로그인이 되지 않았을 경우에만 접근이 가능하도록 하는 Route
const RestrictedRoute = ({ isLogin }) => {
  return isLogin ? <Navigate to="/" replace /> : <Outlet />
}

const MainPage = () => {
  const isLogin = useRecoilValue(AuthCheckLogin)
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
        <Route path="/reservation/*" element={<ReservationContainer />} />
        <Route path="/payment/*" element={<PaymentContainer />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default MainPage
