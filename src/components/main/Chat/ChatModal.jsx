import { useContext, useEffect, useState, useRef } from "react"
import styled, { css } from "styled-components"
import { Client } from "@stomp/stompjs"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons"

import ChatRoomPage from "components/main/Chat/ChatRoomPage"
import NoticeEmptyChatMessage from "components/main/Chat/NoticeEmpty/NoticeEmptyChatMessage"

import { ModalContext } from "module/Modal"
import { modalShow } from "styles/Animation"

const ChatModal = ({ roomId, memberId }) => {
  const { openModal } = useContext(ModalContext)
  const [chatMessages, setChatMessages] = useState([
    { memberId, content: "ㅎㅇ", sendTime: [2022, 8, 9, 21, 51, 10, 10000] },
  ])
  const [content, setContent] = useState("")
  const client = useRef({})

  const accessToken = JSON.parse(localStorage.getItem("access_token"))
  const jwtHeader = { Authorization: `Bearer ${accessToken}` }

  useEffect(() => {
    connect()
    return () => disconnect()
  }, [])

  const connect = () => {
    client.current = new Client({
      brokerURL: "ws://3.38.112.8:8080/ws/api/v1/chat/websocket", // websocket 뒤에다가 왜 붙이는 건지 모르겠음.
      connectHeaders: jwtHeader,

      debug: function (log) {
        console.log(log)
      },

      onStompError: function (frame) {
        console.log("Broker reported error: " + frame.headers["message"])
        console.log("Additional details: " + frame.body)
        // setTimeout(() => closeModal(), 500)
      },

      onWebSocketError: function (frame) {
        console.log(frame)
      },

      onConnect: function (frame) {
        console.log(frame)
        subscribe()
      },

      onDisconnect: function () {
        console.log("disconnect")
      },

      reconnectDelay: 0,
      heartbeatIncoming: 5000,
      heartbeatOutgoing: 5000,
    })
    client.current.activate()
  }

  const disconnect = () => {
    client.current.deactivate()
  }

  const subscribe = () => {
    client.current.subscribe(
      `/queue/${roomId}`,
      ({ body }) => {
        const { memberId, content, sendTime } = JSON.parse(body)
        setChatMessages(prevMsgList => [...prevMsgList, { memberId, content, sendTime }])
      },
      jwtHeader,
    )
  }

  const publish = () => {
    if (content.length === 0) {
      return
    }

    client.current.publish({
      destination: `/app/inquiry/room/${roomId}`,
      body: JSON.stringify({ roomId, content, memberId }),
      headers: jwtHeader,
    })
    setContent("")
  }

  const goBackToChatRoomPage = () => {
    disconnect()
    openModal(<ChatRoomPage />)
  }

  return (
    <Wrapper>
      <ModalHeader>
        <h5>테스트 채팅방</h5>
        <ModalCloseBtn icon={faXmark} onClick={goBackToChatRoomPage} />
      </ModalHeader>
      <ModalContent>
        {chatMessages.length > 0 ? (
          <ChatMessageList>
            {chatMessages.slice(-10).map(({ memberId, content, sendTime }, idx) => (
              <ChatMessage key={idx} memberId={memberId}>
                <p>{content}</p>
                <span>{`${sendTime[0]}.${sendTime[1]}.${sendTime[2]} ${sendTime[3]}:${sendTime[4]}`}</span>
              </ChatMessage>
            ))}
          </ChatMessageList>
        ) : (
          <NoticeEmptyChatMessage />
        )}
        <ChatSend>
          <input
            type="text"
            placeholder="Enter your Message"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <ChatSendBtn icon={faPaperPlane} onClick={publish} />
        </ChatSend>
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

const ModalHeader = styled.header`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.base};

      background-color: #000000;

      display: flex;
      justify-content: space-between;

      h5 {
        color: ${colors.white};
        font-size: ${fonts.size.base};
        text-align: center;
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

      cursor: pointer;
    `
  }}
`

const ModalContent = styled.main`
  ${({ theme }) => {
    const { colors, paddings } = theme
    return css`
      min-height: 50vh;

      padding: ${paddings.sm};
      border-top: 1px solid #dee2e6;
      background-color: ${colors.white};
    `
  }}
`

const ChatMessageList = styled.div`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      height: 80%;

      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      p {
        width: 70%;
        padding: ${paddings.sm};

        background-color: #d6d6d6;
      }
    `
  }}
`

const ChatMessage = styled.div`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      width: 60%;
      padding: ${paddings.sm};

      display: flex;
      flex-direction: column;

      p {
        width: 100%;
        padding: ${paddings.base};

        border-radius: 0.5vw;
        background-color: #d6d6d6;
      }

      span {
        text-align: right;
        font-size: 0.8rem;
        font-weight: 100;
      }
    `
  }}
`

const ChatSend = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      width: 100%;

      position: absolute;
      left: 0;
      bottom: 0;

      display: flex;
      justify-content: space-between;

      border-top: 1px solid #232323;

      input {
        width: 75%;
        margin: ${margins.base} 0vw ${margins.base} auto;

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
    `
  }}
`

const ChatSendBtn = styled(FontAwesomeIcon)`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 10%;
      padding: ${paddings.sm};
      margin: ${margins.base} auto;

      background-color: #000000;
      border-radius: 25px;
      text-align: center;
      color: ${colors.white};
      font-size: ${fonts.size.xsm};
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

export default ChatModal
