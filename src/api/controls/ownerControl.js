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
        url: `/owners/greenbee-waiting`,
        params: {
          memberId,
        },
      })
      return response.data ?? []
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  getGreenBeeWaitingRooftop: async (rooftopId, page = 0) => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/owners/greenbee-waiting/${rooftopId}`,
        params: {
          page,
        },
      })
      return response.data ?? []
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  getConfirmSelectedGreenbee: async (rooftopId, greenbeeId) => {
    try {
      await axiosInstance({
        method: "GET",
        url: `/owners/confirm-greenbee/${rooftopId}/${greenbeeId}`,
      })
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  deleteGreeningRooftop: async rooftopId => {
    try {
      await axiosInstance({
        method: "DELETE",
        url: `/owners/delete-ngrooftop/${rooftopId}`,
      })
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
}
