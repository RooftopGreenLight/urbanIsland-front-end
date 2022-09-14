import { useNavigate, useParams, useLocation } from "react-router-dom"
import { useState, useEffect, useMemo } from "react"
import styled, { css } from "styled-components"
import moment from "moment"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faStar,
  faUser,
  faMap,
  faShare,
  faCircleCheck,
  faComment,
} from "@fortawesome/free-solid-svg-icons"

import { useContext } from "react"
import { ModalContext } from "module/Modal"
import DateUtil from "util/DateUtil"

import { roofTopControl } from "api/controls/roofTopControl"
import { chattingControl } from "api/controls/chattingControl"

import { RoofTopFacilities } from "constants/RoofTopFacilities"
import ReservationModal from "./Modals/ReservationModal"
import ChatModal from "../Chat/ChatModal"

const ReservationDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { rooftopId } = useParams()

  const { openModal } = useContext(ModalContext)
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
    bookedDate: new Set(),
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

  const [reservationData, setReservationData] = useState({
    selectedDate: [new Date(), new Date()],
    selectedTime: [0, 23],
    adultCount: 1,
    kidCount: 0,
    petCount: 0,
    totalPrice: 0,
    optionContent: [],
    optionPrice: [],
    optionCount: [],
  })

  const {
    city,
    district,
    detail,
    startTime,
    endTime,
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
    totalPrice,
    rooftopOptions,
    rooftopReviews,
    bookedDate,
    ownerId,
  } = rooftopData

  const { selectedDate, selectedTime, optionContent, optionPrice, optionCount } = reservationData
  const totalUseDay = moment(selectedDate[1]).diff(moment(selectedDate[0]), "days") + 1

  useEffect(() => {
    const loadRooftopData = async () => {
      try {
        const result = await roofTopControl.getRooftopDetail(rooftopId)
        console.log(result)
        const { startTime, endTime, rooftopOptions, reservations, totalPrice } = result

        // 이미 예약된 일자인 bookedDate를 Set에 하나씩 저장하는 과정.
        let bookedDate = new Set()
        if (reservations && reservations.length > 0) {
          reservations.forEach(bookingInfo => {
            const { startDates, endDates } = bookingInfo
            const betweenDates = DateUtil.getDatesBetweenTwoDates(
              DateUtil.createDate(startDates),
              DateUtil.createDate(endDates),
            )
            bookedDate = new Set([...bookedDate, ...betweenDates.map(date => date.toDateString())])
          })
        }

        setRooftopData({ ...result, startTime: startTime[0], endTime: endTime[0], bookedDate })
        // rooftopOptions 이 존재할 경우, 이를 분해하여 option Array로 저장시킴.
        if (rooftopOptions && rooftopOptions.length > 0) {
          setReservationData(prevData => ({
            ...prevData,
            optionContent: rooftopOptions.map(({ content }) => content),
            optionPrice: rooftopOptions.map(({ price }) => price),
            optionCount: [...Array(rooftopOptions.length).fill(0)],
          }))
        }
        setReservationData(prevData => ({
          ...prevData,
          totalPrice: totalPrice,
          selectedTime: [
            Math.max(startTime[0], prevData.selectedTime[0]),
            Math.min(endTime[0], prevData.selectedTime[1]),
          ],
        }))
      } catch (err) {
        console.log(err.message)
        navigate("/reservation/not_exist")
      }
    }
    setReservationData(prevData => ({ ...prevData, ...location.state }))
    loadRooftopData()
  }, [])

  const copyUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const sendRequestMessage = async () => {
    try {
      console.log(ownerId)
      const roomId = await chattingControl.getCheckRequestChatExist(rooftopId, ownerId)
      if (roomId) {
        openModal(<ChatModal roomId={roomId} />)
      }
    } catch (err) {
      console.error(err.message)
    }
  }

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
          <div className="btn-list">
            <CopyBtn onClick={sendRequestMessage}>
              <FontAwesomeIcon icon={faComment} /> 문의하기
            </CopyBtn>
            <CopyBtn onClick={copyUrl}>
              <FontAwesomeIcon icon={faShare} /> 공유하기
            </CopyBtn>
          </div>
        </RooftopDetail>
      </RooftopInfoBox>
      <ReservationInfoBox>
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
      </ReservationInfoBox>
      <PaymentInfoBox>
        <PaymentOptionBox>
          <h5>예약 설정</h5>
          <div className="option-list">
            <span>인원 : </span>
            <p>
              {reservationData.adultCount > 0
                ? reservationData.kidCount > 0
                  ? `어른 ${reservationData.adultCount}명, 유아 ${reservationData.kidCount}명`
                  : `어른 ${reservationData.adultCount}명`
                : "인원 미선택"}
            </p>
          </div>
          <div className="option-list">
            <span>이용 일자 : </span>
            <p>{`${DateUtil.getDateFormat(selectedDate[0])} - ${DateUtil.getDateFormat(
              selectedDate[1],
            )}`}</p>
          </div>
          <div className="option-list">
            <span>이용 시간 : </span>
            <p>{`${String(selectedTime[0]).padStart(2, "0")}:00 - ${String(
              selectedTime[1],
            ).padStart(2, "0")}:00`}</p>
          </div>
          <ReservationBtn
            onClick={() =>
              openModal(
                <ReservationModal
                  limitTime={{ startTime, endTime }}
                  limitCount={{ adultCount, kidCount, petCount }}
                  bookedDate={bookedDate}
                  rooftopOptions={rooftopOptions}
                  reservationData={reservationData}
                  setReservationData={setReservationData}
                />,
              )
            }>
            수정 하기
          </ReservationBtn>
        </PaymentOptionBox>
        <PaymentOptionBox>
          <h5>결제 항목</h5>
          <div className="option-list">
            <span>{`${totalUseDay}일 대여 :`}</span>
            <p>{(totalPrice * totalUseDay).toLocaleString()} KRW</p>
          </div>
          {optionCount.map((count, idx) => {
            if (count > 0) {
              return (
                <div className="option-list">
                  <span>{optionContent[idx]} : </span>
                  <p>{`${(optionPrice[idx] * count).toLocaleString()} KRW`}</p>
                </div>
              )
            }
            return null
          })}
          <div className="option-list">
            <span>총 합계 : </span>
            <strong>
              {`${(
                totalPrice * totalUseDay +
                optionCount.reduce((sum, count, idx) => (sum += count * optionPrice[idx]), 0)
              ).toLocaleString()} KRW`}
            </strong>
          </div>
          <ReservationBtn
            onClick={() =>
              navigate(`/payment/${rooftopId}`, {
                state: {
                  reservationData: { ...reservationData },
                  limitTime: { startTime, endTime },
                  limitCount: { adultCount, kidCount, petCount },
                  bookedDate,
                  rooftopOptions,
                  address: `${city} ${district} ${detail}`,
                  grade,
                  width,
                },
              })
            }>
            예약 하기
          </ReservationBtn>
        </PaymentOptionBox>
      </PaymentInfoBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 60vw;

  display: flex;
  margin: 0vw auto 10vh auto;

  flex-wrap: wrap;
  justify-content: space-between;
