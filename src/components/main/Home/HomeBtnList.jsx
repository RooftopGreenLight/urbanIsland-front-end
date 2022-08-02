import styled, { css } from "styled-components"
import { Link } from "react-router-dom"

import { fadeIn } from "styles/Animation"

const HomeBtnList = () => {
  return (
    <Wrapper>
      <HomeBtn>옥상시설 예약</HomeBtn>
      <HomeBtn>지원사업 열람</HomeBtn>
      <HomeBtn>옥상지기 신청</HomeBtn>
      <HomeBtn>로그인</HomeBtn>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 12.5vw;
  height: 10vw;
  margin: 5vh 0vw;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const HomeBtn = styled(Link)`
  ${({ theme, delay }) => {
    const { colors, fonts } = theme
    return css`
      width: 50%;
      height: 2.75vw;

      margin: 0vw auto;
      opacity: 0%;

      border: 0;
      background-color: transparent;

      color: ${colors.white};
      font-size: ${fonts.size.xsm};
      font-weight: 100;
      mix-blend-mode: screen;

      transition: 0.3s all ease-in-out;
      animation: ${fadeIn} 2s 0.25s;
      animation-fill-mode: forwards;
      animation-delay: ${`${delay * 0.2}s`};

      &:hover {
        width: 92.5%;
        height: 2.8vw;
        font-weight: 700;
      }
    `
  }}
`

export default HomeBtnList
