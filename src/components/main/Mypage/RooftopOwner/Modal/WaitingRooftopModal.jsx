import { useContext, useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle, faXmark } from "@fortawesome/free-solid-svg-icons"
import { ModalHeader, ModalCloseBtn } from "components/common/Style/Modal/CommonStyle"
import { NoticeEmptyIcon } from "components/common/Style/NoticeEmpty/CommonStyle"

import { modalShow } from "styles/Animation"
import { ownerControl } from "api/controls/ownerControl"
import { WaitingRooftopStatus } from "constants/WaitingRooftopStatus"
import { ModalContext } from "module/Modal"
import { AuthCheckMemberId } from "module/Auth"

const WaitingRooftopModal = () => {
  const { closeModal } = useContext(ModalContext)
  const memberId = useRecoilValue(AuthCheckMemberId)
  const [rooftopStatus, setRooftopStatus] = useState([])

  useEffect(() => {
    const loadingRooftopStatus = async () => {
      try {
        const statusData = await ownerControl.getRooftopStatus(memberId)
        setRooftopStatus(statusData)
      } catch (err) {
        console.log(err)
      }
    }
    loadingRooftopStatus()
  }, [])

  return (
    <Wrapper>
      <ModalHeader>
        <h5>대기 옥상 진행 상황</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ViewPoint>
        <ModalContent>
          {rooftopStatus ? (
            rooftopStatus.map(({ city, detail, district, progress, rooftopDate }, idx) => (
              <StatusList>
                <h5 key={district}>{`${city} ${district} ${detail}`}</h5>
                <StatusBox key={idx}>
                  <div className="header">
                    <h5>옥상지기 분께 알리는 정보</h5>
                    <span>{`${rooftopDate[0]}.${rooftopDate[1]}.${rooftopDate[2]} ${rooftopDate[3]}:${rooftopDate[4]}:${rooftopDate[5]}`}</span>
                  </div>
                  <p>{WaitingRooftopStatus.get(progress)}</p>
                </StatusBox>
              </StatusList>
            ))
          ) : (
            <NoticeEmptyIcon>
              <FontAwesomeIcon icon={faQuestionCircle} />
              <h5>안내 없음</h5>
              <p>새롭게 도착한 안내가 없습니다.</p>
            </NoticeEmptyIcon>
          )}
        </ModalContent>
      </ViewPoint>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      width: 40%;
      margin: auto;

      border-radius: 0.3rem;
      background-color: ${colors.white};

      animation: ${modalShow} 0.3s;
      animation-fill-mode: forwards;
      overflow: hidden;
    `
  }}
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

      h5 {
        text-align: left;
        margin: ${margins.sm} auto;
        font-size: ${fonts.size.sm};
      }
    `
  }}
`

const StatusList = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      display: flex;
      flex-direction: column;
      margin-bottom: 1.5vh;

      h5 {
        width: 85%;
        padding-bottom: ${paddings.sm};
        margin: 0vw auto ${margins.sm} auto;

        border-bottom: 1px solid ${colors.main.primary}66;
        color: ${colors.main.secondary};
        font-size: ${fonts.size.sm};
      }
    `
  }}
`

const StatusBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 85%;
      padding: ${paddings.base};
      margin: ${margins.sm} auto;

      background-color: ${colors.main.secondary}11;
      text-align: left;

      .header {
        display: flex;
        justify-content: space-between;
        vertical-align: bottom;

        margin-bottom: ${margins.sm};

        h5 {
          width: 50%;
          margin: 0;

          border-bottom: 0;
          color: ${colors.black.secondary};
          font-size: 1.25rem;
        }

        span {
          font-size: ${fonts.size.xsm};
          font-weight: 100;
        }
      }

      p {
        font-size: ${fonts.size.xsm};
        font-weight: 200;
      }
    `
  }}
`

export default WaitingRooftopModal
