import { useContext, useState, useRef } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBuilding, faXmark } from "@fortawesome/free-solid-svg-icons"
import { ModalHeader, ModalCloseBtn, ModalContent } from "components/common/Style/Modal/CommonStyle"

import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import { mypageControl } from "api/controls/mypageControl"

const ApplyRooftopOwnerModal = () => {
  const { closeModal } = useContext(ModalContext)
  const [rooftopOwnerImg, setRooftopOwnerImg] = useState(null)
  const [imgBase64, setImgBase64] = useState(null)
  const fileUploadInput = useRef()
  const feedbackMsg = useRef()

  // Blob 데이터를 추출하여 이미지를 띄우는 함수.
  const addNewImage = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    setRooftopOwnerImg(file)
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      const base64Img = reader.result
      const base64Sub = base64Img.toString()
      setImgBase64(base64Sub)
    }
  }

  const removeImage = () => {
    setImgBase64(null)
    setRooftopOwnerImg(null)
    fileUploadInput.current.value = null
  }

  const submitOwnerImage = async () => {
    if (!rooftopOwnerImg) {
      feedbackMsg.current.innerText = "건축물 대장 확인증을 업로드 해주세요."
      return
    }
    const formData = new FormData()
    formData.append("confirmationFile", rooftopOwnerImg)
    try {
      await mypageControl.postApplyRooftop(formData)
      closeModal()
    } catch (err) {
      feedbackMsg.current.innerText = err.message
    }
  }

  return (
    <Wrapper>
      <ModalHeader>
        <h5>신규 옥상지기 신청</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <h5>옥상지기 등록하기</h5>
        <p>본인 명의의 건축물대장 확인증을 업로드 합니다.</p>
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
        {imgBase64 && <img src={imgBase64} alt="None" onDoubleClick={removeImage} />}
        <FeedBackMsg ref={feedbackMsg} />
        <ApplyModifyBtn onClick={submitOwnerImage}>
          <FontAwesomeIcon icon={faBuilding} /> 옥상지기 신청하기
        </ApplyModifyBtn>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  ${({ theme }) => {
    return css`
      width: 33vw;
      margin: auto;

      border-radius: 0.3rem;
      background-color: #fff;

      animation: ${modalShow} 0.3s;
      animation-fill-mode: forwards;
      overflow: hidden;
    `
  }}
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
  width: 50%;
  display: flex;
  margin: 2rem auto 1rem auto;

  label {
    width: 100%;
    margin: auto;
  }

  #imgList {
    display: none;
  }
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
      width: 50%;
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

export default ApplyRooftopOwnerModal
