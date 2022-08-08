import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"

import { OAuthControl } from "api/oAuth"

const LoginSocial = () => {
  return (
    <Wrapper>
      <p>다른 소셜 계정으로 로그인</p>
      <SocialIconList>
        <SocialIcon icon={faGoogle} color={"#006aff"} />
        <SocialIcon
          icon={faGoogle}
          color={"#09ff00"}
          onClick={() => OAuthControl.getCodeFromSocial("naver")}
        />
        <SocialIcon
          icon={faGoogle}
          color={"#dbd800"}
          onClick={() => OAuthControl.getCodeFromSocial("kakao")}
        />
      </SocialIconList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      width: 60%;
      margin: ${margins.lg} auto;
      text-align: center;

      p {
        margin-bottom: ${margins.base};
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }
    `
  }}
`

const SocialIconList = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
`

const SocialIcon = styled(FontAwesomeIcon)`
  ${({ theme, color }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 1.65vw;
      height: 1.65vw;

      padding: ${paddings.sm};
      border-radius: 100px;

      background-color: ${color};
      color: ${colors.white};
    `
  }}
`

export default LoginSocial
