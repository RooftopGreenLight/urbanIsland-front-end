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

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

export default BaseTemplate
