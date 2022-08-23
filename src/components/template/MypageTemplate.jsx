import React from "react"
import styled from "styled-components"

import Footer from "components/common/Footer"
import Header from "components/common/Header"
import MypageBox from "components/main/Mypage/Profile/MypageBox"

const MypageTemplate = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <div className="content">
        <MypageBox />
        {children}
      </div>
      <Footer />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > .content {
    min-height: 100vh;
    margin: auto 10vw;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

export default MypageTemplate
