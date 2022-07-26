import { useContext, useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleDown,
  faAngleUp,
  faHourglassEmpty,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import { ModalHeader, ModalCloseBtn } from "components/common/Style/Modal/CommonStyle"
import { NoticeEmptyIcon } from "components/common/Style/NoticeEmpty/CommonStyle"

import { ModalContext } from "module/Modal"
import { AuthCheckMemberId } from "module/Auth"
import { ownerControl } from "api/controls/ownerControl"
import { modalShow } from "styles/Animation"

import WaitingGreenbeeList from "./WaitingGreenbeeList"

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
                <div className="rooftop-info">
                  <h5>{`${city} ${district} ${detail}`}</h5>
                  <ButtonList>
                    {selectedRooftopId !== id ? (
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        onClick={() => setSelectedRooftopId(id)}
                      />
                    ) : (
                      <FontAwesomeIcon icon={faAngleUp} onClick={cancelSelectRooftop} />
                    )}
                    <FontAwesomeIcon icon={faXmark} onClick={() => removeGreeningRooftop(id)} />
                  </ButtonList>
                </div>
                {selectedRooftopId === id && (
                  <WaitingGreenbeeList rooftopId={id} cancelSelectRooftop={cancelSelectRooftop} />
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
      padding: ${paddings.sm} ${paddings.base};
      margin-bottom: ${margins.sm};
      color: ${colors.main.primary};

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      h5 {
        width: 90%;
        font-size: ${fonts.size.sm};
        line-height: 150%;
        text-align: left;
      }

      .rooftop-info {
        width: 100%;
        border-bottom: 1px solid ${colors.main.secondary};
        display: flex;
        justify-content: space-between;
      }
    `
  }}
`

const ButtonList = styled.div`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      width: 10%;
      margin: 0vw auto;

      display: flex;
      justify-content: space-between;
      svg {
        color: ${colors.main.primary};
        margin: auto;
      }
    `
  }}
`

export default WaitingGreenbeeModal
