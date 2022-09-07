import { useNavigate, useParams, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import moment from "moment"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faUser, faMap, faShare, faCircleCheck } from "@fortawesome/free-solid-svg-icons"

import { useContext } from "react"
import { ModalContext } from "module/Modal"

import { roofTopControl } from "api/controls/roofTopControl"
import { RoofTopFacilities } from "constants/RoofTopFacilities"
import ReservationModal from "./Modals/ReservationModal"

const ReservationDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  const { openModal } = useContext(ModalContext)
  const [rooftopData, setRooftopData] = useState({
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
  } = rooftopData

  const { selectedDate, selectedTime, optionContent, optionPrice, optionCount } = reservationData
  const totalUseDay = moment(selectedDate[1]).diff(moment(selectedDate[0]), "days") + 1

  useEffect(() => {
    const loadRooftopData = async () => {
      try {
        const result = await roofTopControl.getRooftopDetail(id)
        const { startTime, endTime, rooftopOptions } = result
        setRooftopData({ ...result, startTime: startTime[0], endTime: endTime[0] })
        // rooftopOptions 이 존재할 경우, 이를 분해하여 option Array로 저장시킴.
        if (rooftopOptions && rooftopOptions.length > 0) {
          setReservationData(prevData => ({
            ...prevData,
            optionContent: rooftopOptions.map(({ content }) => content),
            optionPrice: rooftopOptions.map(({ price }) => price),
            optionCount: [...Array(rooftopOptions.length).fill(0)],
          }))
        }
      } catch (err) {
        console.log(err.message)
      }
    }
    setReservationData(prevData => ({ ...prevData, ...location.state }))
    loadRooftopData()
  }, [])

  console.log(reservationData)

  const copyUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const SlickSettings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
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
              <span>{parseInt(grade).toFixed(1)} / 5.0</span>
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
          <CopyBtn onClick={copyUrl}>
            <FontAwesomeIcon icon={faShare} /> 공유하기
          </CopyBtn>
        </RooftopDetail>
      </RooftopInfoBox>
      <ReservationInfoBox>
        <SliderBox>
          {mainImage !== null && (
            <Slider {...SlickSettings}>
              <div>
                <img src={mainImage.fileUrl} alt="Img" key={mainImage.uploadFilename} />
              </div>
              {rooftopImages &&
                rooftopImages.map(({ fileUrl, uploadFilename }) => (
                  <div>
                    <img src={fileUrl} alt="Img" key={uploadFilename} />
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
            <p>{`${moment(selectedDate[0]).format("YYYY.MM.DD")} - ${moment(selectedDate[1]).format(
              "YYYY.MM.DD",
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
              {(
                totalPrice * totalUseDay +
                optionCount.reduce((sum, count, idx) => (sum += count * optionPrice[idx]), 0)
              ).toLocaleString()}
              KRW
            </strong>
          </div>
          <ReservationBtn
            onClick={() =>
              navigate(`/payment/${id}`, {
                state: {
                  reservationData: { ...reservationData },
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
  max-height: 100vh;
  overflow: auto;

  display: flex;
  margin: 0vw auto 10vh auto;

  flex-wrap: wrap;
  justify-content: space-between;

  ::-webkit-scrollbar {
    display: none;
  }
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
