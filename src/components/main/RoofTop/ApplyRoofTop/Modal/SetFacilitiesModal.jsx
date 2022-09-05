import { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

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
            <div className="select-section" key={facility}>
              <p>{facility}</p>
              <input
                key={`${facility}-${detailFacilities.includes(idx)}`}
                type="checkbox"
                name={idx}
                checked={detailFacilities.includes(idx)}
                onChange={changeCheck}></input>
            </div>
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
  width: 30vw;
  margin: auto;
  background-color: #ffffff;
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

const ModalContent = styled.div`
  ${({ theme }) => {
    const { fonts, paddings, margins } = theme
    return css`
      padding: ${paddings.lg} ${paddings.xl};
      margin: auto;

      h5 {
        font-size: ${fonts.size.sm};
        text-align: center;
      }

      p {
        margin-bottom: ${margins.lg};
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: center;
      }
    `
  }}
`

const SetDetailSection = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 100%;
      margin: auto;

      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;

      text-align: center;

      .select-section {
        width: 35%;

        display: flex;
        justify-content: space-between;

        h5 {
          margin-bottom: ${margins.sm};
          font-size: ${fonts.size.base};
        }

        p {
          margin: ${margins.sm} 0vw;
          font-size: ${fonts.size.xsm};
          font-weight: 100;
        }

        input[type="checkbox"] {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;

          background: ${colors.main.quaternary}88;
          border-radius: 4px;

          width: 16px;
          height: 16px;
          margin: auto 0vw;

          &::after {
            border: solid #fff;
            border-width: 0 2px 2px 0;
            content: "";
            display: none;

            width: 15%;
            height: 40%;

            position: relative;
            left: 37.5%;
            top: 20%;
            transform: rotate(45deg);
          }

          &:checked {
            background: ${colors.main.tertiary};
            &::after {
              display: block;
            }
          }
        }
      }
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
      margin: ${margins.lg} auto 0vw auto;

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
