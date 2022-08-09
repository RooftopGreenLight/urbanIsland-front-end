import axiosInstance from "api/axiosInstance"
import { addTokenToLocalStorage } from "api/accountControl"

const KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID
const KAKAO_REDIRECT_URL = process.env.REACT_APP_KAKAO_REDIRECT_URL
const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID
const NAVER_REDIRECT_URL = process.env.REACT_APP_NAVER_REDIRECT_URL
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
const GOOGLE_REDIRECT_URL = process.env.REACT_APP_GOOGLE_REDIRECT_URL

const OAuthURL = {
  kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`,
  naver: `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URL}&response_type=code&state=state`,
  google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URL}&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&response_type=code&state=state&`,
}

export const OAuthControl = {
  sendCodeToServer: async (site, code) => {
    let response
    try {
      response = await axiosInstance({
        url: `/oauth2/login/${site}?code=${code}`,
        method: "GET",
      })
      const { tokenDto, id } = response.data
      const { accessToken, refreshToken } = tokenDto
      addTokenToLocalStorage(accessToken, refreshToken, id)
      window.location.href = "/"
    } catch (err) {
      throw new Error(err)
    }
  },
  getCodeFromSocial: site => {
    window.location.href = OAuthURL[site]
  },
}
