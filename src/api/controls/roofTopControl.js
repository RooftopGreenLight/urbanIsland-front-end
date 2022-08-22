import axiosInstance from "api/axiosInstance"

export const roofTopControl = {
  postRoofTopInfo: async applyFormData => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/rooftops/green",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: applyFormData,
      })
      console.log(response)
      return response.data
    } catch (err) {
      console.log(err)
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  getRooftopSearch: async (
    page,
    startTime,
    endTime,
    adultCount,
    kidCount,
    petCount,
    city,
    district,
    maxPrice,
    minPrice,
    contentNum,
    maxWidth,
    minWidth,
    cond,
    type,
  ) => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: "/rooftops/search",
        params: {
          page,
          startTime,
          endTime,
          adultCount,
          kidCount,
          petCount,
          city,
          district,
          maxPrice,
          minPrice,
          contentNum,
          maxWidth,
          minWidth,
          cond,
          type,
        },
      })
      return response.data
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
}
