import axiosInstanceAdmin from "api/axiosInstanceAdmin"
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
      const { totalPages, greenBeeInfoResponses } = response.data
      return { greenbeePageLimit: totalPages, greenbeeList: greenBeeInfoResponses }
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
      const { totalPages, ownerInfoResponses } = response.data
      return { ownerPageLimit: totalPages, ownerList: ownerInfoResponses }
    } catch (err) {
      throw new Error(err)
    }
  },
  getAdminGreenedRooftop: async page => {
    try {
      const response = await axiosInstanceAdmin({
        method: "get",
        url: `/rooftop/waits`,
        params: {
          page,
        },
      })
      const { totalPages, rooftopResponses } = response.data
      return { rooftopPageLimit: totalPages, rooftopList: rooftopResponses }
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
        url: `/rooftop/accept/${id}`,
        withCredentials: true,
      })
      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  deleteAdminGreenedRooftopDisapprove: async id => {
    try {
      await axiosInstanceAdmin({
        method: "delete",
        url: `/rooftop/reject/${id}`,
        withCredentials: true,
      })
    } catch (err) {
      throw new Error(err)
    }
  },

  deleteGreenbeeDisapprove: async id => {
    try {
      await axiosInstanceAdmin({
        method: "delete",
        baseURL: `/green-bees/accept/${id}`,
        withCredentials: true,
      })
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
