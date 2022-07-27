import axiosInstance from "./axiosInstance"
export const sendEmailInfo = async email => {
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
}
