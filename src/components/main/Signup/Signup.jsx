import React from "react"
import styled, { css } from "styled-components"
import bgImg from "assets/img/background1.jpg"
import { fadeIn } from "styles/Animation"
import SignupForm from "./SignupForm"
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${bgImg});
  background-size: cover;
`

const SignupSection = styled.div`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      width: 45%;
      margin: auto;

      background-color: ${colors.white};
      opacity: 95%;
      border-radius: 10px;

      display: flex;
      flex-direction: column;

      animation: ${fadeIn} 2s 0s;
      animation-fill-mode: forwards;
    `
  }}
`

const Signup = () => {
  return (
    <Wrapper>
      <SignupSection>
        <SignupForm />
      </SignupSection>
    </Wrapper>
  )
}

export default Signup
