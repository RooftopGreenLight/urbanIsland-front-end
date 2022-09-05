import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { roofTopControl } from "api/controls/roofTopControl"
import styled, { css } from "styled-components"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faUser, faArrowsLeftRight, faMailBulk } from "@fortawesome/free-solid-svg-icons"
import ReservationTime from "components/main/Reservation/Modals/ReservationTime"
import { useContext } from "react"
import { ModalContext } from "module/Modal"
import { RoofTopFacilities } from "constants/RoofTopFacilities"
import ReservationNumber from "components/main/Reservation/Modals/ReservationNumber"
import ReservationDate from "components/main/Reservation/Modals/ReservationDate"
import Tooltip from "components/common/Tooltip"
import ImageManage from "components/main/Reservation/ImageManage"

const ReservationDetail = () => {
  const navigate = useNavigate()
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
  const [reservation, setReservation] = useState({
    reservationDate: [0, 0],
    reservationTime: [],
    adult: 0,
    kid: 0,
    pet: 0,
    totalPrice: 0,
  })

  useEffect(() => {
    const getData = async event => {
      try {
        const result = await roofTopControl.getRooftopDetail(id)
        setData(result)
        setReservation({
          ...reservation,
          reservationTime: [result.startTime[0], result.endTime[0]],
        })
      } catch (err) {
        console.log(err.message)
      }
    }
    getData()
  }, [])

  const copyUrl = e => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert("URL 복사완료")
    }
  }
  return (
    <Wrapper>
      {data && (
        <>
          <DetailTop>
            {data.rooftopImages ? (
              data.rooftopImages.map(d => (
                <SliderWrapper {...settings}>
                  <Image key={d} src={d.fileUrl} />
                </SliderWrapper>
              ))
            ) : (
              <DefaultSlider>
                <Image src={data.mainImage.fileUrl} />
              </DefaultSlider>
            )}
            <Location>
              <div>
                <Share>
                  <button onClick={copyUrl}>공유하기</button>
                </Share>
                {data.city} {data.district} {data.detail}
              </div>
              <LocationDetail>{data.explainContent}</LocationDetail>
            </Location>
          </DetailTop>
          <InfoLine>
            <div>
              <Tooltip message={(data.width * 0.3025).toFixed(0) + "평"}>
                <Icon icon={faArrowsLeftRight} />
                <IconText>{data.width}m2</IconText>
              </Tooltip>
            </div>
            <div>
              <Tooltip message="0건">
                <Icon icon={faStar} />
                <IconText>{data.grade}/5.0</IconText>
              </Tooltip>
            </div>{" "}
            <div>
              <Tooltip message={"유아 최대 " + data.kidCount + "명"}>
                <Icon icon={faUser} />
                <IconText>{data.totalCount}인 까지</IconText>
              </Tooltip>
            </div>
          </InfoLine>
          <DetailBottom>
            <LeftBox>
              {data.rooftopReviews ? (
                <Review>
                  <ReviewHeader>
                    <Icon icon={faStar} />
                    <IconText>{data.rooftopReviews.length}개의 리뷰</IconText>
                  </ReviewHeader>
                  {data.rooftopReviews.map(d => (
                    <ReviewBox key={d}>
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
              ) : (
                <Review>
                  <ReviewHeader>
                    <IconText>아직 리뷰가 존재하지 않습니다</IconText>
                  </ReviewHeader>
                </Review>
              )}
              <BoxWrapper>
                {data.detailNums.map((d, index) => (
                  <Line key={index}>{RoofTopFacilities[d]}</Line>
                ))}
              </BoxWrapper>
              <BoxWrapper>
                <Title>추가 서비스 내용</Title>
                <Line>
                  <p>환불규정</p>
                  {data.refundContent}
                </Line>
                <Line>
                  <p>루프탑 이용규칙</p>
                  {data.roleContent}
                </Line>
              </BoxWrapper>
              <Button>건물주에게 문의하기</Button>
              {data.structureImage ? (
                <BoxWrapper>
                  <Title>배치도</Title>
                  <ImageManage width={"200px"} src={data.structureImage.fileUrl} />
                </BoxWrapper>
              ) : null}
            </LeftBox>
            <RightBox>
              <ButtonBox>
                <button
                  onClick={() =>
                    openModal(
                      <ReservationTime
                        startTime={data.startTime[0]}
                        endTime={data.endTime[0]}
                        data={reservation}
                        setData={setReservation}
                      />,
                    )
                  }>
                  이용 가능시간
                </button>
                <button
                  onClick={() =>
                    openModal(
                      <ReservationNumber
                        data={reservation}
                        setData={setReservation}
                        adultCount={data.adultCount}
                        kidCount={data.kidCount}
                      />,
                    )
                  }>
                  인원수 설정
                </button>
                <button
                  onClick={() =>
                    openModal(<ReservationDate data={reservation} setData={setReservation} />)
                  }>
                  기간 설정
                </button>
                <div>
                  <Fee>{data.totalPrice}W</Fee>
                </div>
                <button className="pay" onClick={() => navigate(`/payment/${id}`)}>
                  예약하기
                </button>
              </ButtonBox>
            </RightBox>
          </DetailBottom>
        </>
      )}
    </Wrapper>
  )
}

export default ReservationDetail
const Button = styled.button`
  ${({ theme }) => {
    const { paddings, margins } = theme
    return css`
      width: 100%;
      background-color: lightgray;
      padding: ${paddings.base};
      margin-top: ${margins.base};
      border-radius: 1rem;
    `
  }}
`
const DefaultSlider = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      position: relative;
      width: 25vw;
      height: 25vw;
      margin: ${margins.lg};
    `
  }}
`
const ButtonBox = styled.div`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
      padding: ${paddings.lg};
      .pay {
        background-color: black;
        color: white;
      }
    `
  }}
