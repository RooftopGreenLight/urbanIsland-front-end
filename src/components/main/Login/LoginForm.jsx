import styled, { css } from "styled-components"
import { useState, useRef, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { AuthDispatchContext } from "module/Auth"
import { accountControl } from "api/accountControl"

const LoginForm = () => {
  const feedbackMsg = useRef()
  const [loginInput, setLoginInput] = useState({
    id: "",
    pw: "",
  })
  const { id, pw } = loginInput
  const navigate = useNavigate()
  const authDispatch = useContext(AuthDispatchContext)

  const submitLogin = async event => {
    event.preventDefault()
    resetInput()

    // ID 혹은 PW 둘 중 하나라도 입력하지 않았다면, 에러 메세지 출력
    if (id.length * pw.length === 0) {
      feedbackMsg.current.innerText = "ID 혹은 PW를 입력하지 않았습니다."
      return
    }

    try {
      const response = await accountControl.postLoginData(id, pw)
      const { accessToken } = response.data
      authDispatch({
        type: "SET_TOKEN",
        token: accessToken,
      })
      feedbackMsg.current.innerText = "로그인에 성공했습니다. 잠시만 기다려주세요.."
      setTimeout(() => navigate("/"), 750)
    } catch (err) {
      feedbackMsg.current.innerText = err.message
    }
  }

  const insertInput = event => {
    const { name, value } = event.target
    setLoginInput({ ...loginInput, [name]: value })
  }

  const resetInput = () => {
    setLoginInput({ id: "", pw: "" })
  }

  return (
    <Wrapper>
      <LoginInput name="login-id">
        <input name="id" placeholder="Email Address" onChange={insertInput} value={id} />
      </LoginInput>
      <LoginInput name="login-pw">
        <input name="pw" placeholder="Password" onChange={insertInput} value={pw} type="password" />
      </LoginInput>
      <LoginFeedBack ref={feedbackMsg}>ID / PW 를 입력해주세요.</LoginFeedBack>
      <LoginBtn onClick={submitLogin}>로그인</LoginBtn>
    </Wrapper>
  )
}

const Wrapper = styled.form`
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

const LoginInput = styled.div`
  ${({ theme }) => {
    const { paddings, margins } = theme
    return css`
      margin: ${margins.sm} auto;

      input {
        width: 100%;
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
      }
    `
  }}
`
const LoginFeedBack = styled.p`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      margin: 0vw 0vw ${margins.sm} 0vw;

      text-align: center;
      color: #3d3d3d;
      font-size: ${fonts.size.xsm};
      font-weight: 100;
    `
  }}
`

const LoginBtn = styled.button`
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

export default LoginForm
