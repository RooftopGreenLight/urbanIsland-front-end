import { useContext, useState } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { useEffect } from "react"
import moment from "moment"
const ReservationDate = () => {
  const [value, onChange] = useState(new Date())

  const { closeModal } = useContext(ModalContext)
  const startDate = new Date()
  useEffect(() => {}, [value])
  const reset = e => {
    onChange(new Date())
  }
  const confirm = e => {
    closeModal()
  }
  return (
    <Wrapper>
      <header>
        <ModalCloseBtn onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} />
        </ModalCloseBtn>
      </header>
      <ModalContent>
        <Box>
          <CalendarBox>
            <Calendar
              minDate={startDate}
              onChange={onChange}
              value={value}
              selectRange={true}
              returnValue={"range"}
            />{" "}
          </CalendarBox>
          <Detail>
            <DetailBox>
              {" "}
              {moment(value[0]).format("MM/DD")}~{moment(value[1]).format("MM/DD")}
              <div>{moment(value[1]).diff(moment(value[0]), "days")}일간</div>
            </DetailBox>
            <DetailBox>
              <button onClick={reset}>초기화</button>
              <button onClick={confirm}>적용하기</button>
            </DetailBox>
          </Detail>
        </Box>
      </ModalContent>
    </Wrapper>
  )
}
const Box = styled.div`
  display: flex;
`
const CalendarBox = styled.div`
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Detail = styled.div`
  padding: 1rem;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const DetailBox = styled.div`
  ${({ theme }) => {
    const { paddings, margins } = theme
    return css`
      margin-top: 3rem;
      padding: ${paddings.base};
      height: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      button {
        margin: ${margins.sm};
        padding: ${paddings.sm};
      }
    `
  }}
`

const Wrapper = styled.section`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      width: 50%;
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
      margin: 0vw 0vw 0vw auto;
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
    const { colors, paddings } = theme
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

export default ReservationDate
