import { Route, Routes } from "react-router-dom"

import Reservation from "components/main/Reservation/Reservation"
import BaseTemplate from "components/template/BaseTemplate"

export const ReservationContainer = () => {
  return (
    <BaseTemplate>
      <Routes>
        <Route path="" element={<Reservation />} />
        <Route path=":id" element={<Reservation />} />
      </Routes>
    </BaseTemplate>
  )
}
