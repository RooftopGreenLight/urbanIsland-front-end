import styled, { css } from "styled-components"

const LoginSocial = () => {
  return (
    <Wrapper>
      <p>간편 로그인</p>
      <SocialIconList>
        <SocialIcon>1</SocialIcon>
        <SocialIcon>2</SocialIcon>
        <SocialIcon>3</SocialIcon>
      </SocialIconList>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 40%;
      margin: 2vw auto;
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

const SocialIcon = styled.div`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      width: 4vw;
      height: 4vw;

      border-radius: 3vw;
      background-color: #d9d9d9;
      color: #ffffff;
    `
  }}
`
export default LoginSocial
