import { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCommentDots, faXmark } from "@fortawesome/free-solid-svg-icons"

import ChatRoomInfo from "components/main/Chat/ChatRoomInfo"

import { ModalContext } from "module/Modal"
import { chattingControl } from "api/controls/chattingControl"

const ChatRoomPage = () => {
  const { closeModal } = useContext(ModalContext)
  const [currentRoomList, setCurrentRoomList] = useState([])

  useEffect(() => {
    const loadChatRoomList = async () => {
      try {
        const loadedRoomList = await chattingControl.getChatRoomList()
        setCurrentRoomList(loadedRoomList)
      } catch (err) {
        console.log(err.message)
      }
    }
    loadChatRoomList()
  }, [])

  return (
    <Wrapper>
      <ModalHeader>
        <h5>문의 내역 목록</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ChatRoomList isEmpty={currentRoomList.length > 0}>
        {currentRoomList.length > 0 ? (
          currentRoomList.map((chatRoomElm, idx) => {
            if (chatRoomElm) {
              return <ChatRoomInfo chatRoomElm={chatRoomElm} key={idx} />
            }
          })
        ) : (
          <NoticeEmptyIcon>
            <FontAwesomeIcon icon={faCommentDots} />
            <h5>개설된 채팅방 없음</h5>
            <p>새로운 채팅방을 개설하시면 목록이 나옵니다.</p>
          </NoticeEmptyIcon>
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

const NoticeEmptyIcon = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      margin: ${margins.base} auto;

      color: ${colors.main.primary};
      text-align: center;

      h5 {
        font-size: ${fonts.size.base};
        margin-bottom: ${margins.sm};
      }

      p {
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }

      svg {
        width: 2.5vw;
        height: 2.5vw;

        margin-bottom: ${margins.base};
        padding: ${paddings.lg};

        background-color: ${colors.main.secondary};
        border-radius: 20vw;

        color: ${colors.white};
      }
    `
  }}
`

export default ChatRoomPage
