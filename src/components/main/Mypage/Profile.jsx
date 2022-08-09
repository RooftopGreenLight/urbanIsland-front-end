import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { mypageControl } from "api/mypageControl"
import { AuthContext } from "pages/MainPage"
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
  const [data, setData] = useState()
  const [editNum, setShowNum] = useState(false)
  const [editPwd, setShowPwd] = useState(false)
  const [editInput, setEditInput] = useState({
    pwd: "",
    phoneNum: "",
  })
  const { pwd, phoneNum } = editInput
  const editPhoneNum = async () => {
    try {
      const result = await mypageControl.postMemberChangePhoneNum(phoneNum)
      setShowNum(false)
    } catch (err) {
      console.log(err.message)
    }
  }
  const editPassword = async () => {
    try {
      const result = await mypageControl.postMemberChangePwd(pwd)
      setShowPwd(false)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setEditInput({ ...editInput, [name]: value })
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
  }, [editNum])

  const listInput = ["그린비 등록하기", "옥상지기 등록하기"]
  return (
    <Wrapper>
      {data && (
        <>
          <div className="title">내 프로필 관리하기</div>
          <p>기본정보</p>
          <div className="profile-box">
            <div className="title">{data.name}</div>
            <ul>
              <li>
                <div className="profile-line">
                  <span>{data.email}</span>
                </div>
              </li>
              <li>
                {editNum ? (
                  <div className="profile-line">
                    <input
                      type="text"
                      value={phoneNum}
                      onChange={handleChange}
                      name="phoneNum"
                      placeholder="xxx-xxxx-xxxx"
                    />
                    <button onClick={editPhoneNum}>입력</button>
                  </div>
                ) : (
                  <div className="profile-line">
                    <span>{data.phoneNumber}</span>
                    <button onClick={e => setShowNum(true)}>수정</button>
                  </div>
                )}
              </li>
              <li>
                {editPwd ? (
                  <div className="profile-line">
                    <input type="text" value={pwd} onChange={handleChange} name="pwd" />
                    <button onClick={editPassword}>입력</button>
                  </div>
                ) : (
                  <div className="profile-line">
                    <span>비밀번호 변경</span>
                    <button onClick={e => setShowPwd(true)}>수정</button>
                  </div>
                )}
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
