import { useContext, useState } from "react"
import styled, { css } from "styled-components"

import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import CustomRange from "components/main/Mypage/Greenbee/Modal/CustomRange"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

const TimeFilterModal = ({ filter, setFilter }) => {
  const { closeModal } = useContext(ModalContext)
  const [timeInfo, setTimeInfo] = useState({
    startTime: parseInt(filter?.startTime.slice(0, 2)) || 0,
    endTime: parseInt(filter?.endTime.slice(0, 2)) || 23,
  })

  const { startTime, endTime } = timeInfo

  const resetSelect = () => {
    setTimeInfo({ startTime: 0, endTime: 23 })
    setFilter(prevFilter => ({ ...prevFilter, startTime: "", endTime: "" }))
  }

  const confirmSelect = () => {
    setFilter(prevFilter => ({
      ...prevFilter,
      startTime: `${String(startTime).padStart(2, "0")}:00:00`,
      endTime: `${String(endTime).padStart(2, "0")}:00:00`,
    }))
    closeModal()
  }

  return (
    <Wrapper>
      <ModalHeader>
        <h5>이용 시간 설정</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <h5>이용 시간 선택</h5>
        <p>대여하려는 시설의 이용 시간을 설정해주세요.</p>
        <OptionBox>
          <h5>
            시간 <span>(hr)</span>
          </h5>
          <CustomRange
            STEP={1}
            MIN={0}
            MAX={23}
            unit={":00"}
            setValue={setTimeInfo}
            minOption="startTime"
            maxOption="endTime"
            imin={startTime}
            imax={endTime}
          />
        </OptionBox>
        <BtnList>
          <SettingBtn onClick={resetSelect}>초기화</SettingBtn>
          <SettingBtn onClick={confirmSelect}>적용하기</SettingBtn>
        </BtnList>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 33vw;

  margin: auto;
  background-color: #f5f5f5;

  animation: ${modalShow} 0.3s;
  animation-fill-mode: forwards;
  overflow: hidden;
`

const ModalHeader = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.base};

      background-color: ${colors.main.primary};

      display: flex;
      justify-content: space-between;

      color: ${colors.white};
      text-align: center;

      h5 {
        font-size: ${fonts.size.base};
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
        margin: ${margins.base} 0vw ${margins.xsm} 0vw;
        font-size: ${fonts.size.sm};
        text-align: center;
      }

      p {
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: center;
      }
    `
  }}
`

const OptionBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 90%;
      margin: auto;
      padding: ${paddings.sm};

      h5 {
        border-bottom: 1px solid ${colors.main.secondary};
        margin-bottom: ${margins.sm};

        font-size: ${fonts.size.base};
        line-height: 150%;
        text-align: left;
      }

      span {
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }
    `
  }}
`

const BtnList = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      width: 80%;
      margin: 0vw auto ${margins.base} auto;
      display: flex;
      justify-content: space-between;
    `
  }}
`

const SettingBtn = styled.button`
  ${({ theme }) => {
    const { colors, paddings, margins } = theme
    return css`
      width: 40%;
      padding: ${paddings.sm};
      margin: ${margins.sm} auto 0vw auto;

      background: ${colors.white};
      border: 1px solid ${colors.main.primary};
      border-radius: 2.5vw;
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: 100;

      &:hover {
        border: 0px;
        background: ${colors.main.tertiary};
        color: ${colors.white};
      }
    `
  }}
`

export default TimeFilterModal
