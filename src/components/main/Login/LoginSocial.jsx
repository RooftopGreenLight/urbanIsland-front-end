import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"

const LoginSocial = () => {
  return (
    <Wrapper>
      <p>다른 소셜 계정으로 로그인</p>
      <SocialIconList>
        <SocialIcon icon={faGoogle} />
        <SocialIcon icon={faGoogle} />
        <SocialIcon icon={faGoogle} />
      </SocialIconList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
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
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 1.65vw;
      height: 1.65vw;

      padding: ${paddings.sm};
      border-radius: 100px;

      background-color: #1d1d1d;
      color: ${colors.white};

      &:hover {
        background-color: #004200;
      }
    `
  }}
`
export default LoginSocial
