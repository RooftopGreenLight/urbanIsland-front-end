import styled, { css } from "styled-components"
import Navbar from "components/common/Navbar"

const Header = () => {
  return (
    <Wrapper>
      <Background>
        <Navbar />
        <HeaderText>
          <h5>Example Header</h5>
          <p>this is example header.</p>
        </HeaderText>
      </Background>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Background = styled.div`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      width: 100vw;
      height: 10vw;
      min-height: 50vh;

      background-size: cover;
      background-color: ${colors.blue.quinary};
    `
  }}
`

const HeaderText = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      color: ${colors.blue.tertiary};
      position: relative;
      top: 27.5%;
      left: 5%;

      h5 {
        margin-bottom: ${margins.base};
        font-family: ${fonts.family.title};
        font-size: ${fonts.size.title};
      }

      p {
        font-size: ${fonts.size.lg};
        font-weight: 100;
      }
    `
  }}
`

export default Header
