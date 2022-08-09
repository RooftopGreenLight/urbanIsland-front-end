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
      console.log(err)
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
  postLoginData: async (email, password, nickname) => {
    let response
    try {
      response = await axiosInstance({
        method: "POST",
        url: "/auth/login",
        data: {
          email,
          password,
          nickname,
        },
      })
      // 로그인에 성공했을 경우, 추후 access_token 만료를 대비하여 header 설정.
      console.log(response)
      const { tokenDto, id } = response.data
      const { accessToken, refreshToken } = tokenDto
      addTokenToLocalStorage(accessToken, refreshToken, id)
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
          "refresh-token": `${refresh}`,
        },
        method: "GET",
        url: "auth/check-refresh-token",
      })
      const { accessToken, refreshToken } = response.data
      addTokenToLocalStorage(accessToken, refreshToken)
      return accessToken
    } catch (err) {
      const { errorCode, message } = err.response.data
      if (errorCode === 461) {
        this.getLogOut()
        return
      }
      throw new Error(message)
    }
  },
  getLogOut: () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("memberId")
    window.location.reload()
  },
}

export const addTokenToLocalStorage = (access, refresh, id = false) => {
  localStorage.setItem("access_token", JSON.stringify(access))
  localStorage.setItem("refresh_token", JSON.stringify(refresh))
  if (id) {
    localStorage.setItem("memberId", JSON.stringify(id))
  }
}
