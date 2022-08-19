import axios from "axios"
import { accountControl } from "api/controls/accountControl"

// HTTPS 통신에 쓰이는 Axios 인스턴스 생성
// 공통으로 사용하는 baseURL을 설정하면, 추후 인스턴스 활용 시 나머지 URL만 기술하면 됨.

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 3000,
})

// 인터셉터 설정을 통해 HTTP 응답 관련 작업 모듈화.
// 요청 & 응답 실패 시 디버깅 메세지 또한 출력시킴.

// 1. 요청 인터셉터 설정 (요청 성공 / 실패)
axiosInstance.interceptors.request.use(
  config => {
    // localStorage에 accessToken이 존재한다면, Header에 값을 넣어 전송.
    const accessToken = JSON.parse(localStorage.getItem("access_token"))
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  },
)

// 2. 응답 인터셉터 설정 (응답 성공 / 실패)
axiosInstance.interceptors.response.use(
  // 응답 성공 시 response.data를 return 하도록 설정.
  response => {
    const res = response.data
    return res
  },
  // 응답 실패 시 Promise Error 객체를 return 하도록 설정.
  error => {
    // 만약 Access_token이 만료되어 생긴 문제라면, refresh_token을 재전송 해야 함
    if (error.response.data?.errorCode === 460) {
      const refreshToken = JSON.parse(localStorage.getItem("refresh_token"))
      accountControl.getRefreshToken(refreshToken)
      return
    }
    console.log(error)
    return Promise.reject(error)
  },
)
export default axiosInstance
