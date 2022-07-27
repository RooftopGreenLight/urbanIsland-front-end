import React from "react"
import styled, { css } from "styled-components"
import InputBox from "./InputBox"
import Button from "./Button"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Modal } from "./Modal"
import { accountControl } from "api/accountControl"

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const Signup = () => {
  const feedbackMsg = useRef()
  const [modalOpen, setModalOpen] = useState(false)
  const [signupInput, setSignupInput] = useState({
    email: "",
    verifiedEmail: "",
    pwd: "",
    repwd: "",
    username: "",
    number: "",
    verifiedCode: "",
    code: "",
  })

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  const navigate = useNavigate()
  const { email, verifiedEmail, verifiedCode, pwd, repwd, number, username, code } = signupInput

  const onChangeInput = e => {
    const { name, value } = e.target
    setSignupInput({ ...signupInput, [name]: value })
  }

  const onClickSubmit = async () => {
    if (verifiedEmail * pwd * repwd * number * username === 0) {
      feedbackMsg.current.innerText = "필수정보를 다 기입해주세요"
      return
    }
    if (pwd !== repwd) {
      feedbackMsg.current.innerText = "비밀번호 불일치"
      return
    }
    const result = await accountControl.postSignupData(verifiedEmail, pwd, username)
    if (result && result.success) {
      navigate("/login")
    }
  }

  const onClickEmailCheck = async () => {
    const result = await accountControl.getSignUpEmail(email) //중복체크
    if (result) {
      //중복아니면
      const result2 = await accountControl.postVerifyEmail(email) //이메일인증으로
      setSignupInput({ ...signupInput, code: result2.data })
    } else {
      feedbackMsg.current.innerText = "이미 있는 이메일"
    }
  }
  const onClickVerifiedCodeCheck = () => {
    if (verifiedCode === code) {
      //코드 일치시
      setSignupInput({ ...signupInput, verifiedEmail: email })
      closeModal()
      return
    }
    feedbackMsg.current.innerText = "인증번호 재확인"
  }

  return (
    <MainWrapper>
      <InputBox
        name="email"
        value={verifiedEmail}
        placeholder="이메일을 입력해 주세요"
        onChange={onChangeInput}
        disabled
      />
      <button onClick={openModal}>이메일 인증</button>
      <Modal open={modalOpen} close={closeModal}>
        <InputBox name="email" placeholder="이메일을 입력해 주세요" onChange={onChangeInput} />
        <button onClick={onClickEmailCheck}>이메일 인증</button>
        {code && (
          <>
            <InputBox
              name="verifiedCode"
              placeholder="이메일을 인증코드를 입력해 주세요"
              onChange={onChangeInput}
            />
            <button onClick={onClickVerifiedCodeCheck}>인증번호 확인</button>
          </>
        )}{" "}
      </Modal>
      <InputBox
        name="pwd"
        placeholder="비밀번호를 입력해 주세요"
        onChange={onChangeInput}
        type="password"
      />
      <InputBox
        name="repwd"
        placeholder="비밀번호를 확인해 주세요"
        onChange={onChangeInput}
        type="password"
      />
      <InputBox name="username" placeholder="이름" onChange={onChangeInput} />
      <InputBox name="number" placeholder="전화번호" onChange={onChangeInput} />
      <Button name={"회원가입"} onClick={onClickSubmit} />
      <SignUpFeedback ref={feedbackMsg}>회원가입 정보를 입력해주세요.</SignUpFeedback>
    </MainWrapper>
  )
}

const SignUpFeedback = styled.p`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      margin: ${margins.sm} 0vw;

      text-align: center;
      color: ${colors.blue.secondary};
      font-size: ${fonts.size.xsm};
      font-weight: 100;
    `
  }}
`

export default Signup
