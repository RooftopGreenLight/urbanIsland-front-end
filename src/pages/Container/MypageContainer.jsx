import MypageTemplate from "components/template/MypageTemplate"
import { Outlet } from "react-router-dom"

export const MypageContainer = () => {
  return <MypageTemplate>{<Outlet />}</MypageTemplate>
}
