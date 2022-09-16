import { useContext, useState, useEffect, useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import styled, { css } from "styled-components"
import moment from "moment/moment"

import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { CalenderContainer } from "styles/calender"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleRight,
  faBan,
  faBook,
  faBuilding,
  faCalendar,
  faCircleCheck,
  faClock,
  faComments,
  faMap,
  faReceipt,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { Title, ServiceList, ServiceBox } from "components/common/Style/Mypage/CommonStyle"
import {
  RooftopTitle,
  RooftopDetail,
  DetailInfo,
  InformationBox,
} from "components/common/Style/Rooftop/CommonStyle"

import DateUtil from "util/DateUtil"
import { ModalContext } from "module/Modal"
import { roofTopControl } from "api/controls/roofTopControl"
import { NoticeEmptyIcon } from "components/common/Style/NoticeEmpty/CommonStyle"
import { RoofTopFacilities } from "constants/RoofTopFacilities"
import ChatRooftopList from "components/main/Chat/ChatRooftopList"
import { reservationControl } from "api/controls/reservationControl"

const SuperviseRooftop = () => {
  const { id } = useParams()
  const { openModal } = useContext(ModalContext)

  const [selectedDate, setSeletedDate] = useState(new Date())
  const [bookingDates, setBookingDates] = useState(new Map())
  const [rooftopData, setRooftopData] = useState({
    ownerId: null,
    adultCount: 1,
    kidCount: 0,
    petCount: 0,
    detailNums: [],
    startTime: 0,
    endTime: 23,
    explainContent: "",
    grade: 0,
    mainImage: null,
    refundContent: "",
    roleContent: "",
    rooftopImages: [],
    rooftopReviews: [],
    rooftopOptions: [],
    structureImage: null,
    totalCount: 0,
    totalPrice: 0,
    width: 0,
  })
  // 현재 일자의 예약 목록 중, 사용자가 열람 중인 예약 내역
  const [selectedReservation, setSelectedReservation] = useState({
    startDates: [],
    endDates: [],
    startTimes: [],
    endTimes: [],
    id: null,
    tid: null,
  })

  useEffect(() => {
    const loadCurrentInfo = async () => {
      try {
        const result = await roofTopControl.getRooftopDetail(id)
        const { startTime, endTime, reservations } = result

        // 이미 예약된 일자인 bookedDate를 Set에 하나씩 저장하는 과정.
        if (reservations && reservations.length > 0) {
          reservations.map(({ id, startDates, endDates, startTimes, endTimes }) => {
            const betweenDates = DateUtil.getDatesBetweenTwoDates(
              DateUtil.createDate(startDates),
              DateUtil.createDate(endDates),
            )
            return betweenDates.map(date =>
              setBookingDates(
                prevData =>
                  new Map([
                    ...prevData,
                    [date.toDateString(), { id, startDates, endDates, startTimes, endTimes }],
                  ]),
              ),
            )
          })
        }
        setRooftopData({ ...result, startTime: startTime[0], endTime: endTime[0] })
      } catch (err) {
        console.log(err.message)
      }
    }
    loadCurrentInfo()
  }, [])

  useEffect(() => {
    const getReservationInfo = async () => {
      const bookedReservationInfo = bookingDates.get(selectedDate.toDateString())
      if (bookedReservationInfo) {
        const { id } = bookedReservationInfo
        try {
          const { tid } = await reservationControl.getReservationInfoById(id)
          setSelectedReservation({ ...bookedReservationInfo, tid })
        } catch (err) {
          console.log(err)
        }
        return
      }
      setSelectedReservation({
        startDates: [],
        endDates: [],
        startTimes: [],
        endTimes: [],
        id: null,
        tid: null,
      })
    }
    getReservationInfo()
  }, [selectedDate])

  const {
    city,
    district,
    detail,
    grade,
    adultCount,
    kidCount,
    petCount,
    width,
    mainImage,
    rooftopImages,
    structureImage,
    detailNums,
    explainContent,
    roleContent,
    refundContent,
    rooftopReviews,
    ownerId,
  } = rooftopData

  const { startDates, endDates, startTimes, endTimes, id: reservationId, tid } = selectedReservation

  const imgAmount = useMemo(() => rooftopImages?.length, [rooftopImages])

  const SlickSettings = {
    autoplay: true,
    autoplaySpeed: 10000,
    dots: imgAmount > 3,
    infinite: imgAmount > 3,
    lazyLoad: "progressive",
    speed: 250,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const cancelReservation = async reservationId => {
    try {
      await reservationControl.deleteCancelReservation(reservationId)
      alert("성공적으로 예약을 취소시켰습니다.")
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <Wrapper>
      <RooftopInfoBox>
        <RooftopTitle>
          <h5>{`${city} ${district} ${detail}`}</h5>
        </RooftopTitle>
        <RooftopDetail>
          <div className="detail-list">
            <DetailInfo>
              <FontAwesomeIcon icon={faStar} />
              <span>{Number(grade).toFixed(1)} / 5.0</span>
            </DetailInfo>
            <DetailInfo>
              <FontAwesomeIcon icon={faMap} />
              <span>
                {`${width.toLocaleString()} m`}
                <sup style={{ fontSize: "0.5rem" }}>2</sup>
              </span>
            </DetailInfo>
            <DetailInfo>
              <FontAwesomeIcon icon={faUser} />
              <span>
                {`성인 ${adultCount}명, ${
                  kidCount === 0 ? "노 키즈 존" : `유아 ${kidCount}명`
                }, 반려동물 ${petCount === 0 ? "금지" : `${petCount}마리`}`}
              </span>
            </DetailInfo>
          </div>
        </RooftopDetail>
      </RooftopInfoBox>
      <SliderBox>
        {mainImage && (
          <Slider {...SlickSettings}>
            <div key={mainImage.uploadFilename}>
              <img src={mainImage.fileUrl} alt="Img" />
            </div>
            {rooftopImages &&
              rooftopImages
                .filter(({ uploadFilename }) => uploadFilename !== mainImage.uploadFilename)
                .map(({ fileUrl, uploadFilename }) => (
                  <div key={uploadFilename}>
                    <img src={fileUrl} alt="Img" />
                  </div>
                ))}
          </Slider>
        )}
      </SliderBox>
      <InformationBox>
        <h5>옥상 소개</h5>
        <pre>{explainContent}</pre>
      </InformationBox>
      <InformationBox>
        <h5>옥상 시설 목록</h5>
        <DetailOptionList>
          {detailNums &&
            RoofTopFacilities.map((elm, idx) => {
              if (detailNums.includes(idx))
                return (
                  <div key={idx} className="option">
                    <span>{elm}</span>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </div>
                )
              return null
            })}
        </DetailOptionList>
      </InformationBox>
      <InformationBox>
        <h5>환불 안내</h5>
        <pre>{refundContent}</pre>
      </InformationBox>
      <InformationBox>
        <h5>이용 규칙 안내</h5>
        <pre>{roleContent}</pre>
      </InformationBox>
      <InformationBox>
        <h5>옥상 배치도</h5>
        {structureImage && (
          <img src={structureImage.fileUrl} alt="Img" key={structureImage.uploadFilename} />
        )}
      </InformationBox>
      <CalenderBox>
        <Title>
          <h5>옥상 예약 일정</h5>
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
      <ScheduleBox>
        {reservationId ? (
          <>
            <ScheduleDetail>
              <p>
                <FontAwesomeIcon icon={faCalendar} size="lg" />
                예약일자
              </p>
              <strong>{`${startDates[0]}.${startDates[1]}.${startDates[2]} - ${endDates[0]}.${endDates[1]}.${endDates[2]}`}</strong>
            </ScheduleDetail>
            <ScheduleDetail>
              <p>
                <FontAwesomeIcon icon={faClock} size="lg" />
                예약시간
              </p>
              <strong>{`${String(startTimes[0]).padStart(2, "0")}:00 ~ ${String(
                endTimes[0],
              ).padStart(2, "0")}:00`}</strong>
            </ScheduleDetail>
            <ScheduleDetail>
              <p>
                <FontAwesomeIcon icon={faReceipt} size="lg" />
                TID (예약 넘버)
              </p>
              <strong>{`${tid}`}</strong>
            </ScheduleDetail>
            <ScheduleBtn onClick={() => cancelReservation(reservationId)}>
              <FontAwesomeIcon icon={faBan} /> 예약 일정 취소
            </ScheduleBtn>
          </>
        ) : (
          <NoticeEmptyIcon>
            <FontAwesomeIcon icon={faBook} />
            <h5>예약 정보 없음</h5>
            <p>해당 일자에 옥상을 예약한 이용자가 없습니다.</p>
          </NoticeEmptyIcon>
        )}
      </ScheduleBox>
      {rooftopReviews && rooftopReviews.length > 0 && (
        <InformationBox>
          <h5>시설 리뷰</h5>
          {rooftopReviews.map(({ content, createTime, grade }) => (
            <ReviewBox key={content}>
              <div className="content">
                <p className="grade">
                  <FontAwesomeIcon icon={faStar} /> {`${parseInt(grade).toFixed(1)} / 5.0`}
                </p>
                <pre> {content}</pre>
              </div>
              <p>{`${createTime[0]}년 ${createTime[1]}월 ${createTime[2]}일`}</p>
            </ReviewBox>
          ))}
        </InformationBox>
      )}
      <ServiceList>
        <Title>
          <h5>옥상 관리하기</h5>
        </Title>
        <ServiceBox onClick={() => openModal(<ChatRooftopList rooftopId={id} ownerId={ownerId} />)}>
          <div className="introduce">
            <h5>옥상 문의 확인하기</h5>
            <p>이용자에게서 온 옥상 문의를 확인합니다.</p>
          </div>
          <FontAwesomeIcon icon={faAngleRight} />
        </ServiceBox>
        <ServiceBox>
          <div className="introduce">
            <h5>수수료 재산정 신청하기</h5>
            <p>재산정의 경우, 옥상지기측에서 재산정 요청시 진행됩니다.</p>
          </div>
          <FontAwesomeIcon icon={faAngleRight} />
        </ServiceBox>
        <ServiceBox>
          <div className="introduce">
            <h5>조경 업체 확인하기</h5>
            <p>서울특별시 동구 테스트 주소 어쩌구</p>
          </div>
          <FontAwesomeIcon icon={faAngleRight} />
        </ServiceBox>
      </ServiceList>
      <Button>
        <Link to={`/mypage/rooftop/supervise/detail/${id}`}>내 옥상 수정하기</Link>
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 50vw;
  margin: 7.5vh auto;
  padding: 1rem;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const RooftopInfoBox = styled.div`
  width: 100%;
  margin: 5vh auto 3.5vh auto;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: left;
`

const CalenderBox = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      margin: ${margins.lg} 0vw ${margins.sm} 0vw;
    `
  }}
`

const ScheduleBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      margin: ${margins.base} 0vw;

      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;

      p {
        color: ${colors.black.quinary};
        font-weight: ${fonts.weight.light};
      }

      h5 {
        width: 100%;
        margin: 0 0 ${margins.xsm} 0;

        color: ${colors.main.secondary};
        font-size: ${fonts.size.base};
      }

      strong {
        font-weight: 600;
        color: ${colors.main.secondary};
      }
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

const SliderBox = styled.div`
  margin: 0vw auto 5vh auto;
  width: 40vw;

  img {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`

const Button = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 90%;
      padding: ${paddings.sm} ${paddings.base};
      margin: 0vw auto;

      cursor: pointer;
      border-radius: ${fonts.size.sm};
      background-color: ${props =>
        props.type === "fee" ? colors.main.tertiary : colors.main.primary};

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

const DetailOptionList = styled.div`
  ${({ theme }) => {
    const { fonts, paddings, margins } = theme
    return css`
      width: 100%;
      padding: ${paddings.base};
      margin: auto;

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .option {
        width: 30%;
        margin: ${margins.sm} 0vw;

        display: flex;
        justify-content: space-between;

        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: left;
      }
    `
  }}
`

const ScheduleDetail = styled.div`
  ${({ theme }) => {
    const { colors, paddings, margins } = theme
    return css`
      display: flex;
      justify-content: space-between;
      padding: ${paddings.sm};
      color: ${colors.black.secondary};

      svg {
        color: ${colors.main.primary};
        margin: auto ${margins.base} auto 0vw;
      }
    `
  }}
`

const ReviewBox = styled.div`
  ${({ theme }) => {
    const { colors, paddings, margins } = theme
    return css`
      width: 100%;
      margin: ${margins.base} 0vw 0vw 0vw;

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      svg {
        margin: auto ${margins.xsm} auto 0vw;
        color: ${colors.white};
      }

      .content {
        display: flex;
        width: 70%;
      }

      .grade {
        margin-right: ${margins.sm};
        padding: ${paddings.xsm} ${paddings.sm};

        background-color: ${colors.main.tertiary};
        border-radius: 2rem;
        color: ${colors.white};

        font-weight: 500;
      }

      pre {
        padding: ${paddings.xsm} 0vw;
        color: ${colors.black.tertiary};
        font-weight: 300;
      }

      p {
        padding: ${paddings.xsm} 0vw;
      }
    `
  }}
`

export default SuperviseRooftop
