import styled from "styled-components"

import Footer from "components/common/Footer"
import Header from "components/common/Header"

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
    margin: auto;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`

export default BaseTemplate
