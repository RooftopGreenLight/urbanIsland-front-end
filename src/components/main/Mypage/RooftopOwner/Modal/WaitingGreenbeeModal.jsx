import { useContext, useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

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

export default WaitingGreenbeeModal
