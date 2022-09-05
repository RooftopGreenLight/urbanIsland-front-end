import styled, { css } from "styled-components"
import Navbar from "components/common/Navbar"

const Header = () => {
  return (
    <Wrapper>
      <h5>Urban Island</h5>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 100vw;
      padding: ${paddings.base};
      margin: 0vw auto;

      position: absolute;
      top: 0;
      border-bottom: 1px solid ${colors.main.secondary}33;

      display: flex;
      justify-content: space-between;

      color: ${colors.main.primary};

      h5 {
        font-size: ${fonts.size.base};
      }
    `
  }}
`

export default Header
