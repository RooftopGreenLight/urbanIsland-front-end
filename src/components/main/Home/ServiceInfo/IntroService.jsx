import styled from "styled-components"
import ServiceContent from "components/main/Home/ServiceInfo/ServiceContent"
import { ServiceInfoData } from "constants/ServiceInfoData"

const IntroService = () => {
  return (
    <Wrapper>
      {ServiceInfoData.map((elm, idx) => (
        <ServiceContent key={idx} content={elm} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;

  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default IntroService
