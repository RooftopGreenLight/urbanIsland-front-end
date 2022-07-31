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
      width: 50%;
      margin: ${margins.sm} auto ${margins.xl} auto;

      background-color: ${colors.white};
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
