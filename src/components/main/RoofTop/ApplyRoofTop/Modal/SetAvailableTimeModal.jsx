import { useContext, useRef, useState } from "react"
import styled, { css } from "styled-components"

import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { ModalHeader, ModalCloseBtn } from "components/common/Style/Modal/CommonStyle"

import { ModalContext } from "module/Modal"

const SetAvailableTimeModal = ({ applyInfo, changeInfo }) => {
  const { closeModal } = useContext(ModalContext)
  const feedBackMsg = useRef()

  const { startTime: appliedStartTime, endTime: appliedEndTime } = applyInfo
  const [availableTime, setAvailableTime] = useState({
    startTime: appliedStartTime,
    endTime: appliedEndTime,
  })

  const { startTime, endTime } = availableTime

  const changeTime = e => {
    const { name, value } = e.target
    if (value < 0 || value > 24) {
      feedBackMsg.current.innerText = "시간은 0시부터 24시까지 설정 가능합니다."
      return
    }
    setAvailableTime({ ...availableTime, [name]: value.padStart(2, "0") })
  }

  const confirmTime = () => {
    if (startTime >= endTime) {
      feedBackMsg.current.innerText = "시작 시간이 종료 시간보다 늦어서는 안됩니다."
      return
    }

    if (endTime <= startTime) {
      feedBackMsg.current.innerText = "종료 시간이 시작 시간보다 빨라서는 안됩니다."
      return
    }

    changeInfo({ ...applyInfo, startTime, endTime })
    closeModal()
  }

  return (
    <Wrapper>
      <ModalHeader>
        <h5>시간 설정</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <SetTimeSection>
          <div className="input-section">
            <h5>시작 시간</h5>
            <input name="startTime" value={parseInt(startTime)} onChange={changeTime} />
          </div>
          <div className="input-section">
            <h5>종료 시간</h5>
            <input name="endTime" value={parseInt(endTime)} onChange={changeTime} />
          </div>
        </SetTimeSection>
        <ApplyTimeSection>
          <ApplyTimeBtn onClick={confirmTime}>시간 설정</ApplyTimeBtn>
          <ModalFeedback ref={feedBackMsg}>시작 시간과 종료 시간을 입력해주세요.</ModalFeedback>
        </ApplyTimeSection>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 33vw;

  margin: auto;
  background-color: #f5f5f5;
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
    const { fonts } = theme
    return css`
      text-align: center;
      font-size: ${fonts.size.xsm};
      font-weight: 100;
    `
  }}
`

export default SetAvailableTimeModal
