import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import defaultProfile from "assets/img/defaultProfile.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faSitemap } from "@fortawesome/free-solid-svg-icons"
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

  .profile-box {
    width: 5rem;
    height: 5rem;
    img {
      border-radius: 50%;
      overflow: hidden;
    }
    position: relative;
  }
  .profile {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .selected {
    color: black;
    text-decoration: underline;
  }
  .not {
    color: grey;
  }
  .profile-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 6vh;
  }
  p {
    padding-top: 0.5rem;
    font-size: 20px;
    font-weight: bold;
  }
  .nav-area {
    padding-top: 6vh;
  }

  .profile-edit {
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
  }
  .inputbtn {
    display: none;
  }
`

const MypageBox = () => {
  const [data, setData] = useState()
  const { openModal } = useContext(ModalContext)
  const [photo, setPhoto] = useState("")
  const [refresh, setRefresh] = useState(false)
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
      <div className="profile-area">
        <div className="profile-box">
          <img className="profile" src={photo} />
          <button
            className="profile-edit"
            onClick={() => openModal(<MypageBoxModal setPhoto={setPhoto} />)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
        {data && <p>{data.name}</p>}
      </div>
      <div className="nav-area">
        <p>
          <NavLink
            to="/mypage/profile"
            className={({ isActive }) => (isActive ? "selected" : "not")}>
            내프로필
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/mypage/schedule"
            className={({ isActive }) => (isActive ? "selected" : "not")}>
            일정관리
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/mypage/greenbee"
            className={({ isActive }) => (isActive ? "selected" : "not")}>
            그린비
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/mypage/rooftop"
            className={({ isActive }) => (isActive ? "selected" : "not")}>
            옥상지기
          </NavLink>
        </p>
      </div>
    </Wrapper>
  )
}
export default MypageBox
