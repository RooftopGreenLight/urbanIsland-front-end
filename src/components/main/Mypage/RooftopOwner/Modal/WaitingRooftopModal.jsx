import { useContext, useState } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"

const Textpart = styled.div`
  white-space: pre-line;
  font-size: 15px;
`
const Box = styled.div`
  background-color: grey;
  border-radius: 0.8rem;
  padding: 1rem;
  margin-top: 1rem;
`
const Time = styled.span`
  font-size: 11px;
`
const WaitingRooftopModal = () => {
  const { closeModal } = useContext(ModalContext)
  const sampleData = [
    {
      information: "옥상지기에게 알려주는 정보들",
      date: "YY.MM.DD. HH:MM",
      noticeMessage:
        "현재 옥상지기님의 옥상이 검토에 들어갔습니다!:) \n 추후 법률적 정보 등에 대해 공지드릴 사항 있다면 이야기드리겠습니다",
    },
    {
      information: "옥상지기에게 알려주는 정보들",
      date: "YY.MM.DD. HH:MM",
      noticeMessage:
        "현재 옥상지기님의 옥상이 검토에 들어갔습니다!:) \n 추후 법률적 정보 등에 대해 공지드릴 사항 있다면 이야기드리겠습니다",
    },
    {
      information: "옥상지기에게 알려주는 정보들",
      date: "YY.MM.DD. HH:MM",
      noticeMessage:
        "현재 옥상지기님의 옥상이 검토에 들어갔습니다!:) \n 추후 법률적 정보 등에 대해 공지드릴 사항 있다면 이야기드리겠습니다! \n 말이 길어진다면? 현재 옥상지기님의 옥상이 검토에 들어갔습니다!:) \n 추후 법률적 정보 등에 대해 공지드릴 사항 있다면 이야기드리겠습니다",
    },
    {
      information: "옥상지기에게 알려주는 정보들",
      date: "YY.MM.DD. HH:MM",
      noticeMessage:
        "현재 옥상지기님의 옥상이 검토에 들어갔습니다!:) \n 추후 법률적 정보 등에 대해 공지드릴 사항 있다면 이야기드리겠습니다",
    },
    {
      information: "옥상지기에게 알려주는 정보들",
      date: "YY.MM.DD. HH:MM",
      noticeMessage:
        "현재 옥상지기님의 옥상이 검토에 들어갔습니다!:) \n 추후 법률적 정보 등에 대해 공지드릴 사항 있다면 이야기드리겠습니다",
    },
    {
      information: "옥상지기에게 알려주는 정보들",
      date: "YY.MM.DD. HH:MM",
      noticeMessage:
        "현재 옥상지기님의 옥상이 검토에 들어갔습니다!:) \n 추후 법률적 정보 등에 대해 공지드릴 사항 있다면 이야기드리겠습니다",
    },
    {
      information: "옥상지기에게 알려주는 정보들",
      date: "YY.MM.DD. HH:MM",
      noticeMessage:
        "현재 옥상지기님의 옥상이 검토에 들어갔습니다!:) \n 추후 법률적 정보 등에 대해 공지드릴 사항 있다면 이야기드리겠습니다! \n 말이 길어진다면? 현재 옥상지기님의 옥상이 검토에 들어갔습니다!:) \n 추후 법률적 정보 등에 대해 공지드릴 사항 있다면 이야기드리겠습니다",
    },
    {
      information: "옥상지기에게 알려주는 정보들",
      date: "YY.MM.DD. HH:MM",
      noticeMessage:
        "현재 옥상지기님의 옥상이 검토에 들어갔습니다!:) \n 추후 법률적 정보 등에 대해 공지드릴 사항 있다면 이야기드리겠습니다",
    },
  ]
  return (
    <Wrapper>
      <header>
        <ModalCloseBtn onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} />
        </ModalCloseBtn>
      </header>
      <ModalContent>
        <p>대기 옥상 진행상황</p>
        <h1>"서울시 은평구 주소주소 옥상"</h1>
        {sampleData.map(d => {
          return (
            <>
              <Box>
                <span>{d.information}</span>
                <Time>{d.date}</Time>
                <Textpart>{d.noticeMessage}</Textpart>
              </Box>
            </>
          )
        })}
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      width: 50%;
      margin: auto;

      max-height: 80%;
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

      max-height: 100%;
      overflow-y: auto;
    `
  }}
`

export default WaitingRooftopModal
