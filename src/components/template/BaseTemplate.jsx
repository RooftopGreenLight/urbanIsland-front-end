import styled from "styled-components"

import Footer from "components/common/Layout/Footer"
import Header from "components/common/Layout/Header"

const BaseTemplate = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > .content {
    min-height: 100vh;
    overflow: auto;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

export default BaseTemplate
