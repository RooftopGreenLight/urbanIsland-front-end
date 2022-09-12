import styled, { css } from "styled-components"
import { useContext } from "react"
import { useRecoilValue } from "recoil"

import ChatModal from "components/main/Chat/ChatModal"

import { ModalContext } from "module/Modal"
import { AuthCheckMemberId } from "module/Auth"

const ChatRoomInfo = ({ chatRoomElm }) => {
  const { openModal } = useContext(ModalContext)
  const { content, memberId: senderId, roomId, rooftopId, sendTime } = chatRoomElm
  const memberId = useRecoilValue(AuthCheckMemberId)

  const enterChatRoom = async () => {
    openModal(<ChatModal roomId={roomId} />)
  }

  return (
    <Wrapper onClick={enterChatRoom}>
      <ChatInfoTitle>
        <h5>{senderId === memberId ? "문의 내용" : "문의 응답"}</h5>
        <span>{`${sendTime[0]}.${sendTime[1]}.${sendTime[2]} ${sendTime[3]}:${sendTime[4]}`}</span>
      </ChatInfoTitle>
      <p>{content}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors, margins, paddings } = theme
    return css`
      padding: ${paddings.base};
      margin-bottom: ${margins.base};

      background-color: ${colors.main.secondary}11;
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
