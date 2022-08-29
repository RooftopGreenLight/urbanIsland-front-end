import { useContext, useEffect, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

import { mypageControl } from "api/controls/mypageControl"
import { ModalContext } from "module/Modal"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"

import ApplyModal from "./Modal/ApplyModal"
import ProfileModal from "./Modal/ProfileModal"

const Profile = () => {
  const [data, setData] = useState()
  const { openModal } = useContext(ModalContext)

  const editPhoneNum = useCallback(async phoneNum => {
    try {
      await mypageControl.postMemberChangePhoneNum(phoneNum)
    } catch (err) {
      console.log(err.message)
    }
  })
  const editPassword = async pwd => {
    try {
      await mypageControl.postMemberChangePwd(pwd)
    } catch (err) {
      console.log(err.message)
    }
  }
  const editNickName = useCallback(async name => {
    try {
      await mypageControl.postMemberChangeNickname(name)
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
          <Title>
            <h5>내 프로필 관리하기</h5>
            <p>사용자 기본 정보</p>
          </Title>
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

const Wrapper = styled.div`
  width: 50vw;
  height: 75vh;
  margin: auto;

  display: flex;
  flex-direction: column;
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
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 65%;

      padding-bottom: ${paddings.sm};
      margin-bottom: ${margins.base};

      border-bottom: 1px solid ${colors.main.primary};

      h5 {
        margin-bottom: ${margins.sm};

        color: ${colors.main.secondary};
        font-size: ${fonts.size.base};
        font-weight: ${fonts.weight.bold};
      }

      p {
        color: ${colors.main.secondary};
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
      }
    `
  }}
`

export default Profile
