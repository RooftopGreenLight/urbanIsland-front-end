import MypageTemplate from "components/template/MypageTemplate"
import { Routes, Route } from "react-router-dom"

import Profile from "components/main/Mypage/Profile/Profile"
import Schedule from "components/main/Mypage/Schedule/Schedule"
import Admin from "components/main/Mypage/Admin/Admin"
import Greenbee from "components/main/Mypage/Greenbee/Greenbee"
import GreenbeeInfo from "components/main/Mypage/Greenbee/GreenbeeInfo"
import Rooftop from "components/main/Mypage/RooftopOwner/Rooftop"
import MakeGreenbeeAccount from "components/main/Mypage/Profile/MakeGreenbeeAccount"
import RequiredGreeningList from "components/main/Mypage/Greenbee/RequiredGreeningList"
import RequiredGreeningRooftop from "components/main/Mypage/Greenbee/RequiredGreeningRooftop"
import ApplyRoofTop from "components/main/RoofTop/ApplyRoofTop"
import RequestToGreenBee from "components/main/RoofTop/RequestToGreenBee"

export const MypageContainer = () => {
  return (
    <MypageTemplate>
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="greenbee" element={<Greenbee />} />
        <Route path="greenbee/info" element={<GreenbeeInfo />} />
        <Route path="required-greening" element={<RequiredGreeningList />} />
        <Route path="required-greening/:rooftopId" element={<RequiredGreeningRooftop />} />
        <Route path="rooftop" element={<Rooftop />} />
        <Route path="rooftop/apply" element={<ApplyRoofTop />} />
        <Route path="rooftop/request" element={<RequestToGreenBee />} />
        <Route path="admin" element={<Admin />} />
        <Route path="greenbeeapply" element={<MakeGreenbeeAccount />} />
      </Routes>
    </MypageTemplate>
  )
}
