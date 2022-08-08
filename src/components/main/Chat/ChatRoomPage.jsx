import { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import { ModalContext } from "module/Modal"
import { AuthStateContext } from "module/Auth"
import ChatModal from "components/main/Chat/ChatModal"

import { chattingControl } from "api/chattingControl"

const ChatRoomPage = () => {
  const { openModal } = useContext(ModalContext)
  const { memberId } = useContext(AuthStateContext)

  const [currentRoomList, setCurrentRoomList] = useState([
    {
      content:
        "테스트 메세지입니다. 일단 이렇게 보내두면 알아서 처리하지 않을까요? 디자인 목적으로 만들긴 했습니다.",
      memberId: 3,
      roomId: 2,
      sendTime: [2022, 8, 5, 21, 57, 52, 825278000],
    },
  ])

  // useEffect(() => {
  //   const loadChatRoomList = async () => {
  //     try {
  //       const loadedRoomList = await chattingControl.getChatRoomList()
  //       setCurrentRoomList(loadedRoomList)
  //       console.log(currentRoomList)
  //     } catch (err) {
  //       console.log(err.message)
  //     }
  //   }
  //   loadChatRoomList()
  // }, [])

  const enterChatRoom = async roomId => {
    try {
      const roomId = await chattingControl.getChatRoomLog(roomId)
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
            <h5>{memberId == memberId ? "문의 내용" : "문의 응답"}</h5>
            <span>{`${sendTime[0]}.${sendTime[1]}.${sendTime[2]} ${sendTime[3]}:${sendTime[4]}`}</span>
            <p>{content}</p>
          </ChatRoomInfo>
        ))}
      </ChatRoomList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 100vw;
      min-height: 100vh;

      background-color: #cbcbcb;
    `
  }}
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
    const { colors, fonts, margins } = theme
    return css`
      width: 50vw;
      min-height: 70vh;
      margin: auto;

      background-color: #ffffff;

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
      width: 90%;

      padding: ${paddings.lg} ${paddings.base};
      margin: ${margins.sm} auto;

      background-color: #d6d5d5;
      border-radius: 2vw;

      h5 {
        font-size: ${fonts.size.base};
      }
    `
  }}
`

export default ChatRoomPage
