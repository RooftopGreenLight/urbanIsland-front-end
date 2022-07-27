import axiosInstance from "./axiosInstance"
export const getSignupEmail = async email => {
  try {
    const result = await axiosInstance({
      method: "get",
      url: "/api/v1/auth/check-email",
      params: {
        email: email,
      },
    })
    return result
  } catch (err) {
    throw new Error(err)
  }
}
