import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons"

const LoginSocial = () => {
  return (
    <Wrapper>
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
      width: 50%;
      margin: ${margins.base} auto;
      text-align: center;
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
