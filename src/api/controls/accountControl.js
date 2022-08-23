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
  postSignupData: async (email, password, nickname) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/auth/join",
        data: {
          email,
          password,
          nickname,
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
  getRefreshToken: async function (refresh) {
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
      this.getLogOut()
      // console.log(err.response)
      // const { errorCode, message } = err.response.data
      // if (errorCode === 461) {
      //   this.getLogOut()
      //   return
      // }
      // throw new Error(message)
    }
  },
  getLogOut: () => {
    removeTokenFromLocalStorage()
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

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
  localStorage.removeItem("memberId")
}
