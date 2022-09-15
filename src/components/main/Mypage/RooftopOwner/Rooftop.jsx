import { useContext, useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faBuilding } from "@fortawesome/free-solid-svg-icons"
import { ModalContext } from "module/Modal"

import { Wrapper, Title, ServiceList, ServiceBox } from "components/common/Style/Mypage/CommonStyle"
import { NoticeEmptyIcon } from "components/common/Style/NoticeEmpty/CommonStyle"

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

  const rooftopAmount = useMemo(() => ownRooftopList?.length, [ownRooftopList])

  const SlickSettings = {
    dots: rooftopAmount > 3,
    infinite: rooftopAmount > 3,
    lazyLoad: "progressive",
    speed: 250,
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  return (
    <Wrapper>
      <ServiceList>
        <Title>
          <h5>등록된 옥상 관리하기</h5>
        </Title>
        <SliderBox>
          {ownRooftopList.length > 0 ? (
            <Slider {...SlickSettings}>
              {ownRooftopList.map((rooftopInfo, idx) => (
                <div key={idx}>
                  <Link to={`/mypage/rooftop/supervise/${rooftopInfo.id}`}>
                    <OwnRooftop rooftopInfo={rooftopInfo} />
                  </Link>
                </div>
              ))}
            </Slider>
          ) : (
            <NoticeEmptyIcon>
              <FontAwesomeIcon icon={faBuilding} />
              <h5>등록된 옥상 없음</h5>
              <p>아직 Urban Island에 등록한 옥상이 없습니다.</p>
            </NoticeEmptyIcon>
          )}
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
    </Wrapper>
  )
}

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
