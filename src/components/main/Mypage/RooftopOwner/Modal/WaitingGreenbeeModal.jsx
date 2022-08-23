import { useContext, useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { ModalContext } from "module/Modal"
import { AuthCheckMemberId } from "module/Auth"
import { ownerControl } from "api/controls/ownerControl"

import { modalShow } from "styles/Animation"
import WaitingGreenbeeAcceptModal from "components/main/Mypage/RooftopOwner/Modal/WaitingGreenbeeAcceptModal"

const WaitingGreenbeeModal = () => {
  const { openModal, closeModal } = useContext(ModalContext)
  const memberId = useRecoilValue(AuthCheckMemberId)
  const [waitingGreenBees, setWaitingGreenBees] = useState([])
  useEffect(() => {
    const loadWaitingGreenBeeList = async () => {
      const waitingList = await ownerControl.getGreenBeeWaiting(memberId)
      setWaitingGreenBees(waitingList)
    }
    loadWaitingGreenBeeList()
  })

  return (
    <Wrapper>
      <ModalHeader>
        <h5>대기 옥상 진행 상황</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        {waitingGreenBees.length > 0 ? (
          waitingGreenBees.map(d => (
            <>
              <h1>"서울시 은평구 주소주소 옥상"</h1>
              <button
                onClick={() =>
                  alert("공고를 내릴 시 신청했던 옥상이 취소됩니다. 그래도 공고를 내리실건가요?!")
                }>
                공고 내리기
              </button>
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
          ))
        ) : (
          <h5>옥상 녹화 신청 목록 없음</h5>
        )}
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      width: 40%;
      margin: auto;

      border-radius: 0.3rem;
      background-color: #fff;

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

const Box = styled.div`
  background-color: grey;
  border-radius: 5%;
  padding: 1rem;
  margin-top: 1rem;
`
const Time = styled.span`
  font-size: 11px;
`

export default WaitingGreenbeeModal