`

const RooftopInfoBox = styled.div`
  width: 60vw;
  margin: 5vh auto 3.5vh auto;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: left;
`

const RooftopTitle = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 100%;
      margin-bottom: ${margins.sm};

      h5 {
        color: ${colors.main.primary};
        font-size: ${fonts.size.lg};
        font-weight: ${fonts.weight.bold};
      }
    `
  }}
`

const RooftopDetail = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 100%;
      margin-bottom: ${margins.sm};

      display: flex;
      justify-content: space-between;

      h5 {
        color: ${colors.main.primary};
        font-size: ${fonts.size.lg};
        font-weight: ${fonts.weight.bold};
      }

      .detail-list {
        width: 32.5vw;

        display: flex;
        justify-content: space-between;
      }

      .btn-list {
        width: 14.5vw;
        display: flex;
        justify-content: space-between;
      }
    `
  }}
`

const DetailInfo = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      color: ${colors.main.secondary};
      font-weight: ${fonts.weight.light};

      svg {
        margin-right: ${margins.sm};
        color: ${colors.main.tertiary};
        font-size: ${fonts.size.xsm};
        font-weight: bold;
      }
    `
  }}
`

const CopyBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      padding: ${paddings.sm} ${paddings.base};

      border-radius: 0.25rem;
      box-shadow: 0px 3px 0px ${colors.main.primary};
      background-color: ${colors.main.tertiary};

      color: ${colors.white};
      font-size: ${fonts.size.xsm};
      font-weight: ${fonts.weight.light};

      svg {
        margin-right: ${margins.xsm};
      }

      &:hover {
        transform: translateY(2px);
        box-shadow: 0px 1px 0px ${colors.main.primary};
      }
    `
  }}
