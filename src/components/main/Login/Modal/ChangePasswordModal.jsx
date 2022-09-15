import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled, { css } from "styled-components"

import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { ModalHeader, ModalCloseBtn } from "components/common/Style/Modal/CommonStyle"

import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import { accountControl } from "api/controls/accountControl"

// 1. 인증 코드를 미발급 받았을 경우. : verifiedCode null
// 2. 인증 코드를 받았으나 인증이 되지 않은 경우. : is_verified false
// 3. 인증이 되어 비밀번호를 변경해야 하는 경우. : is_verified true

const ChangePasswordModal = () => {
  const { closeModal } = useContext(ModalContext)
  const navigate = useNavigate()
  const feedbackMsg = useRef()
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    code: "",
    verifiedCode: null,
    is_verified: false,
  })
  const { email, password, code, verifiedCode, is_verified } = inputValue

  const changeInput = e => {
    const { name, value } = e.target
    setInputValue(prevValue => ({ ...prevValue, [name]: value }))
  }

  const checkEmail = async () => {
    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
    if (!emailRegex.test(email)) {
      feedbackMsg.current.innerText = "유효한 이메일 양식이 아닙니다."
      return
    }
    try {
      const verifiedCode = await accountControl.getVerifyEmail(email)
      setInputValue(prevValue => ({ ...prevValue, verifiedCode }))
      feedbackMsg.current.innerText = ""
    } catch (err) {
      feedbackMsg.current.innerText = err.message
    }
  }

  const checkVerifiedCode = () => {
    if (verifiedCode !== code) {
      feedbackMsg.current.innerText = "인증번호를 재확인해 주세요"
      return
    }
    setInputValue(prevValue => ({ ...prevValue, is_verified: true }))
    feedbackMsg.current.innerText = ""
  }

  const changePassword = async () => {
    if (password.length < 10) {
      feedbackMsg.current.innerText = "비밀번호는 최소 10자 이상 입력해야 합니다."
      return
    }
    await accountControl.postChangePassword(email, password)
    navigate("/login")
    closeModal()
  }

  return (
    <Wrapper>
      <ModalHeader>
        <h5>비밀번호 변경</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        {!verifiedCode ? (
          <>
            <h5>이메일 입력</h5>
            <p>비밀번호를 변경하려는 계정의 이메일을 입력해주세요.</p>
            <input name="email" placeholder="Email Address" onChange={changeInput} value={email} />
            <ModalFeedbackMsg ref={feedbackMsg} />
            <ApplyModifyBtn onClick={checkEmail}>이메일 인증</ApplyModifyBtn>
          </>
        ) : is_verified ? (
          <>
            <h5>비밀번호 변경</h5>
            <p>새롭게 설정하실 비밀번호를 입력해주세요.</p>
            <input
              name="password"
              placeholder="New Password"
              onChange={changeInput}
              value={password}
            />
            <ModalFeedbackMsg ref={feedbackMsg} />
            <ApplyModifyBtn onClick={changePassword}>비밀번호 변경</ApplyModifyBtn>
          </>
        ) : (
          <>
            <h5>인증번호 입력</h5>
            <p>이메일로 전송된 인증 코드를 입력해주세요.</p>
            <input name="code" placeholder="XXXX-XXXX" onChange={changeInput} value={code} />
            <ModalFeedbackMsg ref={feedbackMsg} />
            <ApplyModifyBtn onClick={checkVerifiedCode}>인증번호 확인</ApplyModifyBtn>
          </>
        )}
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 33vw;
  margin: auto;

  border-radius: 0.3rem;
  background-color: #fff;

  animation: ${modalShow} 0.3s;
  animation-fill-mode: forwards;
  overflow: hidden;
`

const ModalContent = styled.main`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      display: flex;
      flex-direction: column;
      justify-content: center;

      padding: ${paddings.sm};
      border-top: 1px solid #dee2e6;
      background-color: ${colors.white};

      h5 {
        margin: ${margins.base} 0vw ${margins.xsm} 0vw;
        font-size: ${fonts.size.sm};
        text-align: center;
      }

      p {
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: center;
      }

      input {
        width: 70%;
        padding: ${paddings.sm};
        margin: ${margins.lg} auto;

        background-color: transparent;
        border: 0;
        border-bottom: 1px solid #232323;
        text-align: center;

        &::placeholder {
          color: #3e3e3e;
          font-weight: 100;
        }

        &::before {
          background-color: #d9d9d9;
        }
      }
    `
  }}
`

const ModalFeedbackMsg = styled.p`
  ${({ theme }) => {
    const { fonts } = theme
    return css`
      font-size: ${fonts.size.xsm};
      font-weight: 100;
    `
  }}
`

const ApplyModifyBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 50%;
      padding: ${paddings.sm};
      margin: ${margins.base} auto;

      background-color: ${colors.main.primary};
      border: 1px solid #7d7d7d;
      border-radius: 25px;

      color: ${colors.white};
      text-align: center;
      font-size: ${fonts.size.xsm};
    `
  }}
`

export default ChangePasswordModal
