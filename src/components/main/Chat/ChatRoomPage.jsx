import { useContext } from "react"
import styled, { css } from "styled-components"

import { ModalContext } from "module/Modal"
import ChatModal from "components/main/Chat/ChatModal"

import { chattingControl } from "api/chattingControl"

const ChatRoomPage = () => {
  const { openModal } = useContext(ModalContext)

  const createNewChatRoom = async () => {
    try {
      const roomId = await chattingControl.getReservationChat(1111111111)
      console.log(roomId)
      openModal(<ChatModal roomId={roomId} />)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <Wrapper>
      <ChatStartBtn onClick={createNewChatRoom}>채팅 시작</ChatStartBtn>
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

export default ChatRoomPage
