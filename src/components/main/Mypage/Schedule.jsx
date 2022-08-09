import React, { useState } from "react"
import styled from "styled-components"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"

const Wrapper = styled.div`
  width: 60vw;
  display: flex;
  flex-direction: column;
  margin-left: 10vw;

  .inner-box {
    width: 65%;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    margin-top: 2rem;
    padding: 1rem;
  }
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
`
const Schedule = () => {
  const [value, onChange] = useState(new Date())
  const listInput = ["문의 응답 확인하기"]
  return (
    <Wrapper>
      <Calendar onChange={onChange} value={value} />
      <div className="inner-box">
        <div className="box">
          <span>예약일자</span>
          <span>2.22~2.23</span>
        </div>{" "}
        <div className="box">
          <span>예약시간</span>
          <span>AM 11 ~ PM8</span>
        </div>{" "}
        <div className="box">
          <span>총 인원</span>
          <span>x명(반려동물 1)</span>
        </div>
      </div>
      <div className="inner-box">쪽지내역</div>
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
    </Wrapper>
  )
}
export default Schedule
