import { useContext, useState } from "react"
import styled from "styled-components"

import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

import { ModalContext } from "module/Modal"
import ChatRoomPage from "components/main/Chat/ChatRoomPage"

const Schedule = () => {
  const [value, onChange] = useState(new Date())
  const { openModal } = useContext(ModalContext)
  return (
    <Wrapper>
      <Calendar onChange={onChange} value={value} />
      <InnerBox>
        <Box>
          <span>예약일자</span>
          <span>2.22~2.23</span>
        </Box>
        <Box>
          <span>예약시간</span>
          <span>AM 11 ~ PM8</span>
        </Box>
        <Box>
          <span>총 인원</span>
          <span>x명(반려동물 1)</span>
        </Box>
      </InnerBox>
      <InnerBox onClick={() => openModal(<ChatRoomPage />)}>쪽지내역</InnerBox>
      <ListBox>
        <Box>문의 내역 확인하기</Box>
      </ListBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 50vw;
  margin: auto;

  display: flex;
  flex-direction: column;
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
const ListBox = styled.div`
  margin-top: 2rem;
  border-top: 1px solid gray;
  width: 65%;
`

export default Schedule
