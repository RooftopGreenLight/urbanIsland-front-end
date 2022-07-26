import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

const OwnRooftop = ({ rooftopInfo }) => {
  const { city, district, detail, grade, mainImage } = rooftopInfo
  return (
    <Wrapper fileUrl={mainImage.fileUrl}>
      <div className="info">
        <h5>{`${city} ${district}`}</h5>
        <p>{detail}</p>
      </div>
      <div className="grade">
        <FontAwesomeIcon icon={faStar} />
        <span> {` ${Number(grade).toFixed(1)} / 5.0`}</span>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme, fileUrl }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 10vw;
      height: 10vw;

      padding: ${paddings.sm};
      overflow: hidden;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.25)), url(${fileUrl});
      background-size: cover;
      border-radius: 5%;

      color: ${colors.white};
      font-size: ${fonts.size.sm};

      p,
      span {
        margin-top: ${margins.xsm};
        font-size: 0.825rem;
        font-weight: ${fonts.weight.light};
      }

      svg {
        margin: auto ${margins.xsm} auto 0vw;
        font-size: ${fonts.size.xsm};
      }
    `
  }}
`

export default OwnRooftop
