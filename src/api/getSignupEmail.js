import axiosInstance from "./axiosInstance"
export const getSignupEmail = async email => {
  try {
    const result = await axiosInstance({
      method: "get",
      url: "auth/check-email",
      params: {
        email: email,
      },
    })
    return result
  } catch (err) {
    console.log(err.data.errorMessage)
    throw new Error(err)
  }
}
