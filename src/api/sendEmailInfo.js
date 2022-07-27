import axiosInstance from "./axiosInstance"
export const sendEmailInfo = async email => {
  try {
    const result = await axiosInstance({
      method: "POST",
      url: "/auth/verify-email",
      params: {
        email: email,
      },
    })
    return result.data
  } catch (err) {
    throw new Error(err)
  }
}
