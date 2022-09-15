import { useContext, useRef, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBuilding, faXmark } from "@fortawesome/free-solid-svg-icons"

import { ModalHeader, ModalCloseBtn, ModalContent } from "components/common/Style/Modal/CommonStyle"
import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"

import { mypageControl } from "api/controls/mypageControl"
import defaultProfile from "assets/img/defaultProfile.png"

const MypageBoxModal = ({ userData, setUserData }) => {
  const { closeModal } = useContext(ModalContext)
  const [profileImg, setProfileImg] = useState(null)
  const [imgBase64, setImgBase64] = useState(null)
  const fileUploadInput = useRef()
  const feedbackMsg = useRef()

  // Blob 데이터를 추출하여 이미지를 띄우는 함수.
  const addNewImage = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    setProfileImg(file)
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      const base64Img = reader.result
      const base64Sub = base64Img.toString()
      setImgBase64(base64Sub)
    }
  }

  const deleteProfile = async () => {
    setImgBase64(null)
    setProfileImg(null)
    fileUploadInput.current.value = null
    try {
      await mypageControl.deleteProfile()
      setUserData({ ...userData, profile: defaultProfile })
    } catch (err) {
      console.log(err.message)
    }
  }

  const submitProfileImage = async () => {
    if (!profileImg) {
      feedbackMsg.current.innerText = "새롭게 변경할 프로필 이미지를 올려주세요."
      return
    }
    const formData = new FormData()
    formData.append("file", profileImg)
    try {
      const result = mypageControl.postProfile(formData)
      setUserData({ ...userData, profile: result })
      closeModal()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Wrapper>
      <ModalHeader>
        <h5>프로필 이미지 변경</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <h5>프로필 이미지 등록하기</h5>
        <p>새롭게 적용할 프로필 이미지를 등록합니다.</p>
        <BtnList>
          <label htmlFor="imgList">
            <FileUploadBtn>사진 업로드</FileUploadBtn>
          </label>
          <input
            type="file"
            id="imgList"
            onChange={addNewImage}
            accept=".png, .jpg"
            ref={fileUploadInput}
          />
        </BtnList>
        {imgBase64 && <img src={imgBase64} alt="None" />}
        <FeedBackMsg ref={feedbackMsg} />
        <ModifyBtnList>
          <ApplyModifyBtn onClick={submitProfileImage}>
            <FontAwesomeIcon icon={faBuilding} /> 프로필 등록
          </ApplyModifyBtn>
          <ApplyModifyBtn onClick={deleteProfile}>
            <FontAwesomeIcon icon={faXmark} /> 프로필 삭제
          </ApplyModifyBtn>
        </ModifyBtnList>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 33vw;
  margin: auto;

  border-radius: 0.3rem;
  background-color: #fff;

  animation: ${modalShow} 0.3s;
  animation-fill-mode: forwards;
  overflow: hidden;
`

const FileUploadBtn = styled.div`
  ${({ theme }) => {
    const { colors, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.sm};

      border: 1px solid ${colors.main.primary};
      border-radius: 2.5vw;
      background: ${colors.white};
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: 100;

      &:hover {
        border: 0px;
        background: ${colors.main.tertiary};
        color: ${colors.white};
      }
    `
  }}
`

const BtnList = styled.form`
  width: 72.5%;
  display: flex;
  justify-content: space-between;
  margin: 2rem auto 1rem auto;

  label {
    width: 100%;
    margin: auto;
  }

  #imgList {
    display: none;
  }
`

const ModifyBtnList = styled.div`
  width: 75%;
  margin: auto;
  display: flex;
  justify-content: space-between;
`

const FeedBackMsg = styled.p`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      font-size: ${fonts.size.xsm};
      font-weight: 100;

      margin: ${margins.sm} auto;
    `
  }}
`

const ApplyModifyBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 45%;
      padding: ${paddings.sm};
      margin: ${margins.base} auto;

      background-color: ${colors.main.primary};
      border: 1px solid #7d7d7d;
      border-radius: 25px;

      color: ${colors.white};
      text-align: center;
      font-size: ${fonts.size.xsm};

      svg {
        margin: 0vw ${margins.xsm} 0vw auto;
      }
    `
  }}
`

export default MypageBoxModal
