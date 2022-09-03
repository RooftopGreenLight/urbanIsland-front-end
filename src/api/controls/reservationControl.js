import axiosInstance from "api/axiosInstance"

export const reservationControl = {
  getReservationInfo: async date => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/reservations",
        params: {
          date,
        },
      })
      return response?.data ?? null
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
}
