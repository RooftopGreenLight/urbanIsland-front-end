import styled, { css } from "styled-components"

import HomeBtnList from "components/main/Home/HomeBtnList"
import HomeBottomText from "components/main/Home/HomeBottomText"
import Information from "components/main/Home/Information/Information"

import bgImg2 from "assets/img/background2.jpg"

const Home = () => {
  return (
    <Wrapper>
      <Homepage>
        <HomeText>
          <h3>Urban Island</h3>
          <p>도심 속, 우리들의 숨겨진 쉼터</p>
        </HomeText>
        <HomeBtnList />
        <HomeBottomText />
      </Homepage>
      <Information />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
`

const Homepage = styled.div`
  width: 100vw;
  min-height: 100vh;

  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${bgImg2});
  background-size: cover;
`

const HomeText = styled.div`
  ${({ theme }) => {
    const { colors, fonts } = theme
    return css`
      width: 100%;
      padding-top: 10vw;

      color: ${colors.white};
      font-family: ${fonts.family.detail};
      text-align: center;

      h3 {
        font-size: ${fonts.size.xxl};
      }

      p {
        font-size: ${fonts.size.sm};
        font-weight: 100;
      }
    `
  }}
`

export default Home
