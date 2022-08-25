import { useContext, useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

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
      <ModalContent>
        <ViewPoint>
          {rooftopStatus ? (
            rooftopStatus.map(({ city, detail, district, progress, rooftopDate }, idx) => (
              <>
                <h5 key={district}>{`${city} ${district} ${detail}`}</h5>
                <StatusBox key={idx}>
                  <div className="header">
                    <h5>옥상지기 분께 알리는 정보</h5>
                    <span>{`${rooftopDate[0]}.${rooftopDate[1]}.${rooftopDate[2]} ${rooftopDate[3]}:${rooftopDate[4]}:${rooftopDate[5]}`}</span>
                  </div>
                  <p>{WaitingRooftopStatus.get(progress)}</p>
                </StatusBox>
              </>
            ))
          ) : (
            <h5>새롭게 도착한 정보가 없습니다.</h5>
          )}
        </ViewPoint>
      </ModalContent>
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

const StatusBox = styled.div`
  ${({ theme }) => {
    const { fonts, paddings, margins } = theme
    return css`
      width: 75%;
      padding: ${paddings.base};
      margin: ${margins.sm} auto;

      background-color: #cdcdcd;
      border-radius: 0.8rem;

      .header {
        display: flex;
        justify-content: space-between;
        vertical-align: bottom;

        margin-bottom: ${margins.base};

        h5 {
          margin: 0;
          text-align: left;
          font-size: ${fonts.size.sm};
        }

        span {
          text-align: left;
          font-size: ${fonts.size.xsm};
          font-weight: 100;
        }
      }

      p {
        text-align: left;
        font-size: ${fonts.size.xsm};
        font-weight: 200;
      }
    `
  }}
`

export default WaitingRooftopModal
