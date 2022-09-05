import { useContext, useState } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import Calendar from "react-calendar"
import { CalenderContainer } from "styles/calender"
import { useEffect } from "react"
import moment from "moment"
const ReservationDate = ({ data, setData }) => {
  const [value, onChange] = useState(new Date())
  const { closeModal } = useContext(ModalContext)

  useEffect(() => {
    setData({ ...data, reservationDate: value })
  }, [value])

  return (
    <Wrapper>
      <ModalHeader>
        <h5>예약 일자 설정</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <CalendarBox>
          <CalenderContainer>
            <Calendar
              minDate={new Date()}
              onChange={onChange}
              value={value}
              selectRange={true}
              returnValue={"range"}
            />
          </CalenderContainer>
        </CalendarBox>
        <SelectedDate>
          <div className="notice-data">
            <span>체크인</span>
            <p>{moment(value[0]).format("MM/DD")}</p>
          </div>
          <div className="notice-data">
            <span>체크 아웃</span>
            <p>{moment(value[1]).format("MM/DD")}</p>
          </div>
          <div className="total-date">
            <span>예약 기간</span>
            <p>총 {moment(value[1]).diff(moment(value[0]), "days")}일</p>
          </div>
        </SelectedDate>
        <ButtonList>
          <button onClick={() => onChange(new Date())}>초기화</button>
          <button onClick={closeModal}>적용하기</button>
        </ButtonList>
      </ModalContent>
    </Wrapper>
  )
}

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
    `
  }}
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
    const { colors, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.base};

      display: grid;
      grid-template-rows: 1fr 1fr 0.25fr;
      grid-template-columns: repeat(4, 1fr);

      background-color: ${colors.white};
    `
  }}
`

const CalendarBox = styled.div`
  width: 90%;
  margin: auto;
  grid-column: 1 / 4;
  grid-row: 1 / 3;
`

const ButtonList = styled.div`
  ${({ theme }) => {
    const { paddings, margins } = theme
    return css`
      padding: ${paddings.sm};
      width: 100%;

      grid-column: 1 / 5;
      grid-row: 3 / 4;

      display: flex;
      flex-direction: column;
      align-items: left;
    `
  }}
`

const SelectedDate = styled.div`
  ${({ theme }) => {
    const { colors, fonts } = theme
    return css`
      width: 90%;
      margin: 5% 10%;

      grid-column: 4 / 5;
      grid-row: 1 / 3;

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .notice-data {
        text-align: left;
      }

      .total-date {
        width: 100%;
      }

      span {
        font-size: ${fonts.size.sm};
        font-weight: ${fonts.weight.light};
      }

      p {
        font-size: ${fonts.size.base};
      }
    `
  }}
`

export default ReservationDate
