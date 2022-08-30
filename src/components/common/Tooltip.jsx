import styled, { css } from "styled-components"
import { tooltip } from "styles/Animation"

const Tooltip = ({ children, message }) => {
  return (
    <Container>
      {children}
      <Content className="tooltip">{message}</Content>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  &:hover > .tooltip,
  &:active > .tooltip {
    display: block;
  }
`

const Content = styled.div`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      display: none;
      position: absolute;
      z-index: 200;
      padding: ${paddings.sm};
      border-radius: 0.5rem;
      top: -40%;
      left: 110%;
      width: 100%;
      text-align: center;
      background-color: gray;

      animation: ${tooltip} 0.2s;
    `
  }}
`
export default Tooltip
