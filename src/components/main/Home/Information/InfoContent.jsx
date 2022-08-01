import styled, { css } from "styled-components"
import bgImg1 from "assets/img/background1.jpg"

const InfoContent = () => {
  return (
    <Wrapper>
      <IntroText>
        <h5>테스트 문구</h5>
        <p>
          이것은 테스트 문구입니다. 그렇습니다. 계속 작성할 수도 있습니다. 테스트입니다. 어디까지
          작성이 가능할까요?
        </p>
      </IntroText>
      <IntroImg />
      <p>사진에 대한 설명도 필요할 것 같아서 우선 기술해두었습니다.</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 42.5vw;
  height: 80vh;

  margin: auto;

  p {
    margin-top: 1rem;
    font-size: 0.8rem;
    font-weight: 100;
  }
`

const IntroText = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      margin: ${margins.xl} 0vw;

      h5 {
        margin: ${margins.base} 0vw;
        font-size: ${fonts.size.xl};
        font-weight: bold;
      }

      p {
        width: 50%;
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }
    `
  }}
`

const IntroImg = styled.div`
  width: 100%;
  height: 50%;

  background-image: url(${bgImg1});
  background-size: cover;
`

export default InfoContent
