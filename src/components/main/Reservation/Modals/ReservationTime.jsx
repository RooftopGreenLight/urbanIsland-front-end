import { useContext, useState } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import CustomSlider from "components/main/Reservation/CustomSlider"

const ReservationTime = ({ startTime, endTime }) => {
  const { closeModal } = useContext(ModalContext)
  const [value, setValue] = useState([])
  return (
    <Wrapper>
      <header>
        <ModalCloseBtn onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} />
        </ModalCloseBtn>
      </header>
      <ModalContent>
        <Box>
          <p>이용가능시간</p>
          <Time>
            <div>{startTime}:00</div>
            <div>{endTime}:00</div>
          </Time>
          <CustomSlider
            MAX={0}
            MIN={24}
            STEP={1}
            unit={":00"}
            setValue={setValue}
            imin={0}
            imax={24}
          />
        </Box>
      </ModalContent>
    </Wrapper>
  )
}
const Time = styled.div`
  display: flex;
  justify-content: space-between;
`
const Box = styled.div`
  width: 100%;
  p {
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  padding: 1rem 2rem;
`
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
      width: 100%;
    `
  }}
`

export default ReservationTime
