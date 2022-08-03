import styled, { css } from "styled-components"

const Footer = () => {
  return (
    <Wrapper>
      <FooterContent>
        <p>Copyright © 2022 rooftopgreenlight.co.,Ltd. All rights reserved.</p>
        <p>
          Contact author for more information. <strong>test@naver.com</strong>
        </p>
      </FooterContent>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  ${({ theme }) => {
    const { colors, fonts } = theme
    return css`
      min-height: 8vh;
      background-color: ${colors.white};

      text-align: center;
      color: #000000;
      font-size: ${fonts.size.xsm};
    `
  }}
`

const FooterContent = styled.div`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      height: 4vh;
      margin: ${margins.base} 0vw;

      strong {
        font-weight: ${fonts.weight.bold};
      }
    `
  }}
`

export default Footer
