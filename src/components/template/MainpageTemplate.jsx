import styled from "styled-components"
import Home from "components/main/Home/Home"

const MainpageTemplate = ({ children }) => {
  return (
    <Wrapper>
      <Home />
      <div className="content">{children}</div>
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

export default MainpageTemplate
