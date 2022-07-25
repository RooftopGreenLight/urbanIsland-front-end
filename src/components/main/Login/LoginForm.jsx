import styled, { css } from "styled-components"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

import { sendLoginInfo } from "api/sendLoginInfo.js"

const LoginForm = () => {
  const feedbackMsg = useRef()
  const [loginInput, setLoginInput] = useState({
    id: "",
    pw: "",
  })
  const { id, pw } = loginInput
  const navigate = useNavigate()

  const submitLogin = async event => {
    event.preventDefault()

    // ID 혹은 PW 둘 중 하나라도 입력하지 않았다면, 에러 메세지 출력
    if (id.length * pw.length === 0) {
      feedbackMsg.current.innerText = "ID/PW를 입력하지 않았습니다."
      resetInput()
      return
    }

    const response = await sendLoginInfo(id, pw)

    // 만약 입력한 계정 정보가 존재하지 않는다면, 에러 메세지 출력
    if (response.status === "fail") {
      feedbackMsg.current.innerText = "입력하신 계정 정보가 존재하지 않습니다."
      resetInput()
      return
    }

    navigateHome()
  }

  const insertInput = event => {
    const { name, value } = event.target
    setLoginInput({ ...loginInput, [name]: value })
  }

  const resetInput = () => {
    setLoginInput({ id: "", pw: "" })
  }

  const navigateHome = () => {
    navigate("/")
  }

  return (
    <Wrapper>
      <LoginInput name="login-id">
        <input name="id" placeholder="이메일을 입력해주세요." onChange={insertInput} value={id} />
      </LoginInput>
      <LoginInput name="login-id">
        <input name="pw" placeholder="비밀번호를 입력해주세요." onChange={insertInput} value={pw} />
      </LoginInput>
      <LoginFeedBack ref={feedbackMsg}>ID / PW 를 입력해주세요.</LoginFeedBack>
      <LoginBtn onClick={submitLogin}>로그인 하기</LoginBtn>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  ${({ theme }) => {
    const { colors, margins } = theme
    return css`
      width: 50%;
      margin: ${margins.lg} auto;

      background-color: ${colors.white};
      text-align: center;
    `
  }}
`

const LoginInput = styled.div`
  ${({ theme }) => {
    const { paddings, margins } = theme
    return css`
      margin: ${margins.sm} auto;

      input {
        width: 75%;
        padding: ${paddings.sm} ${paddings.base};
        border: 1px solid #000000;
        border-radius: 10px;

        &::placeholder {
          color: #8d8d8d;
          text-align: center;
        }
      }
    `
  }}
`
const LoginFeedBack = styled.p`
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

const LoginBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 75%;
      padding: ${paddings.sm} ${paddings.base};

      background-color: #000000;
      border-radius: 10px;
      text-align: center;
      color: ${colors.white};
      font-size: ${fonts.size.sm};
    `
  }}
`

export default LoginForm
