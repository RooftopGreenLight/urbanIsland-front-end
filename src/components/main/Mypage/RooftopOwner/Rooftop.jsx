import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { ModalContext } from "module/Modal"

import WaitingRooftopModal from "./Modal/WaitingRooftopModal"
import WaitingGreenbeeModal from "./Modal/WaitingGreenbeeModal"
import OwnRooftop from "./OwnRooftop"

import { roofTopControl } from "api/controls/roofTopControl"

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

  const SlickSettings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  return (
    <Wrapper>
      <ViewPoint>
        <ServiceList>
          <Title>
            <h5>등록된 옥상 관리하기</h5>
          </Title>
          <SliderBox>
            <Slider {...SlickSettings}>
              {ownRooftopList.map((rooftopInfo, idx) => (
                <div key={idx}>
                  <Link to={`/mypage/rooftop/supervise/${idx}`}>
                    <OwnRooftop rooftopInfo={rooftopInfo} />
                  </Link>
                </div>
              ))}
            </Slider>
          </SliderBox>
        </ServiceList>
        <ServiceList>
          <Title>
            <h5>내 서비스 관리하기</h5>
          </Title>
          <Link to="/mypage/rooftop/apply">
            <ServiceBox>
              <div className="introduce">
                <h5>녹화된 옥상 등록하기</h5>
                <p>이미 녹화된 옥상을 가지고 계신가요?</p>
              </div>
              <FontAwesomeIcon icon={faAngleRight} />
            </ServiceBox>
          </Link>
          <Link to="/mypage/rooftop/request">
            <ServiceBox>
              <div className="introduce">
                <h5>그린비 매칭 신청하기</h5>
                <p>아직 옥상이 녹화 되어있지 않으신가요?</p>
              </div>
              <FontAwesomeIcon icon={faAngleRight} />
            </ServiceBox>
          </Link>
          <ServiceBox onClick={() => openModal(<WaitingRooftopModal />)}>
            <div className="introduce">
              <h5>대기중인 옥상 등록 신청</h5>
              <p>새롭게 등록한 옥상 시설의 진행 상황을 확인합니다</p>
            </div>
            <FontAwesomeIcon icon={faAngleRight} />
          </ServiceBox>
          <ServiceBox onClick={() => openModal(<WaitingGreenbeeModal />)}>
            <div className="introduce">
              <h5>대기중인 그린비 찾기</h5>
              <p>녹화를 신청한 시설을 작업할 그린비 목록을 확인합니다.</p>
            </div>
            <FontAwesomeIcon icon={faAngleRight} />
          </ServiceBox>
        </ServiceList>
      </ViewPoint>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 35vw;
  height: 75vh;
  margin: auto;

  display: flex;
  flex-direction: column;
`

const ViewPoint = styled.div`
  max-height: 80vh;
  padding: 0rem 1rem;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`

const Title = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      padding: ${paddings.sm} ${paddings.base};
      margin-bottom: ${margins.sm};

      display: flex;
      border-bottom: 1px solid ${colors.main.primary}77;

      color: ${colors.main.primary};
      text-align: center;

      h5 {
        width: 90%;

        font-size: ${fonts.size.base};
        font-weight: ${fonts.weight.bold};
        text-align: left;
      }
    `
  }}
`

const ServiceList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.5vh;
`

const ServiceBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      display: flex;
      justify-content: space-between;
      padding: ${paddings.base};
      border-bottom: 1px solid ${colors.main.primary}55;

      p {
        color: ${colors.black.quinary};
        font-weight: ${fonts.weight.light};
      }

      h5 {
        margin-bottom: 0.25rem;
        color: ${colors.black.secondary};
        font-size: ${fonts.size.sm};
      }

      svg {
        margin: auto 0vw;
        color: ${colors.main.primary};
      }

      button {
        width: 10%;
        padding: ${paddings.sm} 0vw;
        margin: auto 0vw auto auto;

        border-radius: ${fonts.size.xsm};
        background-color: ${colors.main.secondary};

        color: ${colors.white};
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};

        &:hover {
          background-color: ${colors.main.tertiary};
          font-weight: ${fonts.weight.bold};
        }
      }
    `
  }}
`
const SliderBox = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      margin: ${margins.lg} auto;
      width: 95%;
    `
  }}
`

export default Rooftop
