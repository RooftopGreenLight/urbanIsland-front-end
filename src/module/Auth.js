import { createContext, useReducer } from "react"

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

// state, dispatch 함수 별 Context API 선언
export const AuthStateContext = createContext()
export const AuthDispatchContext = createContext()

// Provider 모듈을 생성하여 state, dispatch 함수를 전역적으로 사용할 수 있게끔 관리
export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(reducer, initialState)
  return (
    <AuthStateContext.Provider value={authState}>
      <AuthDispatchContext.Provider value={authDispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}
