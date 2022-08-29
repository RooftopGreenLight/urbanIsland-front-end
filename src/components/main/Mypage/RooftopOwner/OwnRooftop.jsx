import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

const OwnRooftop = ({ rooftopInfo }) => {
  const { city, district, detail, grade, mainImage } = rooftopInfo
  return (
    <Wrapper fileUrl={mainImage.fileUrl}>
      <h5>{`${city} ${district}`}</h5>
      <p>{detail}</p>
      <span>
        <FontAwesomeIcon icon={faStar} />
        {` ${grade} / 5 점`}
      </span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme, fileUrl }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 11vw;
      height: 11vw;

      padding: ${paddings.sm};
      overflow: hidden;

      background: url(${fileUrl});
      background-size: cover;
      border-radius: 10%;

      color: ${colors.white};
      font-size: ${fonts.size.sm};

      p,
      span {
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
      }
    `
  }}
`

export default OwnRooftop
