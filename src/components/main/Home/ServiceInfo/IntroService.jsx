import styled, { css } from "styled-components"

import { ServiceInfoData } from "constants/ServiceInfoData"
import ServiceContent from "components/main/Home/ServiceInfo/ServiceContent"
import ServiceContentDarken from "components/main/Home/ServiceInfo/ServiceContentDarken"

const IntroService = () => {
  return (
    <Wrapper>
      <ServiceIntro>
        <h5>Urban Island</h5>
        <p>도시 녹화 문화의 자생 정착 도움 웹 서비스입니다</p>
      </ServiceIntro>
      {ServiceInfoData.map((content, idx) => {
        return idx % 2 === 0 ? (
          <ServiceContentDarken key={idx} content={content} />
        ) : (
          <ServiceContent key={idx} content={content} />
        )
      })}
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

const ServiceIntro = styled.div`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      width: 100%;
      margin: 7.5vh auto;
      display: flex;
      flex-direction: column;

      h5 {
        margin: ${margins.base} auto ${margins.xsm} auto;
        font-size: ${fonts.size.xxl};
        font-weight: bold;
      }

      p {
        margin: auto;
        white-space: pre-wrap;

        color: #7b7b7b;
        font-size: ${fonts.size.sm};
        font-weight: 300;
        line-height: 1.25;
      }
    `
  }}
`

export default IntroService