`

const ReservationInfoBox = styled.div`
  width: 35vw;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const SliderBox = styled.div`
  margin: 0vw auto 7.5vh auto;
  width: 100%;

  img {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`

const InformationBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      padding: ${paddings.sm} 0vw;
      margin: ${margins.sm} 0vw;

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      p {
        color: ${colors.black.quinary};
        font-weight: ${fonts.weight.light};
      }

      h5 {
        width: 100%;
        padding-bottom: ${paddings.xsm};
        border-bottom: 1px solid ${colors.main.primary}55;

        color: ${colors.main.secondary};
        font-size: ${fonts.size.base};
      }

      svg {
        margin: auto 0vw;
        color: ${colors.main.primary};
      }

      pre {
        padding: ${paddings.base} 0vw;
        color: ${colors.black.quinary};
        font-weight: ${fonts.weight.light};
      }

      img {
        width: 100%;
        height: 40vh;
        object-fit: cover;
        margin: ${margins.lg} auto 0vw auto;
      }
    `
  }}
`

const ReviewBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
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

const DetailOptionList = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
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

const PaymentInfoBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts } = theme
    return css`
      width: 22.5vw;
      margin-bottom: auto;

      display: flex;
      flex-direction: column;
      align-items: center;

      border: 1px solid ${colors.main.primary}33;
      box-shadow: 0px 5px 8px ${colors.main.primary}33;

      &::before {
        width: 100%;
        padding: 0vw;

        background-color: ${colors.main.tertiary};
        content: "예약 결제 정보";

        color: ${colors.white};
        font-size: ${fonts.size.base};
        text-align: center;
        line-height: 225%;
      }
    `
  }}
`

const PaymentOptionBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      padding: ${paddings.base} ${paddings.lg};
      margin: ${margins.sm} 0vw;

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      h5 {
        width: 100%;
        padding-bottom: ${paddings.xsm};
        margin-bottom: ${margins.base};
        border-bottom: 1px solid ${colors.main.primary}55;

        color: ${colors.main.secondary};
        font-size: ${fonts.size.sm};
      }

      p {
        color: ${colors.black.tertiary};
        font-size: 1.1rem;
        font-weight: 500;
      }

      span {
        color: ${colors.black.quinary};
        font-size: 1.1rem;
        font-weight: 300;
      }

      strong {
        color: ${colors.main.secondary};
        font-size: 1.1rem;
      }

      .option-list {
        width: 100%;
        margin: ${margins.xsm} 0vw;
        display: flex;
        justify-content: space-between;
      }
    `
  }}
`

const ReservationBtn = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      padding: ${paddings.sm} ${paddings.lg};
      margin: ${margins.lg} 0vw 0vw 0vw;

      border-radius: 0.75rem;
      background: ${colors.main.secondary};
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      color: ${colors.white};
      font-size: ${fonts.size.sm};
      font-weight: bold;

      &:hover {
        border: 0px;
        background: ${colors.main.tertiary};
        color: ${colors.white};
      }
    `
  }}
`

export default ReservationDetail
