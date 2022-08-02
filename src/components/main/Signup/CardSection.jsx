import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

import cardImg from "assets/img/logincard2.jpg"
import { fadeIn } from "styles/Animation"

const CardSection = () => {
  return (
    <Wrapper>
      <h5>Aren't you Join yet?</h5>
      <CardContent>
        <p>아직 회원이 아니신가요?</p>
        <CardBtn to="/signup">회원가입</CardBtn>
      </CardContent>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 42.5%;
      height: 70vh;
      margin: auto 0vw;

      border-radius: 0px 25px 25px 0px;

      background-image: linear-gradient(rgba(0, 18, 2, 0.4), rgba(0, 50, 8, 0.1)), url(${cardImg});
      background-size: cover;
      text-align: center;

      animation: ${fadeIn} 2s 0s;
      animation-fill-mode: forwards;

      h5 {
        position: relative;
        top: 37.5%;

        margin: 0vw auto;

        color: ${colors.white};
        font-size: ${fonts.size.xxl};
        font-weight: bold;
      }
    `
  }}
`

const CardContent = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      position: relative;
      top: 38.5%;
      p {
        margin: ${margins.base} auto;

        color: ${colors.white};
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }
    `
  }}
`

const CardBtn = styled(Link)`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.sm} 7.5vw;

      background-color: #ffffff;
      border-radius: 100px;

      color: #000000;
      font-size: ${fonts.size.sm};
      font-weight: 700;
    `
  }}
`

export default CardSection
