import { useContext, useState } from "react"
import styled, { css } from "styled-components"

import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { ModalHeader, ModalCloseBtn, ModalContent } from "components/common/Style/Modal/CommonStyle"
import { CheckBox } from "components/common/Style/Common/CommonStyle"

import { ModalContext } from "module/Modal"
import { RoofTopFacilities } from "constants/RoofTopFacilities"

const SetFacilitiesModal = ({ applyInfo, changeInfo }) => {
  const { closeModal } = useContext(ModalContext)
  const [detailFacilities, setDetailFacilities] = useState(applyInfo.detailInfoNum)

  const changeCheck = e => {
    const { name, checked } = e.target
    checked
      ? setDetailFacilities([...detailFacilities, parseInt(name)])
      : setDetailFacilities([...detailFacilities].filter(option => option !== parseInt(name)))
  }

  const confirmDetailList = () => {
    changeInfo({ ...applyInfo, detailInfoNum: detailFacilities })
    closeModal()
  }

  return (
    <Wrapper>
      <ModalHeader>
        <h5>세부 옵션 설정</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <h5>옥상 지원 세부 시설 목록</h5>
        <p>해당 시설에서 지원하는 시설을 전부 체크해주세요.</p>
        <SetDetailSection>
          {RoofTopFacilities.map((facility, idx) => (
            <CheckBox key={facility}>
              <p>{facility}</p>
              <input
                key={`${facility}-${detailFacilities.includes(idx)}`}
                type="checkbox"
                name={idx}
                checked={detailFacilities.includes(idx)}
                onChange={changeCheck}
              />
            </CheckBox>
          ))}
        </SetDetailSection>
        <ApplyDetailSection>
          <ApplyDetailBtn onClick={confirmDetailList}>세부 정보 저장</ApplyDetailBtn>
        </ApplyDetailSection>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 33vw;
  margin: auto;
  background-color: #ffffff;
`

const SetDetailSection = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      width: 90%;
      margin: ${margins.base} auto;

      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;

      text-align: center;
    `
  }}
`

const ApplyDetailSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ApplyDetailBtn = styled.button`
  ${({ theme }) => {
    const { colors, paddings, margins } = theme
    return css`
      width: 40%;
      padding: ${paddings.sm};
      margin: ${margins.sm} auto ${margins.base} auto;

      background: ${colors.white};
      border: 1px solid ${colors.main.primary};
      border-radius: 2.5vw;
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: 100;

      &:hover {
        border: 0px;
        background: ${colors.main.tertiary};
        color: ${colors.white};
      }
    `
  }}
`

export default SetFacilitiesModal
