import axiosInstance from "api/axiosInstance"

// 입력받은 Login 정보를 백엔드 서버에 전송하기 위한 HTTP 통신 함수
export const sendLoginInfo = async (userID, userPW) => {
  let response
  try {
    response = await axiosInstance({
      method: "POST",
      url: "/account/login",
      data: {
        userID,
        userPW,
      },
    })
    return response
  } catch (err) {
    throw new Error(err)
  }
}
