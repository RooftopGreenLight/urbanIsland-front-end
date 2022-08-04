import { useContext, useEffect, useRef } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { accountControl } from "api/accountControl"
import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"

const SignupModal = ({ inputValue, changeSignupInput }) => {
  const feedbackMsg = useRef()
  const { closeModal } = useContext(ModalContext)
  const { email, code, verifiedCode } = inputValue

  const insertInput = e => {
    const { name, value } = e.target
    changeSignupInput(name, value)
    console.log(inputValue)
  }

  const isEmail = email => {
    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
    return emailRegex.test(email)
  }

  const checkEmailAddress = async () => {
    if (!isEmail(email)) {
      feedbackMsg.current.innerText = "유효한 이메일 양식이 아닙니다."
      return
    }
    try {
      await accountControl.getSignUpEmail(email)
      const code = await accountControl.getVerifyEmail(email)
      changeSignupInput("code", code)
    } catch (err) {
      feedbackMsg.current.innerText = err.message
    }
  }

  const checkVerifiedCode = () => {
    if (verifiedCode !== code) {
      feedbackMsg.current.innerText = "인증번호를 재확인해 주세요,"
      return
    }
    changeSignupInput("verifiedEmail", email)
    closeModal()
  }

  return (
    <Wrapper>
      <header>
        <ModalCloseBtn onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} />
        </ModalCloseBtn>
      </header>
      <ModalContent>
        {!code ? (
          <>
            <p>인증 번호를 받을 이메일을 입력해주세요.</p>
            <input
              name="email"
              placeholder="Enter your Email Address"
              onChange={insertInput}
              value={email}
            />
            <button onClick={checkEmailAddress}>이메일 인증</button>
          </>
        ) : (
          <>
            <p>이메일로 전송된 인증 코드를 입력해주세요.</p>
            <input
              name="verifiedCode"
              placeholder="XXXX-XXXX"
              onChange={insertInput}
              value={verifiedCode}
            />
            <button onClick={checkVerifiedCode}>인증번호 확인</button>
          </>
        )}
        <p className="feedback" ref={feedbackMsg}></p>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  ${({ theme }) => {
    const { fonts, paddings } = theme
    return css`
      width: 30%;
      margin: auto;

      border-radius: 0.3rem;
      background-color: #fff;

      animation: ${modalShow} 0.3s;
      animation-fill-mode: forwards;
      overflow: hidden;

      header {
        display: flex;
        flex-direction: row-reverse;

        padding: ${paddings.sm} ${paddings.base};
        background-color: #f1f1f1;
        font-weight: 700;
      }
    `
  }}
`
const ModalCloseBtn = styled.button`
  ${({ theme }) => {
    const { fonts } = theme
    return css`
      margin: 0vw 0vw 0vw auto

      color: #999;
      background-color: transparent;

      font-size: ${fonts.size.xsm};
      font-weight: 700;
      text-align: center;
    `
  }}
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

      p {
        margin: ${margins.base};
        font-size: ${fonts.size.sm};
        text-align: center;

        &.feedback {
          font-size: ${fonts.size.xsm};
          font-weight: 100;
        }
      }

      input {
        width: 90%;
        padding: ${paddings.sm};
        margin: 0vw auto ${margins.base} auto;

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

      button {
        width: 25%;
        padding: ${paddings.sm};
        margin: ${margins.base} auto;

        background-color: #000000;
        border-radius: 25px;
        text-align: center;
        color: ${colors.white};
        font-size: ${fonts.size.xsm};
      }
    `
  }}
`

export default SignupModal
