import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons"

const LoginSocial = () => {
  return (
    <Wrapper>
      <p>간편 로그인</p>
      <SocialIconList>
        <SocialIcon icon={faArrowCircleDown} />
        <SocialIcon icon={faArrowCircleDown} />
        <SocialIcon icon={faArrowCircleDown} />
      </SocialIconList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 30%;
      margin: ${margins.base} auto 0vw auto;
      text-align: center;

      p {
        margin: ${margins.sm} 0vw;
        font-size: ${fonts.size.xsm};
        color: #8d8d8d;
      }
    `
  }}
`

const SocialIconList = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const SocialIcon = styled(FontAwesomeIcon)`
  ${({ theme }) => {
    const { colors, fonts } = theme
    return css`
      width: 4vw;
      height: 4vw;

      border-radius: 200px;
      color: #d9d9d9;
    `
  }}
`
export default LoginSocial
