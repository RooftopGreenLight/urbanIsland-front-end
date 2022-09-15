import styled, { css } from "styled-components"

export const CheckBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 40%;
      margin: ${margins.xsm} auto;

      display: flex;
      justify-content: space-evenly;

      p {
        width: 80%;
        margin: 0;
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: left;
      }

      input[type="checkbox"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;

        background: ${colors.main.quaternary}88;
        border-radius: 4px;

        width: 16px;
        height: 16px;
        margin: auto;

        &::after {
          border: solid #fff;
          border-width: 0 2px 2px 0;
          content: "";
          display: none;

          width: 4px;
          height: 6px;
          margin: 0;

          position: relative;
          right: -5px;
          top: 2px;
          transform: rotate(45deg);
        }

        &:checked {
          background: ${colors.main.tertiary};
          &::after {
            display: block;
          }
        }
      }
    `
  }}
`
