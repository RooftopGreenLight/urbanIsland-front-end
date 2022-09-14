import { Routes, Route } from "react-router-dom"

import Home from "components/main/Home/Home"
import Information from "components/main/Home/Information/Information"
import MainpageTemplate from "components/template/MainpageTemplate"

export const HomeContainer = () => {
  return (
    <MainpageTemplate>
      <Routes>
        <Route path="" element={<Information />} />
      </Routes>
    </MainpageTemplate>
  )
}
