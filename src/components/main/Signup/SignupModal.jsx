import { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { modalShow } from "styles/Animation"

const SignupModal = ({ status }) => {
  const [modalStatus, setModalStatus] = useState(status)
  const [inputValue, setInputValue] = useState({ email: "", verifiedCode: "" })
  const modalRef = useRef()

  // 현재 모달이 "열린" 상태라면 애니메이션을 재생하도록 조정.
  const closeModal = () => {
    setModalStatus(false)
  }

  const insertInput = e => {
    const { name, value } = e.target
    setInputValue({ ...inputValue, [name]: value })
  }

  useEffect(() => {
    if (status) {
      modalRef.current.style.animationPlayState = "running"
    }
  }, [status])
  return (
    <Wrapper ref={modalRef}>
      <ModalSection>
        <header>
          <ModalCloseBtn onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} />
          </ModalCloseBtn>
        </header>
        <ModalContent>
          <>
            <p>인증을 받을 이메일 주소를 입력해주세요.</p>
            <input
              name="username"
              placeholder="이메일 주소를 입력해주세요."
              onChange={insertInput}
            />
          </>
        </ModalContent>
      </ModalSection>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.6);
`

const ModalSection = styled.section`
  ${({ theme }) => {
    const { fonts, paddings } = theme
    return css`
      width: 30%;
      height: 20%;
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
    const { fonts, paddings, margins } = theme
    return css`
      padding: 16px;
      border-top: 1px solid #dee2e6;

      p {
        margin-bottom: ${margins.base};
        font-size: ${fonts.size.sm};
        text-align: center;
      }

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

export default SignupModal
