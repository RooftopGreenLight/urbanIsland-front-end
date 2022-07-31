import styled, { css } from "styled-components"
import bgImg from "assets/img/background1.jpg"
import { fadeIn } from "styles/Animation"

import LoginForm from "components/main/Login/LoginForm"
import LoginSocial from "components/main/Login/LoginSocial"
import RegisterSection from "components/main/Login/RegisterSection"

const Login = () => {
  return (
    <Wrapper>
      <LoginSection>
        <Logo />
        <LoginSocial />
        <LoginForm />
        <RegisterSection />
      </LoginSection>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;

  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${bgImg});
  background-size: cover;

  display: flex;
  flex-direction: column;
`

const Logo = styled.div`
  width: 7.5vw;
  height: 7.5vw;
  margin: 2.5vw auto;

  background-color: #d9d9d9;
  border-radius: 25px;
`

const LoginSection = styled.div`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      width: 45%;
      margin: auto;

      background-color: ${colors.white};
      opacity: 95%;
      border-radius: 10px;

      display: flex;
      flex-direction: column;

      animation: ${fadeIn} 2s 0s;
      animation-fill-mode: forwards;
    `
  }}
`

export default Login
