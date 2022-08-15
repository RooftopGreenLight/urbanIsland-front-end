import { useContext, useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { ModalContext } from "module/Modal"
import { RequiredRoofTopOption } from "constants/RequiredRoofTopOption"

const SetRequiredOptionModal = ({ requiredInfo, setRequiredInfo }) => {
  const { closeModal } = useContext(ModalContext)
  const [requiredOptions, setRequiredOptions] = useState(RequiredRoofTopOption)
  const { requiredItemNum } = requiredInfo

  useEffect(() => {
    const preSetCheckBox = () => {
      Object.keys(requiredOptions).forEach((option, idx) => {
        setRequiredOptions({ ...requiredOptions, option: requiredItemNum.includes(idx) })
      })
    }
    preSetCheckBox()
  }, [])

  const changeCheck = e => {
    const { name, checked } = e.target
    setRequiredOptions({ ...requiredOptions, [name]: checked })
  }

  const confirmDetailList = () => {
    const newDetailNumList = []
    const optionList = Object.keys(requiredOptions)
    for (const [option, value] of Object.entries(requiredOptions)) {
      if (value) {
        newDetailNumList.push(optionList.indexOf(option))
      }
    }
    setRequiredInfo(newDetailNumList)
    console.log(newDetailNumList)
    closeModal()
  }

  return (
    <Wrapper>
      <ModalHeader>
        <h5>세부 옵션 설정</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <ShowOptionList>
          {Object.keys(requiredOptions).map(option => (
            <div className="select-section" key={option}>
              <p>{option}</p>
              <input
                type="checkbox"
                name={option}
                checked={requiredOptions[option]}
                onChange={changeCheck}
              />
            </div>
          ))}
        </ShowOptionList>
        <ApplySection>
          <button onClick={confirmDetailList}>세부 정보 저장</button>
        </ApplySection>
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

const ShowOptionList = styled.div`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      width: 90%;
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

const ApplySection = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      button {
        width: 25%;
        padding: ${paddings.sm};
        margin: ${margins.base} auto;

        background-color: ${colors.white};
        border: 1px solid #7d7d7d;
        border-radius: 25px;

        text-align: center;
        font-size: ${fonts.size.xsm};
        font-weight: 100;

        &:hover {
          background: rgb(77, 77, 77);
          border: 1px solid ${colors.white};
          color: ${colors.white};
        }
      }
    `
  }}
`

export default SetRequiredOptionModal
