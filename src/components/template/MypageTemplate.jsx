import React from "react"
import MypageBox from "components/main/Mypage/Profile/MypageBox"
import styled from "styled-components"
import { Outlet } from "react-router-dom"

const MypageTemplate = () => {
  return (
    <Wrapper>
      <MypageBox />
      <Outlet />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
`

export default MypageTemplate
