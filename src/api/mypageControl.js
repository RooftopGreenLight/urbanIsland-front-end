import axiosInstance from "api/axiosInstance"

export const mypageControl = {
  getMemberInfo: async () => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: "/members",
      })
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  },
  postMemberChangePwd: async password => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: "/members/change-password",
        data: { password },
      })
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
  postMemberChangePhoneNum: async phoneNumber => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: "/members/change-phone-number",
        data: { phoneNumber },
      })
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
  getProfile: async () => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: "/profile",
      })
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
  postProfile: async file => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: "/profile",
        config: {
          headers: {
            "content-type": "multipart/form-data",
          },
        },
        params: {
          file,
        },
      })
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
  deleteProfile: async () => {
    try {
      const response = await axiosInstance({
        method: "delete",
        url: "/profile",
      })
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  },
}
