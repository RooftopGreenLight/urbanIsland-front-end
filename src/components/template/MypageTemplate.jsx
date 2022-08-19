import React from "react"
import MypageBox from "components/main/Mypage/Profile/MypageBox"
import styled from "styled-components"
const Wrapper = styled.div`
  display: flex;
`
const MypageTemplate = ({ children }) => {
  return (
    <Wrapper>
      <MypageBox />
      {children}
    </Wrapper>
  )
}
export default MypageTemplate
