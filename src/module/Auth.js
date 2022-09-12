import { atom, selector } from "recoil"

const access_token = localStorage.getItem("access_token")

export const AuthState = atom({
  key: "auth/information",
  default: {
    token: access_token,
    authenticated: access_token ? true : false,
    memberId: JSON.parse(localStorage.getItem("memberId")),
    memberRole: localStorage.getItem("memberRole"),
  },
})

export const AuthCheckLogin = selector({
  key: "auth/checkState",
  get: ({ get }) => {
    const { authenticated } = get(AuthState)
    return authenticated
  },
})

export const AuthCheckMemberId = selector({
  key: "auth/checkId",
  get: ({ get }) => {
    const { memberId } = get(AuthState)
    return memberId
  },
})

export const AuthCheckMemberRole = selector({
  key: "auth/checkRole",
  get: ({ get }) => {
    const { memberRole } = get(AuthState)
    return memberRole
  },
})

export const AuthConfirmLogin = selector({
  key: "auth/confirm",
  get: ({ get }) => {
    const authState = get(AuthState)
    return authState
  },
  set: ({ set }, newValue) => {
    set(AuthState, prevState => {
      return { ...prevState, ...newValue }
    })
  },
})
