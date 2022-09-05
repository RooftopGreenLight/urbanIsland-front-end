import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import styled, { css } from "styled-components"

import defaultProfile from "assets/img/defaultProfile.png"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
const SuperviseRooftop = () => {
  const { id } = useParams()
  const startDate = new Date()
  const [value, onChange] = useState(new Date())
  const [price, setPrice] = useState(0)
  const onChangeInput = e => {
    setPrice(e.target.value)
  }
  return (
    <Wrapper>
      <UpperBox>
        <SideBox>
          <Image src={defaultProfile} />
          <BoxWrapper color="white">
            <Title>예약내역</Title>
            <div>주문자:김ㅇㅇ</div>
            <div>주문자 번호:010-0000-0000</div>
            <div>대여시간: 13:00~21:00</div>
            <div>대여기간: 22.01.01~22.04.03</div>
          </BoxWrapper>
          <BoxWrapper>
            <Title>채팅내역</Title>
            채팅은 추후 업데이트
          </BoxWrapper>
          <Button>내 옥상 수정하기</Button>
        </SideBox>
        <SideBox>
          {" "}
          <BoxWrapper color="white">
            <Calendar
              minDate={startDate}
              onChange={onChange}
              value={value}
              selectRange={true}
              returnValue={"range"}
            />
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
          <div>
            1일당 가격 책정하기 <input type="text" onChange={onChangeInput} />원
          </div>
        </SideBox>
      </UpperBox>
      <BottomBox>
        <Title>수수료 산정 공지</Title>
        <p>현재 옥상에 대한 수수료 10%</p>
        수수료 재산정의 경우 어쩌구 저쩌구
        <Button>수수료 재산정 요청</Button>
      </BottomBox>
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
      background-color: ${props => props.color || "gray"};
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
const Button = styled.button`
  ${({ theme }) => {
    const { paddings, margins } = theme
    return css`
      width: 100%;
      padding: ${paddings.base};
      margin: ${margins.sm};
      border-radius: 1rem;
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
      width: 70%;
      padding: ${paddings.sm};
      margin: ${margins.sm};
    `
  }}
`

export default SuperviseRooftop
