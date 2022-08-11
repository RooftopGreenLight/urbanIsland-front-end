import axiosInstance from "api/axiosInstance"

export const roofTopControl = {
  getRoofTopInfo: async applyRoofTop => {
    const { base, content, time, person, location, detailNum, img, option } = applyRoofTop
    // 하위 요소들을 전부 분해하여 하나의 변수로 지정해야 함 (좋은 방법 없나 고민해보자)
    const { width, totalPrice, phoneNumber } = base
    const { explainContent, refundContent, roleContent, ownerContent } = content
    const { startTime, endTime } = time
    const { adultCount, kidCount, petCount, totalCount } = person
    const { country, city, detail } = location
    const { normalFile, structFile } = img
    const { optionCount, optionContent, optionPrice } = option
    // fileList와 file을 formData에 내장하여 보내야 함.
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/rooftops/green",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: {
          width,
          totalPrice,
          phoneNumber,
          explainContent,
          refundContent,
          roleContent,
          ownerContent,
          startTime: `${startTime}:00:00`,
          endTime: `${endTime}:00:00`,
          adultCount,
          kidCount,
          petCount,
          totalCount,
          country: "경기도",
          city: "화성시 반송동",
          detail: "테스트 주소",
          detailNum,
          normalFile,
          structFile,
          optionCount,
          optionContent,
          optionPrice,
        },
      })
      return response.data
    } catch (err) {
      const errorMessage = err.response.data.message
      throw new Error(errorMessage)
    }
  },
}
