import { useContext, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { ModalContext } from "module/Modal"

const FindRooftopOwner = () => {
  const { closeModal } = useContext(ModalContext)

  return (
    <Wrapper>
      <ModalHeader>
        <h5>본인을 선택한 옥상 확인하기</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent></ModalContent>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 33vw;

  margin: auto;
  background-color: #f5f5f5;
`

const ModalHeader = styled.div`
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
    `
  }}
`

const ModalContent = styled.div`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      padding: ${paddings.xl};
      margin: auto;
    `
  }}
`

const SetTimeSection = styled.div`
  ${({ theme, timeType }) => {
    const { fonts, margins } = theme
    return css`
      width: 75%;
      margin: auto;

      display: flex;
      justify-content: space-evenly;

      .input-section {
        width: 40%;

        h5 {
          margin-bottom: ${margins.sm};
          text-align: center;
          font-size: ${fonts.size.base};
        }

        input {
          width: 100%;
          margin: 0vw auto;

          text-align: center;
          font-size: ${fonts.size.sm};

          &::placeholder {
            font-weight: 100;
          }
        }
      }
    `
  }}
`

const ApplyTimeSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ApplyTimeBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 20%;
      padding: ${paddings.sm};
      margin: ${margins.lg} auto ${margins.sm} auto;

      background-color: ${colors.white};
      border: 1px solid #7d7d7d;
      border-radius: 25px;

      text-align: center;
      font-size: ${fonts.size.xsm};
      font-weight: 100;
    `
  }}
`

const ModalFeedback = styled.p`
  ${({ theme }) => {
    const { fonts, paddings } = theme
    return css`
      text-align: center;
      font-size: ${fonts.size.xsm};
      font-weight: 100;
    `
  }}
`
export default FindRooftopOwner
