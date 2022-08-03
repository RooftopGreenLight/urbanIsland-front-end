import { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import ModalPortal from "components/common/Modal/ModalPortal"
import { modalShow } from "styles/Animation"

const SignupModal = ({ children, status, setModalOn }) => {
  const modalRef = useRef()

  useEffect(() => {
    if (status) {
      modalRef.current.style.animationPlayState = "running"
    }
  }, [status])

  return (
    <ModalPortal>
      {status && (
        <Wrapper ref={modalRef}>
          <ModalSection>
            <header>
              <ModalCloseBtn onClick={() => setModalOn(false)}>
                <FontAwesomeIcon icon={faXmark} />
              </ModalCloseBtn>
            </header>
            <ModalContent>{children}</ModalContent>
          </ModalSection>
        </Wrapper>
      )}
    </ModalPortal>
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
