import { useContext, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus, faXmark } from "@fortawesome/free-solid-svg-icons"

import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"

const NumFilterModal = ({ filter, setFilter }) => {
  const [availablePerson, setAvailablePerson] = useState({
    adultCount: filter.adultCount,
    kidCount: filter.kidCount,
    petCount: filter.petCount,
  })

  const { adultCount, kidCount, petCount } = availablePerson

  const { closeModal } = useContext(ModalContext)
  const onConfirm = () => {
    setFilter({ ...filter, adultCount, kidCount, petCount })
    closeModal()
  }
  const onChangePlus = (x, setX) => {
    if (x >= 99) {
      console.log("최대 99")
    } else setX(x + 1)
  }
  const onChangeMinus = (x, setX) => {
    setX(x - 1)
  }

  const onReset = () => {
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
          <span>성인</span>
          <div>
            {adultCount === 0 ? (
              <Icons icon={faMinus} style={{ color: "gray" }} />
            ) : (
              <Icons
                icon={faMinus}
                value={adultCount}
                onClick={() => onChangeMinus(adultCount, setAvailablePerson)}
              />
            )}
            {adultCount}
            <Icons
              icon={faPlus}
              value={adultCount}
              onClick={() => onChangePlus(adultCount, setAvailablePerson)}
            />
          </div>
        </SetPersonSection>
        <SetPersonSection>
          <div>유아</div>
          <div>
            {kidCount === 0 ? (
              <Icons icon={faMinus} style={{ color: "gray" }} />
            ) : (
              <Icons
                icon={faMinus}
                value={kidCount}
                onClick={() => onChangePlus(kidCount, setAvailablePerson)}
              />
            )}
            {kidCount}
            <Icons
              icon={faPlus}
              value={kidCount}
              onClick={() => onChangePlus(kidCount, setAvailablePerson)}
            />
          </div>
        </SetPersonSection>
        <SetPersonSection>
          <div>반려동물</div>
          <div>
            {petCount === 0 ? (
              <Icons icon={faMinus} style={{ color: "gray" }} />
            ) : (
              <Icons
                icon={faMinus}
                value={petCount}
                onClick={() => onChangeMinus(petCount, setAvailablePerson)}
              />
            )}
            {petCount}
            <Icons
              icon={faPlus}
              value={petCount}
              onClick={() => onChangePlus(petCount, setAvailablePerson)}
            />
          </div>
        </SetPersonSection>
        <Bottom>
          <SettingBtn onClick={onReset}>초기화</SettingBtn>
          <SettingBtn onClick={onConfirm}>적용하기</SettingBtn>
        </Bottom>
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
    const { colors, fonts, margins } = theme
    return css`
      width: 100%;
      margin: auto;

      display: flex;
      justify-content: space-evenly;

      text-align: center;
    `
  }}
`
const Icons = styled(FontAwesomeIcon)`
  padding: 0 0.3rem;
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    text-align: center;
    width: 50%;
  }
`

export default NumFilterModal
