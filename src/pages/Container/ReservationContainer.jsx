import { Route, Routes } from "react-router-dom"

import BaseTemplate from "components/template/BaseTemplate"
import Reservation from "components/main/Reservation/Reservation"
import ReservationDetail from "components/main/Reservation/ReservationDetail"

import Payment from "components/main/Payment/Payment"
import PaymentSuccess from "components/main/Payment/PaymentSuccess"
import PaymentFailure from "components/main/Payment/PaymentFailure"

export const ReservationContainer = () => {
  return (
    <BaseTemplate>
      <Routes>
        <Route path="" element={<Reservation />} />
        <Route path=":id" element={<ReservationDetail />} />
        <Route path="payment/*" element={<PaymentContainer />} />
      </Routes>
    </BaseTemplate>
  )
}

const PaymentContainer = () => {
  return (
    <Routes>
      <Route path=":rooftopId" element={<Payment />} />
      <Route path=":rooftopId/success" element={<PaymentSuccess />} />
      <Route path=":rooftopId/fail" element={<PaymentFailure />} />
      <Route path=":rooftopId/cancel" element={<PaymentFailure />} />
    </Routes>
  )
}
