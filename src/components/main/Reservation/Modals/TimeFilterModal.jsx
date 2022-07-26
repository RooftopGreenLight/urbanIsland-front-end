import { useContext, useState } from "react"
import styled, { css } from "styled-components"

import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import CustomSlider from "components/common/CustomSlider"

import { ModalHeader, ModalCloseBtn, ModalContent } from "components/common/Style/Modal/CommonStyle"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

const TimeFilterModal = ({ filter, setFilter }) => {
  const { closeModal } = useContext(ModalContext)
  const { startTime: prevStartTime, endTime: prevEndTime } = filter
  const [timeInfo, setTimeInfo] = useState({
    startTime: parseInt(prevStartTime.slice(0, 2)) || 0,
    endTime: parseInt(prevEndTime.slice(0, 2)) || 24,
  })

  const { startTime, endTime } = timeInfo

  const resetSelect = () => {
    setTimeInfo({ startTime: 0, endTime: 24 })
    setFilter(prevFilter => ({ ...prevFilter, startTime: "", endTime: "" }))
  }

  const confirmSelect = () => {
    setFilter(prevFilter => ({
      ...prevFilter,
      startTime: startTime > 0 ? `${String(startTime).padStart(2, "0")}:00:00` : "",
      endTime: endTime < 24 ? `${String(endTime).padStart(2, "0")}:00:00` : "",
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
            이용 시간 <span>(hr)</span>
          </h5>
          <CustomSlider
            STEP={1}
            MIN={0}
            MAX={24}
            unit={":00"}
            setValue={([startTime, endTime]) =>
              setTimeInfo(prevData => ({ ...prevData, startTime, endTime }))
            }
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
