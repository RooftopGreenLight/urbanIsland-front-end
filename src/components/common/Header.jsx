import styled, { css } from "styled-components"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <h5 onClick={() => navigate("/")}>Urban Island</h5>
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
      border-bottom: 1px solid ${colors.main.primary}22;

      display: flex;
      justify-content: space-between;

      color: ${colors.main.primary};

      h5 {
        cursor: pointer;
        font-size: ${fonts.size.base};
      }
    `
  }}
`

export default Header
