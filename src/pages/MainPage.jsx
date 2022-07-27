import React, { createContext } from "react"
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
export const AuthContext = React.createContext()

// 오직 로그인이 되었을때만 접근이 가능하도록 하는 Route
const PrivateRoute = ({ isLogin }) => {
  return isLogin ? <Outlet /> : <Navigate to="/" replace />
}

// 로그인이 되지 않았을 경우에만 접근이 가능하도록 하는 Route
const RestrictedRoute = ({ isLogin }) => {
  return isLogin ? <Navigate to="/" replace /> : <Outlet />
}

const MainPage = () => {
  const [state, authDispatch] = useReducer(reducer, initialState)
  const { authenticated } = state
  return (
    <AuthContext.Provider value={authDispatch}>
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
