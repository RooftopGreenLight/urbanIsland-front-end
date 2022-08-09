import React from "react"
import styled from "styled-components"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import MypageList from "./MypageList"
const Wrapper = styled.div`
  background-color: ;
  width: 60vw;
  display: flex;
  flex-direction: column;
  margin-left: 10vw;
`
const Title = styled.div`
  font-size: large;
  font-weight: bold;
  padding: 0.6rem;
  margin-top: 1rem;
`
const Rectangle = styled.div`
  width: 12vw;
  height: 12vw;
  overflow: hidden;
  background: linear-gradient(to top, grey, white);
  border-radius: 10%;
`
const SliderBox = styled.div`
  margin-top: 2rem;
  width: 65%;
`
const Rooftop = () => {
  const listInput = ["옥상 추가 신청하기", "대기중인 옥상신청", "대기중인 그린비 찾기"]
  const settings = {
    arrow: false,
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
  }
  return (
    <Wrapper>
      <MypageList props={listInput} />
      <Title>내 옥상 관리하기</Title>
      <SliderBox>
        <Slider {...settings}>
          <div>
            <Rectangle />
          </div>
          <div>
            <Rectangle />
          </div>
          <div>
            <Rectangle />
          </div>
          <div>
            <Rectangle />
          </div>
        </Slider>
      </SliderBox>
    </Wrapper>
  )
}
export default Rooftop
