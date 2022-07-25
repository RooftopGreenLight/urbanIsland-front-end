import { BrowserRouter, Routes, Route } from "react-router-dom"
import BaseTemplate from "components/template/BaseTemplate"
import { HomeContainer } from "pages/Container/HomeContainer"

const MainPage = () => {
  return (
    <BrowserRouter>
      <BaseTemplate>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
        </Routes>
      </BaseTemplate>
    </BrowserRouter>
  )
}

export default MainPage
