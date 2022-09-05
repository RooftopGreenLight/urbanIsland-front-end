import { useContext, useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHourglassEmpty, faXmark } from "@fortawesome/free-solid-svg-icons"

import { ModalContext } from "module/Modal"
import { AuthCheckMemberId } from "module/Auth"
import { ownerControl } from "api/controls/ownerControl"
import { modalShow } from "styles/Animation"

import WaitingGreenbeeList from "../WaitingGreenbeeList"

const WaitingGreenbeeModal = () => {
  const { closeModal } = useContext(ModalContext)
  const memberId = useRecoilValue(AuthCheckMemberId)

  const [waitingGreenBees, setWaitingGreenBees] = useState([])
  const [selectedRooftopId, setSelectedRooftopId] = useState(-1)

  useEffect(() => {
    const loadWaitingGreenBeeList = async () => {
      const waitingList = await ownerControl.getGreenBeeWaiting(memberId)
      setWaitingGreenBees(waitingList)
    }
    loadWaitingGreenBeeList()
  }, [])

  const cancelSelectRooftop = () => {
    setSelectedRooftopId(-1)
  }

  const removeGreeningRooftop = async rooftopId => {
    try {
      await ownerControl.deleteGreeningRooftop(rooftopId)
      setWaitingGreenBees([...waitingGreenBees].filter(({ id }) => id !== rooftopId))
      alert("성공적으로 녹화 공고를 내렸습니다.")
    } catch (err) {
      console.log(err.message)
    }
  }

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
                <h5>{`${city} ${district}`}</h5>
                <p>{detail}</p>
                {selectedRooftopId === id ? (
                  <WaitingGreenbeeList rooftopId={id} cancelSelectRooftop={cancelSelectRooftop} />
                ) : (
                  <div className="button-list">
                    <button onClick={() => setSelectedRooftopId(id)}>공고 상세 보기</button>
                    <button onClick={() => removeGreeningRooftop(id)}>공고 내리기</button>
                  </div>
                )}
              </RooftopStatus>
            ))
          ) : (
            <NoticeEmptyIcon>
              <FontAwesomeIcon icon={faHourglassEmpty} />
              <h5>녹화 신청 목록 없음</h5>
              <p>녹화 작업을 신청한 시설이 없습니다.</p>
            </NoticeEmptyIcon>
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

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background: #ffffff;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #ced4da;
    &:hover {
      background-color: #adb5bd;
    }
  }
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

const ModalContent = styled.main`
  ${({ theme }) => {
    const { colors, paddings } = theme
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
    `
  }}
`

const RooftopStatus = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      margin: ${margins.sm} 0vw;

      color: ${colors.black.primary};
      cursor: pointer;

      h5 {
        font-size: ${fonts.size.base};
      }
      p {
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        margin-bottom: ${margins.sm};
      }

      .button-list {
        width: 40%;
        margin: ${margins.base} auto 0vw auto;

        display: flex;
        justify-content: space-between;
      }

      button {
        width: 40%;
        padding: ${paddings.sm};
        background-color: #000000;
        border-radius: 25px;

        color: ${colors.white};
        font-size: ${fonts.size.xsm};
      }
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

export default WaitingGreenbeeModal
