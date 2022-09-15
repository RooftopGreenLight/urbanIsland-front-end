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
import Pagination from "components/common/Pagination"
import { Wrapper, Title, ServiceList, ServiceBox } from "components/common/Style/Mypage/CommonStyle"
import { NoticeEmptyIcon } from "components/common/Style/NoticeEmpty/CommonStyle"

import ChatModal from "components/main/Chat/ChatModal"
import ChatRoomPage from "components/main/Chat/ChatRoomPage"
import ShowMyReservationModal from "./Modal/ShowMyReservationModal"

const Schedule = () => {
  const { openModal } = useContext(ModalContext)

  const [selectedDate, setSeletedDate] = useState(new Date())
  const [bookingDates, setBookingDates] = useState(new Set())

  // 예정된 예약, 사용 완료된 예약, 선택한 일자의 예약 목록을 각각 담은 state
  const [waitingReservation, setWaitingReservation] = useState([])
  const [completedReservation, setCompletedReservation] = useState([])
  const [currentReservation, setCurrentReservation] = useState([])

  // 현재 일자의 예약 목록 중, 사용자가 열람 중인 예약 내역
  const [selectedReservation, setSelectedReservation] = useState({
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
        const loadedCurrentInfo = await reservationControl.getReservationInfo(
          moment(selectedDate).format("YYYY-MM-DD"),
        )

        setWaitingReservation(loadedWaitingInfo)
        setCompletedReservation(loadedCompletedInfo)
        setCurrentReservation(loadedCurrentInfo)
        // 임시 작성 코드, 추후 수정해야 함 (pagination 적용 예정)
        loadedCurrentInfo.length > 0 && setSelectedReservation(loadedCurrentInfo[0])
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
  } = selectedReservation

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
      const loadedCurrentInfo = await reservationControl.getReservationInfo(
        moment(selectedDate).format("YYYY-MM-DD"),
      )
      setBookingDates(new Set())
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
      setCurrentReservation(loadedCurrentInfo)
      loadedCurrentInfo.length > 0 && setSelectedReservation(loadedCurrentInfo[0])
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <Wrapper>
      <ServiceList>
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
      </ServiceList>
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
      <ServiceList>
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
      </ServiceList>
    </Wrapper>
  )
}

const CalenderBox = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      margin: ${margins.lg} 0vw;
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
    const { colors, fonts, margins } = theme
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

export default Schedule
