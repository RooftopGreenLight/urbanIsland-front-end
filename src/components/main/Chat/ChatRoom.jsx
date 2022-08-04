import { useContext, useState, useRef } from "react"
import styled, { css } from "styled-components"

import { chattingControl } from "api/chattingControl"
import { ModalContext } from "module/Modal"
import ChatModal from "components/main/Chat/ChatModal"

const ChatRoom = () => {
  const feedbackMsg = useRef()
  const [chatRoomList, setChatRoomList] = useState([])
  const { openModal } = useContext(ModalContext)

  const openChatRoomList = async memberId => {
    try {
      const chatRooms = await chattingControl.getChatRoom(memberId)
      setChatRoomList(chatRooms)
    } catch (err) {
      feedbackMsg.current.innerText = err.message
    }
    openModal(<ChatModal chatRoomList={chatRoomList} />)
  }

  return (
    <Wrapper>
      <ChatStartBtn onClick={openChatRoomList}>채팅 시작</ChatStartBtn>
      <ChatFeedbackMsg ref={feedbackMsg}></ChatFeedbackMsg>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;

  background-color: #ffffff;

  display: flex;
  justify-content: center;
`

const ChatStartBtn = styled.button`
  ${({ theme }) => {
    return css`
      width: 10vw;
      height: 2vw;

      margin: auto;
    `
  }}
`

const ChatFeedbackMsg = styled.p`
  ${({ theme }) => {
    const { fonts } = theme
    return css`
      font-size: ${fonts.size.xsm};
      font-weight: 100;
    `
  }}
`

export default ChatRoom
