import { OAuthControl } from "api/oAuth"
import { useEffect } from "react"

const NaverAuth = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code")
    OAuthControl.sendNaverCodeToServer(code)
  }, [])
  return (
    <div>
      <p>연동 중입니다. 잠시만 기다려주세요...</p>
    </div>
  )
}

export default NaverAuth
