import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled, { css } from "styled-components"

import { reservationControl } from "api/controls/reservationControl"

const PaymentFailure = () => {
  const { rooftopId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const cancelPayment = async () => {
      const reservationId = localStorage.getItem("reservationId")
      try {
        await reservationControl.deleteCancelReservation(reservationId)
        localStorage.removeItem("reservationId")
        navigate("/reservation")
      } catch (err) {
        console.log(err.message)
      }
    }
    cancelPayment()
  }, [])
  return (
    <Wrapper>
      <h5>결제 실패 테스트 페이지 {rooftopId}</h5>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 60vw;
  max-height: 80vh;
  margin: auto;
`

export default PaymentFailure
