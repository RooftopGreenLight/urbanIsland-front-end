import { useContext, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

import { accountControl } from "api/controls/accountControl"
import { ModalContext } from "module/Modal"

import SignupModal from "components/main/Signup/SignupModal"

const SignupForm = () => {
  const feedbackMsg = useRef()
  const { openModal } = useContext(ModalContext)
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    verifiedPassword: "",
    nickname: "",
    is_verified: false,
  })
  const { email, password, verifiedPassword, nickname, is_verified } = inputValue

  const changeInput = e => {
    const { name, value } = e.target
    if (is_verified && name === "email") {
      return
    }
    setInputValue({ ...inputValue, [name]: value })
  }

  const verifiedEmail = () => {
    setInputValue({ ...inputValue, is_verified: true })
  }

  const checkEmailAddress = async () => {
    if (is_verified) {
      return
    }
    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
    if (!emailRegex.test(email)) {
      feedbackMsg.current.innerText = "유효한 이메일 양식이 아닙니다."
      return
    }
    try {
      await accountControl.getCheckEmail(email)
      const code = await accountControl.getVerifyEmail(email)
      setInputValue({ ...inputValue, code })
      openModal(<SignupModal code={code} verifiedEmail={verifiedEmail} />)
    } catch (err) {
      feedbackMsg.current.innerText = err.message
    }
  }

  const submitRegister = async event => {
    event.preventDefault()
    if (email * password * verifiedPassword * nickname === 0) {
      feedbackMsg.current.innerText = "가입에 필요한 필수 정보를 입력해주세요."
      return
    }
    if (!is_verified) {
      feedbackMsg.current.innerText = "이메일 인증이 완료되지 않았습니다."
      return
    }
    if (password !== verifiedPassword) {
      feedbackMsg.current.innerText = "작성한 비밀번호가 서로 일치하지 않습니다."
      return
    }
    try {
      await accountControl.getCheckNickname(nickname)
      await accountControl.postSignupData(email, password, nickname)
      feedbackMsg.current.innerText = "회원가입이 완료되었습니다. 로그인 창으로 이동합니다."
      setTimeout(() => navigate("/login"), 750)
    } catch (err) {
      feedbackMsg.current.innerText = err.message
    }
  }

  return (
    <Wrapper>
      <SignupInput name="email" placeholder="Email Address" onChange={changeInput} value={email} />
      <EmailVerifiedBtn is_verified={is_verified} onClick={checkEmailAddress}>
        {is_verified ? <FontAwesomeIcon icon={faCircleCheck} /> : "이메일 인증"}
      </EmailVerifiedBtn>
      <SignupInput name="nickname" placeholder="Nickname" onChange={changeInput} value={nickname} />
      <SignupInput
        name="password"
        placeholder="Password"
        type="password"
        onChange={changeInput}
        value={password}
      />
      <SignupInput
        name="verifiedPassword"
        placeholder="Verified Password"
        type="password"
        onChange={changeInput}
        value={verifiedPassword}
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
    const { fonts, margins } = theme
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
      width: ${name === "email" ? `70%` : `100%`};
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
    `
  }}
`

const EmailVerifiedBtn = styled.button`
  ${({ theme, is_verified }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 25%;
      padding: ${paddings.sm};
      margin-left: 5%;

      background-color: ${is_verified ? "#0fb100" : "#000000"};
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
