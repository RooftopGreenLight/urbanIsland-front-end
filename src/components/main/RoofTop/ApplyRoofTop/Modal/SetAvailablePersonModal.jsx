import { useContext, useRef, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { ModalContext } from "module/Modal"

const SetAvailablePersonModal = () => {
  const { closeModal } = useContext(ModalContext)
  const feedBackMsg = useRef()

  const [banState, setBanState] = useState({
    nokidzone: false,
    preventpet: false,
  })

  const [availablePerson, setAvailablePerson] = useState({
    adult: 0,
    children: 0,
    pet: 0,
  })

  const { nokidzone, preventpet } = banState
  const { adult, children, pet } = availablePerson

  const changeTime = e => {
    const { name, value } = e.target
    if (value < -1) {
      feedBackMsg.current.innerText = "인원수는 1명부터 설정 가능합니다."
      return
    }
    setAvailablePerson({ ...availablePerson, [name]: value })
  }

  const changeCheck = e => {
    const { name, value } = e.target
    setBanState({ ...banState, [name]: value })
    console.log(value)
  }

  const confirmPerson = () => {
    if (adult * children * pet === 0) {
      feedBackMsg.current.innerText = "인원수는 1명부터 설정 가능합니다."
      return
    }
    closeModal()
  }

  return (
    <Wrapper>
      <ModalHeader>
        <h5>인원 설정</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <SetPersonSection>
          <div className="input-section">
            <h5>성인</h5>
            <input name="adult" value={adult} onChange={changeTime} />
          </div>
          <div className="input-section">
            <h5>어린이</h5>
            <input name="children" value={children} onChange={changeTime} />
            <p>노 키즈 존 여부</p>
            <input type="checkbox" name="xxx" value="yyy"></input>
          </div>
          <div className="input-section">
            <h5>반려동물</h5>
            <input name="pet" value={pet} onChange={changeTime} />
            <p>동물 출입 금지</p>
            <input
              type="checkbox"
              name="preventpet"
              value={preventpet}
              onChange={changeCheck}></input>
          </div>
        </SetPersonSection>
        <ApplyTimeSection>
          <ApplyTimeBtn onClick={confirmPerson}>인원 설정</ApplyTimeBtn>
          <ModalFeedback ref={feedBackMsg}>시설 사용 가능 인원을 설정해주세요.</ModalFeedback>
        </ApplyTimeSection>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 33vw;

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
    const { paddings } = theme
    return css`
      padding: ${paddings.xl};
      margin: auto;
    `
  }}
`

const SetPersonSection = styled.div`
  ${({ theme, timeType }) => {
    const { fonts, margins } = theme
    return css`
      width: 75%;
      margin: auto;

      display: flex;
      justify-content: space-evenly;

      text-align: center;

      .input-section {
        width: 25%;

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
          width: 100%;
          margin: 0vw auto;

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

const ApplyTimeSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ApplyTimeBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 20%;
      padding: ${paddings.sm};
      margin: ${margins.lg} auto ${margins.sm} auto;

      background-color: ${colors.white};
      border: 1px solid #7d7d7d;
      border-radius: 25px;

      text-align: center;
      font-size: ${fonts.size.xsm};
      font-weight: 100;
    `
  }}
`

const ModalFeedback = styled.p`
  ${({ theme }) => {
    const { fonts, paddings } = theme
    return css`
      text-align: center;
      font-size: ${fonts.size.xsm};
      font-weight: 100;
    `
  }}
`

export default SetAvailablePersonModal
