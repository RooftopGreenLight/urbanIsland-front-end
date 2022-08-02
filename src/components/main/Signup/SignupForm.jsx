import React from "react"
import styled, { css } from "styled-components"
import InputBox from "./InputBox"
import Button from "./Button"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Modal } from "./Modal"
import { accountControl } from "api/accountControl"

const SignupForm = () => {
  const feedbackMsg = useRef()
  const [modalOpen, setModalOpen] = useState(false)
  const [signupInput, setSignupInput] = useState({
    email: "",
    verifiedEmail: "",
    pwd: "",
    repwd: "",
    username: "",
    verifiedCode: "",
    code: "",
  })

  const toggleModel = toggle => {
    setModalOpen(toggle)
  }

  const navigate = useNavigate()
  const { email, verifiedEmail, verifiedCode, pwd, repwd, username, code } = signupInput

  const insertInput = e => {
    const { name, value } = e.target
    if (name === email) {
    }
    setSignupInput({ ...signupInput, [name]: value })
  }

  const submitRegister = async () => {
    if (verifiedEmail * pwd * repwd * username === 0) {
      feedbackMsg.current.innerText = "필수정보를 다 기입해주세요"
      return
    }
    if (pwd !== repwd) {
      feedbackMsg.current.innerText = "비밀번호 불일치"
      return
    }
    try {
      await accountControl.postSignupData(verifiedEmail, pwd, username)
      navigate("/login")
    } catch (err) {
      feedbackMsg.current.innerText = err.message
    }
  }

  const isEmail = email => {
    const emailRegex =
      "/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/"

    return emailRegex.match(email)
  }

  const checkEmailAddress = async () => {
    if (!isEmail(email)) {
      feedbackMsg.current.innerText = "유효한 이메일 양식이 아닙니다."
      return
    }
    try {
      await accountControl.getSignUpEmail(email) //중복체크
      feedbackMsg.current.innerText = ""
      const result2 = await accountControl.postVerifyEmail(email) //이메일인증으로
      setSignupInput({ ...signupInput, code: result2.data })
    } catch (err) {
      feedbackMsg.current.innerText = err.message
    }
  }
  const checkVerifiedCode = () => {
    if (verifiedCode === code) {
      //코드 일치시
      setSignupInput({ ...signupInput, verifiedEmail: email })
      toggleModel(false)
      return
    }
    feedbackMsg.current.innerText = "인증번호 재확인"
  }

  return (
    <Wrapper>
      <SignupInput
        name="email"
        value={verifiedEmail}
        placeholder="Email Address"
        onChange={insertInput}
        disabled
      />
      <EmailVerifiedBtn onClick={() => toggleModel(true)}>이메일 인증</EmailVerifiedBtn>
      <Modal open={modalOpen} close={() => toggleModel(false)}>
        <InputBox name="email" placeholder="이메일을 입력해 주세요" onChange={insertInput} />
        <button onClick={checkEmailAddress}>이메일 인증</button>
        {code && (
          <>
            <InputBox
              name="verifiedCode"
              placeholder="전송된 인증코드를 입력해 주세요"
              onChange={insertInput}
            />
            <button onClick={checkVerifiedCode}>인증번호 확인</button>
          </>
        )}{" "}
        <SignUpFeedback ref={feedbackMsg}></SignUpFeedback>
      </Modal>
      <SignupInput name="username" placeholder="Username" onChange={insertInput} />
      <SignupInput name="pwd" placeholder="Password" onChange={insertInput} type="password" />
      <SignupInput
        name="repwd"
        placeholder="Verified Password"
        onChange={insertInput}
        type="password"
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
