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

  patchRooftopDetail: async (rooftopId, formdata) => {
    try {
      const response = await axiosInstance({
        method: "PATCH",
        url: `/rooftops/detail/${rooftopId}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formdata,
      })
      console.log(response)
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  },
  postRoofTopPayoption: async (id, formdata) => {
    try {
      await axiosInstance({
        method: "POST",
        url: `/rooftops/detail/option/${id}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formdata,
      })
    } catch (err) {
      console.log(err)
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  getRooftopReviews: async (page = 0) => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/rooftops/reviews`,
        params: {
          page,
        },
      })
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  },
  postRooftopReview: async (rooftopId, content, grade) => {
    try {
      await axiosInstance({
        method: "POST",
        url: `/rooftops/reviews/${rooftopId}`,
        data: {
          content,
          grade,
        },
      })
    } catch (err) {
      console.log(err)
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  deleteRooftopReview: async (rooftopId, reviewId) => {
    try {
      await axiosInstance({
        method: "DELETE",
        url: `/rooftops/reviews/${rooftopId}/${reviewId}`,
      })
    } catch (err) {
      console.log(err)
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
}
