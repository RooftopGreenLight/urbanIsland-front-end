import axiosInstance from "./axiosInstance"
export const sendSignupInfo = async (id, pwd, name, number) => {
  try {
    const result = await axiosInstance({
      method: "POST",
      url: "/signup",
      data: {
        id: id,
        pwd: pwd,
        name: name,
        number: number,
      },
    })
    return result
  } catch (err) {
    throw new Error(err)
  }
}
