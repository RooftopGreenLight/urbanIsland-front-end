import styled, { css } from "styled-components"

import { fadeIn } from "styles/Animation"
import { MainPageBtnText } from "constants/MainPageBtn"

const HomeBtnList = () => {
  return (
    <Wrapper>
      {MainPageBtnText.map((elm, idx) => (
        <HomeBtn key={idx} delay={idx}>
          {elm}
        </HomeBtn>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
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

export default HomeBtnList
