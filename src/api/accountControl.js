import axiosInstance from "api/axiosInstance"

export const accountControl = {
  getSignUpEmail: async email => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "auth/check-email",
        params: {
          email,
        },
      })
      return response
    } catch (err) {
      throw new Error(err)
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
      localStorage.setItem("access_token", JSON.stringify(accessToken))
      localStorage.setItem("refresh_token", JSON.stringify(refreshToken))
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      return response
    } catch (err) {
      const errorMessage = err.response.data.data.errorMessage
      throw new Error(errorMessage)
    }
  },
  getRefreshToken: async email => {
    let response
    try {
      response = await axiosInstance({
        method: "POST",
        url: "auth/refresh_token",
        data: {
          email,
        },
      })
      const { accessToken, refreshToken } = response.data
      localStorage.setItem("access_token", JSON.stringify(accessToken))
      localStorage.setItem("refresh_token", JSON.stringify(refreshToken))
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
  getLogOut: () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    axiosInstance.defaults.headers.common["Authorization"] = null
  },
}
