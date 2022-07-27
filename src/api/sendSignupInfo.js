import axiosInstance from "./axiosInstance"
export const sendSignupInfo = async (email, pwd, name, number) => {
  try {
    const result = await axiosInstance({
      method: "POST",
      url: "/api/v1/auth/join",
      data: {
        email: email,
        password: pwd,
        name: name,
        phoneNumber: number,
      },
    })
    return result
  } catch (err) {
    throw new Error(err)
  }
}
