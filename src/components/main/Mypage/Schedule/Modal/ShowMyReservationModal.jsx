import { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleDown,
  faAngleUp,
  faBook,
  faCalendar,
  faClock,
  faComments,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"

import { ModalContext } from "module/Modal"
import { reservationControl } from "api/controls/reservationControl"
import { modalShow } from "styles/Animation"
import WriteRooftopReviewModal from "./WriteRooftopReview"

const ShowMyReservationModal = () => {
  const { openModal, closeModal } = useContext(ModalContext)
  const [reservationList, setReservationList] = useState([])
  const [selectedRooftopId, setSelectedRooftopId] = useState(null)

  useEffect(() => {
    const getReservationInfo = async () => {
      try {
        const loadedReservationList = await reservationControl.getCompletedResevationInfo()
        console.log(loadedReservationList)
        setReservationList(loadedReservationList)
      } catch (err) {
        console.log(err)
      }
    }
    getReservationInfo()
  }, [])

  const cancelSelectRooftop = () => {
    setSelectedRooftopId(null)
  }

  const writeRooftopReview = () => {}

  return (
    <Wrapper>
      <ModalHeader>
        <h5>사용을 완료한 시설 목록</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <ViewPoint>
          {reservationList.length > 0 ? (
            reservationList.map(
              ({ city, district, detail, startDate, endDate, startTime, endTime, rooftopId }) => (
                <RooftopStatus key={city}>
                  <div className="rooftop-info">
                    <h5>{`${city} ${district} ${detail}`}</h5>
                    <ButtonList>
                      {selectedRooftopId !== rooftopId ? (
                        <FontAwesomeIcon
                          icon={faAngleDown}
                          onClick={() => setSelectedRooftopId(rooftopId)}
                        />
                      ) : (
                        <FontAwesomeIcon icon={faAngleUp} onClick={cancelSelectRooftop} />
                      )}
                    </ButtonList>
                  </div>
                  {selectedRooftopId === rooftopId && (
                    <>
                      <ScheduleDetail>
                        <div className="detail-option">
                          <p>
                            <FontAwesomeIcon icon={faCalendar} size="lg" />
                            대여일자
                          </p>
                          <p>{`${startDate[0]}.${startDate[1]}.${startDate[2]} - ${endDate[0]}.${endDate[1]}.${endDate[2]}`}</p>
                        </div>
                        <div className="detail-option">
                          <p>
                            <FontAwesomeIcon icon={faClock} size="lg" />
                            대여시간
                          </p>
                          <p>{`${String(startTime[0]).padStart(2, "0")}:00 ~ ${String(
                            endTime[0],
                          ).padStart(2, "0")}:00`}</p>
                        </div>
                      </ScheduleDetail>
                      <WriteReviewBtn
                        onClick={() =>
                          openModal(
                            <WriteRooftopReviewModal
                              rooftopId={rooftopId}
                              address={`${city} ${district} ${detail}`}
                            />,
                          )
                        }>
                        <FontAwesomeIcon icon={faComments} /> 리뷰 작성하기
                      </WriteReviewBtn>
                    </>
                  )}
                </RooftopStatus>
              ),
            )
          ) : (
            <NoticeEmptyIcon>
              <FontAwesomeIcon icon={faBook} />
              <h5>대여 완료 내역 없음</h5>
              <p>옥상 시설을 예약하신 내역이 없습니다.</p>
            </NoticeEmptyIcon>
          )}
        </ViewPoint>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 33vw;
  margin: auto;

  border-radius: 0.3rem;
  background-color: #fff;

  animation: ${modalShow} 0.3s;
  animation-fill-mode: forwards;
  overflow: hidden;
`

const ViewPoint = styled.div`
  max-height: 42.5vh;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background: #ffffff;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #ced4da;
    &:hover {
      background-color: #adb5bd;
    }
  }
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
      display: flex;
      flex-direction: column;
      justify-content: center;

      padding: ${paddings.lg} ${paddings.base};
      border-top: 1px solid #dee2e6;
      background-color: ${colors.white};

      max-height: 100%;
      overflow-y: auto;
      text-align: center;
    `
  }}
`

const RooftopStatus = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      padding: ${paddings.sm} ${paddings.base};
      margin-bottom: ${margins.sm};
      color: ${colors.main.primary};

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      h5 {
        width: 90%;
        font-size: ${fonts.size.sm};
        line-height: 150%;
        text-align: left;
      }

      .rooftop-info {
        width: 100%;
        margin-bottom: ${margins.sm};
        border-bottom: 1px solid ${colors.main.secondary};
        display: flex;
        justify-content: space-between;
      }
    `
  }}
`

const ButtonList = styled.div`
  ${({ theme }) => {
    const { colors, margins } = theme
    return css`
      margin-right: ${margins.sm};
      display: flex;
      justify-content: space-between;

      svg {
        color: ${colors.main.primary};
        margin: auto;
      }
    `
  }}
`

const ScheduleDetail = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 95%;
      padding: ${paddings.sm} 0vw;
      margin: auto;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: ${colors.black.secondary};

      .detail-option {
        width: 100%;
        display: flex;
        justify-content: space-between;
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

const WriteReviewBtn = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 90%;
      padding: ${paddings.sm} ${paddings.base};
      margin: ${margins.sm} auto;

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
      margin: ${margins.base} auto;

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

export default ShowMyReservationModal
