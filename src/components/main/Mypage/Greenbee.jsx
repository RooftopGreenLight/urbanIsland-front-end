import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"

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
`
const Greenbee = () => {
  const listInput = [
    "본인을 선택한 옥상 확인하기",
    "녹화가 필요한 옥상 찾기",
    "그린비 페이지 확인/수정",
  ]
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
    </Wrapper>
  )
}
export default Greenbee
