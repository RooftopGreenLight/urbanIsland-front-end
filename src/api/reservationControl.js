import axiosInstance from "api/axiosInstance"

export const reservationControl = {
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
}
