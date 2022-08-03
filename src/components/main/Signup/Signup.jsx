import React from "react"
import styled, { css } from "styled-components"
import bgImg from "assets/img/background1.jpg"
import { fadeIn } from "styles/Animation"

import SignupForm from "components/main/Signup/SignupForm"
import CardSection from "components/main/Signup/CardSection"

const Signup = () => {
  return (
    <>
      <Wrapper>
        <SignupSection>
          <SignupTitle>
            <h5>{`Register\nour Service`}</h5>
          </SignupTitle>
          <SignupForm />
        </SignupSection>
        <CardSection />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${bgImg});
  background-size: cover;
`

const SignupTitle = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 75%;
      margin: ${margins.xl} ${margins.xl};

      h5 {
        font-size: ${fonts.size.xxl};
        line-height: 3.85rem;
        white-space: pre-wrap;
      }
    `
  }}
`

const SignupSection = styled.div`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      width: 27.5%;
      height: 70vh;
      margin: auto 0vw;

      background-color: ${colors.white};
      opacity: 95%;
      border-radius: 25px 0px 0px 25px;

      display: flex;
      flex-direction: column;

      animation: ${fadeIn} 2s 0s;
      animation-fill-mode: forwards;
    `
  }}
`

export default Signup
