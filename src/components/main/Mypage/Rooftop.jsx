import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Wrapper = styled.div`
  background-color: ;
  width: 60vw;
  display: flex;
  flex-direction: column;
  margin-left: 10vw;

  .list-box {
    margin-top: 2rem;
    border-top: 1px solid gray;
    width: 65%;
  }
  .box {
    padding: 0.6rem;
    border-bottom: 1px solid gray;
    display: flex;
    justify-content: space-between;
  }
  .title {
    font-size: large;
    font-weight: bold;
    padding: 0.6rem;
    margin-top: 1rem;
  }

  .rectangle {
    width: 12vw;
    height: 12vw;
    overflow: hidden;
    background: linear-gradient(to top, grey, white);
    border-radius: 10%;
  }
  .slider-box {
    margin-top: 2rem;
    width: 65%;
  }
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
      <ul className="list-box">
        {listInput.map(d => (
          <li>
            <div className="box">
              <span>{d}</span>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </li>
        ))}
      </ul>
      <div className="title">내 옥상 관리하기</div>
      <div className="slider-box">
        <Slider {...settings}>
          <div>
            <div className="rectangle"></div>
          </div>
          <div>
            <div className="rectangle"></div>
          </div>
          <div>
            <div className="rectangle"></div>
          </div>
          <div>
            <div className="rectangle"></div>
          </div>
        </Slider>
      </div>
    </Wrapper>
  )
}
export default Rooftop
