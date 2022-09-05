import { Route, Routes } from "react-router-dom"

import Payment from "components/main/Payment/Payment"
import PaymentSuccess from "components/main/Payment/PaymentSuccess"
import PaymentFailure from "components/main/Payment/PaymentFailure"
import BaseTemplate from "components/template/BaseTemplate"

export const PaymentContainer = () => {
  return (
    <BaseTemplate>
      <Routes>
        <Route path=":rooftopId" element={<Payment />} />
        <Route path=":rooftopId/success" element={<PaymentSuccess />} />
        <Route path=":rooftopId/fail" element={<PaymentFailure />} />
        <Route path=":rooftopId/cancel" element={<PaymentFailure />} />
      </Routes>
    </BaseTemplate>
  )
}
