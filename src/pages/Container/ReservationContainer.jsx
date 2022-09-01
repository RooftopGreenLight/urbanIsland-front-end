import { Route, Routes } from "react-router-dom"

import BaseTemplate from "components/template/BaseTemplate"
import Reservation from "components/main/Reservation/Reservation"
import ReservationDetail from "components/main/Reservation/ReservationDetail"

export const ReservationContainer = () => {
  return (
    <BaseTemplate>
      <Routes>
        <Route path="" element={<Reservation />} />
        <Route path=":id" element={<ReservationDetail />} />
      </Routes>
    </BaseTemplate>
  )
}
