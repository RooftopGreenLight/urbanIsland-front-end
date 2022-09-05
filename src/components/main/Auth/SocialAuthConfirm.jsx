import { OAuthControl } from "api/oAuth"
import { useSearchParams } from "react-router-dom"

const SocialAuthConfirm = ({ site }) => {
  const [searchParams] = useSearchParams()
  const code = searchParams.get("code")
  OAuthControl.sendCodeToServer(site, code)

  return (
    <div>
      <p>연동 중입니다. 잠시만 기다려주세요...</p>
    </div>
  )
}

export default SocialAuthConfirm
