import axiosInstance from "api/axiosInstance"

export const chattingControl = {
  getReservationChat: async rooftopId => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/chat/inquiry/join/room/${rooftopId}`,
        params: {
          rooftopId,
        },
      })
      const { roomId } = response.data
      return roomId
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },

  getChatRoomList: async memberId => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/chat/inquiry/response",
        param: {
          memberId,
        },
      })
      // 만약 사용자가 소속된 방이 없다면, 빈 배열 리턴
      if (!response.data) {
        return []
      }
      return response.data
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },

  getChatRoomLog: async roomId => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/chat/inquiry/room/${roomId}`,
      })
      return response
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
}
