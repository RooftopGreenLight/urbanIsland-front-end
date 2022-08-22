import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { roofTopControl } from "api/controls/roofTopControl"
import styled from "styled-components"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faUser, faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons"
import ReservationTime from "components/main/Reservation/Modals/ReservationTime"
import { useContext } from "react"
import { ModalContext } from "module/Modal"
import ReservationNumber from "components/main/Reservation/Modals/ReservationNumber"
const ReservationDetail = () => {
  const { openModal } = useContext(ModalContext)
  const { id } = useParams()
  const [data, setData] = useState()
  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  useEffect(() => {
    const getData = async event => {
      try {
        const result = await roofTopControl.getRooftopDetail(id)
        setData(result)
        console.log(result)
      } catch (err) {
        console.log(err.message)
      }
    }
    getData()
  }, [])

  return (
    <Wrapper>
      {data && (
        <>
          <DetailTop>
            {data.rooftopImages.map(d => (
              <SliderWrapper {...settings}>
                <Image src={d.fileUrl} />
              </SliderWrapper>
            ))}
            <Location>
              <div>
                {data.city} {data.district} {data.detail}
              </div>
            </Location>{" "}
          </DetailTop>
          <InfoLine>
            <div>
              <Icon icon={faArrowsLeftRight} />
              <IconText>{data.width}m2</IconText>
            </div>
            <div>
              <Icon icon={faStar} />
              <IconText>{data.grade}/5.0</IconText>
            </div>{" "}
            <div>
              <Icon icon={faUser} />
              <IconText>{data.totalCount}인 까지</IconText>
            </div>
          </InfoLine>
          <DetailBottom>
            <LeftBox>
              <Review>
                <ReviewHeader>
                  <Icon icon={faStar} />
                  <IconText>{data.rooftopReviews.length}개의 리뷰</IconText>
                </ReviewHeader>
                {data.rooftopReviews.map(d => (
                  <ReviewBox>
                    <div>
                      <div>
                        <Icon icon={faStar} />
                        <IconText>{d.grade}</IconText>
                      </div>
                      <div>
                        {d.createTime[0]}.{d.createTime[1]}.{d.createTime[2]}
                      </div>
                    </div>{" "}
                    <div>{d.content}</div>
                  </ReviewBox>
                ))}
              </Review>
              <StructureImage>
                <p>배치도</p>
                <img src={data.structureImage.fileUrl} />
              </StructureImage>
            </LeftBox>
            <RightBox>
              <ButtonBox>
                <button
                  onClick={() =>
                    openModal(
                      <ReservationTime startTime={data.startTime[0]} endTime={data.endTime[0]} />,
                    )
                  }>
                  이용 가능시간
                </button>
                <button onClick={() => openModal(<ReservationNumber />)}>인원수 설정</button>
                <div>
                  <Fee>{data.totalPrice}W</Fee>
                </div>
                <button className="pay">예약하기</button>
              </ButtonBox>
            </RightBox>
          </DetailBottom>
        </>
      )}
    </Wrapper>
  )
}

export default ReservationDetail
const ButtonBox = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  padding: 2rem;
  .pay {
    background-color: black;
    color: white;
  }
`
const LeftBox = styled.div`
  width: 50%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Fee = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  float: right;
`
const RightBox = styled.div`
  width: 50%;
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  button {
    width: 100%;
    height: 2rem;
    margin: 0.3rem;
    border-radius: 0.3rem;
  }

  padding-left: 1rem;
`
const StructureImage = styled.div`
  width: 100%;
  background-color: gray;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 1rem;
  img {
    width: 100%;
  }
  background-color: gray;
`
const ReviewHeader = styled.div`
  text-align: center;
`
const ReviewBox = styled.div`
  background-color: lightgray;
  div {
    display: flex;
    justify-content: space-between;
  }
  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
`
const Review = styled.div`
  border-radius: 1rem;
  width: 100%;
  background-color: gray;
  padding: 1rem;
`
const Image = styled.img`
  width: 70%;
`
const SliderWrapper = styled(Slider)`
  width: 50%;
`
const DetailTop = styled.div`
  display: flex;
`
const Location = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const InfoLine = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  font-size: 1.2rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`
const Share = styled.button``
const Wrapper = styled.div`
  width: 100%;
  padding: 10vh 15vw;
`
const Icon = styled(FontAwesomeIcon)`
  color: black;
  display: inline-block;
`
const DetailBottom = styled.div`
  display: flex;
`
const IconText = styled.div`
  display: inline-block;
`
