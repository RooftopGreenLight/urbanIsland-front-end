import styled, { css } from "styled-components"
import bgImg from "assets/img/background1.jpg"

const Home = () => {
  return (
    <Wrapper>
      <Background>
        <MainText>
          <h3>Urban Island</h3>
          <p></p>
        </MainText>
      </Background>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 90vh;
`

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${bgImg});
  background-size: cover;
`

const MainText = styled.div`
  ${({ theme }) => {
    const { colors, fonts } = theme
    return css`
      width: 100%;
      position: relative;
      top: 10vw;

      color: ${colors.white};
      font-size: ${fonts.size.xxl};
      font-family: ${fonts.family.detail};
      text-align: center;
    `
  }}
`

export default Home
