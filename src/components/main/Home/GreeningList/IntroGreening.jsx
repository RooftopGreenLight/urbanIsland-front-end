import styled, { css } from "styled-components"

import { GreeningInfoData } from "constants/GreeningInfoData"
import GreeningContent from "components/main/Home/GreeningList/GreeningContent"

const IntroGreening = () => {
  return (
    <Wrapper>
      <ServiceIntro>
        <h5>Greening Us</h5>
        <p>Urban Island는 자생적 옥상 녹화 문화를 만들기 위해 노력합니다.</p>
        <p>
          소외된 이들과의 동행을 위한 서비스를 통해 상생을 추구하고, 모두를 위한 치유 공간을
          만듭니다.
        </p>
      </ServiceIntro>
      {GreeningInfoData.map((content, idx) => (
        <GreeningContent key={idx} content={content} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
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
        margin: ${margins.base} auto ${margins.sm} auto;
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

export default IntroGreening
