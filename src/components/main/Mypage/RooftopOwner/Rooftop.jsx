import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { ModalContext } from "module/Modal"

import RegisterRooftop from "./Modal/RegisterRooftop"
import WaitingRooftopModal from "./Modal/WaitingRooftopModal"
import WaitingGreenbeeModal from "./Modal/WaitingGreenbeeModal"
import OwnRooftop from "./OwnRooftop"

import { roofTopControl } from "api/controls/roofTopControl"
import { Link } from "react-router-dom"

const Rooftop = () => {
  const { openModal } = useContext(ModalContext)
  const [ownRooftopList, setOwnRooftopList] = useState([])

  useEffect(() => {
    const loadMyOwnRooftop = async () => {
      const { rooftopResponses } = await roofTopControl.getMyOwnRooftop()
      setOwnRooftopList(rooftopResponses)
    }
    loadMyOwnRooftop()
  }, [])

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
      <ListBox>
        <Box
          onClick={() => {
            openModal(<RegisterRooftop />)
          }}>
          <span>옥상 추가 신청하기</span>
          <FontAwesomeIcon icon={faAngleRight} />
        </Box>
        <Box onClick={() => openModal(<WaitingRooftopModal />)}>
          <span>대기중인 옥상신청</span>
          <FontAwesomeIcon icon={faAngleRight} />
        </Box>
        <Box onClick={() => openModal(<WaitingGreenbeeModal />)}>
          <span>대기중인 그린비 찾기</span>
          <FontAwesomeIcon icon={faAngleRight} />
        </Box>
      </ListBox>
      <Title>내 옥상 관리하기</Title>
      <SliderBox>
        <Slider {...settings}>
          {[...Array(5).keys()].map(elm => (
            <div key={elm}>
              {ownRooftopList[elm] ? (
                <Link to={`/mypage/rooftop/supervise/${elm}`}>
                  <OwnRooftop rooftopInfo={ownRooftopList[elm]} />
                </Link>
              ) : (
                <Rectangle />
              )}
            </div>
          ))}
        </Slider>
      </SliderBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 55vw;
  margin: auto;

  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  text-align: left;
  font-size: large;

  font-weight: bold;
  padding: 0.6rem;
  margin: 2rem auto;
`
const Rectangle = styled.div`
  width: 11vw;
  height: 11vw;
  overflow: hidden;
  background: linear-gradient(to top, grey, #d4d4d4);
  border-radius: 10%;
`
const SliderBox = styled.div`
  margin: auto;
  width: 65%;
`
const Box = styled.div`
  padding: 0.6rem;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: space-between;
`
const ListBox = styled.div`
  margin-top: 2rem;
  border-top: 1px solid gray;
  width: 65%;
  margin: auto;
`

export default Rooftop
