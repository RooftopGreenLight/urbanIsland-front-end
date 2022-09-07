import styled, { css } from "styled-components"

import { useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"

import { KakaoPayControl } from "api/KakaoPay"
import { reservationControl } from "api/controls/reservationControl"

const PaymentSuccess = () => {
  const { rooftopId } = useParams()
  const [searchParam] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const approvePayment = async () => {
      const pg_token = searchParam.get("pg_token")
      const reservationId = localStorage.getItem("reservationId")
      try {
        const { tid } = await reservationControl.getReservationInfoById(reservationId)
        await KakaoPayControl.postApprovePayment(tid, pg_token)
        await reservationControl.postChangeReservationStatus(reservationId, "PAYMENT_COMPLETED")
        localStorage.removeItem("reservationId")
        navigate("/mypage/profile")
      } catch (err) {
        console.log(err.message)
      }
    }
    setTimeout(() => approvePayment(), 1000)
  }, [])

  return (
    <Wrapper>
      <h5>결제 성공 테스트 페이지 {`옥상 넘버 : ${rooftopId} 번`}</h5>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 60vw;
  max-height: 80vh;
  margin: auto;
`

export default PaymentSuccess
