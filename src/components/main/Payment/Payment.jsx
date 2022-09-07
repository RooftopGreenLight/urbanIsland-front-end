import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import styled, { css } from "styled-components"
import moment from "moment/moment"

import { KakaoPayControl } from "api/KakaoPay"
import { faMap, faShare, faStar, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Payment = () => {
  const { rooftopId } = useParams()
  const location = useLocation()
  const [paymentInfo, setPaymentInfo] = useState({
    userId: "",
    phoneNumber: "",
    selectedDate: [],
    selectedTime: [],
    adultCount: 0,
    kidCount: 0,
    petCount: 0,
    optionContent: [],
    optionPrice: [],
    optionCount: [],
    totalPrice: 0,
  })

  const {
    adultCount,
    kidCount,
    petCount,
    selectedTime,
    selectedDate,
    optionContent,
    optionPrice,
    optionCount,
    totalPrice,
  } = paymentInfo

  const { address, width, grade } = location.state

  useEffect(() => {
    console.log(location)
    setPaymentInfo(prevInfo => ({ ...prevInfo, ...location.state.reservationData }))
  }, [])

  const totalUseDay = moment(selectedDate[1]).diff(moment(selectedDate[0]), "days") + 1
  const needToPay =
    totalPrice * totalUseDay +
    optionCount.reduce((sum, count, idx) => (sum += count * optionPrice[idx]), 0)

  const readyToSetPayment = async () => {
    try {
      const { next_redirect_pc_url, tid } = await KakaoPayControl.postRequestToPay(
        rooftopId,
        needToPay,
        location.state.address,
      )
      window.location.href = next_redirect_pc_url
      localStorage.setItem("tid", tid)
      localStorage.setItem("payment_information", JSON.stringify(paymentInfo))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Wrapper>
      <RooftopInfoBox>
        <RooftopTitle>
          <h5>{`${address}`}</h5>
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
        </RooftopDetail>
      </RooftopInfoBox>
      <ReservationInfoBox>
        <ReservationInfo>
          <div className="title">
            <h5>예약자 정보</h5>
            <p>예약자의 정보를 안내합니다.</p>
          </div>
          <OptionBox>
            <div className="option-list">
              <span>예약자 성함 : </span>
              <p>백광인</p>
            </div>
            <div className="option-list">
              <span>예약자 전화번호 : </span>
              <p>010 - 7167 - 0851</p>
            </div>
          </OptionBox>
        </ReservationInfo>
        <ReservationInfo>
          <div className="title">
            <h5>예약 안내</h5>
            <p>옥상 시설 예약 정보를 안내합니다.</p>
          </div>
          <OptionBox>
            <div className="option-list">
              <span>인원 : </span>
              <p>
                {adultCount > 0
                  ? kidCount > 0
                    ? `어른 ${adultCount}명, 유아 ${kidCount}명`
                    : `어른 ${adultCount}명`
                  : "인원 미선택"}
              </p>
            </div>
            <div className="option-list">
              <span>이용 일자 : </span>
              <p>{`${moment(selectedDate[0]).format("YYYY.MM.DD")} - ${moment(
                selectedDate[1],
              ).format("YYYY.MM.DD")}`}</p>
            </div>
            <div className="option-list">
              <span>이용 시간 : </span>
              <p>{`${String(selectedTime[0]).padStart(2, "0")}:00 - ${String(
                selectedTime[1],
              ).padStart(2, "0")}:00`}</p>
            </div>
          </OptionBox>
        </ReservationInfo>
        <ReservationInfo>
          <div className="title">
            <h5>결제 금액 안내</h5>
            <p>결제하실 금액 목록을 안내합니다.</p>
          </div>
          <OptionBox>
            <div className="option-list">
              <span>시설 대여 비용 :</span>
              <p>{`${totalPrice.toLocaleString()} KRW × ${totalUseDay}일`}</p>
            </div>
            {optionCount
              .filter(count => count > 0)
              .map((count, idx) => (
                <div className="option-list">
                  <span>{`${optionContent[idx]} :`}</span>
                  <p>{`${(count * optionPrice[idx]).toLocaleString()} KRW`}</p>
                </div>
              ))}
          </OptionBox>
        </ReservationInfo>
      </ReservationInfoBox>
      <PaymentConfirm>
        <OptionBox>
          <h5>최종 결제 내역</h5>
          <div className="option-list">
            <span>{`${totalUseDay}일 대여 :`}</span>
            <p>{(totalPrice * totalUseDay).toLocaleString()} KRW</p>
          </div>
          {optionCount
            .filter(count => count > 0)
            .map((count, idx) => (
              <div className="option-list">
                <span>{`${optionContent[idx]} :`}</span>
                <p>{`${(count * optionPrice[idx]).toLocaleString()} KRW`}</p>
              </div>
            ))}
          <div className="option-list">
            <span>총 합계 : </span>
            <strong>
              {needToPay.toLocaleString()}
              KRW
            </strong>
          </div>
          <ConfirmBtn onClick={readyToSetPayment}>결제하기</ConfirmBtn>
        </OptionBox>
      </PaymentConfirm>
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

const ReservationInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

const ReservationInfo = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 32.5vw;
      padding: ${paddings.sm} 0vw;
      margin: ${margins.sm} 0vw auto 0vw;

      display: flex;
      flex-direction: column;
      flex-wrap: wrap;

      .title {
        border-bottom: 1px solid ${colors.main.primary}55;
        p {
          margin: ${margins.xsm} 0vw ${margins.sm} 0vw;
        }
      }

      p {
        color: ${colors.black.quinary};
        font-weight: ${fonts.weight.light};
      }

      h5 {
        width: 100%;
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

const PaymentConfirm = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
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
        content: "최종 결제 내역";

        color: ${colors.white};
        font-size: ${fonts.size.base};
        text-align: center;
        line-height: 225%;
      }
    `
  }}
`

const OptionBox = styled.div`
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

const ConfirmBtn = styled.button`
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

export default Payment
