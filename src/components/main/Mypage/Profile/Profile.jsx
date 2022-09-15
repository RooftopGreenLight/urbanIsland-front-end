import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

import { mypageControl } from "api/controls/mypageControl"
import { ModalContext } from "module/Modal"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { Wrapper, Title, ServiceList, ServiceBox } from "components/common/Style/Mypage/CommonStyle"

import ApplyRooftopOwnerModal from "./Modal/ApplyRooftopOwnerModal"
import ProfileModifyModal from "./Modal/ProfileModifyModal"

const Profile = () => {
  const [userData, setUserData] = useState({ name: "", email: "", phoneNumber: "", authority: "" })
  const { openModal } = useContext(ModalContext)

  useEffect(() => {
    const getProfile = async () => {
      try {
        const result = await mypageControl.getMemberInfo()
        setUserData(result)
      } catch (err) {
        console.log(err.message)
      }
    }
    getProfile()
  }, [])

  const { name, email, phoneNumber, authority } = userData
  return (
    <Wrapper>
      {userData && (
        <ProfileBox>
          <Title>
            <h5>내 프로필 관리하기</h5>
          </Title>
          <ProfileLine>
            <div className="info">
              <span>이메일</span>
              <p>{email}</p>
            </div>
          </ProfileLine>
          <ProfileLine>
            <div className="info">
              <span>닉네임</span>
              <p>{name}</p>
            </div>
            <button
              onClick={() =>
                openModal(
                  <ProfileModifyModal
                    content="nickname"
                    placeholder="닉네임"
                    setUserData={setUserData}
                  />,
                )
              }>
              수정
            </button>
          </ProfileLine>
          <ProfileLine>
            <div className="info">
              <span>전화 번호</span>
              <p>{phoneNumber ?? "정보 없음"}</p>
            </div>
            <button
              onClick={() =>
                openModal(
                  <ProfileModifyModal
                    content="phoneNumber"
                    placeholder="전화번호"
                    setUserData={setUserData}
                  />,
                )
              }>
              {phoneNumber ? "수정" : "추가"}
            </button>
          </ProfileLine>
          <ProfileLine>
            <div className="info">
              <p>비밀번호 변경</p>
              <span>주기적으로 비밀번호를 변경하여 보안을 지키세요.</span>
            </div>
            <button
              onClick={() =>
                openModal(
                  <ProfileModifyModal
                    content="password"
                    placeholder="비밀번호"
                    setUserData={setUserData}
                  />,
                )
              }>
              변경
            </button>
          </ProfileLine>
        </ProfileBox>
      )}
      <ServiceList>
        <Title>
          <h5>서비스 등록하기</h5>
        </Title>

        {["ROLE_ADMIN", "ROLE_ALL", "ROLE_GREENBEE"].includes(authority) ? (
          <ServiceBox>
            <div className="introduce">
              <h5>그린비 등록하기</h5>
              <p>"이미 그린비 등록을 완료하셨습니다."</p>
            </div>
            <FontAwesomeIcon icon={faCircleCheck} />
          </ServiceBox>
        ) : (
          <Link to="/mypage/greenbee/register">
            <ServiceBox>
              <div className="introduce">
                <h5>그린비 등록하기</h5>
                <p>"조경이 가능한 건축사무소를 운영중이신가요?</p>
              </div>
              <FontAwesomeIcon icon={faAngleRight} />
            </ServiceBox>
          </Link>
        )}
        {["ROLE_ADMIN", "ROLE_ALL", "ROLE_ROOFTOPOWNER"].includes(authority) ? (
          <ServiceBox>
            <div className="introduce">
              <h5>옥상지기 등록하기</h5>
              <p>"이미 옥상지기 등록을 완료하셨습니다."</p>
            </div>
            <FontAwesomeIcon icon={faCircleCheck} />
          </ServiceBox>
        ) : (
          <ServiceBox onClick={() => openModal(<ApplyRooftopOwnerModal />)}>
            <div className="introduce">
              <h5>옥상지기 등록하기</h5>
              <p>"른 옥상을 만들 공간이 있으신가요?</p>
            </div>
            <FontAwesomeIcon icon={faAngleRight} />
          </ServiceBox>
        )}
      </ServiceList>
    </Wrapper>
  )
}

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 5vh;
`

const ProfileLine = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      display: flex;
      justify-content: space-between;
      padding: ${paddings.base};

      .info {
        width: 90%;
      }

      span {
        color: ${colors.black.quinary};
        font-weight: ${fonts.weight.light};
      }

      p {
        margin: ${margins.xsm} 0vw;
        color: ${colors.black.secondary};
        font-size: ${fonts.size.sm};
      }

      button {
        width: 10%;
        height: 100%;

        padding: ${paddings.xsm};
        margin: auto;

        border-radius: ${fonts.size.xsm};
        background-color: ${colors.main.secondary};

        color: ${colors.white};
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};

        &:hover {
          background-color: ${colors.main.tertiary};
          font-weight: ${fonts.weight.bold};
        }
      }
    `
  }}
`

export default Profile
