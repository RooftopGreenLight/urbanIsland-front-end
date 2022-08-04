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
      const errorMessage = err.response.data.message
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
  getVerifyEmail: async email => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/auth/verify-email",
        params: {
          email,
        },
      })
      return response.data
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
      console.log(err)
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  getRefreshToken: async refresh => {
    let response
    try {
      response = await axiosInstance({
        headers: {
          "refresh-token": `Bearer ${refresh}`,
        },
        method: "POST",
        url: "auth/check-refresh-token",
      })
      const { accessToken, refreshToken } = response.data
      addTokenToLocalStorage(accessToken, refreshToken)
      return accessToken
    } catch (err) {
      const errorCode = err.response.data.data.errorCode
      if (errorCode === 461) {
        this.getLogOut()
      }
      throw new Error(errorCode)
    }
  },
  getLogOut: () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    window.location.reload()
  },
}

const addTokenToLocalStorage = (access, refresh) => {
  localStorage.setItem("access_token", JSON.stringify(access))
  localStorage.setItem("refresh_token", JSON.stringify(refresh))
}
