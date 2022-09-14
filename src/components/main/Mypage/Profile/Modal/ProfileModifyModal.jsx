import { useContext, useState, useRef } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import { mypageControl } from "api/controls/mypageControl"

const ProfileModifyModal = ({ content, placeholder, setUserData }) => {
  const { closeModal } = useContext(ModalContext)
  const [input, setInput] = useState("")
  const feedbackMsg = useRef("")

  const editProfile = async () => {
    try {
      switch (content) {
        case "phoneNumber":
          if (!input.match(/^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/)) {
            feedbackMsg.current.innerText = "올바른 전화번호 양식이 아닙니다."
            return
          }
          await mypageControl.postMemberChangePhoneNum(input)
          setUserData(prevData => ({ ...prevData, phoneNumber: input }))
          break
        case "password":
          if (input.length < 10) {
            feedbackMsg.current.innerText = "비밀번호는 최소 10자 이상 입력해야 합니다."
            return
          }
          await mypageControl.postMemberChangePwd(input)
          break
        case "nickname":
          if (input.length > 20 || input.length < 3) {
            feedbackMsg.current.innerText = "닉네임은 3자 이상 20 미만으로 입력해야 합니다."
            return
          }
          await mypageControl.postMemberChangeNickname(input)
          setUserData(prevData => ({ ...prevData, name: input }))
          break
        default:
          return
      }
      closeModal()
    } catch (err) {
      feedbackMsg.current.innerText = err.message
      console.log(err.message)
    }
  }

  return (
    <Wrapper>
      <ModalHeader>
        <h5>프로필 정보 설정</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <h5>{placeholder} 변경</h5>
        <p>
          새롭게 수정할 {placeholder}
          {content === "nickname" ? "을" : "를"} 입력해주세요.
        </p>
        <input
          type="text"
          name="name"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={`변경할 ${placeholder} 입력`}
        />
        <ModalFeedBack ref={feedbackMsg}></ModalFeedBack>
        <ApplyModifyBtn onClick={() => editProfile(input)}>변동사항 저장</ApplyModifyBtn>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      width: 30%;
      margin: auto;

      border-radius: 0.3rem;
      background-color: ${colors.white};

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

      input {
        width: 70%;
        padding: ${paddings.sm};
        margin: ${margins.lg} auto;

        background-color: transparent;
        border: 0;
        border-bottom: 1px solid #232323;
        text-align: center;

        &::placeholder {
          color: #3e3e3e;
          font-weight: 100;
        }

        &::before {
          background-color: #d9d9d9;
        }
      }
    `
  }}
`

const ModalFeedBack = styled.p`
  ${({ theme }) => {
    const { colors, fonts } = theme
    return css`
      margin: 0;

      text-align: center;
      color: ${colors.main.primary};
      font-size: ${fonts.size.xxsm};
      font-weight: 100;
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
    `
  }}
`

export default ProfileModifyModal
