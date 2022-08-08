import { OAuthControl } from "api/oAuth"
import { useEffect } from "react"

const SocialAuthConfirm = ({ site }) => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code")
    switch (site) {
      case "NAVER":
        OAuthControl.sendNaverCodeToServer(code)
        break
      case "KAKAO":
        OAuthControl.sendKakaoCodeToServer(code)
        break
      default:
        window.location.href = "/"
    }
  }, [])
  return (
    <div>
      <p>연동 중입니다. 잠시만 기다려주세요...</p>
    </div>
  )
}

export default SocialAuthConfirm
