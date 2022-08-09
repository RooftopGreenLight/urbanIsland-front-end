import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import defaultProfile from "assets/img/defaultProfile.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { mypageControl } from "api/mypageControl"
import { ModalContext } from "module/Modal"
import MypageBoxModal from "./Modals/MypageBoxModal"

const Wrapper = styled.div`
  width: 20vw;
  height: 80vh;
  background: white;
  display: flex;
  margin-left: 20vw;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  flex-direction: column;
  align-items: center;
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
const MypageBox = () => {
  const [data, setData] = useState()
  const { openModal } = useContext(ModalContext)
  const [photo, setPhoto] = useState("")
  useEffect(() => {
    const getData = async event => {
      try {
        const result = await mypageControl.getMemberInfo()
        setData(result)
      } catch (err) {
        console.log(err.message)
      }
    }
    getData()
    const getProfile = async event => {
      const id = JSON.parse(localStorage.getItem("memberId"))
      try {
        const result = await mypageControl.getProfile(id)
        setPhoto(result)
      } catch (err) {
        setPhoto(defaultProfile)
      }
    }
    getProfile()
  }, [photo])

  return (
    <Wrapper>
      <ProfileArea>
        <ProfileBox>
          <Profile src={photo} />
          <ProfileEditButton onClick={() => openModal(<MypageBoxModal setPhoto={setPhoto} />)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </ProfileEditButton>
        </ProfileBox>
        {data && <PTag>{data.name}</PTag>}
      </ProfileArea>
      <NavArea>
        <PTag>
          <NavStyle to="/mypage/profile"> 내프로필</NavStyle>
        </PTag>
        <PTag>
          <NavStyle to="/mypage/schedule"> 일정관리</NavStyle>
        </PTag>
        <PTag>
          <NavStyle to="/mypage/greenbee">그린비</NavStyle>
        </PTag>
        <PTag>
          <NavStyle to="/mypage/rooftop">옥상지기</NavStyle>
        </PTag>
      </NavArea>
    </Wrapper>
  )
}
export default MypageBox
