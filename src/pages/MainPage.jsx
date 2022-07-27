import { createContext, useEffect } from "react"
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom"

import BaseTemplate from "components/template/BaseTemplate"
import { HomeContainer } from "pages/Container/HomeContainer"
import { LoginContainer } from "pages/Container/LoginContainer"
import { SignupContainer } from "./Container/SignupContainer"
import { useReducer } from "react"

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
// JWT Access Token을 담는 Context API 생성
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

  // 화면이 새로 로딩될 때, localStorage에 access_token이 있는지를 체크.
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token")
    console.log(accessToken)
    if (accessToken) {
      authDispatch({
        type: "SET_TOKEN",
        token: accessToken,
      })
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
            <Route element={<PrivateRoute />} isLogin={authenticated}>
              <Route path="/logout" />
            </Route>
          </Routes>
        </BaseTemplate>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default MainPage
