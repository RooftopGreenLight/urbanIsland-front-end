import { useContext, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus, faXmark } from "@fortawesome/free-solid-svg-icons"

import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"

const NumFilterModal = ({ filter, setFilter }) => {
  const { closeModal } = useContext(ModalContext)
  const [availablePerson, setAvailablePerson] = useState({
    adultCount: filter.adultCount,
    kidCount: filter.kidCount,
    petCount: filter.petCount,
  })

  const { adultCount, kidCount, petCount } = availablePerson

  const confirmCount = () => {
    setFilter({ ...filter, adultCount, kidCount, petCount })
    closeModal()
  }

  const changeCount = (option, value) => {
    if (value >= 0 && value <= 99) {
      setAvailablePerson(prevPerson => ({ ...prevPerson, [option]: value }))
    }
  }

  const resetCount = () => {
    setAvailablePerson({
      adultCount: 0,
      kidCount: 0,
      petCount: 0,
    })
  }

  return (
    <Wrapper>
      <ModalHeader>
        <h5>이용 인원 설정</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <h5>이용 인원 선택</h5>
        <p>시설을 이용하려는 인원을 설정해주세요.</p>
        <SetPersonSection>
          <h5>
            성인 <span>(최소 1인 이상)</span>
          </h5>
          <CounterBox>
            <FontAwesomeIcon
              icon={faMinus}
              value={adultCount}
              onClick={() => changeCount("adultCount", adultCount - 1)}
            />
            <strong>{adultCount}</strong>
            <FontAwesomeIcon
              icon={faPlus}
              value={adultCount}
              onClick={() => changeCount("adultCount", adultCount + 1)}
            />
          </CounterBox>
        </SetPersonSection>
        <SetPersonSection>
          <h5>
            유아 <span>(노 키즈 존일 시 0명)</span>
          </h5>
          <CounterBox>
            <FontAwesomeIcon
              icon={faMinus}
              value={kidCount}
              onClick={() => changeCount("kidCount", kidCount - 1)}
            />
            <strong>{kidCount}</strong>
            <FontAwesomeIcon
              icon={faPlus}
              value={kidCount}
              onClick={() => changeCount("kidCount", kidCount + 1)}
            />
          </CounterBox>
        </SetPersonSection>
        <SetPersonSection>
          <h5>
            반려 동물 <span>(반려동물 출입 금지 시 0명)</span>
          </h5>
          <CounterBox>
            <FontAwesomeIcon
              icon={faMinus}
              value={petCount}
              onClick={() => changeCount("petCount", petCount - 1)}
            />
            <strong>{petCount}</strong>
            <FontAwesomeIcon
              icon={faPlus}
              value={petCount}
              onClick={() => changeCount("petCount", petCount + 1)}
            />
          </CounterBox>
        </SetPersonSection>
        <BtnList>
          <SettingBtn onClick={resetCount}>초기화</SettingBtn>
          <SettingBtn onClick={confirmCount}>적용하기</SettingBtn>
        </BtnList>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 33vw;
  margin: auto;
  background-color: #ffffff;

  animation: ${modalShow} 0.3s;
  animation-fill-mode: forwards;
  overflow: hidden;
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

const SettingBtn = styled.button`
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

const SetPersonSection = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 90%;
      margin: auto;
      padding: ${paddings.sm};
      margin-bottom: ${margins.sm};

      display: flex;
      justify-content: space-between;

      h5 {
        width: 75%;

        font-size: ${fonts.size.base};
        line-height: 150%;
        text-align: left;
      }

      span {
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }
    `
  }}
`

const CounterBox = styled.div`
  ${({ theme }) => {
    const { colors, paddings, margins } = theme
    return css`
      width: 25%;

      border: 1px inset ${colors.main.primary}88;
      border-radius: 0.25rem;

      display: flex;
      justify-content: space-between;
      align-items: center;

      svg {
        width: 25%;
        padding: ${paddings.sm};
      }
    `
  }}
`

const BtnList = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      width: 80%;
      margin: 0vw auto ${margins.base} auto;
      display: flex;
      justify-content: space-between;
    `
  }}
`

export default NumFilterModal
