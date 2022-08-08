import { useContext, useEffect, useState, useRef } from "react"
import styled, { css } from "styled-components"
import { Client } from "@stomp/stompjs"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { ModalContext } from "module/Modal"
import { modalShow } from "styles/Animation"

const ChatModal = ({ roomId, memberId }) => {
  const { closeModal } = useContext(ModalContext)
  const [chatMessages, setChatMessages] = useState([])
  const [content, setContent] = useState("")

  const feedbackMsg = useRef()
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
        console.log({ memberId, content, sendTime })
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

  return (
    <Wrapper>
      <header>
        <ModalCloseBtn onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} />
        </ModalCloseBtn>
      </header>
      <ModalContent>
        <h5>테스트 채팅 목록</h5>
        <div>
          {chatMessages.length > 0 ? (
            <ul>
              {chatMessages.slice(-10).map((chatElm, idx) => (
                <ChatContent chatElm={chatElm} key={idx} />
              ))}
            </ul>
          ) : (
            <h5>채팅 로그 없음</h5>
          )}
          <div>
            <input
              type={"text"}
              placeholder={"message"}
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <button onClick={publish}>메세지 전송</button>
            <button onClick={disconnect}>채팅 종료</button>
          </div>
        </div>
        <ChatFeedbackMsg ref={feedbackMsg}></ChatFeedbackMsg>
      </ModalContent>
    </Wrapper>
  )
}

const ChatContent = ({ chatElm }) => {
  return (
    <li>
      {chatElm.memberId} {chatElm.content} {chatElm.sendTime}
    </li>
  )
}

const Wrapper = styled.section`
  ${({ theme }) => {
    const { fonts, paddings } = theme
    return css`
      width: 30%;
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

      h5 {
        margin: ${margins.base};
        font-size: ${fonts.size.sm};
        text-align: center;
      }

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
        width: 25%;
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
