import styled, { css } from "styled-components"
import { useContext } from "react"

import ChatModal from "components/main/Chat/ChatModal"

import { ModalContext } from "module/Modal"

const ChatRoomInfo = ({ chatRoomElm }) => {
  const { openModal } = useContext(ModalContext)
  const { content, memberId, roomId, sendTime } = chatRoomElm

  const enterChatRoom = async () => {
    try {
      openModal(<ChatModal roomId={roomId} memberId={memberId} />)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <Wrapper onClick={enterChatRoom}>
      <h5>{memberId ? "문의 내용" : "문의 응답"}</h5>
      <span>{`${sendTime[0]}.${sendTime[1]}.${sendTime[2]} ${sendTime[3]}:${sendTime[4]}`}</span>
      <p>{content}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      padding: ${paddings.lg} ${paddings.base};
      margin-bottom: ${margins.base};

      background-color: #d6d5d5;
      border-radius: 1vw;

      cursor: pointer;

      h5 {
        font-size: ${fonts.size.base};
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

export default ChatRoomInfo
