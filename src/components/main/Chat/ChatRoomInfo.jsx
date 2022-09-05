import styled, { css } from "styled-components"
import { useContext } from "react"

import ChatModal from "components/main/Chat/ChatModal"

import { ModalContext } from "module/Modal"

const ChatRoomInfo = ({ chatRoomElm, currentMemberId }) => {
  const { openModal } = useContext(ModalContext)
  const { content, memberId, roomId, sendTime } = chatRoomElm

  const enterChatRoom = async () => {
    openModal(<ChatModal roomId={roomId} memberId={currentMemberId} />)
  }

  return (
    <Wrapper onClick={enterChatRoom}>
      <ChatInfoTitle>
        <h5>{memberId === currentMemberId ? "문의 내용" : "문의 응답"}</h5>
        <span>{`${sendTime[0]}.${sendTime[1]}.${sendTime[2]} ${sendTime[3]}:${sendTime[4]}`}</span>
      </ChatInfoTitle>
      <p>{content}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { margins, paddings } = theme
    return css`
      padding: ${paddings.lg} ${paddings.base};
      margin-bottom: ${margins.base};

      background-color: #d6d5d5;
      border-radius: 1vw;

      cursor: pointer;

      p {
        font-weight: 100;
      }
    `
  }}
`

const ChatInfoTitle = styled.div`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      display: flex;
      justify-content: space-between;

      margin-bottom: ${margins.sm};

      h5 {
        font-size: ${fonts.size.base};
      }

      span {
        text-align: right;
        vertical-align: bottom;
        font-weight: 100;
      }
    `
  }}
`

export default ChatRoomInfo
