import { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBook,
  faBuilding,
  faCalendar,
  faClock,
  faComments,
  faUser,
} from "@fortawesome/free-solid-svg-icons"

import Calendar from "react-calendar"
import { CalenderContainer } from "styles/calender"

import { ModalContext } from "module/Modal"
import { reservationControl } from "api/controls/reservationControl"
import ChatRoomPage from "components/main/Chat/ChatRoomPage"
import moment from "moment"

const Schedule = () => {
  const [selectedDate, setSeletedDate] = useState(new Date())
  const [reservationInfo, setReservationInfo] = useState(null)
  const [waitingReservation, setWaitingReservation] = useState([])
  const [completedReservation, setCompletedReservation] = useState([])
  const { openModal } = useContext(ModalContext)

  useEffect(() => {
    const getReservationInfo = async () => {
      try {
        const loadedWaitingInfo = await reservationControl.getWaitingResevationInfo()
        const loadedCompletedInfo = await reservationControl.getCompletedResevationInfo()
        const loadedInfo = await reservationControl.getReservationInfo(
          selectedDate.toISOString().split("T")[0],
        )
        setWaitingReservation(loadedWaitingInfo)
        setCompletedReservation(loadedCompletedInfo)
        setReservationInfo(loadedInfo)
      } catch (err) {
        console.log(err)
      }
    }
    getReservationInfo()
  }, [selectedDate])

  return (
    <Wrapper>
      <ViewPoint>
        <CalenderBox>
          <Title>
            <h5>내 예약 일정</h5>
          </Title>
          <CalenderContainer>
            <Calendar
              formatDay={(_, date) => moment(date).format("DD")}
              minDetail="month"
              maxDetail="month"
              navigationLabel={null}
              showNeighboringMonth={false}
              onChange={setSeletedDate}
              value={selectedDate}
            />
          </CalenderContainer>
        </CalenderBox>
        <InnerBox>
          <Title>
            <h5>예약 세부 정보</h5>
          </Title>
          {reservationInfo ? (
            <>
              <ScheduleDetail>
                <p>
                  <FontAwesomeIcon icon={faBuilding} size="lg" />
                  예약 숙소
                </p>
                <span>{`${reservationInfo.city} ${reservationInfo.district} ${reservationInfo.detail}`}</span>
              </ScheduleDetail>
              <ScheduleDetail>
                <p>
                  <FontAwesomeIcon icon={faCalendar} size="lg" />
                  예약일자
                </p>
                <span>{`${reservationInfo.startDate[0]}.${reservationInfo.startDate[1]}.${reservationInfo.startDate[2]} - ${reservationInfo.endDate[0]}.${reservationInfo.endDate[1]}.${reservationInfo.endDate[2]}`}</span>
              </ScheduleDetail>
              <ScheduleDetail>
                <p>
                  <FontAwesomeIcon icon={faClock} size="lg" />
                  예약시간
                </p>
                <span>{`${String(reservationInfo.startTime[0]).padStart(2, "0")}:00 ~ ${String(
                  reservationInfo.endTime[0],
                ).padStart(2, "0")}:00`}</span>
              </ScheduleDetail>
              <ScheduleDetail>
                <p>
                  <FontAwesomeIcon icon={faUser} size="lg" /> 총 인원
                </p>
                <span>
                  {reservationInfo.kidCount > 0
                    ? `어른 ${reservationInfo.adultCount}명, 유아 ${reservationInfo.kidCount}명`
                    : `어른 ${reservationInfo.adultCount}명`}
                </span>
              </ScheduleDetail>
            </>
          ) : (
            <NoticeEmptyIcon>
              <FontAwesomeIcon icon={faBook} />
              <h5>옥상 예약 정보 없음</h5>
              <p>해당 일자에 옥상을 예약한 기록이 없습니다.</p>
            </NoticeEmptyIcon>
          )}
        </InnerBox>
        <SendMessageBtn onClick={() => openModal(<ChatRoomPage />)}>
          <FontAwesomeIcon icon={faComments} /> 채팅 목록 열기
        </SendMessageBtn>
      </ViewPoint>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 35vw;
  height: 80vh;
  margin: 0vh auto;

  display: flex;
  flex-direction: column;
`

const ViewPoint = styled.div`
  max-height: 80vh;
  padding: 0rem 1rem;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`

const Title = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      padding: ${paddings.sm} ${paddings.base};
      margin-bottom: ${margins.sm};

      display: flex;
      border-bottom: 1px solid ${colors.main.primary}77;

      color: ${colors.main.primary};
      text-align: center;

      h5 {
        width: 90%;

        font-size: ${fonts.size.base};
        font-weight: ${fonts.weight.bold};
        text-align: left;
      }
    `
  }}
`

const CalenderBox = styled.div`
  ${({ theme }) => {
    const { paddings, margins } = theme
    return css`
      margin: ${margins.sm} 0vw ${margins.base} 0vw;
      padding: ${paddings.base} 0vw;
    `
  }}
`

const InnerBox = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      margin: ${margins.base} 0vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `
  }}
`
const ScheduleDetail = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      display: flex;
      justify-content: space-between;
      padding: ${paddings.sm};
      color: ${colors.black.secondary};

      span {
        width: 55%;
        font-weight: 300;
        text-align: right;
      }

      p {
        width: 70%;
        margin: ${margins.xsm} 0vw;
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: left;
      }

      svg {
        color: ${colors.main.primary};
        margin: auto ${margins.base} auto 0vw;
      }
    `
  }}
`

const SendMessageBtn = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 90%;
      padding: ${paddings.sm} ${paddings.base};
      margin: ${margins.lg} auto;

      cursor: pointer;
      border-radius: ${fonts.size.sm};
      background-color: ${colors.main.primary};

      text-align: center;
      color: ${colors.white};
      font-size: ${fonts.size.sm};

      svg {
        margin: auto ${margins.sm} auto 0vw;
      }

      &:hover {
        background-color: ${colors.main.tertiary};
        font-weight: ${fonts.weight.bold};
      }
    `
  }}
`

const NoticeEmptyIcon = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      margin: ${margins.lg} auto 0vw auto;

      color: ${colors.main.primary};
      text-align: center;

      h5 {
        font-size: ${fonts.size.base};
        margin-bottom: ${margins.sm};
      }

      p {
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }

      svg {
        width: 2.5vw;
        height: 2.5vw;

        margin-bottom: ${margins.base};
        padding: ${paddings.lg};

        background-color: ${colors.main.secondary};
        border-radius: 20vw;

        color: ${colors.white};
      }
    `
  }}
`

export default Schedule
