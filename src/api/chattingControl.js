import axiosInstance from "api/axiosInstance"

export const chattingControl = {
  getReservationChat: async (rooftopId, memberId) => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: `/chat/inquiry/room/${rooftopId}/${memberId}`,
        params: {
          rooftopId,
          memberId,
        },
      })
      return response
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  getChatRoomList: async memberId => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: "/chat/inquiry/response",
        params: {
          memberId,
        },
      })
      return response
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },

  getChatRoom: async (roomId, memberId) => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: `/chat/inquiry/room/${roomId}`,
        params: {
          roomId,
          memberId,
        },
      })
      return response
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
}
