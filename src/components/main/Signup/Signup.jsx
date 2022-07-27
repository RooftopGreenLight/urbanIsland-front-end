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
  const { email, verifiedEmail, verifiedCode, pwd, repwd, username, code } = signupInput

  const onChangeInput = e => {
    const { name, value } = e.target
    setSignupInput({ ...signupInput, [name]: value })
  }

  const onClickSubmit = async () => {
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
  const onClickEmailCheck = async () => {
    try {
      await accountControl.getSignUpEmail(email) //중복체크
      //중복아니면
      try {
        feedbackMsg.current.innerText = ""
        const result2 = await accountControl.postEmailInfo(email) //이메일인증으로
        setSignupInput({ ...signupInput, code: result2.data })
      } catch (err) {
        feedbackMsg.current.innerText = err.message
        console.log(feedbackMsg.current.innerText)
      }
    } catch (err) {
      feedbackMsg.current.innerText = err.message
      console.log(feedbackMsg.current.innerText)
    }
  }
  const onClickVerifiedCodeCheck = () => {
    if (verifiedCode === code) {
      //코드 일치시
      setSignupInput({ ...signupInput, verifiedEmail: email })
      closeModal()
    } else {
      feedbackMsg.current.innerText = "인증번호 재확인"
    }
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
        <SignUpFeedback ref={feedbackMsg}></SignUpFeedback>
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
