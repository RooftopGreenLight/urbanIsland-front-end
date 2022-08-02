import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

import cardImg from "assets/img/logincard2.jpg"

const RegisterSection = () => {
  return (
    <Wrapper>
      {/* <p>아직 회원이 아니시군요?</p>
      <RegisterBtn to="/signup">회원가입하기</RegisterBtn> */}
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

      background-image: linear-gradient(rgba(0, 76, 9, 0.1), rgba(0, 62, 9, 0.05)), url(${cardImg});
      background-size: cover;
      text-align: center;

      p {
        margin: ${margins.sm} 0vw;
        color: #000000;
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }
    `
  }}
`

const RegisterBtn = styled(Link)`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.sm} ${paddings.base};

      background-color: #000000;
      border-radius: 10px;

      color: ${colors.white};
      font-size: ${fonts.size.sm};
    `
  }}
`

export default RegisterSection
