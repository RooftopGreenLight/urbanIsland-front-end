import { BrowserRouter, Routes, Route } from "react-router-dom"

import BaseTemplate from "components/template/BaseTemplate"
import { HomeContainer } from "pages/Container/HomeContainer"
import { LoginContainer } from "pages/Container/LoginContainer"

const MainPage = () => {
  return (
    <BrowserRouter>
      <BaseTemplate>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/login" element={<LoginContainer />} />
        </Routes>
      </BaseTemplate>
    </BrowserRouter>
  )
}

export default MainPage
