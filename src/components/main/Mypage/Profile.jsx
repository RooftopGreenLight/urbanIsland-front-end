import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { mypageControl } from "api/mypageControl"
import ProfileModal from "./Modals/ProfileModal"
import { ModalContext } from "module/Modal"
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
  }
  .title {
    justify-content: space-between;
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
  const [data, setData] = useState()

  const { openModal } = useContext(ModalContext)
  const editPhoneNum = async phoneNum => {
    try {
      const result = await mypageControl.postMemberChangePhoneNum(phoneNum)
    } catch (err) {
      console.log(err.message)
    }
  }
  const editPassword = async pwd => {
    try {
      const result = await mypageControl.postMemberChangePwd(pwd)
    } catch (err) {
      console.log(err.message)
    }
  }
  const editNickName = async name => {
    try {
      const result = await mypageControl.postMemberChangeNickname(name)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    const getProfile = async event => {
      try {
        const result = await mypageControl.getMemberInfo()
        setData(result)
      } catch (err) {
        console.log(err.message)
      }
    }
    getProfile()
  }, [editPhoneNum, editNickName, editPhoneNum])

  const listInput = ["그린비 등록하기", "옥상지기 등록하기"]
  return (
    <Wrapper>
      {data && (
        <>
          <div className="title">내 프로필 관리하기</div>
          <p>기본정보</p>
          <div className="profile-box">
            <div>
              <span className="title">{data.name}</span>{" "}
              <button
                onClick={() => {
                  openModal(<ProfileModal apiFunction={editNickName} placeholder="닉네임수정" />)
                }}>
                입력
              </button>
            </div>
            <ul>
              <li>
                <div className="profile-line">
                  <span>{data.email}</span>
                </div>
              </li>
              <li>
                <div className="profile-line">
                  <span>{data.phoneNumber ? data.phoneNumber : <p>폰번호 입력</p>}</span>
                  <button
                    onClick={() => {
                      openModal(
                        <ProfileModal apiFunction={editPhoneNum} placeholder="XXX-XXXX-XXXX" />,
                      )
                    }}>
                    입력
                  </button>
                </div>
              </li>
              <li>
                <div className="profile-line">
                  <span>비밀번호 변경</span>
                  <button
                    onClick={() =>
                      openModal(
                        <ProfileModal apiFunction={editPassword} placeholder="비밀번호 변경" />,
                      )
                    }>
                    수정
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </>
      )}
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
