import { useContext, useEffect } from "react"
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom"

import { AuthDispatchContext, AuthStateContext } from "module/Auth"
import SocialAuthConfirm from "components/main/Auth/SocialAuthConfirm"

import BaseTemplate from "components/template/BaseTemplate"
import { HomeContainer } from "pages/Container/HomeContainer"
import { LoginContainer } from "pages/Container/LoginContainer"
import { SignupContainer } from "pages/Container/SignupContainer"
import { MypageContainer } from "pages/Container/MypageContainer"

import ChatRoomPage from "components/main/Chat/ChatRoomPage"
import Profile from "components/main/Mypage/Profile/Profile"
import Schedule from "components/main/Mypage/Schedule/Schedule"
import Admin from "components/main/Mypage/Admin/Admin"
import Greenbee from "components/main/Mypage/Greenbee/Greenbee"
import Rooftop from "components/main/Mypage/RooftopOwner/Rooftop"
import MakeGreenbeeAccount from "components/main/Mypage/Profile/MakeGreenbeeAccount"
import RequiredGreeningList from "components/main/Mypage/Greenbee/RequiredGreeningList"

// 테스트
import ApplyRoofTop from "components/main/RoofTop/ApplyRoofTop"
import RequestToGreenBee from "components/main/RoofTop/RequestToGreenBee"

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
    const token = localStorage.getItem("access_token")
    const memberId = localStorage.getItem("memberId")
    if (token) {
      authDispatch({
        type: "SET_TOKEN",
        token,
        memberId,
      })
    }
  }, [])

  const isLogin = authState.authenticated

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route element={<RestrictedRoute isLogin={isLogin} />}>
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/signup" element={<SignupContainer />} />
        </Route>
        <Route element={<PrivateRoute isLogin={isLogin} />}>
          <Route path="/chat" element={<ChatRoomPage />} />
          <Route path="/mypage" element={<MypageContainer />}>
            <Route path="profile" element={<Profile />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="greenbee" element={<Greenbee />}>
              <Route path="required-greening" element={<RequiredGreeningList />} />
            </Route>
            <Route path="rooftop" element={<Rooftop />}>
              <Route path="apply" element={<ApplyRoofTop />} />
              <Route path="request" element={<RequestToGreenBee />} />
            </Route>
            <Route path="admin" element={<Admin />} />
            <Route path="greenbeeapply" element={<MakeGreenbeeAccount />} />
          </Route>
        </Route>
        <Route path="/oauth2/login/">
          <Route path="google" element={<SocialAuthConfirm site={"google"} />} />
          <Route path="naver" element={<SocialAuthConfirm site={"naver"} />} />
          <Route path="kakao" element={<SocialAuthConfirm site={"kakao"} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default MainPage
