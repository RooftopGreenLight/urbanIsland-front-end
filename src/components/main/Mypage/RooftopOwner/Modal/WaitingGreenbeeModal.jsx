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
  const [currentLoadList, setCurrentLoadList] = useState({
    rooftopId: 0,
    requestedGreenbees: [],
  })

  useEffect(() => {
    const loadWaitingGreenBeeList = async () => {
      const waitingList = await ownerControl.getGreenBeeWaiting(memberId)
      console.log(waitingList)
      setWaitingGreenBees(waitingList)
    }
    loadWaitingGreenBeeList()
  }, [])

  return (
    <Wrapper>
      <ModalHeader>
        <h5>대기 옥상 진행 상황</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <ViewPoint>
          {waitingGreenBees.length > 0 ? (
            waitingGreenBees.map(({ city, district, detail, id }) => (
              <RooftopStatus>
                <h1>{`${city} ${district}`}</h1>
                <p>{detail}</p>
                <button>공고 상세 보기</button>
              </RooftopStatus>
            ))
          ) : (
            <h5>옥상 녹화 신청 목록 없음</h5>
          )}
        </ViewPoint>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 40%;
  margin: auto;

  border-radius: 0.3rem;
  background-color: #fff;

  animation: ${modalShow} 0.3s;
  animation-fill-mode: forwards;
  overflow: hidden;
`

const ViewPoint = styled.div`
  max-height: 42.5vh;
  overflow: auto;
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

      padding: ${paddings.lg} ${paddings.sm};
      border-top: 1px solid #dee2e6;
      background-color: ${colors.white};

      max-height: 100%;
      overflow-y: auto;
      text-align: center;

      h5 {
        margin: ${margins.sm} auto;
        font-size: ${fonts.size.base};
      }
    `
  }}
`

const RooftopStatus = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      margin: ${margins.sm};
      padding: ${paddings.sm};

      color: ${colors.black.primary};
      cursor: pointer;

      h5 {
        font-size: ${fonts.size.sm};
      }
      p {
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        margin-bottom: ${margins.sm};
      }

      button {
        width: 20%;
        padding: ${paddings.sm};
        background-color: #000000;
        border-radius: 25px;

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
