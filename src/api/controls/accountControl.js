import axiosInstance from "api/axiosInstance"

export const accountControl = {
  getCheckEmail: async email => {
    try {
      await axiosInstance({
        method: "GET",
        url: "/auth/check-email",
        params: {
          email,
        },
      })
    } catch (err) {
      console.log(err)
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  getCheckNickname: async nickname => {
    try {
      await axiosInstance({
        method: "GET",
        url: "/auth/check-nickname",
        params: {
          nickname,
        },
      })
    } catch (err) {
      throw new Error(err)
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
  postChangePassword: async (email, password) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/auth/change-password",
        data: {
          email,
          password,
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
      const { tokenDto, id, authority } = response.data
      const { accessToken, refreshToken } = tokenDto
      addTokenToLocalStorage(accessToken, refreshToken, id, authority)
      return { accessToken, memberId: id, memberRole: authority }
    } catch (err) {
      console.log(err)
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  getRefreshToken: async function (refresh, memberId) {
    let response
    try {
      response = await axiosInstance({
        headers: {
          "refresh-token": `${refresh}`,
        },
        method: "GET",
        url: `auth/${memberId}/check-refresh-token`,
      })
      const { accessToken, refreshToken } = response.data
      addTokenToLocalStorage(accessToken, refreshToken)
      return accessToken
    } catch (err) {
      this.deleteLogOut()
    }
  },
  deleteLogOut: async () => {
    try {
      await axiosInstance({
        method: "DELETE",
        url: "auth/logout",
      })
      removeTokenFromLocalStorage()
      window.location.reload()
    } catch (err) {
      console.log(err)
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
}

export const addTokenToLocalStorage = (access, refresh, id = null, authority = null) => {
  localStorage.setItem("access_token", JSON.stringify(access))
  localStorage.setItem("refresh_token", JSON.stringify(refresh))
  if (id && authority) {
    localStorage.setItem("memberId", JSON.stringify(id))
    localStorage.setItem("memberRole", JSON.stringify(authority))
  }
}

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
  localStorage.removeItem("memberId")
  localStorage.removeItem("memberRole")
}
