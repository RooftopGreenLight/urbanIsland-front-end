import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
const ReservationCard = ({ reservationInfo }) => {
  const { id, mainImage, city, district, grade, totalPrice } = reservationInfo
  return (
    <Wrapper>
      <Link to={"/reservation/" + id}>
        <Image src={mainImage.fileUrl} />
        <Bottom>
          <Location>{`${city} ${district}`}</Location>
          <StarRate>
            <Star icon={faStar} />
            <Starview>{grade} / 5.0</Starview>
          </StarRate>
          <Fee>{totalPrice} KRW</Fee>
        </Bottom>
      </Link>
    </Wrapper>
  )
}
export default ReservationCard

const Wrapper = styled.div`
  position: relative;
  width: 25vw;
  height: 25vw;
  margin: 2rem;
`
const Location = styled.p`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 100%;
      margin-bottom: ${margins.sm};

      color: ${colors.black.primary};
      font-size: ${fonts.size.sm};
      font-weight: bold;
    `
  }}
`
const Image = styled.img`
  width: 22.5vw;
  height: 22.5vw;
  border-radius: 1.1rem;
  object-fit: cover;
  margin: auto;
`
const Bottom = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 22.5vw;
      margin-top: ${margins.sm};

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      color: ${colors.black.primary};
      font-size: ${fonts.size.xsm};
    `
  }}
`

const Starview = styled.div`
  display: inline-block;
`
const StarRate = styled.div`
  color: black;
  font-weight: 200;
`
const Fee = styled.span`
  color: black;
  font-weight: 400;
`
const Star = styled(FontAwesomeIcon)`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      margin-right: ${margins.sm};
      color: ${colors.black.primary};
      font-size: ${fonts.size.xsm};
      font-weight: bold;
    `
  }}
`
