import axiosInstance from "./axiosInstance"

const KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID
const KAKAO_REDIRECT_URL = process.env.REACT_APP_KAKAO_REDIRECT_URL
const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID
const NAVER_REDIRECT_URL = process.env.REACT_APP_NAVER_REDIRECT_URL

export const OAuthURL = {
  kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`,
  naver: `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URL}&response_type=code&state=state`,
  google: ``,
}

export const OAuthControl = {
  getCodeFromKakao: () => {
    window.location.href = OAuthURL.kakao
  },
  sendKakaoCodeToServer: async code => {
    let response
    try {
      response = await axiosInstance({
        url: `/oauth2/login/kakao?code=${code}`,
        method: "GET",
      })
      console.log(response)
    } catch (err) {
      throw new Error(err)
    }
  },
  getCodeFromNaver: () => {
    window.location.href = OAuthURL.naver
  },
  sendNaverCodeToServer: async code => {
    try {
      const response = await axiosInstance({
        url: `/oauth2/login/naver/?code=${code}`,
        method: "GET",
      })
      console.log(response)
    } catch (err) {
      throw new Error(err)
    }
  },
}
