import React from "react"
import MypageBox from "./MypageBox"
import styled from "styled-components"
import Profile from "./Profile"
import Schedule from "./Schedule"
import Greenbee from "./Greenbee"
import { useParams } from "react-router-dom"
import Rooftop from "./Rooftop"
const Wrapper = styled.div`
  display: flex;
`
const Mypage = () => {
  const params = useParams()
  if (params.section === "schedule")
    return (
      <Wrapper>
        <MypageBox />
        <Schedule />
      </Wrapper>
    )
  if (params.section === "profile")
    return (
      <Wrapper>
        <MypageBox />
        <Profile />
      </Wrapper>
    )
  if (params.section === "greenbee")
    return (
      <Wrapper>
        <MypageBox />
        <Greenbee />
      </Wrapper>
    )
  if (params.section === "rooftop")
    return (
      <Wrapper>
        <MypageBox />
        <Rooftop />
      </Wrapper>
    )
}
export default Mypage
