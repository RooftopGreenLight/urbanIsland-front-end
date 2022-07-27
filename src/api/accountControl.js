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
      const accessToken = { response }
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      return response
    } catch (err) {
      const errorMessage = err.response.data.data.errorMessage
      throw new Error(errorMessage)
    }
  },
}
