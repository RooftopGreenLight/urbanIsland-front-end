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
  postMemberChangeNickname: async nickname => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: "/members/change-nickname",
        data: { nickname },
      })
      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  getAdminGreenbee: async page => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: "/admin/green-bees/waits",
        params: { page },
      })
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  },
  getAdminRooftop: async page => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: "/admin/owner/waits",
        params: { page },
      })
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  },

  getProfile: async id => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: "/profile",
        params: {
          id,
        },
      })
      return response.data.fileUrl
    } catch (err) {
      throw new Error(err)
    }
  },
  postProfile: async file => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: "/profile",
        data: file,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data.fileUrl
    } catch (err) {
      throw new Error(err)
    }
  },

  postApplyGreenbees: async file => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: "/green-bees/join",
        data: file,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
  postApplyRooftop: async file => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: "/owners/join",
        data: file,
        headers: {
          "Content-Type": "multipart/form-data",
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
  getGreenbeeData: async memberId => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: "/green-bees",
      })
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  },
}
