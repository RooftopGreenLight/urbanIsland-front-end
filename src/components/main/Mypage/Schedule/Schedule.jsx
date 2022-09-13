import { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"
import moment from "moment"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleRight,
  faBan,
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
import { chattingControl } from "api/controls/chattingControl"

import DateUtil from "util/DateUtil"
import ChatModal from "components/main/Chat/ChatModal"
import ChatRoomPage from "components/main/Chat/ChatRoomPage"
import ShowMyReservationModal from "./Modal/ShowMyReservationModal"

const Schedule = () => {
  const { openModal } = useContext(ModalContext)

  const [selectedDate, setSeletedDate] = useState(new Date())
  const [bookingDates, setBookingDates] = useState(new Set())

  const [waitingReservation, setWaitingReservation] = useState([])
  const [completedReservation, setCompletedReservation] = useState([])
  const [reservationInfo, setReservationInfo] = useState({
    city: "",
    district: "",
    detail: "",
    startDate: [],
    endDate: [],
    startTime: [],
    endTime: [],
    adultCount: 0,
    kidCount: 0,
    reservationId: null,
  })

  useEffect(() => {
    const getReservationInfo = async () => {
      try {
        const loadedWaitingInfo = await reservationControl.getWaitingResevationInfo()
        loadedWaitingInfo.map(({ startDate, endDate }) => {
          const betweenDates = DateUtil.getDatesBetweenTwoDates(
            DateUtil.createDate(startDate),
            DateUtil.createDate(endDate),
          )
          setBookingDates(
            prevBookingDates =>
              new Set([...prevBookingDates, ...betweenDates.map(date => date.toDateString())]),
          )
        })

        const loadedCompletedInfo = await reservationControl.getCompletedResevationInfo()
        const loadedInfo = await reservationControl.getReservationInfo(
          moment(selectedDate).format("YYYY-MM-DD"),
        )
        console.log(loadedWaitingInfo)
        setWaitingReservation(loadedWaitingInfo)
        setCompletedReservation(loadedCompletedInfo)
        loadedInfo && setReservationInfo(loadedInfo)
      } catch (err) {
        console.log(err)
      }
    }
    getReservationInfo()
  }, [selectedDate])

  const {
    city,
    district,
    detail,
    startDate,
    endDate,
    startTime,
    endTime,
    adultCount,
    kidCount,
    reservationId,
    ownerId,
  } = reservationInfo

  const getChatroom = async () => {
    const roomId = await chattingControl.getCheckChatExist(reservationId, ownerId)
    if (roomId) {
      openModal(<ChatModal roomId={roomId} />)
    }
  }

  const cancelReservation = async () => {
    try {
      await reservationControl.deleteCancelReservation(reservationId)
      const loadedWaitingInfo = await reservationControl.getWaitingResevationInfo()
      loadedWaitingInfo.map(({ startDate, endDate }) => {
        const betweenDates = DateUtil.getDatesBetweenTwoDates(
          DateUtil.createDate(startDate),
          DateUtil.createDate(endDate),
        )
        setBookingDates(
          prevBookingDates =>
            new Set([...prevBookingDates, ...betweenDates.map(date => date.toDateString())]),
        )
      })
      setWaitingReservation(loadedWaitingInfo)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <Wrapper>
      <InnerBox>
        <Title>
          <h5>내 예약 관리하기</h5>
        </Title>
        <ServiceBox onClick={() => openModal(<ChatRoomPage />)}>
          <div className="introduce">
            <h5>문의 내역 확인하기</h5>
            <p>옥상 시설 별 문의 및 채팅 내역을 확인합니다.</p>
          </div>
          <FontAwesomeIcon icon={faAngleRight} />
        </ServiceBox>
        <ServiceBox onClick={() => openModal(<ShowMyReservationModal />)}>
          <div className="introduce">
            <h5>이용 후기 작성하기</h5>
            <p>최근 이용한 옥상 시설의 후기를 작성합니다.</p>
          </div>
          <FontAwesomeIcon icon={faAngleRight} />
        </ServiceBox>
      </InnerBox>
      <CalenderBox>
        <Title>
          <h5>내 예약 일정</h5>
        </Title>
        <CalenderContainer>
          <Calendar
            formatDay={(_, date) => moment(date).format("DD")}
            navigationLabel={null}
            onChange={setSeletedDate}
            value={selectedDate}
            tileContent={({ date }) => {
              let html = []
              if (bookingDates.has(date.toDateString())) {
                html.push(<BookingDot key={date} />)
              }
              return <>{html}</>
            }}
          />
        </CalenderContainer>
      </CalenderBox>
      <InnerBox>
        <Title>
          <h5>예약 세부 정보</h5>
        </Title>
        {reservationId ? (
          <>
            <ScheduleDetail>
              <p>
                <FontAwesomeIcon icon={faBuilding} size="lg" />
                예약 숙소
              </p>
              <span>{`${city} ${district} ${detail}`}</span>
            </ScheduleDetail>
            <ScheduleDetail>
              <p>
                <FontAwesomeIcon icon={faCalendar} size="lg" />
                예약일자
              </p>
              <span>{`${startDate[0]}.${startDate[1]}.${startDate[2]} - ${endDate[0]}.${endDate[1]}.${endDate[2]}`}</span>
            </ScheduleDetail>
            <ScheduleDetail>
              <p>
                <FontAwesomeIcon icon={faClock} size="lg" />
                예약시간
              </p>
              <span>{`${String(startTime[0]).padStart(2, "0")}:00 ~ ${String(endTime[0]).padStart(
                2,
                "0",
              )}:00`}</span>
            </ScheduleDetail>
            <ScheduleDetail>
              <p>
                <FontAwesomeIcon icon={faUser} size="lg" /> 총 인원
              </p>
              <span>
                {kidCount > 0 ? `어른 ${adultCount}명, 유아 ${kidCount}명` : `어른 ${adultCount}명`}
              </span>
            </ScheduleDetail>
            <BtnList>
              <ScheduleBtn onClick={cancelReservation}>
                <FontAwesomeIcon icon={faBan} /> 예약 일정 취소
              </ScheduleBtn>
              <ScheduleBtn onClick={getChatroom}>
                <FontAwesomeIcon icon={faComments} /> 예약 문의 개설
              </ScheduleBtn>
            </BtnList>
          </>
        ) : (
          <NoticeEmptyIcon>
            <FontAwesomeIcon icon={faBook} />
            <h5>옥상 예약 정보 없음</h5>
            <p>해당 일자에 옥상을 예약한 기록이 없습니다.</p>
          </NoticeEmptyIcon>
        )}
      </InnerBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 35vw;
  margin: 7.5vh auto;

  display: flex;
  flex-direction: column;
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
    const { margins } = theme
    return css`
      margin: ${margins.lg} 0vw;
    `
  }}
`

const InnerBox = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      margin: 0vw 0vw ${margins.lg} 0vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `
  }}
`

const ServiceBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      display: flex;
      justify-content: space-between;
      padding: ${paddings.base};
      border-bottom: 1px solid ${colors.main.primary}55;

      p {
        color: ${colors.black.quinary};
        font-weight: ${fonts.weight.light};
      }

      h5 {
        margin-bottom: 0.25rem;
        color: ${colors.black.secondary};
        font-size: ${fonts.size.sm};
      }

      svg {
        margin: auto 0vw;
        color: ${colors.main.primary};
      }
    `
  }}
`

const ScheduleDetail = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      margin: auto;
      padding: ${paddings.sm};

      display: flex;
      justify-content: space-between;
      color: ${colors.black.secondary};

      span {
        font-weight: 300;
        text-align: right;
      }

      p {
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

const BookingDot = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      height: ${fonts.size.xxsm};
      width: ${fonts.size.xxsm};
      margin: ${margins.xsm} auto 0vw auto;

      position: relative;
      bottom: 0;

      background-color: ${colors.main.tertiary};
      border-radius: 50%;
    `
  }}
`

const BtnList = styled.div`
  display: flex;
`

const ScheduleBtn = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 45%;
      padding: ${paddings.sm} ${paddings.base};
      margin: ${margins.lg} auto ${margins.xl} auto;

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
