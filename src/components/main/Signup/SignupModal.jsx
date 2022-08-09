import { useContext, useRef, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"

const SignupModal = ({ code, verifiedEmail }) => {
  const [verifiedCode, setVerifiedCode] = useState("")
  const { closeModal } = useContext(ModalContext)
  const feedbackMsg = useRef()

  const checkVerifiedCode = () => {
    if (verifiedCode !== code) {
      feedbackMsg.current.innerText = "인증번호를 재확인해 주세요"
      return
    }
    verifiedEmail()
    closeModal()
  }

  const changeInput = e => {
    setVerifiedCode(e.target.value)
  }

  return (
    <Wrapper>
      <header>
        <ModalCloseBtn onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} />
        </ModalCloseBtn>
      </header>
      <ModalContent>
        <h5>이메일로 전송된 인증 코드를 입력해주세요.</h5>
        <input placeholder="XXXX-XXXX" onChange={changeInput} value={verifiedCode} />
        <button onClick={checkVerifiedCode}>인증번호 확인</button>
        <ModalFeedbackMsg ref={feedbackMsg}></ModalFeedbackMsg>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  ${({ theme }) => {
    const { paddings } = theme
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

      h5 {
        margin: ${margins.base};
        font-size: ${fonts.size.sm};
        text-align: center;
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

const ModalFeedbackMsg = styled.p`
  ${({ theme }) => {
    const { fonts } = theme
    return css`
      font-size: ${fonts.size.xsm};
      font-weight: 100;
    `
  }}
`

export default SignupModal
