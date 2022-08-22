import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
const Wrapper = styled.div`
  position: relative;
  width: 35%;
  margin: 2rem;
`
const Location = styled.div`
  color: black;
  position: absolute;
  left: 5%;
  top: 75%;
  font-size: 1.1rem;
  font-weight: bold;
`
const Image = styled.img`
  width: 100%;
  border-radius: 1.1rem;
`
const Bottom = styled.div`
  position: absolute;
  left: 23%;
  width: 75%;
  top: 85%;
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
`
const Starview = styled.div`
  display: inline-block;
`
const StarRate = styled.div`
  color: black;
`
const Fee = styled.div`
  color: black;
`
const Star = styled(FontAwesomeIcon)`
  color: black;
  display: inline-block;
`
const ReservationCard = ({ props }) => {
  return (
    <Wrapper>
      <Image src={props.mainImage.fileUrl} />
      <Location>
        {props.city} {props.district}
      </Location>
      <Bottom>
        <StarRate>
          <div>
            <Star icon={faStar} />
            <Starview>{props.grade}/5.0</Starview>
          </div>
        </StarRate>
        <Fee>{props.totalPrice}W</Fee>
      </Bottom>
    </Wrapper>
  )
}
export default ReservationCard
