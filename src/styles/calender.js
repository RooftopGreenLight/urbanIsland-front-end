import styled, { css } from "styled-components"

export const CalenderContainer = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      .react-calendar {
        width: 100%;
        max-width: 100%;
        padding: ${paddings.sm};

        background-color: ${colors.white};
        color: ${colors.main.primary};
        border: 1px solid ${colors.main.primary}22;

        font-family: nanumsquare;
      }

      .react-calendar__navigation button {
        color: ${colors.main.primary};
        font-size: ${fonts.size.xsm};
        margin: ${margins.sm};
      }

      .react-calendar__navigation button:enabled:hover,
      .react-calendar__navigation button:enabled:focus {
        background-color: ${colors.main.quaternary}44;
        color: ${colors.main.secondary};
      }

      .react-calendar__navigation button[disabled] {
        background-color: ${colors.white};
        color: ${colors.white};
      }

      abbr[title] {
        text-decoration: none;
      }

      .react-calendar__tile {
        font-weight: 200;
      }

      .react-calendar__tile:enabled:hover,
      .react-calendar__tile:enabled:focus {
        background: ${colors.main.quaternary};
        color: ${colors.main.primary};
      }
      .react-calendar__tile--now {
        background: ${colors.main.quaternary}55;
        font-weight: bold;
        color: ${colors.main.primary};
      }

      .react-calendar__tile:disabled {
        background-color: ${colors.black.quinary}33;
        color: ${colors.black.quinary};
        text-decoration-line: line-through;
        font-weight: 200;
      }

      .react-calendar__tile--now:enabled:hover,
      .react-calendar__tile--now:enabled:focus {
        background: ${colors.main.tertiary};
        font-weight: bold;
        color: ${colors.white};
      }
      .react-calendar__tile--hasActive:enabled:hover,
      .react-calendar__tile--hasActive:enabled:focus {
        background: #f8f8fa;
      }
      .react-calendar__tile--active {
        background: ${colors.main.tertiary};
        border-radius: 0px;
        font-weight: bold;
        color: white;
      }
      .react-calendar__tile--active:enabled:hover,
      .react-calendar__tile--active:enabled:focus {
        background: ${colors.main.primary};
        color: ${colors.white};
      }
      .react-calendar--selectRange .react-calendar__tile--hover {
        background-color: #f8f8fa;
      }
      .react-calendar__tile--range {
        background: #f8f8fa;
        background: ${colors.main.tertiary};
        border-radius: 0;
        font-weight: 300;
      }
      .react-calendar__tile--rangeStart {
        border-radius: 6px 0 0 6px;
        background: ${colors.main.secondary};
        color: ${colors.white};
        font-weight: bold;
      }
      .react-calendar__tile--rangeEnd {
        border-radius: 0 6px 6px 0;
        background: ${colors.main.secondary};
        color: ${colors.white};
        font-weight: bold;
      }
    `
  }}
`
