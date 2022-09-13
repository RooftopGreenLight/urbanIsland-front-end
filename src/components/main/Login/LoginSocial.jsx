import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"

import kakaoLogo from "assets/icon/kakaotalk.png"
import googleLogo from "assets/icon/google.png"
import naverLogo from "assets/icon/naver.png"

import { OAuthControl } from "api/oAuth"

const LoginSocial = () => {
  return (
    <Wrapper>
      <p>다른 소셜 계정으로 로그인</p>
      <SocialIconList>
        <SocialImage src={googleLogo} onClick={() => OAuthControl.getCodeFromSocial("google")} />
        <SocialImage src={naverLogo} onClick={() => OAuthControl.getCodeFromSocial("naver")} />
        <SocialImage src={kakaoLogo} onClick={() => OAuthControl.getCodeFromSocial("kakao")} />
      </SocialIconList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      width: 70%;
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

const SocialImage = styled.img`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      width: 4vw;
      height: 4vw;

      padding: ${paddings.sm};
      box-shadow: 0px 2px 2px #d5d5d5;
      border-radius: 100px;

      cursor: pointer;
    `
  }}
`

export default LoginSocial
