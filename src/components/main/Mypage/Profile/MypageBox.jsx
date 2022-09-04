import { useContext, useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { NavLink } from "react-router-dom"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleRight,
  faBuilding,
  faCalendar,
  faPen,
  faPeopleArrows,
  faSeedling,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { mypageControl } from "api/controls/mypageControl"

import { ModalContext } from "module/Modal"
import { AuthCheckMemberId } from "module/Auth"
import { accountControl } from "api/controls/accountControl"
import { MemberRoleInfo } from "constants/MemberRoleInfo"

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
            <FontAwesomeIcon icon={faPen} />
          </ProfileEditButton>
        </ProfileBox>
        <ProfileInfo>
          <h5>{name}</h5>
          <p>{MemberRoleInfo.get(authority) ?? "일반 유저"}</p>
        </ProfileInfo>
      </ProfileArea>
      <NavArea>
        <NavStyle to="/mypage/profile">
          <FontAwesomeIcon icon={faUser} size="xl" fixedWidth />
          <p>내 정보 관리</p>
          <FontAwesomeIcon icon={faAngleRight} size="sm" fixedWidth />
        </NavStyle>
        <NavStyle to="/mypage/schedule">
          <FontAwesomeIcon icon={faCalendar} size="xl" fixedWidth />
          <p>내 일정 관리</p>
          <FontAwesomeIcon icon={faAngleRight} size="sm" fixedWidth />
        </NavStyle>
        <NavStyle to="/mypage/greenbee">
          <FontAwesomeIcon icon={faSeedling} size="xl" fixedWidth />
          <p>그린비 정보 관리</p>
          <FontAwesomeIcon icon={faAngleRight} size="sm" fixedWidth />
        </NavStyle>
        <NavStyle to="/mypage/rooftop">
          <FontAwesomeIcon icon={faBuilding} size="xl" fixedWidth />
          <p>옥상지기 정보 관리</p>
          <FontAwesomeIcon icon={faAngleRight} size="sm" fixedWidth />
        </NavStyle>
        {authority === "ROLE_ADMIN" && (
          <NavStyle to="/mypage/admin">
            <FontAwesomeIcon icon={faPeopleArrows} size="xl" fixedWidth />
            <p>운영자 설정 관리</p>
            <FontAwesomeIcon icon={faAngleRight} size="sm" fixedWidth />
          </NavStyle>
        )}
        <NavStyle to="/" onClick={() => accountControl.deleteLogOut()}>
          <FontAwesomeIcon icon={faSignOut} size="xl" fixedWidth />
          <p>로그아웃</p>
          <FontAwesomeIcon icon={faAngleRight} size="sm" fixedWidth />
        </NavStyle>
      </NavArea>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 30vw;
  height: 80vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`
const NavArea = styled.nav`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      width: 80%;
      padding-top: 6vh;
      border-bottom: 1px solid ${colors.main.primary}55;

      display: flex;
      flex-direction: column;

      color: ${colors.main.primary};
      text-align: left;
    `
  }}
`

const NavStyle = styled(NavLink)`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      padding: ${paddings.base};
      box-shadow: inset 0 1px 0 0 ${colors.main.primary}55;

      color: ${colors.black.quinary};
      font-size: ${fonts.size.xsm};
      font-weight: ${fonts.weight.light};

      display: flex;
      justify-content: space-between;

      svg {
        margin: auto;
        color: ${colors.main.tertiary};
      }

      p {
        margin-left: ${margins.sm};
        width: 80%;
        text-align: left;
        line-height: 150%;
      }

      &.active {
        background-color: ${colors.main.quaternary}11;
        color: ${colors.main.primary};

        svg {
          color: ${colors.main.primary};
        }
      }
    `
  }}
`

const ProfileArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6vh;
`

const ProfileInfo = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      margin: ${margins.base} auto;
      color: ${colors.main.primary};
      text-align: center;

      h5 {
        font-size: ${fonts.size.base};
      }

      p {
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
      }
    `
  }}
`

const ProfileEditButton = styled.button`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      width: 25px;
      height: 25px;

      background-color: ${colors.main.primary};
      border-radius: 50%;

      position: absolute;
      bottom: 0;
      right: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 15px;
        height: 15px;
        color: ${colors.white};
      }
    `
  }}
`

const LogoutBtn = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 90%;
      padding: ${paddings.sm} ${paddings.base};
      margin: ${margins.lg} auto;

      cursor: pointer;
      border-radius: ${fonts.size.sm};
      background-color: ${colors.main.primary};

      text-align: center;
      color: ${colors.white};
      font-size: ${fonts.size.sm};

      &:hover {
        background-color: ${colors.main.tertiary};
        font-weight: ${fonts.weight.bold};
      }
    `
  }}
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

export default MypageBox
