import axiosInstance from "./axiosInstance"
export const sendSignupInfo = async (email, pwd, name, number) => {
  try {
    const result = await axiosInstance({
      method: "POST",
      url: "/auth/join",
      data: {
        email: email,
        password: pwd,
        name: name,
        phoneNumber: number,
      },
    })
    return result.data
  } catch (err) {
    console.log(err.response.data.data.errors[0].errorMessage)
    throw new Error(err)
  }
}
