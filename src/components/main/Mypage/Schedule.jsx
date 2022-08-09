import React, { useState } from "react"
import styled from "styled-components"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import MypageList from "./MypageList"
const Wrapper = styled.div`
  background-color: ;
  width: 60vw;
  display: flex;
  flex-direction: column;
  margin-left: 10vw;
`
const InnerBox = styled.div`
  width: 65%;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-top: 2rem;
  padding: 1rem;
`
const Box = styled.div`
  padding: 0.6rem;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: space-between;
`
const Schedule = () => {
  const [value, onChange] = useState(new Date())
  const listInput = ["문의 응답 확인하기"]
  return (
    <Wrapper>
      <Calendar onChange={onChange} value={value} />
      <InnerBox>
        <Box>
          <span>예약일자</span>
          <span>2.22~2.23</span>
        </Box>{" "}
        <Box>
          <span>예약시간</span>
          <span>AM 11 ~ PM8</span>
        </Box>{" "}
        <Box>
          <span>총 인원</span>
          <span>x명(반려동물 1)</span>
        </Box>
      </InnerBox>
      <InnerBox>쪽지내역</InnerBox>
      <MypageList props={listInput} />
    </Wrapper>
  )
}
export default Schedule
