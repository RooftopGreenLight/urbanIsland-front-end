import MypageTemplate from "components/template/MypageTemplate"
import { Routes, Route, useParams } from "react-router-dom"

import Profile from "components/main/Mypage/Profile/Profile"
import Schedule from "components/main/Mypage/Schedule/Schedule"
import Admin from "components/main/Mypage/Admin/Admin"
import Greenbee from "components/main/Mypage/Greenbee/Greenbee"
import Rooftop from "components/main/Mypage/RooftopOwner/Rooftop"
import MakeGreenbeeAccount from "components/main/Mypage/Profile/MakeGreenbeeAccount"
import RequiredGreeningList from "components/main/Mypage/Greenbee/RequiredGreeningList"
import ApplyRoofTop from "components/main/RoofTop/ApplyRoofTop"
import RequestToGreenBee from "components/main/RoofTop/RequestToGreenBee"

export const MypageContainer = () => {
  return (
    <MypageTemplate>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="greenbee" element={<Greenbee />}>
          <Route path="required-greening" element={<RequiredGreeningList />} />
        </Route>
        <Route path="rooftop" element={<Rooftop />}>
          <Route path="apply" element={<ApplyRoofTop />} />
          <Route path="request" element={<RequestToGreenBee />} />
        </Route>
        <Route path="admin" element={<Admin />} />
        <Route path="greenbeeapply" element={<MakeGreenbeeAccount />} />
      </Routes>
    </MypageTemplate>
  )
}
