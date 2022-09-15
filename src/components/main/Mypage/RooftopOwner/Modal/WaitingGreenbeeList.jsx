import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled, { css } from "styled-components"

import { ownerControl } from "api/controls/ownerControl"
import { ModalContext } from "module/Modal"
import { fadeIn } from "styles/Animation"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar, faHome, faPhone } from "@fortawesome/free-solid-svg-icons"

const WaitingGreenbeeList = ({ rooftopId }) => {
  const { closeModal } = useContext(ModalContext)
  const navigate = useNavigate()
  const [appliedGreenbees, setAppliedGreenbees] = useState([])

  useEffect(() => {
    const loadAppliedGreenBees = async () => {
      const { applyDtos } = await ownerControl.getGreenBeeWaitingRooftop(rooftopId)
      setAppliedGreenbees(applyDtos)
    }
    loadAppliedGreenBees()
  }, [])

  const confirmMatchingGreenbee = async (rooftopId, greenbeeId) => {
    console.log(rooftopId, greenbeeId)
    try {
      await ownerControl.getConfirmSelectedGreenbee(rooftopId, greenbeeId)
      alert("그린비 승인이 완료되었습니다.")
      closeModal()
    } catch (err) {
      console.log(err.message)
    }
  }

  const spectateGreenbee = greenBeeId => {
    navigate(`/mypage/greenbee/${greenBeeId}`)
    closeModal()
  }

  return (
    <Wrapper>
      {appliedGreenbees && appliedGreenbees.length > 0 ? (
        appliedGreenbees.map(
          (
            {
              applyTime,
              greenBeeId,
              officeCity,
              officeDetail,
              officeDistrict,
              officeNumber,
              rooftopId,
            },
            idx,
          ) => (
            <AppliedGreenbeeInfo key={idx}>
              <div className="rooftop-title">
                <h5>{`${officeCity} ${officeDistrict} ${officeDetail}`}</h5>
                <FontAwesomeIcon icon={faHome} onClick={() => spectateGreenbee(greenBeeId)} />
              </div>
              <div className="greenbee-info">
                <p>
                  <FontAwesomeIcon icon={faPhone} /> {`${officeNumber}`}
                </p>
                <p>
                  <FontAwesomeIcon icon={faCalendar} />{" "}
                  {`${applyTime[0]}.${applyTime[1]}.${applyTime[2]} ${applyTime[3]}시 ${applyTime[4]}분 ${applyTime[5]}초 신청`}
                </p>
              </div>
              <ConfirmBtn onClick={() => confirmMatchingGreenbee(rooftopId, greenBeeId)}>
                선택하기
              </ConfirmBtn>
            </AppliedGreenbeeInfo>
          ),
        )
      ) : (
        <NoticeEmptyList>
          <h5>그린비 목록 없음</h5>
          <p>해당 시설의 녹화를 신청한 사무소가 없습니다.</p>
        </NoticeEmptyList>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 100%;
      margin: ${margins.base} auto 0vw auto;

      color: ${colors.black.primary};
      cursor: pointer;

      animation: ${fadeIn} 1s;

      h5 {
        font-size: ${fonts.size.sm};
      }
      p {
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
      }
    `
  }}
`

const NoticeEmptyList = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      margin: ${margins.sm} 0vw;
      padding: ${paddings.sm} 0vw;

      border-radius: 0.25rem;
      background-color: ${colors.main.tertiary}11;
      color: ${colors.main.secondary};

      h5 {
        width: 100%;
        font-size: ${fonts.size.base};
        text-align: center;
      }
      p {
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        padding-bottom: ${paddings.xsm};
      }
    `
  }}
`

const AppliedGreenbeeInfo = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 95%;
      padding: ${paddings.sm} ${paddings.base};
      margin: ${margins.sm} auto;

      display: flex;
      flex-wrap: wrap;

      background-color: ${colors.main.secondary}11;
      color: ${colors.black.primary};
      text-align: left;

      .rooftop-title {
        width: 100%;
        display: flex;
        justify-content: space-between;

        svg {
          margin-top: ${margins.xsm};
          padding: ${paddings.xsm};

          font-size: ${fonts.size.xsm};
          background-color: ${colors.main.tertiary};
          border-radius: 10px;
          color: ${colors.white};
        }
      }

      .greenbee-info {
        width: 80%;
        height: 100%;
        margin: auto 0vw;
      }

      h5 {
        font-size: ${fonts.size.sm};
        margin-bottom: ${margins.sm};
      }

      p {
        margin-bottom: ${margins.sm};
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
      }

      svg {
        margin: auto ${margins.xsm} auto auto;
        font-size: ${fonts.size.xsm};
        color: ${colors.main.tertiary};
      }
    `
  }}
`

const ConfirmBtn = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 20%;
      height: 82.5%;
      padding: ${paddings.xsm};
      margin: auto;

      border: 1px solid ${colors.main.primary};
      border-radius: 2.5vw;
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: ${fonts.size.xsm};
      font-weight: 100;

      &:hover {
        border: 0px;
        background: ${colors.main.tertiary};
        color: ${colors.white};
      }
    `
  }}
`

export default WaitingGreenbeeList
