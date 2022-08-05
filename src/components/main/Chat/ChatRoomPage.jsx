import { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import { ModalContext } from "module/Modal"
import { AuthStateContext } from "module/Auth"
import ChatModal from "components/main/Chat/ChatModal"

import { chattingControl } from "api/chattingControl"

const ChatRoomPage = () => {
  const { openModal } = useContext(ModalContext)
  const { memberId } = useContext(AuthStateContext)

  const [currentRooms, setCurrentRooms] = useState([])

  useEffect(() => {
    const loadChatRoomList = async () => {
      try {
        const loadedRoomList = await chattingControl.getChatRoomList()
        setCurrentRooms(loadedRoomList)
        console.log(currentRooms)
      } catch (err) {
        console.log(err.message)
      }
    }
    loadChatRoomList()
  }, [])

  const createNewChatRoom = async () => {
    try {
      const roomId = await chattingControl.getReservationChat(1111111111)
      openModal(<ChatModal roomId={roomId} memberId={memberId} />)
    } catch (err) {
      console.log(err.message)
    }
  }

  const getChatRoomLog = async roomId => {
    try {
      const response = await chattingControl.getChatRoomLog(roomId)
      console.log(response)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <Wrapper>
      <h5>테스트 채팅 목록</h5>
      {currentRooms.map((chatRoomInfo, idx) => (
        <ChatStartBtn
          key={idx}
          onClick={() =>
            getChatRoomLog(chatRoomInfo.roomId)
          }>{`채팅방 ${chatRoomInfo.roomId} 번`}</ChatStartBtn>
      ))}
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
