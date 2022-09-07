import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import styled, { css } from "styled-components"
import moment from "moment/moment"

import { KakaoPayControl } from "api/KakaoPay"

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
      <UserInfo>
        <h5>예약자 정보</h5>
        <p>예약자의 정보를 안내합니다.</p>
        <PaymentOptionBox></PaymentOptionBox>
      </UserInfo>
      <ReservationInfo>
        <h5>예약 안내</h5>
        <p>옥상 시설 예약 정보를 안내합니다.</p>
        <PaymentOptionBox>
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
        </PaymentOptionBox>
      </ReservationInfo>
      <OptionInfo>
        <h5>결제 금액 안내</h5>
        <p>결제하실 금액 목록을 안내합니다.</p>
        <PaymentOptionBox>
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
        </PaymentOptionBox>
      </OptionInfo>
      <PaymentConfirm>
        <h5>최종 예약 결제</h5>
        <p>추가하실 옵션 정보를 안내합니다.</p>
        <PaymentOptionBox>
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
        </PaymentOptionBox>
        <ConfirmBtn onClick={readyToSetPayment}>결제하기</ConfirmBtn>
      </PaymentConfirm>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 60vw;
  margin: 7.5vh auto;

  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
`
const ReservationInfo = styled.div`
  ${({ theme }) => {
    const { fonts, margins, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.base};

      background-color: #e8e8e8;
      grid-column: 1 / 3;
      grid-row: 2 / 3;

      h5 {
        font-size: ${fonts.size.base};
      }

      p,
      span {
        margin-bottom: ${margins.sm};
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }
    `
  }}
`

const UserInfo = styled(ReservationInfo)`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
`

const OptionInfo = styled(ReservationInfo)`
  grid-column: 1 / 3;
  grid-row: 3 / 4;
`

const PaymentConfirm = styled(ReservationInfo)`
  grid-column: 3 / 5;
  grid-row: 1 / 4;
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

const BasicInformation = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 100%;

      padding: ${paddings.sm};
      margin: 1vw auto;

      display: flex;
      justify-content: space-between;

      border: 1px solid #000000;
      background-color: ${colors.white};

      p {
        margin: 0;
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }

      .option-list {
        padding: ${paddings.sm};
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: ${paddings.base} 0px;

        p {
          font-weight: ${fonts.weight.bold};
        }
      }

      .value-list {
        padding: ${paddings.sm};
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: right;
      }
    `
  }}
`

const ConfirmBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 75%;
      padding: ${paddings.sm};
      margin: 0.75vw auto 0.25vw auto;

      background-color: ${colors.black.primary};
      border-radius: 2.5vw;
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      color: ${colors.white};
      font-weight: ${fonts.weight.light};
    `
  }}
`

export default Payment
