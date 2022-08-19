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
}
