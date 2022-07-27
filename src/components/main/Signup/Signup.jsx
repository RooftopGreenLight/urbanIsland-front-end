import React from "react"
import styled from "styled-components"
import InputBox from "./InputBox"
import Button from "./Button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Modal } from "./Modal"
import { accountControl } from "api/accountControl"

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const Signup = () => {
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
      return alert("필수정보를 다 기입해주세요")
    }
    if (pwd !== repwd) {
      return alert("비밀번호 불일치")
    }
    const result = await accountControl.postSignupData(verifiedEmail, pwd, username)
    if (result) {
      if (result.success) {
        navigate("/login")
      }
    }
  }

  const onClickEmailCheck = async () => {
    const result = await accountControl.getSignUpEmail(email) //중복체크
    if (result) {
      //중복아니면
      const result2 = await accountControl.postEmailInfo(email) //이메일인증으로
      setSignupInput({ ...signupInput, code: result2.data })
    } else {
      alert("이미 있는 이메일")
    }
  }
  const onClickVerifiedCodeCheck = () => {
    if (verifiedCode === code) {
      //코드 일치시
      setSignupInput({ ...signupInput, verifiedEmail: email })
      closeModal()
    } else {
      alert("인증번호 재확인")
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
    </MainWrapper>
  )
}
export default Signup
