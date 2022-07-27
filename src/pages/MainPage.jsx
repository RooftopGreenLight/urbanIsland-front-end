import { createContext, useEffect, useReducer } from "react"
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom"
import jwt_decode from "jwt-decode"

import axiosInstance from "api/axiosInstance"

import { accountControl } from "api/accountControl"
import BaseTemplate from "components/template/BaseTemplate"
import { HomeContainer } from "pages/Container/HomeContainer"
import { LoginContainer } from "pages/Container/LoginContainer"
import { SignupContainer } from "pages/Container/SignupContainer"

// JWT Token 관련 reducer 함수, initialState 객체 선언.
const initialState = { token: null, authenticated: false }
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.token, authenticated: true }
    case "REMOVE_TOKEN":
      return { ...state, token: null, authenticated: false }
    default:
      return state
  }
}
export const AuthContext = createContext()

// 오직 로그인이 되었을때만 접근이 가능하도록 하는 Route
const PrivateRoute = ({ isLogin }) => {
  return isLogin ? <Outlet /> : <Navigate to="/" replace />
}

// 로그인이 되지 않았을 경우에만 접근이 가능하도록 하는 Route
const RestrictedRoute = ({ isLogin }) => {
  return isLogin ? <Navigate to="/" replace /> : <Outlet />
}

const MainPage = () => {
  const [authState, authDispatch] = useReducer(reducer, initialState)
  const { authenticated } = authState

  /* 화면이 새로 로딩될 때, localStorage에 access_token이 있는지를 체크.
     만약 토큰이 있다면 이를 자동으로 Context API에 추가하도록 설정. */
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token")

    const setNewestToken = async () => {
      const refreshToken = localStorage.getItem("refresh_token")
      const response = await accountControl.getRefreshToken(refreshToken)
      const { accessToken: newAccessToken } = response.data
      authDispatch({
        type: "SET_TOKEN",
        token: newAccessToken,
      })
    }

    const setCurrentToken = () => {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      authDispatch({
        type: "SET_TOKEN",
        token: accessToken,
      })
    }

    // 먼저, accessToken 이 존재하는지를 파악해야 함.
    if (accessToken) {
      const decoded = jwt_decode(accessToken)
      // 만약 토큰 만료 기간까지 1시간 가량 남았다면, 새로운 토큰 발급.
      if (Date.now() - decoded.exp < 1000 * 60 * 60) {
        setNewestToken()
      }
      // 그렇지 않을 경우, 기존의 토큰을 사용하여 Context API 초기화
      else {
        setCurrentToken(accessToken)
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      <BrowserRouter>
        <BaseTemplate>
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route element={<RestrictedRoute />} isLogin={authenticated}>
              <Route path="/login" element={<LoginContainer />} />
              <Route path="/signup" element={<SignupContainer />} />
            </Route>
          </Routes>
        </BaseTemplate>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default MainPage
