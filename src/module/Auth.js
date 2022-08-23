import { atom, selector } from "recoil"

export const AuthState = atom({
  key: "auth/information",
  default: {
    token: null,
    authenticated: false,
    memberId: null,
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
