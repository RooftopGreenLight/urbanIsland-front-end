import styled, { css } from "styled-components"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook } from "@fortawesome/free-solid-svg-icons"

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
      } catch (err) {
        console.log(err.message)
      }
    }
    cancelPayment()
  }, [])
  return (
    <Wrapper>
      <NoticeSuccess>
        <FontAwesomeIcon icon={faBook} />
        <h5>옥상 예약 실패</h5>
        <p>결제 과정에서 문제가 발생하였습니다.</p>
        <HomeBtn onClick={() => navigate(`/reservation/${rooftopId}`)}>
          예약 페이지로 돌아가기
        </HomeBtn>
      </NoticeSuccess>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`

const NoticeSuccess = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      margin: auto;

      color: ${colors.main.primary};
      text-align: center;

      h5 {
        font-size: ${fonts.size.xl};
        margin-bottom: ${margins.sm};
      }

      p {
        font-size: ${fonts.size.sm};
        font-weight: 100;
      }

      svg {
        width: 5vw;
        height: 5vw;

        margin-bottom: ${margins.lg};
        padding: ${paddings.xl};

        background-color: ${colors.main.secondary};
        border-radius: 20vw;

        color: ${colors.white};
      }
    `
  }}
`

const HomeBtn = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 20vw;
      padding: ${paddings.sm} ${paddings.lg};
      margin: ${margins.lg} auto;

      border-radius: 5rem;
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

export default PaymentFailure
