import styled from "styled-components"

import Footer from "components/common/Footer"
import Header from "components/common/Header"

const BaseTemplate = ({ children }) => {
  return (
    <TemplateLayout>
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </TemplateLayout>
  )
}

const TemplateLayout = styled.div`
  display: flex;
  flex-direction: column;

  & > .content {
    min-height: 100vh;

    position: relative;
    top: -3vw;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`

export default BaseTemplate
