import styled, { css } from "styled-components"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"

import { AuthConfirmLogin } from "module/Auth"
import { accountControl } from "api/controls/accountControl"

const LoginForm = () => {
  const feedbackMsg = useRef()
  const navigate = useNavigate()
  const [loginInput, setLoginInput] = useState({
    id: "",
    pw: "",
  })
  const { id, pw } = loginInput
  const confirmLogin = useSetRecoilState(AuthConfirmLogin)

  const submitLogin = async event => {
    event.preventDefault()
    resetInput()

    // ID 혹은 PW 둘 중 하나라도 입력하지 않았다면, 에러 메세지 출력
    if (id.length * pw.length === 0) {
      feedbackMsg.current.innerText = "ID 혹은 PW를 입력하지 않았습니다."
      return
    }

    try {
      const { accessToken, memberId, memberRole } = await accountControl.postLoginData(id, pw)
      confirmLogin({ token: accessToken, authenticated: true, memberId, memberRole })
      navigate("/")
    } catch (err) {
      console.log(err)
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
      <LoginFeedBack ref={feedbackMsg} />
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
