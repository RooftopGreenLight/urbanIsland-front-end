import styled, { css } from "styled-components"
import { useContext } from "react"
import bgImg from "assets/img/background2.jpg"
import { fadeIn } from "styles/Animation"

import LoginForm from "components/main/Login/LoginForm"
import LoginSocial from "components/main/Login/LoginSocial"
import RegisterSection from "components/main/Login/RegisterSection"
import ChangePasswordModal from "components/main/Login/Modal/ChangePasswordModal"
import { ModalContext } from "module/Modal"

const Login = () => {
  const { openModal } = useContext(ModalContext)
  return (
    <Wrapper>
      <LoginSection>
        <LoginTitle>
          <h5>Join our Service</h5>
        </LoginTitle>
        <LoginForm />
        <LoginSocial />
        <ForgotPassword>
          비밀번호를 잊으셨나요?
          <strong onClick={() => openModal(<ChangePasswordModal />)}> 비밀번호 찾기</strong>
        </ForgotPassword>
      </LoginSection>
      <RegisterSection />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;

  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${bgImg});
  background-size: cover;

  display: flex;
  justify-content: center;
`

const LoginTitle = styled.div`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      width: 75%;
      margin: ${margins.xl} ${margins.xl} ${margins.base} ${margins.xl};

      h5 {
        font-size: ${fonts.size.xxl};
        line-height: 3.75rem;
      }
    `
  }}
`

const LoginSection = styled.div`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      width: 27.5%;
      height: 70vh;
      margin: auto 0vw;

      background-color: ${colors.white};
      opacity: 95%;
      border-radius: 25px 0px 0px 25px;

      display: flex;
      flex-direction: column;

      animation: ${fadeIn} 1s 0s;
      animation-fill-mode: forwards;
    `
  }}
`

const ForgotPassword = styled.p`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      margin: ${margins.base} auto;

      color: #1f1f1f;
      font-size: ${fonts.size.xsm};
      font-weight: 100;

      strong {
        color: #000000;
        cursor: pointer;
      }
    `
  }}
`

export default Login
