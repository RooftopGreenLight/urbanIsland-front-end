import { useContext, useRef, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { ModalContext } from "module/Modal"

const SetAvailablePersonModal = ({ applyInfo, changeInfo }) => {
  const { closeModal } = useContext(ModalContext)
  const feedBackMsg = useRef()

  const [availablePerson, setAvailablePerson] = useState({
    adultCount: applyInfo.adultCount,
    kidCount: applyInfo.kidCount,
    petCount: applyInfo.petCount,
  })
  const [banState, setBanState] = useState({
    noKidZone: false,
    preventPet: false,
  })

  const { noKidZone, preventPet } = banState
  const { adultCount, kidCount, petCount } = availablePerson

  const changeTime = e => {
    const { name, value } = e.target
    if (value.length === 0) {
      setAvailablePerson({ ...availablePerson, [name]: 0 })
      return
    }
    if (isNaN(value)) {
      feedBackMsg.current.innerText = "인원수는 숫자만 입력이 가능합니다."
      return
    }
    if (value < -1) {
      feedBackMsg.current.innerText = "인원수는 1명부터 설정 가능합니다."
      return
    }
    setAvailablePerson({ ...availablePerson, [name]: parseInt(value) })
  }

  const changeCheck = e => {
    const { name, checked } = e.target
    setBanState({ ...banState, [name]: checked })
    switch (name) {
      case "noKidZone":
        setAvailablePerson({ ...availablePerson, kidCount: 0 })
        return
      case "preventPet":
        setAvailablePerson({ ...availablePerson, petCount: 0 })
        return
      default:
        return
    }
  }

  const confirmPerson = () => {
    if (adultCount === 0) {
      feedBackMsg.current.innerText = "성인 인원수는 반드시 1명 이상이어야 합니다."
      return
    }
    const totalCount = adultCount + kidCount
    changeInfo({ ...applyInfo, adultCount, kidCount, petCount, totalCount })
    closeModal()
  }

  console.log(applyInfo)

  return (
    <Wrapper>
      <ModalHeader>
        <h5>인원 설정</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <h5>{`현재 설정된 인원 수 : ${adultCount + kidCount} 명`}</h5>
        <SetPersonSection>
          <div className="input-section">
            <h5>성인</h5>
            <input name="adultCount" value={adultCount} onChange={changeTime} />
          </div>
          <div className="input-section">
            <h5>어린이</h5>
            <input name="kidCount" value={kidCount} onChange={changeTime} disabled={noKidZone} />
            <p>노 키즈 존 여부</p>
            <input
              type="checkbox"
              name="noKidZone"
              key={`noKidZone-${noKidZone}`}
              checked={noKidZone}
              onChange={changeCheck}></input>
          </div>
          <div className="input-section">
            <h5>반려동물</h5>
            <input name="petCount" value={petCount} onChange={changeTime} disabled={preventPet} />
            <p>동물 출입 금지</p>
            <input
              type="checkbox"
              name="preventPet"
              key={`preventPet-${preventPet}`}
              checked={preventPet}
              onChange={changeCheck}></input>
          </div>
        </SetPersonSection>
        <ApplyPersonSection>
          <ApplyPersonBtn onClick={confirmPerson}>인원 설정</ApplyPersonBtn>
          <ModalFeedback ref={feedBackMsg}>시설 사용 가능 인원을 설정해주세요.</ModalFeedback>
        </ApplyPersonSection>
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

const SetPersonSection = styled.div`
  ${({ theme }) => {
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

const ApplyPersonSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ApplyPersonBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 20%;
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
