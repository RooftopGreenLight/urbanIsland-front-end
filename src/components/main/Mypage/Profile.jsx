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

  .profile-box {
    width: 65%;
    background-color: white;
    align-items: center;
  }
  .profile-line {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gray;
    padding: 0.6rem;
    color: gray;
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
  .title {
    font-size: large;
    font-weight: bold;
    padding: 0.6rem;
  }
  p {
    color: gray;
    padding-left: 0.6rem;
  }
`
const Profile = () => {
  const listInput = ["그린비 등록하기", "옥상지기 등록하기"]
  return (
    <Wrapper>
      <div className="title">내 프로필 관리하기</div>
      <p>기본정보</p>
      <div className="profile-box">
        <div className="title">사용자이름</div>
        <ul>
          <li>
            <div className="profile-line">
              <span>example@naver.com</span>
              <button>수정</button>
            </div>
          </li>
          <li>
            <div className="profile-line">
              <span>010-0000-0000</span>
              <button>수정</button>
            </div>
          </li>
          <li>
            <div className="profile-line">
              <span>비밀번호 변경</span>
              <button>수정</button>
            </div>
          </li>
        </ul>
      </div>

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
export default Profile
