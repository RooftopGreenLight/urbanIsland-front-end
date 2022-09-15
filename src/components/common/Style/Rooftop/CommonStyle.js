import styled, { css } from "styled-components"

export const RooftopInfoBox = styled.div`
  width: 65vw;
  margin: 5vh auto 3.5vh auto;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: left;
`

export const RooftopTitle = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 100%;
      margin-bottom: ${margins.sm};

      h5 {
        color: ${colors.main.primary};
        font-size: ${fonts.size.lg};
        font-weight: ${fonts.weight.bold};
      }
    `
  }}
`

export const RooftopDetail = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 100%;
      margin-bottom: ${margins.sm};

      display: flex;
      justify-content: space-between;

      h5 {
        color: ${colors.main.primary};
        font-size: ${fonts.size.lg};
        font-weight: ${fonts.weight.bold};
      }

      .detail-list {
        width: 32.5vw;

        display: flex;
        justify-content: space-between;
      }

      .btn-list {
        width: 16vw;

        display: flex;
        justify-content: space-between;
      }
    `
  }}
`

export const DetailInfo = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      color: ${colors.main.secondary};
      font-weight: ${fonts.weight.light};

      svg {
        margin-right: ${margins.sm};
        color: ${colors.main.tertiary};
        font-size: ${fonts.size.xsm};
        font-weight: bold;
      }
    `
  }}
`

export const PaymentInfoBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts } = theme
    return css`
      width: 25vw;
      margin-bottom: auto;

      display: flex;
      flex-direction: column;
      align-items: center;

      border: 1px solid ${colors.main.primary}33;
      box-shadow: 0px 5px 8px ${colors.main.primary}33;

      &::before {
        width: 100%;
        padding: 0vw;

        background-color: ${colors.main.tertiary};
        content: "예약 결제 정보";

        color: ${colors.white};
        font-size: ${fonts.size.base};
        text-align: center;
        line-height: 225%;
      }
    `
  }}
`

export const PaymentOptionBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      padding: ${paddings.base} ${paddings.lg};
      margin: ${margins.sm} 0vw;

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      h5 {
        width: 100%;
        padding-bottom: ${paddings.xsm};
        margin-bottom: ${margins.base};
        border-bottom: 1px solid ${colors.main.primary}55;

        color: ${colors.main.secondary};
        font-size: ${fonts.size.sm};
      }

      p {
        color: ${colors.black.tertiary};
        font-size: 1.1rem;
        font-weight: 500;
      }

      span {
        color: ${colors.black.quinary};
        font-size: 1.1rem;
        font-weight: 300;
      }

      strong {
        color: ${colors.main.secondary};
        font-size: 1.1rem;
      }

      .option-list {
        width: 100%;
        margin: ${margins.xsm} 0vw;
        display: flex;
        justify-content: space-between;
      }
    `
  }}
`

export const RooftopUtilBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      padding: ${paddings.sm} ${paddings.lg};
      margin: ${margins.base} 0vw 0vw 0vw;

      border-radius: 0.75rem;
      background: ${colors.main.secondary};
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      color: ${colors.white};
      font-size: ${fonts.size.sm};
      font-weight: bold;

      &:hover {
        border: 0px;
        background: ${colors.main.tertiary};
        color: ${colors.white};
      }
    `
  }}
`

export const InformationBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      margin: ${margins.base} 0vw;

      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;

      p {
        color: ${colors.black.quinary};
        font-weight: ${fonts.weight.light};
      }

      h5 {
        width: 100%;
        padding-bottom: ${paddings.xsm};
        border-bottom: 1px solid ${colors.main.primary}55;

        color: ${colors.main.secondary};
        font-size: ${fonts.size.base};
      }

      svg {
        margin: auto 0vw;
        color: ${colors.main.primary};
      }

      pre {
        padding: ${paddings.base} 0vw;
        color: ${colors.black.quinary};
        font-weight: ${fonts.weight.light};
      }

      img {
        width: 100%;
        height: 40vh;
        object-fit: cover;
        margin: ${margins.lg} auto 0vw auto;
      }
    `
  }}
`
