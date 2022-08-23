import React, { useContext, useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { mypageControl } from "api/controls/mypageControl"

import { ModalContext } from "module/Modal"
import { AuthCheckMemberId } from "module/Auth"
import defaultProfile from "assets/img/defaultProfile.png"
import MypageBoxModal from "./Modal/MypageBoxModal"

const MypageBox = () => {
  const [userData, setUserData] = useState({
    authority: "",
    email: "",
    id: 0,
    name: "",
    profile: null,
  })
  const [isProfileLoading, setProfileLoading] = useState(false)
  const { openModal } = useContext(ModalContext)
  const memberId = useRecoilValue(AuthCheckMemberId)

  const { authority, name, profile } = userData

  useEffect(() => {
    const getUserData = async () => {
      setProfileLoading(false)
      try {
        const memberInfo = await mypageControl.getMemberInfo()
        const profile = await mypageControl.getProfile(memberId)
        setUserData({ ...memberInfo, profile: profile.data?.fileUrl ?? defaultProfile })
        setProfileLoading(true)
      } catch (err) {
        console.log(err.message)
        setUserData({ ...userData, profile: defaultProfile })
      }
    }
    getUserData()
  }, [profile])

  return (
    <Wrapper>
      <ProfileArea>
        <ProfileBox>
          <Profile src={isProfileLoading ? profile : defaultProfile} />
          <ProfileEditButton
            onClick={() =>
              openModal(<MypageBoxModal userData={userData} setUserData={setUserData} />)
            }>
            <FontAwesomeIcon icon={faPenToSquare} />
          </ProfileEditButton>
        </ProfileBox>
        <PTag>{name}</PTag>
      </ProfileArea>
      <NavArea>
        <PTag>
          <NavStyle to="/mypage/profile">내프로필</NavStyle>
        </PTag>
        <PTag>
          <NavStyle to="/mypage/schedule">일정관리</NavStyle>
        </PTag>
        <PTag>
          <NavStyle to="/mypage/greenbee">그린비</NavStyle>
        </PTag>
        <PTag>
          <NavStyle to="/mypage/rooftop">옥상지기</NavStyle>
        </PTag>
        {authority === "ROLE_ADMIN" && (
          <PTag>
            <NavStyle to="/mypage/admin">관리자</NavStyle>
          </PTag>
        )}
      </NavArea>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 20vw;
  height: 80vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`
const NavArea = styled.div`
  padding-top: 6vh;
`
const PTag = styled.p`
  padding-top: 0.5rem;
  font-size: 20px;
  font-weight: bold;
`
const ProfileArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6vh;
`
const Profile = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
`
const ProfileBox = styled.div`
  width: 5rem;
  height: 5rem;
  position: relative;
`
const ProfileEditButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: green;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
const NavStyle = styled(NavLink)`
  color: grey;

  &.active {
    color: black;
    text-decoration: underline;
  }
`

export default MypageBox
