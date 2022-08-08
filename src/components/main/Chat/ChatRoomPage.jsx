import { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import { ModalContext } from "module/Modal"
import { AuthStateContext } from "module/Auth"
import ChatModal from "components/main/Chat/ChatModal"

import { chattingControl } from "api/chattingControl"

const ChatRoomPage = () => {
  const { openModal } = useContext(ModalContext)
  const { memberId } = useContext(AuthStateContext)

  const [currentRoomList, setCurrentRoomList] = useState([])

  useEffect(() => {
    const loadChatRoomList = async () => {
      try {
        const loadedRoomList = await chattingControl.getChatRoomList()
        setCurrentRoomList(loadedRoomList)
        console.log(currentRoomList)
      } catch (err) {
        console.log(err.message)
      }
    }
    loadChatRoomList()
  }, [])

  const enterChatRoom = async roomId => {
    try {
      // const roomId = await chattingControl.getChatRoomLog(roomId)
      openModal(<ChatModal roomId={roomId} memberId={memberId} />)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <Wrapper>
      <ChatRoomTitle>
        <h5>문의 내역 목록</h5>
      </ChatRoomTitle>
      <ChatRoomList>
        {currentRoomList.map(({ content, memberId, roomId, sendTime }, idx) => (
          <ChatRoomInfo key={idx} onClick={() => enterChatRoom(roomId)}>
            <h5>{memberId ? "문의 내용" : "문의 응답"}</h5>
            <span>{`${sendTime[0]}.${sendTime[1]}.${sendTime[2]} ${sendTime[3]}:${sendTime[4]}`}</span>
            <p>{content}</p>
          </ChatRoomInfo>
        ))}
      </ChatRoomList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;

  background-color: #cbcbcb;
`

const ChatRoomTitle = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 20vw;
      padding: ${paddings.sm} ${paddings.base};
      margin: ${margins.xl} auto;

      background-color: #000000;
      border-radius: 5vw;

      h5 {
        margin: auto;
        color: ${colors.white};
        font-size: ${fonts.size.lg};
        text-align: center;
        vertical-align: center;
      }
    `
  }}
`

const ChatRoomList = styled.div`
  ${({ theme }) => {
    const { colors, paddings } = theme
    return css`
      width: 50vw;
      min-height: 70vh;
      padding: ${paddings.xl};
      margin: auto;

      background-color: ${colors.white};
      border-radius: 1vw;

      display: flex;
      justify-content: flex-start;
      flex-direction: column;
    `
  }}
`

const ChatRoomInfo = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      padding: ${paddings.lg} ${paddings.base};
      margin-bottom: ${margins.base};

      background-color: #d6d5d5;
      border-radius: 1vw;

      h5 {
        font-size: ${fonts.size.lg};
      }

      span {
        text-align: right;
        font-weight: 100;
      }

      p {
        font-weight: 100;
      }
    `
  }}
`

export default ChatRoomPage
