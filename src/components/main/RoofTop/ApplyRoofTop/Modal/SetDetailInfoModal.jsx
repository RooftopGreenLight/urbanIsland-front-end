import { useContext, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { ModalContext } from "module/Modal"
import { ApplyRoofTopFacilities } from "constants/ApplyRoofTopFacilities"

const SetDetailInfoModal = () => {
  const { closeModal } = useContext(ModalContext)

  const [detailInfoList, setDetailInfoList] = useState(ApplyRoofTopFacilities)

  const changeCheck = e => {
    const { name, checked } = e.target
    setDetailInfoList({ ...detailInfoList, [name]: checked })
  }

  const confirmDetailList = () => {
    closeModal()
  }

  console.log(ApplyRoofTopFacilities)

  return (
    <Wrapper>
      <ModalHeader>
        <h5>세부 옵션 설정</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <SetDetailSection>
          {Object.entries(detailInfoList).map(([facility, value], idx) => (
            <div className="select-section" key={idx}>
              <p>{facility}</p>
              <input type="checkbox" name={facility} checked={value} onChange={changeCheck}></input>
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
  background-color: #f5f5f5;
`

const ModalHeader = styled.div`
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
    `
  }}
`

const ModalContent = styled.div`
  ${({ theme }) => {
    const { fonts, margins, paddings } = theme
    return css`
      padding: ${paddings.xl};
      margin: auto;

      h5 {
        font-size: ${fonts.size.base};
        text-align: center;
        margin: ${margins.base} 0vw;
      }
    `
  }}
`

const SetDetailSection = styled.div`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      width: 75%;
      margin: auto;

      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;

      text-align: center;

      .select-section {
        width: 40%;

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

        input {
          margin-left: auto;

          text-align: center;
          font-size: ${fonts.size.sm};

          &::placeholder {
            font-weight: 100;
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
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 25%;
      padding: ${paddings.sm};
      margin: ${margins.base} auto;

      background-color: ${colors.white};
      border: 1px solid #7d7d7d;
      border-radius: 25px;

      text-align: center;
      font-size: ${fonts.size.xsm};
      font-weight: 100;
    `
  }}
`

export default SetDetailInfoModal
