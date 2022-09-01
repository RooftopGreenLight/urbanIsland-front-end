import { Route, Routes } from "react-router-dom"

import BaseTemplate from "components/template/BaseTemplate"
import Reservation from "components/main/Reservation/Reservation"
import ReservationDetail from "components/main/Reservation/ReservationDetail"
import Payment from "components/main/Payment/Payment"

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
      <Route path=":rooftopId/success" element={<Payment />} />
      <Route path=":rooftopId/fail" element={<Payment />} />
      <Route path=":rooftopId/cancel" element={<Payment />} />
    </Routes>
  )
}
