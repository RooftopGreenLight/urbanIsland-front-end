import styled, { css } from "styled-components"

import LoginForm from "components/main/Login/LoginForm"
import LoginSocial from "components/main/Login/LoginSocial"
import RegisterSection from "components/main/Login/RegisterSection"

const Login = () => {
  return (
    <Wrapper>
      <LoginSection>
        <Logo />
        <LoginForm />
        <LoginSocial />
        <RegisterSection />
      </LoginSection>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #f2faff;
`

const LoginSection = styled.div`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      width: 75%;
      margin: auto;

      background-color: ${colors.white};
      border-radius: 25px;

      display: flex;
      flex-direction: column;
    `
  }}
`

const Logo = styled.div`
  width: 7.5vw;
  height: 7.5vw;
  margin: 0vw auto;

  background-color: #d9d9d9;
  border-radius: 25px;
`

export default Login
