import { useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import styled, { css } from "styled-components"

import { accountControl } from "api/accountControl"
import { ModalContext } from "module/Modal"

import SignupModal from "components/main/Signup/SignupModal"
import useSignInput from "hook/useSignInput"

const SignupForm = () => {
  const feedbackMsg = useRef()
  const { openModal } = useContext(ModalContext)
  const navigate = useNavigate()

  const { inputValue, changeSignupInput } = useSignInput()
  const { verifiedEmail, pwd, repwd, username } = inputValue

  const insertInput = e => {
    const { name, value } = e.target
    changeSignupInput(name, value)
  }

  const submitRegister = async event => {
    event.preventDefault()
    if (verifiedEmail * pwd * repwd * username === 0) {
      feedbackMsg.current.innerText = "가입에 필요한 필수 정보를 입력해주세요."
      return
    }
    if (pwd !== repwd) {
      feedbackMsg.current.innerText = "작성한 비밀번호가 서로 일치하지 않습니다."
      return
    }
    try {
      await accountControl.postSignupData(verifiedEmail, pwd, username)
      feedbackMsg.current.innerText = "회원가입이 완료되었습니다. 로그인 창으로 이동합니다."
      setTimeout(() => navigate("/login"), 750)
    } catch (err) {
      feedbackMsg.current.innerText = err.message
    }
  }

  return (
    <Wrapper>
      <SignupInput
        name="verifiedEmail"
        value={verifiedEmail}
        placeholder="Email Address (인증 필요)"
        disabled
      />
      <EmailVerifiedBtn
        onClick={() =>
          openModal(
            <SignupModal
              inputValue={inputValue}
              changeSignupInput={changeSignupInput}></SignupModal>,
          )
        }>
        이메일 인증
      </EmailVerifiedBtn>
      <SignupInput name="username" placeholder="Username" onChange={insertInput} value={username} />
      <SignupInput
        name="pwd"
        placeholder="Password"
        type="password"
        onChange={insertInput}
        value={pwd}
      />
      <SignupInput
        name="repwd"
        placeholder="Verified Password"
        type="password"
        onChange={insertInput}
        value={repwd}
      />
      <SignUpFeedback ref={feedbackMsg}>회원가입 정보를 입력해주세요.</SignUpFeedback>
      <SignupBtn onClick={submitRegister}>회원가입</SignupBtn>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors, margins } = theme
    return css`
      width: 75%;
      margin: ${margins.base} auto;

      background-color: ${colors.white};
      text-align: center;
    `
  }}
`

const SignUpFeedback = styled.p`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      margin: ${margins.lg} auto ${margins.sm} auto;
      text-align: center;
      color: #000000;
      font-size: ${fonts.size.xsm};
      font-weight: 100;
    `
  }}
`

const SignupInput = styled.input`
  ${({ theme, name }) => {
    const { paddings, margins } = theme
    return css`
      width: ${name === "verifiedEmail" ? `70%` : `100%`};
      padding: ${paddings.sm};
      margin-bottom: ${margins.base};

      background-color: transparent;
      border: 0;
      border-bottom: 1px solid #232323;

      &::placeholder {
        color: #3e3e3e;
        text-align: left;
        font-weight: 100;
      }

      &::before {
        background-color: #d9d9d9;
      }
    `
  }}
`

const EmailVerifiedBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 25%;
      padding: ${paddings.sm};
      margin-left: 5%;

      background-color: #000000;
      border-radius: 25px;
      text-align: center;
      color: ${colors.white};
      font-size: ${fonts.size.xsm};
    `
  }}
`

const SignupBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.sm} ${paddings.base};

      background-color: #000000;
      border-radius: 25px;
      text-align: center;
      color: ${colors.white};
      font-size: ${fonts.size.sm};
    `
  }}
`

export default SignupForm