`
const LeftBox = styled.div`
  width: 50%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Fee = styled.div`
  ${({ theme }) => {
    const { fonts } = theme
    return css`
      font-weight: bold;
      font-size: ${fonts.size.sm};
      float: right;
    `
  }}
`
const RightBox = styled.div`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      width: 50%;
      background: white;
      display: flex;
      flex-direction: column;
      border-radius: 2rem;
      padding-left: ${paddings.base};
      button {
        width: 100%;
        height: 2rem;
        margin: 0.3rem;
        border-radius: 0.3rem;
      }
    `
  }}
`
const BoxWrapper = styled.div`
  ${({ theme }) => {
    const { paddings, margins } = theme
    return css`
      width: 100%;
      background-color: gray;
      padding: ${paddings.base};
      margin-top: ${margins.base};
      border-radius: 1rem;
      img {
        width: 100%;
      }
      button {
        float: right;
      }
    `
  }}
`
const Line = styled.div`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      font-weight: ${fonts.weight.bold};
      font-size: ${fonts.size.xsm};
      margin-bottom: ${margins.sm};
      display: inline-block;
      width: 50%;
    `
  }}
`
const ReviewHeader = styled.div`
  text-align: center;
`
const ReviewBox = styled.div`
  ${({ theme }) => {
    const { paddings, margins } = theme
    return css`
      background-color: lightgray;
      div {
        display: flex;
        justify-content: space-between;
      }
      margin: ${margins.base};
      padding: ${paddings.base};
      border-radius: 1rem;
    `
  }}
`
const Review = styled.div`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      border-radius: 1rem;
      width: 100%;
      background-color: gray;
      padding: ${paddings.base};
    `
  }}
`
const Title = styled.p`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      font-weight: ${fonts.weight.bold};
      font-size: ${fonts.size.sm};
      margin-bottom: ${margins.sm};
    `
  }}
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
const SliderWrapper = styled(Slider)`
  width: 50%;
`
const DetailTop = styled.div`
  display: flex;
`
const Location = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`
const LocationDetail = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const InfoLine = styled.div`
  ${({ theme }) => {
    const { margins, paddings, fonts } = theme
    return css`
      display: flex;
      justify-content: space-between;
      padding: ${paddings.base};
      font-size: ${fonts.size.sm}
      border-radius: 1rem;
      margin:  ${margins.base} 0;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    `
  }}
`
const Share = styled.div`
  display: flex;
  justify-content: flex-end;
`
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
