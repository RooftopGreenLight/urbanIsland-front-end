import styled, { css } from "styled-components"

export const Wrapper = styled.div`
  width: 35vw;
  margin: 7.5vh auto auto auto;

  display: flex;
  flex-direction: column;
`

export const Title = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      padding: ${paddings.sm} ${paddings.base};
      margin-bottom: ${margins.sm};

      display: flex;
      border-bottom: 1px solid ${colors.main.primary}77;

      color: ${colors.main.primary};
      text-align: center;

      h5 {
        width: 90%;

        font-size: ${fonts.size.base};
        font-weight: ${fonts.weight.bold};
        text-align: left;
      }
    `
  }}
`

export const ServiceList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 5vh;
`

export const ServiceBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      display: flex;
      justify-content: space-between;
      padding: ${paddings.base};
      border-bottom: 1px solid ${colors.main.primary}55;

      p {
        color: ${colors.black.quinary};
        font-weight: ${fonts.weight.light};
      }

      h5 {
        margin-bottom: 0.25rem;
        color: ${colors.black.secondary};
        font-size: ${fonts.size.sm};
      }

      svg {
        margin: auto 0vw;
        color: ${colors.main.primary};
      }

      button {
        width: 10%;
        padding: ${paddings.sm} 0vw;
        margin: auto 0vw auto auto;

        border-radius: ${fonts.size.xsm};
        background-color: ${colors.main.secondary};

        color: ${colors.white};
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};

        &:hover {
          background-color: ${colors.main.tertiary};
          font-weight: ${fonts.weight.bold};
        }
      }
    `
  }}
`

export const InputBox = styled.div`
  ${({ theme, boxSize }) => {
    const boxWidth = new Map([
      ["sm", "25%"],
      ["base", "47.5%"],
      ["lg", "100%"],
    ])
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: ${boxWidth.get(boxSize)};
      background-color: ${colors.white};
      padding: ${paddings.base};

      .title {
        margin-bottom: ${margins.sm};
        text-align: left;
      }

      p {
        color: ${colors.black.quinary};
        font-weight: ${fonts.weight.light};
      }

      h5 {
        margin-bottom: 0.25rem;
        color: ${colors.black.secondary};
        font-size: ${fonts.size.sm};
      }

      input,
      textarea {
        width: 100%;
        padding: ${paddings.sm} 0vw;
        margin: ${margins.xsm} 0vw;

        border: 0;
        background-color: ${colors.main.tertiary}09;
        border-bottom: 1px solid ${colors.main.secondary}44;

        color: ${colors.black.secondary};
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: center;
      }
    `
  }}
`

export const ModalBtnBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 100%;
      background-color: ${colors.white};
      padding: ${paddings.base};

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .title {
        width: 80%;
        margin-bottom: ${margins.sm};
        text-align: left;
      }

      p {
        color: ${colors.black.quinary};
        font-weight: ${fonts.weight.light};
      }

      h5 {
        margin-bottom: ${margins.xsm};
        color: ${colors.black.secondary};
        font-size: ${fonts.size.sm};
      }
    `
  }}
`

export const OpenModalBtn = styled.div`
  ${({ theme }) => {
    const { colors, paddings } = theme
    return css`
      width: 20%;
      padding: ${paddings.sm};
      margin: 0.75vw auto 0.25vw auto;

      border: 1px solid ${colors.main.primary};
      border-radius: 2.5vw;
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: 100;

      &:hover {
        border: 1px solid ${colors.white};
        background: ${colors.main.tertiary};
        color: ${colors.white};
      }
    `
  }}
`
