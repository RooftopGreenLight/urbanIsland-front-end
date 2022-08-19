import axiosInstance from "api/axiosInstance"

export const roofTopControl = {
  postRoofTopInfo: async applyRoofTop => {
    const { base, content, time, person, location, detailInfoNum, img, option } = applyRoofTop
    // 하위 요소들을 전부 분해하여 하나의 변수로 지정해야 함 (좋은 방법 없나 고민해보자)
    const { width, totalPrice, phoneNumber } = base
    const { explainContent, refundContent, roleContent } = content
    const { startTime, endTime } = time
    const { adultCount, kidCount, petCount, totalCount } = person
    const { county, city, detail } = location
    const { normalFile, structureFile } = img
    const { optionCount, optionContent, optionPrice } = option

    // fileList와 file을 formData에 내장하여 보내야 함.
    try {
      // 임시 작성 코드
      const formData = new FormData()
      formData.append("rooftopType", "G")
      formData.append("county", "경기도")
      formData.append("city", "화성시 반송동")
      formData.append("detail", "테스트 주소")

      formData.append("startTime", `${startTime}:00:00`)
      formData.append("endTime", `${endTime}:00:00`)

      formData.append("structureFile", structureFile)

      for (let idx = 0; idx < normalFile.length; idx++) {
        formData.append(`normalFile`, normalFile[idx])
      }

      for (let idx = 0; idx < detailInfoNum.length; idx++) {
        formData.append(`detailInfoNum`, detailInfoNum[idx])
      }

      for (const [option, value] of Object.entries(base)) {
        formData.append(option, value)
      }

      for (const [option, value] of Object.entries(content)) {
        formData.append(option, value)
      }

      for (const [option, value] of Object.entries(person)) {
        formData.append(option, value)
      }

      formData.append("optionCount", optionCount)

      for (let idx = 0; idx < optionContent.length; idx++) {
        formData.append(`optionContent`, optionContent[idx])
      }

      for (let idx = 0; idx < optionPrice.length; idx++) {
        formData.append(`optionPrice`, optionPrice[idx])
      }

      const response = await axiosInstance({
        method: "POST",
        url: "/rooftops/green",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
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
