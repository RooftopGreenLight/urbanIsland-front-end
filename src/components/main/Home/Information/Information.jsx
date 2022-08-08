import styled from "styled-components"
import InfoContent from "components/main/Home/Information/InfoContent"
import { MainPageInfoData } from "constants/MainPageInformation"

const Information = () => {
  return (
    <Wrapper>
      {MainPageInfoData.map((elm, idx) => (
        <InfoContent key={idx} content={elm} />
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

export default Information
