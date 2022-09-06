import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
const ReservationCard = ({ reservationInfo }) => {
  const { id, mainImage, city, district, detail, grade, totalPrice } = reservationInfo
  return (
    <Link to={"/reservation/" + id}>
      <Wrapper>
        <Image src={mainImage.fileUrl} />
        <Bottom>
          <Location>
            <h5>{`${city} ${district}`}</h5>
            <p>{detail}</p>
          </Location>
          <DetailInfo>
            <StarRate>
              <FontAwesomeIcon icon={faStar} />
              <span>{grade} / 5.0</span>
            </StarRate>
            <p>
              <strong>{totalPrice.toLocaleString()}</strong> KRW
            </p>
          </DetailInfo>
        </Bottom>
      </Wrapper>
    </Link>
  )
}
export default ReservationCard

const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      position: relative;
      width: 100%;
      border-radius: 0.75rem 0.75rem 0px 0px;
      box-shadow: 0px 2px 4px ${colors.black.primary}33;

      display: flex;
      flex-direction: column;

      transition: 0.25s all ease-in-out;

      &:hover {
        transform: translate3d(0, 2.5%, 0);
      }
    `
  }}
`
const Location = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 100%;
      margin-bottom: ${margins.base};

      color: ${colors.main.primary};

      h5 {
        font-size: 1.25rem;
        font-weight: bold;
      }

      p {
        margin-top: ${margins.xsm};
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }
    `
  }}
`
const Image = styled.img`
  width: 100%;
  height: 14vw;
  border-radius: 0.75rem 0.75rem 0px 0px;
  object-fit: cover;
  margin: auto;
`

const Bottom = styled.div`
  ${({ theme }) => {
    const { colors, paddings } = theme
    return css`
      width: 97.5%;
      padding: ${paddings.base};
      margin: 0vw auto;

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      color: ${colors.main.primary};
    `
  }}
`

const DetailInfo = styled.div`
  ${({ theme }) => {
    const { colors, fonts } = theme
    return css`
      width: 100%;
      color: ${colors.main.primary};

      display: flex;
      justify-content: space-between;

      p {
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
      }

      strong {
        font-weight: 600;
      }
    `
  }}
`

const StarRate = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      color: ${colors.main.tertiary};
      font-weight: 200;

      svg {
        margin-right: ${margins.sm};
        color: ${colors.main.tertiary};
        font-size: ${fonts.size.xsm};
        font-weight: bold;
      }
    `
  }}
`
