import React from "react"
import styled from "styled-components"
import InputBox from "./InputBox"
import Button from "./Button"
import { useState } from "react"
import axiosInstance from "api/axiosInstance"
const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  .alert {
    color: red;
    font-size: 6px;
  }
`
const Signup = () => {
  const [id, setId] = useState("")
  const [pwd, setPwd] = useState("")
  const [repwd, setRePwd] = useState("")
  const [number, setNumber] = useState("")
  const [name, setName] = useState("")
  const [pwError, setpwError] = useState(0)
  const onChangeId = e => {
    setId(e.target.value)
  }
  const onChangePwd = e => {
    setPwd(e.target.value)
  }
  const onChangeRePwd = e => {
    const { value } = e.target
    if (value !== pwd) {
      setpwError(1)
    } else {
      setpwError(0)
    }
    setRePwd(e.target.value)
  }
  const onChangeName = e => {
    setName(e.target.value)
  }
  const onChangeNumber = e => {
    setNumber(e.target.value)
  }

  const onClickSubmit = async () => {
    console.log(id, pwd)
    const result = await axiosInstance({
      method: "POST",
      url: "/login",
      data: {
        id: id,
        pwd: pwd,
        name: name,
        number: number,
      },
    })
    if (result) {
      if (result.data.success) {
        window.location.replace("/")
      }
    }
  }

  return (
    <MainWrapper>
      <InputBox placeholder="아이디를 입력해 주세요" onChange={onChangeId} />
      <InputBox placeholder="비밀번호를 입력해 주세요" onChange={onChangePwd} type="password" />
      <InputBox placeholder="비밀번호를 확인해 주세요" onChange={onChangeRePwd} type="password" />
      <InputBox placeholder="이름" onChange={onChangeName} />
      <InputBox placeholder="전화번호" onChange={onChangeNumber} />
      <Button name={"회원가입"} onClick={onClickSubmit} />
      {pwError === 1 && <p className="alert"> 비밀번호 불일치</p>}
    </MainWrapper>
  )
}
export default Signup
