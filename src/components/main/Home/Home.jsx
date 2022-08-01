import styled, { css } from "styled-components"

import HomeBtnList from "components/main/Home/HomeBtnList"
import HomeBottomText from "components/main/Home/HomeBottomText"
import Information from "components/main/Home/Information/Information"

import { changeBackground } from "styles/Animation"
import bgImg1 from "assets/img/background1.jpg"
import { MainPageBtnText } from "constants/MainPageBtn"

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

  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${bgImg1});
  background-size: cover;

  animation: ${changeBackground} 40s infinite;
  animation-fill-mode: forwards;
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

const HomeBtnList = styled.div`
  width: 25vw;
  height: 15vw;
  margin: 7.5vh auto;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const HomeBtn = styled.button`
  ${({ theme, delay }) => {
    const { colors, fonts } = theme
    return css`
      width: 90%;
      height: 2.75vw;

      margin: 0vw auto;
      opacity: 0%;

      border: 0;
      border-radius: 25px;
      background-color: ${colors.white};

      font-size: ${fonts.size.sm};
      mix-blend-mode: screen;

      transition: 0.3s all ease-in-out;

      animation: ${fadeIn} 2s 0.25s;
      animation-fill-mode: forwards;
      animation-delay: ${`${delay * 0.2}s`};

      &:hover {
        width: 92.5%;
        height: 2.8vw;
      }
    `
  }}
`

const HomeBottomText = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 23.5%;
      margin: ${margins.xl} auto;

      color: ${colors.white};
      opacity: 0%;

      animation: ${fadeIn} 2s 1s;
      animation-fill-mode: forwards;

      h5 {
        font-size: ${fonts.size.base};
      }

      p {
        font-weight: 100;
        font-size: ${fonts.size.xsm};
      }
    `
  }}
`

export default Home
