import { useContext, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import WaitingGreenbeeAcceptModal from "../../Greenbee/Modal/WaitingGreenbeeAcceptModal"

const Box = styled.div`
  background-color: grey;
  border-radius: 5%;
  padding: 1rem;
  margin-top: 1rem;
`
const Time = styled.span`
  font-size: 11px;
`

const WaitingGreenbeeModal = () => {
  const { openModal, closeModal } = useContext(ModalContext)
  const sampleData = [
    {
      companyinformation: "A 건축사무소",
      date: "YY.MM.DD. HH:MM",
    },
    {
      companyinformation: "B 건축사무소",
      date: "YY.MM.DD. HH:MM",
    },
    {
      companyinformation: "C 건축사무소",
      date: "YY.MM.DD. HH:MM",
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
        <p>그린비 대기상황</p>
        <h1>"서울시 은평구 주소주소 옥상"</h1>
        <button
          onClick={() =>
            alert("공고를 내릴 시 신청했던 옥상이 취소됩니다. 그래도 공고를 내리실건가요?!")
          }>
          공고 내리기
        </button>
        {sampleData.map(d => {
          return (
            <>
              <Box>
                <span>{d.companyinformation}</span>
                <Time>{d.date}</Time>
                <div>
                  건축사무소 구경하기
                  <button
                    onClick={() => {
                      openModal(<WaitingGreenbeeAcceptModal />)
                    }}>
                    확정하기
                  </button>
                </div>
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

      button {
        width: 20%;
        background-color: #000000;
        border-radius: 25px;
        text-align: center;
        color: ${colors.white};
        font-size: ${fonts.size.xsm};
      }
    `
  }}
`

export default WaitingGreenbeeModal
