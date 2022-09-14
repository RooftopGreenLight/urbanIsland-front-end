import { Routes, Route } from "react-router-dom"

import Information from "components/main/Home/Information/Information"
import IntroService from "components/main/Home/ServiceInfo/IntroService"
import MainpageTemplate from "components/template/MainpageTemplate"

export const HomeContainer = () => {
  return (
    <MainpageTemplate>
      <Routes>
        <Route path="" element={<Information />} />
        <Route path="service" element={<IntroService />} />
      </Routes>
    </MainpageTemplate>
  )
}
