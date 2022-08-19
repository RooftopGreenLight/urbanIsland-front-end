import { useContext, useState } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import { mypageControl } from "api/controls/mypageControl"
const ApplyModal = ({}) => {
  const { closeModal } = useContext(ModalContext)
  const [files, setFiles] = useState()

  const onClickSubmit = async () => {
    const formData = new FormData()
    formData.append("confirmationFile", files[0]) //files[0] === upload file
    try {
      const result = mypageControl.postApplyRooftop(formData)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpload = e => {
    e.preventDefault()
    setFiles(e.target.files)
  }

  return (
    <Wrapper>
      <header>
        <ModalCloseBtn onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} />
        </ModalCloseBtn>
      </header>
      <ModalContent>
        <h1>옥상지기 등록하기</h1>
        <p>본인 명의 건축물대장 확인증</p>
        <form method="post" encType="multipart/form-data">
          <input type="file" onChange={handleUpload} />
        </form>
        <button type="button" value="upload" onClick={onClickSubmit}>
          옥상지기 신청하기
        </button>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      width: 50%;
      margin: auto;

      border-radius: 0.3rem;
      background-color: #fff;

      animation: ${modalShow} 0.3s;
      animation-fill-mode: forwards;
      overflow: hidden;

      header {
        display: flex;
        flex-direction: row-reverse;

        padding: ${paddings.sm} ${paddings.base};
        background-color: #f1f1f1;
        font-weight: 700;
      }
    `
  }}
`
const ModalCloseBtn = styled.button`
  ${({ theme }) => {
    const { fonts } = theme
    return css`
      margin: 0vw 0vw 0vw auto

      color: #999;
      background-color: transparent;

      font-size: ${fonts.size.xsm};
      font-weight: 700;
      text-align: center;
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
      text-align: center;

      input {
        width: 90%;
        padding: ${paddings.sm};
        margin: 0vw auto ${margins.base} auto;

        background-color: transparent;
        border: 0;
        border-bottom: 1px solid #232323;

        &::placeholder {
          color: #3e3e3e;
          text-align: left;
          font-weight: 100;
        }

        &::before {
          background-color: #d9d9d9;
        }
      }

      button {
        width: 50%;
        padding: ${paddings.sm};
        margin: ${margins.base} auto;

        background-color: #000000;
        border-radius: 25px;
        text-align: center;
        color: ${colors.white};
        font-size: ${fonts.size.xsm};
      }
    `
  }}
`

export default ApplyModal
