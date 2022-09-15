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
