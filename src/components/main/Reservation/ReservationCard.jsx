import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
const ReservationCard = ({ props }) => {
  return (
    <Wrapper>
      <Link to={"/reservation/" + props.id}>
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
const Location = styled.div`
  color: white;
  position: absolute;
  left: 5%;
  top: 75%;
  font-size: 1.1rem;
  font-weight: bold;
`
const Image = styled.img`
  width: 100%;
  border-radius: 1.1rem;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(50, 50);
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: auto;
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
  color: white;
`
const Fee = styled.div`
  color: white;
`
const Star = styled(FontAwesomeIcon)`
  color: white;
  display: inline-block;
`
