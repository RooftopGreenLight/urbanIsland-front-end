import axiosInstance from "api/axiosInstance"

export const accountControl = {
  getSignUpEmail: async email => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: "/auth/check-email",
        params: {
          email,
        },
      })
      return response
    } catch (err) {
      const errorMessage = err.response.data.data.errorMessage
      throw new Error(errorMessage)
    }
  },
  postSignupData: async (email, password, name) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/auth/join",
        data: {
          email,
          password,
          name,
        },
      })
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
  postVerifyEmail: async email => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/auth/verify-email",
        params: {
          email,
        },
      })
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
  postLoginData: async (email, password) => {
    let response
    try {
      response = await axiosInstance({
        method: "POST",
        url: "/auth/login",
        data: {
          email,
          password,
        },
      })
      // 로그인에 성공했을 경우, 추후 access_token 만료를 대비하여 header 설정.
      const { accessToken, refreshToken } = response.data
      addTokenToLocalStorage(accessToken, refreshToken)
      return response
    } catch (err) {
      const errorMessage = err.response.data.data.errorMessage
      throw new Error(errorMessage)
    }
  },
  getRefreshToken: async refresh => {
    let response
    try {
      response = await axiosInstance({
        method: "POST",
        url: "auth/refresh_token",
        data: {
          refreshToken: refresh,
        },
      })
      const { accessToken, refreshToken } = response.data
      addTokenToLocalStorage(accessToken, refreshToken)
      return response
    } catch (err) {
      const errorMessage = err.response.data.data.errorMessage
      throw new Error(errorMessage)
    }
  },
  getLogOut: () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    delete axiosInstance.defaults.headers.common["Authorization"]
  },
}

const addTokenToLocalStorage = (access, refresh) => {
  localStorage.setItem("access_token", JSON.stringify(access))
  localStorage.setItem("refresh_token", JSON.stringify(refresh))
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`
}
