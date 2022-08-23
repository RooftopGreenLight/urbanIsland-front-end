import axiosInstance from "api/axiosInstance"

export const ownerControl = {
  getRooftopStatus: async memberId => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/owners/rooftop-status",
        params: {
          memberId: parseInt(memberId),
        },
      })
      return response.data
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  getGreenBeeWaiting: async memberId => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/owners/greenbee-waiting",
        params: {
          memberId: parseInt(memberId),
        },
      })
      return response.data ?? []
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
}
