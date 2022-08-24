import { useContext } from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"

const RooftopModal = () => {
  const { closeModal } = useContext(ModalContext)
  return (
    <Wrapper>
      <header>
        <ModalCloseBtn onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} />
        </ModalCloseBtn>
      </header>
      <ModalContent>
        <h5>옥상 유형 선택</h5>
        <p>신청하려는 옥상 시설의 유형을 선택하세요.</p>
        <LinkBtn to="/mypage/rooftop/apply" onClick={closeModal}>
          이미 녹화가 되어있어요!
        </LinkBtn>
        <LinkBtn to="/mypage/rooftop/request" onClick={closeModal}>
          옥상 녹화를 하고싶어요!
        </LinkBtn>
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

      text-align: center;

      h5 {
        font-size: ${fonts.size.base};
      }

      p {
        margin: ${margins.sm} auto;
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }
    `
  }}
`

const LinkBtn = styled(Link)`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 60%;
      padding: ${paddings.sm};
      margin: ${margins.sm} auto;

      background-color: #000000;
      border-radius: 25px;

      color: ${colors.white};
      font-size: ${fonts.size.xsm};
    `
  }}
`

export default RooftopModal
