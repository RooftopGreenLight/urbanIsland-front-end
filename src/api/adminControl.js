import axiosInstanceAdmin from "./axiosInstanceAdmin"
export const adminControl = {
  getAdminGreenbee: async page => {
    try {
      const response = await axiosInstanceAdmin({
        method: "get",
        url: `/green-bees/waits`,
        params: {
          page,
        },
      })
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  },
  getAdminOwner: async page => {
    try {
      const response = await axiosInstanceAdmin({
        method: "get",
        url: `/owner/waits`,
        params: {
          page,
        },
      })
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  },
  getAdminGreenedRooftop: async page => {
    try {
      const response = await axiosInstanceAdmin({
        method: "get",
        url: `/api주소`,
        params: {
          page,
        },
      })
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  },

  postOwnerApprove: async id => {
    try {
      const response = await axiosInstanceAdmin({
        method: "post",
        url: `/owner/accept/${id}`,
        withCredentials: true,
      })
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  },
  postGreenbeeApprove: async id => {
    try {
      const response = await axiosInstanceAdmin({
        method: "POST",
        url: `/green-bees/accept/${id}`,
        withCredentials: true,
      })
      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  postAdminGreenedRooftopApprove: async id => {
    try {
      const response = await axiosInstanceAdmin({
        method: "POST",
        url: `/api주소/${id}`,
        withCredentials: true,
      })
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
  deleteAdminGreenedRooftopDisapprove: async id => {
    try {
      const response = await axiosInstanceAdmin({
        method: "delete",
        url: `/api주소/${id}`,
        withCredentials: true,
      })
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
  deleteGreenbeeDisapprove: async id => {
    try {
      const response = await axiosInstanceAdmin({
        method: "delete",
        baseURL: `/green-bees/accept/${id}`,
        withCredentials: true,
      })
      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  deleteOwnerDisapprove: async id => {
    try {
      const response = await axiosInstanceAdmin({
        method: "delete",
        baseURL: `/owner/rejest/${id}`,
        withCredentials: true,
      })
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
}
