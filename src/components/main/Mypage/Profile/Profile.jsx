import React, { useContext, useEffect, useState, useCallback } from "react"
import styled from "styled-components"
import { mypageControl } from "api/controls/mypageControl"
import ProfileModal from "./Modal/ProfileModal"
import { ModalContext } from "module/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import ApplyModal from "./Modal/ApplyModal"
import { Link } from "react-router-dom"
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
const Wrapper = styled.div`
  background-color: ;
  width: 60vw;
  display: flex;
  flex-direction: column;
  margin-left: 10vw;
`
const PTag = styled.p`
  color: gray;
  padding-left: 0.6rem;
`

const ProfileBox = styled.div`
  width: 65%;
  background-color: white;
  align-items: center;
`
const ProfileLine = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  padding: 0.6rem;
  color: gray;
`
const Title = styled.div`
  justify-content: space-between;
  font-size: large;
  font-weight: bold;
  padding: 0.6rem;
`
const Profile = () => {
  const [data, setData] = useState()
  const { openModal } = useContext(ModalContext)

  const editPhoneNum = useCallback(async phoneNum => {
    try {
      const result = await mypageControl.postMemberChangePhoneNum(phoneNum)
    } catch (err) {
      console.log(err.message)
    }
  })
  const editPassword = async pwd => {
    try {
      const result = await mypageControl.postMemberChangePwd(pwd)
    } catch (err) {
      console.log(err.message)
    }
  }
  const editNickName = useCallback(async name => {
    try {
      const result = await mypageControl.postMemberChangeNickname(name)
    } catch (err) {
      console.log(err.message)
    }
  })

  useEffect(() => {
    const getProfile = async () => {
      try {
        const result = await mypageControl.getMemberInfo()
        setData(result)
      } catch (err) {
        console.log(err.message)
      }
    }
    getProfile()
  }, [])

  return (
    <Wrapper>
      {data && (
        <>
          <Title>내 프로필 관리하기</Title>
          <PTag>기본정보</PTag>
          <ProfileBox>
            <ProfileLine>
              {data.name}{" "}
              <button
                onClick={() => {
                  openModal(<ProfileModal apiFunction={editNickName} placeholder="닉네임수정" />)
                }}>
                입력
              </button>
            </ProfileLine>
            <ProfileLine>
              <span>{data.email}</span>
            </ProfileLine>
            <ProfileLine>
              <span>{data.phoneNumber ? data.phoneNumber : <p>폰번호 입력</p>}</span>
              <button
                onClick={() => {
                  openModal(<ProfileModal apiFunction={editPhoneNum} placeholder="XXX-XXXX-XXXX" />)
                }}>
                입력
              </button>
            </ProfileLine>
            <ProfileLine>
              <span>비밀번호 변경</span>
              <button
                onClick={() =>
                  openModal(<ProfileModal apiFunction={editPassword} placeholder="비밀번호 변경" />)
                }>
                수정
              </button>
            </ProfileLine>
          </ProfileBox>
        </>
      )}
      <ListBox>
        <Link to="/mypage/greenbeeapply">
          <Box>
            <span>그린비 등록하기</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </Box>
        </Link>
        <Box onClick={() => openModal(<ApplyModal />)}>
          <span>옥상지기 등록하기</span>
          <FontAwesomeIcon icon={faAngleRight} />
        </Box>
      </ListBox>
    </Wrapper>
  )
}
export default Profile
