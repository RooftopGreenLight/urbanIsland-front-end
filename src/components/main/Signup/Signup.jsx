import React from "react"
import styled from "styled-components"
import InputBox from "./InputBox"
import Button from "./Button"
import { useState } from "react"
import { sendSignupInfo } from "api/sendSignupInfo"
import { useNavigate } from "react-router-dom"
const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const Signup = () => {
  const [signupInput, setSignupInput] = useState({
    id: "",
    pwd: "",
    repwd: "",
    username: "",
    number: "",
  })
  const navigate = useNavigate()
  const { id, pwd, repwd, number, username } = signupInput

  const onChangeInput = e => {
    const { name, value } = e.target
    setSignupInput({ ...signupInput, [name]: value })
  }
  const onReset = () => {
    setSignupInput("")
  }

  const onClickSubmit = async () => {
    if (pwd !== repwd) {
      onReset()
      return alert("비밀번호 불일치")
    } else {
      const result = await sendSignupInfo(id, pwd, username, number)
      if (result) {
        if (result.success) {
          navigate("/login")
        }
      }
    }
  }

  return (
    <MainWrapper>
      <InputBox name="id" placeholder="아이디를 입력해 주세요" onChange={onChangeInput} />
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
