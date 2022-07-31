import styled, { css } from "styled-components"
import bgImg from "assets/img/background1.jpg"

const Home = () => {
  return (
    <Wrapper>
      <Background>
        <MainText>
          <h3>Urban Island</h3>
          <p>도심 속, 우리들의 숨겨진 쉼터</p>
        </MainText>
        <MainBtnList>
          <MainBtn>옥상시설 예약</MainBtn>
          <MainBtn>지원사업 열람</MainBtn>
          <MainBtn>옥상지기 신청</MainBtn>
          <MainBtn>마이 페이지</MainBtn>
        </MainBtnList>
        <BottomText>
          <h5>Soil Bank.</h5>
          <p>옥상녹화는 투수면적을 늘림으로 도시 홍수를 막을 수 있습니다.</p>
        </BottomText>
      </Background>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;

  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${bgImg});
  background-size: cover;
`

const Background = styled.div`
  position: relative;
  top: 10vw;
`

const MainText = styled.div`
  ${({ theme }) => {
    const { colors, fonts } = theme
    return css`
      width: 100%;

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

const MainBtnList = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 25vw;
      height: 15vw;
      margin: 7.5vh auto;

      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    `
  }}
`

const MainBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 90%;
      height: 2.75vw;

      margin: 0vw auto;
      opacity: 90%;

      border: 0;
      border-radius: 25px;
      background-color: ${colors.white};

      font-size: ${fonts.size.sm};
      mix-blend-mode: screen;

      transition: 0.3s all ease-in-out;

      &:hover {
        opacity: 100%;
        width: 92.5%;
        height: 2.8vw;
      }
    `
  }}
`

const BottomText = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 95%;
      margin: 0vw auto;

      position: fixed;
      left: 1vw;
      bottom: 5vh;

      color: ${colors.white};

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
