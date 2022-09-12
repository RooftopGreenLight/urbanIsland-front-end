import { Link, useParams } from "react-router-dom"
import styled, { css } from "styled-components"
import { CalenderContainer } from "styles/calender"
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
  const [data, setData] = useState({ mainImage: [], city: "", district: "", detail: "" })

  useEffect(() => {
    const loadCurrentInfo = async () => {
      try {
        const result = await roofTopControl.getRooftopDetail(id)
        const { mainImage, city, district, detail } = result
        setData({ mainImage, city, district, detail })
      } catch (err) {
        console.log(err.message)
      }
    }
    loadCurrentInfo()
  }, [])
  const { mainImage, city, district, detail } = data
  return (
    <Wrapper>
      {data && (
        <Maintitle>
          {city} {district} {detail} 옥상
        </Maintitle>
      )}
      <ViewPoint>
        <Title>대표이미지</Title>
        {mainImage && <Image src={mainImage.fileUrl} />}
        <BoxWrapper>
          <CalenderContainer>
            <Title>캘린더</Title>
            <Calendar />
          </CalenderContainer>
        </BoxWrapper>
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
          <Title>문의 알림란</Title>
          <InnerBox>
            <InnerTop>
              <p>문의</p>
              <span>22.07.20 11:20</span>
            </InnerTop>
            <span>
              혹시 애견인 모임으로 활용하려 하는데 xx개의 좌석 확보할 수 있을까요?혹시 애견인
              모임으로 활용하려 하는데 xx개의 좌석 확보할 수 있을까요?
            </span>
          </InnerBox>
          <InnerBox>
            <InnerTop>
              <p>문의</p>
              <span>22.07.20 11:20</span>
            </InnerTop>
            <span> 혹시 애견인 모임으로 활용하려 하는데 xx개의 좌석 확보할 수 있을까요?</span>
          </InnerBox>
        </BoxWrapper>
        <BoxWrapper>
          <Title>조경업체</Title>
          <p>서울특별시 동구 테스트 주소 어쩌구</p>
          <span>전화번호: 010-1111-2222</span>
        </BoxWrapper>
        <BoxWrapper>
          <Title>수수료 산정 공지</Title>
          <p>현재 옥상에 대한 수수료 10%</p>
          <span>
            수수료 재산정의 경우 어쩌구
            ㅁㄴㅇㅁㄴㅇㅁㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㅇㄴㄴㅇㅁㅇㅁㄴㅇㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ
          </span>
          <Button type="fee">수수료 재산정 요청</Button>
        </BoxWrapper>
        <BoxWrapper>
          <Button>
            <Link to={`/mypage/rooftop/supervise/detail/${id}`}>내 옥상 수정하기</Link>
          </Button>
        </BoxWrapper>
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
      background-color: ${props =>
        props.type === "fee" ? colors.main.tertiary : colors.main.primary};

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
    const { colors, paddings, margins } = theme
    return css`
      display: flex;
      justify-content: space-between;
      padding: ${paddings.sm};
      color: ${colors.black.secondary};

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
  width: 35vw;
  height: 80vh;
  margin: 0vh auto;
`
const ViewPoint = styled.div`
  max-height: 80vh;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`
const BoxWrapper = styled.div`
  ${({ theme }) => {
    const { fonts, paddings, margins } = theme
    return css`
      width: 100%;
      padding: ${paddings.sm} 0vw;
      margin: ${margins.sm} 0vw;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      img {
        width: 100%;
        height: 40vh;
        object-fit: cover;
        margin: ${margins.lg} auto 0vw auto;
      }
      p {
        font-weight: 300;
        text-align: right;
      }

      span {
        padding-left: ${paddings.sm};
        margin: ${margins.xsm} 0vw;
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: left;
      }
    `
  }}
`
const Maintitle = styled.h5`
  ${({ theme }) => {
    const { fonts, colors, paddings, margins } = theme
    return css`
      width: 100%;
      padding-bottom: ${paddings.xsm};
      margin-bottom: ${margins.base};
      color: ${colors.main.secondary};
      font-size: ${fonts.size.base};
    `
  }}
`
const Title = styled.h5`
  ${({ theme }) => {
    const { fonts, colors, paddings, margins } = theme
    return css`
      width: 100%;
      padding-bottom: ${paddings.xsm};
      border-bottom: 1px solid ${colors.main.primary}55;
      margin-bottom: ${margins.base};
      color: ${colors.main.secondary};
      font-size: ${fonts.size.base};
    `
  }}
`

const InnerBox = styled.div`
  ${({ theme }) => {
    const { margins, colors, paddings } = theme
    return css`
      width: 100%;
      margin-bottom: ${margins.base};
      padding: ${paddings.sm};
      border-bottom: 1px solid ${colors.main.primary}55;
    `
  }}
`

const InnerTop = styled.div`
  display: flex;
  justify-content: space-between;
`
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
