import { useContext } from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"

const RegisterRooftop = () => {
  const { closeModal } = useContext(ModalContext)
  return (
    <Wrapper>
      <ModalHeader>
        <h5>옥상 시설 등록</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
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
    const { colors } = theme
    return css`
      width: 33%;
      margin: auto;

      border-radius: 0.3rem;
      background-color: ${colors.white};

      animation: ${modalShow} 0.3s;
      animation-fill-mode: forwards;
      overflow: hidden;
    `
  }}
`

const ModalHeader = styled.header`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.base};

      background-color: #000000;

      display: flex;
      justify-content: space-between;

      h5 {
        color: ${colors.white};
        font-size: ${fonts.size.base};
        text-align: center;
        vertical-align: center;
      }
    `
  }}
`

const ModalCloseBtn = styled(FontAwesomeIcon)`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      padding: ${paddings.sm};
      color: ${colors.white};
      font-size: ${fonts.size.xsm};

      cursor: pointer;
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
        margin: ${margins.sm} auto;
        font-size: ${fonts.size.base};
      }

      p {
        margin-bottom: ${margins.sm};
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
      width: 40%;
      padding: ${paddings.sm};
      margin: ${margins.sm} auto;

      background-color: #000000;
      border-radius: 25px;

      color: ${colors.white};
      font-size: ${fonts.size.xsm};
    `
  }}
`

export default RegisterRooftop
