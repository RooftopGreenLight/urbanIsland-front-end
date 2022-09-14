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
  getReservationInfoById: async reservationId => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/reservations/${reservationId}`,
      })
      console.log(response)
      return response?.data ?? null
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  getWaitingResevationInfo: async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/reservations/members/waiting`,
      })
      return response?.data ?? []
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  getCompletedResevationInfo: async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/reservations/members/completed`,
      })
      return response?.data ?? []
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  postNewReservation: async (tid, rooftopId, totalPrice, reservationData) => {
    const {
      selectedDate,
      selectedTime,
      adultCount,
      kidCount,
      petCount,
      optionContent,
      optionPrice,
      optionCount,
    } = reservationData
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/reservations",
        data: {
          tid,
          rooftopId,
          totalPrice,
          adultCount,
          kidCount,
          petCount,
          startTime: `${String(selectedTime[0]).padStart(2, "0")}:00:00`,
          endTime: `${String(selectedTime[1]).padStart(2, "0")}:00:00`,
          startDate: selectedDate[0],
          endDate: selectedDate[1],
          contents: optionContent,
          prices: optionPrice,
          counts: optionCount,
          paymentType: "KAKAO_PAY",
        },
      })
      console.log(response)
      return response?.data ?? null
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  postChangeReservationStatus: async (reservationId, status) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: `/reservations/${reservationId}`,
        data: {
          status,
        },
      })
      return response?.data ?? null
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  deleteCancelReservation: async reservationId => {
    try {
      await axiosInstance({
        method: "DELETE",
        url: `/reservations/${reservationId}`,
      })
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
}
