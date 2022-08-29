import axiosInstance from "api/axiosInstance"

export const greenbeeControl = {
  getRequiredGreen: async (page = 0) => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/green-bees/required-green",
        params: {
          page,
        },
      })
      console.log(response)
      return response.data.rooftopResponses
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  getRequiredGreenRooftop: async rooftopId => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/green-bees/required-green/${rooftopId}`,
      })
      return response
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
  getGreeningRoofTop: async () => {
    try {
      const selectedList = await axiosInstance({
        method: "GET",
        url: "/green-bees/greening-select-rooftop",
        params: {
          page: 1,
        },
      })
      const completedList = await axiosInstance({
        method: "GET",
        url: "/green-bees/greening-completed-rooftop",
        params: {
          page: 1,
        },
      })
      const progressedList = await axiosInstance({
        method: "GET",
        url: "/green-bees/greening-rooftop",
        params: {
          page: 1,
        },
      })
      const greeningList = new Map([
        ["completed", completedList.data ?? []],
        ["progressed", progressedList.data ?? []],
        ["selected", selectedList.data ?? []],
      ])
      console.log(greeningList)
      return greeningList
    } catch (err) {
      throw new Error(err)
    }
  },
  getGreenbeeInfo: async () => {
    try {
      const greenbeeInfo = await axiosInstance({
        method: "GET",
        url: "/green-bees",
      })
      return greenbeeInfo.data
    } catch (err) {
      throw new Error(err)
    }
  },
  getOtherGreenbeeInfo: async memberId => {
    try {
      const greenbeeInfo = await axiosInstance({
        method: "GET",
        url: `/green-bees/${memberId}`,
      })
      return greenbeeInfo.data
    } catch (err) {
      throw new Error(err)
    }
  },
}
