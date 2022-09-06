import MypageTemplate from "components/template/MypageTemplate"
import { Routes, Route } from "react-router-dom"

import Profile from "components/main/Mypage/Profile/Profile"
import Schedule from "components/main/Mypage/Schedule/Schedule"
import Admin from "components/main/Mypage/Admin/Admin"
import Greenbee from "components/main/Mypage/Greenbee/Greenbee"
import GreenbeeInfo from "components/main/Mypage/Greenbee/GreenbeeInfo"
import GreenbeeInfoEdit from "components/main/Mypage/Greenbee/GreenbeeInfoEdit"
import MakeGreenbeeAccount from "components/main/Mypage/Greenbee/MakeGreenbeeAccount"
import RequiredGreeningList from "components/main/Mypage/Greenbee/RequiredGreeningList"
import RequiredGreeningRooftop from "components/main/Mypage/Greenbee/RequiredGreeningRooftop"
import RequestToGreenBee from "components/main/RoofTop/RequestToGreenBee"
import Rooftop from "components/main/Mypage/RooftopOwner/Rooftop"
import ApplyRoofTop from "components/main/RoofTop/ApplyRoofTop"
import SuperviseRooftop from "components/main/RoofTop/SuperviseRooftop"
import SuperviseDetailRooftop from "components/main/RoofTop/SuperviseDetailRooftop"

export const MypageContainer = () => {
  return (
    <MypageTemplate>
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="greenbee/*" element={<GreenbeeContainer />} />
        <Route path="rooftop/*" element={<RooftopContainer />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </MypageTemplate>
  )
}

const GreenbeeContainer = () => {
  return (
    <Routes>
      <Route path="" element={<Greenbee />} />
      <Route path="register" element={<MakeGreenbeeAccount />} />
      <Route path="info" element={<GreenbeeInfo />} />
      <Route path="edit" element={<GreenbeeInfoEdit />} />
      <Route path="required-greening" element={<RequiredGreeningList />} />
      <Route path="required-greening/:rooftopId" element={<RequiredGreeningRooftop />} />
    </Routes>
  )
}

const RooftopContainer = () => {
  return (
    <Routes>
      <Route path="" element={<Rooftop />} />
      <Route path="apply" element={<ApplyRoofTop />} />
      <Route path="request" element={<RequestToGreenBee />} />
      <Route path="supervise/:id" element={<SuperviseRooftop />} />
      <Route path="supervise/detail/:id" element={<SuperviseDetailRooftop />} />
    </Routes>
  )
}
