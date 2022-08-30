import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled, { css } from "styled-components"

import { ownerControl } from "api/controls/ownerControl"
import { ModalContext } from "module/Modal"

const WaitingGreenbeeList = ({ rooftopId, cancelSelectRooftop }) => {
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

  return (
    <Wrapper>
      {appliedGreenbees.length > 0 ? (
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
              <h5>{`${officeCity} ${officeDistrict} ${officeDetail}`}</h5>
              <p>{`연락처 : ${officeNumber}`}</p>
              <p>{`신청 일자 : ${applyTime[0]}.${applyTime[1]}:${applyTime[2]} ${applyTime[3]}:${applyTime[4]}:${applyTime[5]}`}</p>
              <button onClick={() => confirmMatchingGreenbee(rooftopId, greenBeeId)}>
                사무소 확정하기
              </button>
            </AppliedGreenbeeInfo>
          ),
        )
      ) : (
        <NoticeEmptyList>
          <h5>그린비 목록 없음</h5>
          <p>해당 시설의 녹화를 신청한 사무소가 없습니다.</p>
        </NoticeEmptyList>
      )}
      <button onClick={cancelSelectRooftop}>공고 닫기</button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      padding: ${paddings.base} 0vw;
      margin: ${margins.base} 0vw;

      color: ${colors.black.primary};
      cursor: pointer;

      h5 {
        font-size: ${fonts.size.base};
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
    const { colors, fonts, margins } = theme
    return css`
      margin: ${margins.sm} 0vw;

      border: 1px solid ${colors.black.tertiary};
      border-radius: 25px;
      color: ${colors.black.tertiary};

      h5 {
        font-size: ${fonts.size.base};
      }
      p {
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
      }
    `
  }}
`

const AppliedGreenbeeInfo = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      background-color: #d5d5d5;
      padding: ${paddings.base} 0vw;
      margin: ${margins.sm} 0vw;

      color: ${colors.black.primary};

      h5 {
        font-size: ${fonts.size.base};
      }

      p {
        margin: 0;
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
      }

      span {
        position: relative;
        top: 0;
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
      }

      button {
        margin-top: ${margins.sm};
      }
    `
  }}
`

export default WaitingGreenbeeList
