import { useContext, useEffect, useState, useRef } from "react"
import { useRecoilValue } from "recoil"
import styled, { css } from "styled-components"
import { Client } from "@stomp/stompjs"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons"

import ChatRoomPage from "components/main/Chat/ChatRoomPage"
import NoticeEmptyChatMessage from "components/main/Chat/NoticeEmpty/NoticeEmptyChatMessage"

import { ModalContext } from "module/Modal"
import { AuthCheckMemberId } from "module/Auth"
import { modalShow } from "styles/Animation"
import { chattingControl } from "api/controls/chattingControl"

const ChatModal = ({ roomId }) => {
  const { openModal } = useContext(ModalContext)
  const memberId = useRecoilValue(AuthCheckMemberId)
  const [chatMessages, setChatMessages] = useState([])
  const [content, setContent] = useState("")
  const client = useRef({})

  const accessToken = JSON.parse(localStorage.getItem("access_token"))
  const jwtHeader = { Authorization: `Bearer ${accessToken}` }

  useEffect(() => {
    const loadChattingLog = async () => {
      try {
        const { city, district, detail, messageResponses } =
          await chattingControl.getPreChattingLog(roomId)
        const address = `${city} ${district} ${detail}`
        setChatMessages([...chatMessages, ...messageResponses])
      } catch (err) {
        console.error(err.message)
      }
    }
    loadChattingLog()
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
        console.log(body)
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
      destination: `/app/inquiry/room`,
      body: JSON.stringify({ roomId, content, memberId }),
      headers: jwtHeader,
    })
    setContent("")
  }

  const sendMessage = e => {
    if (e.keyCode == 13) {
      publish()
    }
  }

  const goBackToChatRoomPage = () => {
    disconnect()
    openModal(<ChatRoomPage />)
  }

  return (
    <Wrapper>
      <ModalHeader>
        <h5>옥상지기 문의 채팅</h5>
        <ModalCloseBtn icon={faXmark} onClick={goBackToChatRoomPage} />
      </ModalHeader>
      <ModalContent>
        <ViewPoint>
          {chatMessages.length > 0 ? (
            <ChatMessageList>
              {chatMessages.slice(-10).map(({ memberId: senderId, content, sendTime }, idx) => {
                return (
                  <ChatMessage key={idx} isMyMessage={memberId === senderId}>
                    <p>{content}</p>
                    <span>{`${sendTime[0]}.${sendTime[1]}.${sendTime[2]} ${sendTime[3]}:${sendTime[4]}`}</span>
                  </ChatMessage>
                )
              })}
            </ChatMessageList>
          ) : (
            <NoticeEmptyChatMessage />
          )}
        </ViewPoint>
        <ChatSend>
          <input
            type="text"
            placeholder="메세지를 입력해주세요..."
            value={content}
            onChange={e => setContent(e.target.value)}
            onKeyUp={sendMessage}
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
      width: 33vw;
      margin: auto;

      border-radius: 0.3rem;
      background-color: ${colors.white};

      animation: ${modalShow} 0.3s;
      animation-fill-mode: forwards;
      overflow: hidden;
    `
  }}
`

const ViewPoint = styled.div`
  width: 33vw;
  max-height: 50vh;
  padding: 0rem 1rem;
  overflow: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ::-webkit-scrollbar {
    display: none;
  }
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
    const { colors, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.sm};
      border-top: 1px solid #dee2e6;
      background-color: ${colors.white};

      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `
  }}
`

const ChatMessageList = styled.div`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      width: 100%;

      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      p {
        width: 80%;
        padding: ${paddings.sm};

        background-color: #d6d6d6;
      }
    `
  }}
`

const ChatMessage = styled.div`
  ${({ theme, isMyMessage }) => {
    const { colors, paddings, margins } = theme
    return css`
      width: 40%;
      padding: ${paddings.sm};
      margin-left: ${isMyMessage ? "auto" : "0vw"};

      display: flex;
      flex-direction: column;

      p {
        width: 100%;
        padding: ${paddings.base};

        border-radius: 0.5vw;
        background-color: ${colors.main.secondary}33;
      }

      span {
        margin-top: ${margins.xsm};
        text-align: right;
        font-size: 0.8rem;
        font-weight: 100;
      }
    `
  }}
`

const ChatSend = styled.div`
  ${({ theme }) => {
    const { colors, margins } = theme
    return css`
      width: 100%;
      margin-top: ${margins.sm};

      display: flex;
      justify-content: space-between;

      input {
        width: 75%;
        margin: ${margins.base} 0vw ${margins.base} auto;

        background-color: transparent;
        border: 0;
        border-bottom: 1px solid ${colors.main.primary};

        &::placeholder {
          color: ${colors.main.primary};
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

      background-color: ${colors.main.primary};
      border-radius: 25px;
      text-align: center;
      color: ${colors.white};
      font-size: ${fonts.size.xsm};

      &:hover {
        background-color: ${colors.main.tertiary};
      }
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
