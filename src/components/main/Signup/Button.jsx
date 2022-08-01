import React from "react"
import styled, { css } from "styled-components"

const Wrapper = styled.button`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.sm} ${paddings.base};
      background-color: #000000;
      border-radius: 10px;
      text-align: center;
      color: ${colors.white};
      font-size: ${fonts.size.sm};
    `
  }}
`
const Button = ({ ...data }) => {
  return <Wrapper onClick={data.onClick}>{data.name}</Wrapper>
}
export default Button
