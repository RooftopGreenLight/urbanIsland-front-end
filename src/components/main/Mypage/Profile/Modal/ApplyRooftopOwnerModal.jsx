import { useContext, useState, useRef } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBuilding, faXmark } from "@fortawesome/free-solid-svg-icons"

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

  const onClickSubmit = async () => {
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
        <Title>
          <h5>옥상지기 등록하기</h5>
          <p>본인 명의의 건축물대장 확인증을 업로드 합니다.</p>
        </Title>
        <BtnList>
          <label htmlFor="imgList">
            <FileUploadBtn>사진 업로드</FileUploadBtn>
          </label>
          <input
            type="file"
            id="imgList"
            name="imgList"
            onChange={addNewImage}
            accept=".png, .jpg"
            ref={fileUploadInput}
          />
        </BtnList>
        {imgBase64 && <img src={imgBase64} alt="None" onDoubleClick={removeImage} />}
        <FeedBackMsg ref={feedbackMsg}>건축물 대장 확인증을 업로드 해주세요.</FeedBackMsg>
        <ApplyModifyBtn onClick={onClickSubmit}>
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
const ModalHeader = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.base};

      background-color: ${colors.main.primary};

      display: flex;
      justify-content: space-between;

      color: ${colors.white};
      text-align: center;

      h5 {
        font-size: ${fonts.size.base};
        vertical-align: center;
      }
    `
  }}
`

const ModalCloseBtn = styled(FontAwesomeIcon)`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      padding: ${paddings.sm};
      color: ${colors.white};
      font-size: ${fonts.size.xsm};
    `
  }}
`

const ModalContent = styled.main`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      display: flex;
      flex-direction: column;
      justify-content: center;

      padding: ${paddings.sm};
      border-top: 1px solid #dee2e6;
      background-color: ${colors.white};

      h5 {
        margin: ${margins.base} 0vw ${margins.xsm} 0vw;
        font-size: ${fonts.size.sm};
        text-align: center;
      }

      p {
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: center;
      }

      form {
        width: 70%;
        padding: ${paddings.sm};
        margin: ${margins.lg} auto;

        background-color: transparent;
        border: 0;
        text-align: center;
      }
    `
  }}
`

const Title = styled.div`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      text-align: center;

      h5 {
        font-size: ${fonts.size.base};
      }

      p {
        margin: ${margins.sm} auto;
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }
    `
  }}
`

const FileUploadBtn = styled.button`
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
  width: 20%;
  display: flex;
  margin: auto;

  label {
    width: 75%;
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
