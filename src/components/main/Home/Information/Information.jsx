import styled from "styled-components"
import InfoContent from "components/main/Home/Information/InfoContent"

const Information = () => {
  return (
    <Wrapper>
      <InfoContent />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  justify-content: center;
`

export default Information
