import { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import ChatRoomInfo from "components/main/Chat/ChatRoomInfo"
import NoticeEmptyChatRoom from "components/main/Chat/NoticeEmpty/NoticeEmptyChatRoom"

import { ModalContext } from "module/Modal"
import { AuthStateContext } from "module/Auth"
import { chattingControl } from "api/chattingControl"

export const ChatRoomTestPage = () => {
  const { openModal } = useContext(ModalContext)
  return (
    <div>
      <button onClick={() => openModal(<ChatRoomPage />)}>test</button>
    </div>
  )
}

const ChatRoomPage = () => {
  const { closeModal } = useContext(ModalContext)
  const { memberId } = useContext(AuthStateContext)

  const [currentRoomList, setCurrentRoomList] = useState([
    {
      content: "ㅎㅇ",
      roomId: 2,
      memberId: 1,
      sendTime: [2022, 8, 9, 21, 49, 21, 100000],
    },
  ])
  const isEmpty = currentRoomList.length === 0

  useEffect(() => {
    const loadChatRoomList = async () => {
      try {
        const loadedRoomList = await chattingControl.getChatRoomList(memberId)
        setCurrentRoomList(loadedRoomList)
      } catch (err) {
        console.log(err.message)
      }
    }
    // loadChatRoomList()
  }, [])

  return (
    <Wrapper>
      <ChatRoomHeader>
        <h5>문의 내역 목록</h5>
        <ChatCloseBtn icon={faXmark} onClick={closeModal} />
      </ChatRoomHeader>
      <ChatRoomList isEmpty={isEmpty}>
        {!isEmpty ? (
          currentRoomList.map((chatRoomElm, idx) => (
            <ChatRoomInfo chatRoomElm={chatRoomElm} currentMemberId={memberId} key={idx} />
          ))
        ) : (
          <NoticeEmptyChatRoom />
        )}
      </ChatRoomList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 33vw;

  margin: auto;
  background-color: #f5f5f5;
`

const ChatRoomHeader = styled.div`
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

const ChatCloseBtn = styled(FontAwesomeIcon)`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      padding: ${paddings.sm};
      color: ${colors.white};
      font-size: ${fonts.size.xsm};
    `
  }}
`

const ChatRoomList = styled.div`
  ${({ theme, isEmpty }) => {
    const { paddings } = theme
    return css`
      padding: ${paddings.xl};
      margin: auto;

      display: flex;
      justify-content: ${isEmpty ? "center" : "flex-start"};
      flex-direction: column;
    `
  }}
`

export default ChatRoomPage
