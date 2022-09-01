import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled, { css } from "styled-components"

import { KakaoPayControl } from "api/KakaoPay"

const Payment = () => {
  const { rooftopId } = useParams()
  const navigate = useNavigate()
  const [paymentInfo, setPaymentInfo] = useState({
    userId: "",
    phoneNumber: "",
    reservationDate: [],
    adultCount: 0,
    kidCount: 0,
    petCount: 0,
    optionContent: [],
    optionPrice: [],
    optionCount: [],
    totalPrice: 0,
  })

  const readyToSetPayment = async () => {
    try {
      const { next_redirect_pc_url, tid, created_at } = await KakaoPayControl.postRequestToPay(
        rooftopId,
      )
      window.location.href = next_redirect_pc_url
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Wrapper>
      <UserInfo>
        <h5>예약자 정보</h5>
        <p>예약자의 정보를 안내합니다.</p>
        <BasicInformation>
          <div className="option-list">
            <p>예약자 성명 :</p>
            <p>예약자 휴대번호 :</p>
          </div>
          <div className="value-list">
            <p>{`백광인`}</p>
            <p>{`010-7167-0851`}</p>
          </div>
        </BasicInformation>
      </UserInfo>
      <ReservationInfo>
        <h5>예약 안내</h5>
        <p>옥상 시설 예약 정보를 안내합니다.</p>
        <BasicInformation>
          <div className="option-list">
            <p>예약 일자 :</p>
            <p>예약 시간 :</p>
            <p>예약 인원 :</p>
          </div>
          <div className="value-list">
            <p>{`7:26 ~ 7:28`}</p>
            <p>{`AM 11:00 ~ PM 8:00`}</p>
            <p>{`성인 1명, 유아 0명, 반려동물 0명`}</p>
          </div>
        </BasicInformation>
      </ReservationInfo>
      <OptionInfo>
        <h5>추가 옵션 안내</h5>
        <p>추가하실 옵션 정보를 안내합니다.</p>
        <BasicInformation>
          <div className="option-list">
            <p>바베큐 장비</p>
            <p>야외 무대 시설</p>
            <p>침구류 추가</p>
          </div>
          <div className="value-list">
            <p>KRW {`15,000`}</p>
            <p>KRW {`125,000`}</p>
            <p>KRW {`5,000`}</p>
          </div>
        </BasicInformation>
      </OptionInfo>
      <PaymentConfirm>
        <h5>최종 예약 결제</h5>
        <p>추가하실 옵션 정보를 안내합니다.</p>
        <BasicInformation>
          <div className="option-list">
            <p>시설 대여</p>
            <p>야외 무대 시설</p>
            <p>침구류 추가</p>
            <p>최종 금액</p>
          </div>
          <div className="value-list">
            <p>KRW {`275,000 (KRW 75,000 * 3)`}</p>
            <p>KRW {`125,000`}</p>
            <p>KRW {`15,000 (KRW 5,000 * 3)`}</p>
            <p>KRW {`415,000`}</p>
          </div>
        </BasicInformation>
        <ConfirmBtn onClick={readyToSetPayment}>결제하기</ConfirmBtn>
      </PaymentConfirm>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 60vw;
  max-height: 80vh;
  margin: auto;

  display: grid;
  grid-template-rows: repeat(5, 1fr);
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
      grid-row: 2 / 4;

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
  grid-row: 4 / 6;
`

const PaymentConfirm = styled(ReservationInfo)`
  grid-column: 3 / 5;
  grid-row: 1 / 6;
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
