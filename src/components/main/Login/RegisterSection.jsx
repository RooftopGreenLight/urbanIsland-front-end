import styled, { css } from "styled-components"

const RegisterSection = () => {
  return (
    <Wrapper>
      <p>아직 회원이 아니시군요?</p>
      <RegisterBtn>회원가입하기</RegisterBtn>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 37.5%;
      margin: ${margins.lg} auto;

      background-color: ${colors.white};
      text-align: center;

      p {
        margin: ${margins.sm} 0vw;
        color: #8d8d8d;
        font-size: ${fonts.size.xsm};
        text-align: left;
      }
    `
  }}
`

const RegisterBtn = styled.button`
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
