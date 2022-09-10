import { Route, Routes } from "react-router-dom"

import BaseTemplate from "components/template/BaseTemplate"
import Reservation from "components/main/Reservation/Reservation"
import ReservationDetail from "components/main/Reservation/ReservationDetail"
import NotFound from "components/common/Modal/NotFound"

export const ReservationContainer = () => {
  return (
    <BaseTemplate>
      <Routes>
        <Route path="" element={<Reservation />} />
        <Route path="not_exist" element={<NotFound />} />
        <Route path=":rooftopId" element={<ReservationDetail />} />
      </Routes>
    </BaseTemplate>
  )
}
