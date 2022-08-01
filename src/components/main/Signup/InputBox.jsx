import React from "react"
import styled, { css } from "styled-components"
import "fonts/font.css"

const Wrapper = styled.div`
  ${({ theme }) => {
    const { paddings, margins } = theme
    return css`
      margin: ${margins.sm} auto;
      input {
        width: 100%;
        padding: ${paddings.sm} ${paddings.base};

        font-family: "gmarketsans";
        background-color: #d9d9d9;
        border: 0;
        border-radius: 5px;

        &::placeholder {
          color: black;
          text-align: center;
        }

        &::before {
          background-color: #d9d9d9;
        }
      }
    `
  }}
`
const InputBox = ({ ...data }) => {
  return (
    <Wrapper>
      <input {...data} />
    </Wrapper>
  )
}
export default InputBox
