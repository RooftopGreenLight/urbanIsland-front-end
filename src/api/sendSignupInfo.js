import axiosInstance from "./axiosInstance"
export const sendSignupInfo = async (email, password, name) => {
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
    console.log(err.response.data.data.errors[0].errorMessage)
    throw new Error(err)
  }
}
