import styled, { css } from "styled-components"

const Footer = () => {
  return (
    <Wrapper>
      <FooterContent>
        <p>Copyright © 2022 rooftopgreenlight.co.,Ltd. All rights reserved.</p>
        <p>
          Contact author for more information. <strong>kb.urbanisland@gmail.com</strong>
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
      background-color: ${colors.main.secondary};

      display: flex;
      justify-content: center;
      align-items: center;

      text-align: center;
      color: ${colors.white};
      font-size: ${fonts.size.xsm};
      font-weight: ${fonts.weight.light};
    `
  }}
`

const FooterContent = styled.div`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      height: 4vh;
      margin: auto 0vw;

      strong {
        font-weight: ${fonts.weight.bold};
      }
    `
  }}
`

export default Footer
