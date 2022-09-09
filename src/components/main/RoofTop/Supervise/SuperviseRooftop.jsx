import { Link, useParams } from "react-router-dom"
import styled, { css } from "styled-components"
import { CalenderContainer } from "styles/calender"
import defaultProfile from "assets/img/defaultProfile.png"
import Calendar from "react-calendar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react"
import { roofTopControl } from "api/controls/roofTopControl"
import {
  faBuilding,
  faCalendar,
  faClock,
  faComments,
  faUser,
} from "@fortawesome/free-solid-svg-icons"

import "react-calendar/dist/Calendar.css"
const SuperviseRooftop = () => {
  const { id } = useParams()
  const [input, setInput] = useState({
    mainImage: [],
    adultCount: 0,
    kidCount: 0,
    petCount: 0,
    totalCount: 0,
    startTime: [],
    endTime: [],
    totalPrice: 0,
    deleteImages: [],
    addImages: [],
    rooftopImages: [],
    structureImage: [],
  })

  const { mainImage, totalCount, deleteImages, addImages, rooftopImages, structureImage } = input

  useEffect(() => {
    const loadCurrentInfo = async () => {
      const {
        mainImage,
        structureImage,
        rooftopImages,
        kidCount,
        adultCount,
        petCount,
        totalCount,
        totalPrice,
        startTime,
        endTime,
      } = await roofTopControl.getRooftopDetail(id)
      setInput({
        ...input,
        rooftopImages: rooftopImages.filter(
          ({ rooftopImageType }) => rooftopImageType === "NORMAL",
        ),
        structureImage,
        kidCount,
        adultCount,
        petCount,
        totalCount,
        totalPrice,
        startTime,
        endTime,
        mainImage,
      })
    }
    loadCurrentInfo()
  }, [])
  return (
    <Wrapper>
      <ViewPoint>
        <UpperBox>
          <SideBox>
            {mainImage && <Image src={mainImage.fileUrl} />}
            <BoxWrapper>
              <Title>예약내역</Title>
              <ScheduleDetail>
                <p>
                  <FontAwesomeIcon icon={faBuilding} size="lg" />
                  예약 숙소
                </p>
                <span>경기도 화성시 시범중앙로 109 320동 601호</span>
              </ScheduleDetail>
              <ScheduleDetail>
                <p>
                  <FontAwesomeIcon icon={faCalendar} size="lg" />
                  예약일자
                </p>
                <span>2022.9.22 - 2022.9.23</span>
              </ScheduleDetail>
              <ScheduleDetail>
                <p>
                  <FontAwesomeIcon icon={faClock} size="lg" />
                  예약시간
                </p>
                <span>AM 11:00 ~ PM 8:00</span>
              </ScheduleDetail>
              <ScheduleDetail>
                <p>
                  <FontAwesomeIcon icon={faUser} size="lg" /> 총 인원
                </p>
                <span>성인 2명, 유아 1명 (반려동물 1마리)</span>
              </ScheduleDetail>
            </BoxWrapper>
            <BoxWrapper>
              <Title>채팅내역</Title>
              <Button>
                <FontAwesomeIcon icon={faComments} /> 채팅 목록 열기
              </Button>
            </BoxWrapper>
            <BoxWrapper>
              {" "}
              <Link to={`/mypage/rooftop/supervise/detail/${id}`}>
                <Button>내 옥상 수정하기</Button>
              </Link>
            </BoxWrapper>
          </SideBox>
          <SideBox>
            <BoxWrapper>
              <CalenderContainer>
                <Calendar />
              </CalenderContainer>
            </BoxWrapper>
            <BoxWrapper>
              <Title>문의 알림란</Title>
              <InnerBox>
                <InnerTop>
                  <InnerTitle>문의</InnerTitle>
                  <div>22.07.20 11:20</div>
                </InnerTop>
                <InnerMessage>
                  혹시 애견인 모임으로 활용하려 하는데 xx개의 좌석 확보할 수 있을까요?
                </InnerMessage>
              </InnerBox>
              <InnerBox>
                <InnerTop>
                  <InnerTitle>문의</InnerTitle>
                  <div>22.07.20 11:20</div>
                </InnerTop>
                <InnerMessage>
                  혹시 애견인 모임으로 활용하려 하는데 xx개의 좌석 확보할 수 있을까요?
                </InnerMessage>
              </InnerBox>
            </BoxWrapper>
            <BoxWrapper>
              <Title>조경업체</Title>
              <div>서울특별시 동구 테스트 주소 어쩌구</div>
              <div>전화번호: 010-1111-2222</div>
            </BoxWrapper>
          </SideBox>
        </UpperBox>
        <BottomBox>
          <Title>수수료 산정 공지</Title>
          <p>현재 옥상에 대한 수수료 10%</p>
          수수료 재산정의 경우 어쩌구 저쩌구
          <Button>수수료 재산정 요청</Button>
        </BottomBox>
      </ViewPoint>
    </Wrapper>
  )
}
const Button = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 90%;
      padding: ${paddings.sm} ${paddings.base};
      margin: ${margins.lg} auto;

      cursor: pointer;
      border-radius: ${fonts.size.sm};
      background-color: ${colors.main.primary};

      text-align: center;
      color: ${colors.white};
      font-size: ${fonts.size.sm};

      svg {
        margin: auto ${margins.sm} auto 0vw;
      }

      &:hover {
        background-color: ${colors.main.tertiary};
        font-weight: ${fonts.weight.bold};
      }
    `
  }}
`

const ScheduleDetail = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      display: flex;
      justify-content: space-between;
      padding: ${paddings.sm};
      color: ${colors.black.secondary};

      span {
        width: 55%;
        font-weight: 300;
        text-align: right;
      }

      p {
        width: 40%;
        margin: ${margins.xsm} 0vw;
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: left;
      }

      svg {
        color: ${colors.main.primary};
        margin: auto ${margins.base} auto 0vw;
      }
    `
  }}
`

const Wrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
`
const ViewPoint = styled.div`
  max-height: 80vh;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`

const UpperBox = styled.div`
  display: flex;
`
const BottomBox = styled.div`
  ${({ theme }) => {
    const { paddings, margins } = theme
    return css`
      padding: ${paddings.sm};
      margin: ${margins.sm};
    `
  }}
`
const BoxWrapper = styled.div`
  ${({ theme }) => {
    const { paddings, margins } = theme
    return css`
      width: 100%;
      padding: ${paddings.base};
      margin: ${margins.sm} 0;
      border-radius: 1rem;
      input {
        display: inline-block;
      }
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
const SideBox = styled.div`
  ${({ theme }) => {
    const { paddings, margins } = theme
    return css`
      width: 50%;
      background: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: ${paddings.sm};
      margin: ${margins.sm};
    `
  }}
`

const InnerBox = styled.div`
  ${({ theme }) => {
    const { paddings, margins } = theme
    return css`
      border-radius: 1rem;
      width: 100%;
      background-color: lightgray;
      padding: ${paddings.base};
      margin-bottom: ${margins.base};
    `
  }}
`

const InnerTop = styled.div`
  display: flex;
  justify-content: space-between;
`
const InnerTitle = styled.div``
const InnerMessage = styled.div``

const Image = styled.img`
  ${({ theme }) => {
    const { paddings, margins } = theme
    return css`
      width: 100%;
      padding: ${paddings.sm};
      margin: ${margins.sm};
    `
  }}
`

export default SuperviseRooftop
