import { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { ModalHeader, ModalCloseBtn, ModalContent } from "components/common/Style/Modal/CommonStyle"
import { CheckBox } from "components/common/Style/Common/CommonStyle"

import { ModalContext } from "module/Modal"
import { RequiredRoofTopOption } from "constants/RequiredRoofTopOption"

const SetRequiredOptionModal = ({ applyInfo, changeInfo }) => {
  const { closeModal } = useContext(ModalContext)
  const [requiredOptions, setRequiredOptions] = useState(applyInfo.requiredItemNum)

  useEffect(() => {
    console.log(requiredOptions)
  }, [requiredOptions])

  const changeCheck = e => {
    const { name, checked } = e.target
    console.log(checked)
    checked
      ? setRequiredOptions(prevOptions => [...prevOptions, parseInt(name)])
      : setRequiredOptions(prevOptions =>
          [...prevOptions].filter(option => option !== parseInt(name)),
        )
  }

  const confirmRequiredList = () => {
    changeInfo(prevInfo => ({ ...prevInfo, requiredItemNum: requiredOptions }))
    closeModal()
  }

  return (
    <Wrapper>
      <ModalHeader>
        <h5>시공 옵션 설정</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <h5>녹화 시공 필요 옵션</h5>
        <p>녹화 시공에 필요한 옵션을 선택해주세요.</p>
        <SetDetailSection>
          {RequiredRoofTopOption.map((option, idx) => (
            <CheckBox key={option}>
              <p>{option}</p>
              <input
                key={`${option} + ${requiredOptions.includes(idx)}`}
                type="checkbox"
                name={idx}
                checked={requiredOptions.includes(idx)}
                onChange={changeCheck}
              />
            </CheckBox>
          ))}
        </SetDetailSection>
        <ApplyDetailSection>
          <ApplyDetailBtn onClick={confirmRequiredList}>세부 정보 저장</ApplyDetailBtn>
        </ApplyDetailSection>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 33vw;

  margin: auto;
  background-color: #f5f5f5;
`

const SetDetailSection = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      width: 95%;
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
      margin: ${margins.base} auto;

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

export default SetRequiredOptionModal
