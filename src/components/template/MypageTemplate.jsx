import React from "react"
import MypageBox from "components/main/Mypage/Profile/MypageBox"
import styled from "styled-components"

const MypageTemplate = ({ children }) => {
  return (
    <Wrapper>
      <MypageBox />
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
`

export default MypageTemplate
