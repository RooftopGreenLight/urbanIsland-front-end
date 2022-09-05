import axiosInstance from "api/axiosInstance"

export const roofTopControl = {
  postRoofTopInfo: async applyFormData => {
    try {
      await axiosInstance({
        method: "POST",
        url: "/rooftops/green",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: applyFormData,
      })
    } catch (err) {
      console.log(err)
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  getRooftopSearch: async filter => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: "/rooftops/search/",
        params: filter,
        withCredentials: true,
      })
      return response.data.rooftopResponses
    } catch (err) {
      throw new Error(err)
    }
  },
  getRooftopDetail: async id => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: `/rooftops/detail/${id}`,
      })
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  },
  getMyOwnRooftop: async (page = 0, size = 5) => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/rooftops`,
        params: {
          page,
          size,
        },
      })
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  },
}
