import { useContext, useState, useRef, useEffect } from "react"
import styled, { css } from "styled-components"

import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import { SidoGunguList } from "constants/SidoGunguList"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

const RegionFilterModal = ({ filter, setFilter }) => {
  const { closeModal } = useContext(ModalContext)
  const citySelect = useRef()
  const [sidoInfo, setSidoInfo] = useState({
    city: filter.city,
    district: filter.district,
  })
  const { city, district } = sidoInfo

  const changeSelect = e => {
    const { name, value } = e.target
    if (name === "city") {
      setSidoInfo({ ...sidoInfo, [name]: value, district: "" })
      setFilter(prevFilter => ({ ...prevFilter, [name]: value, district: "" }))
      if (district !== "") {
        citySelect.current.value = "default"
      }
      return
    }
    setSidoInfo({ ...sidoInfo, [name]: value })
    setFilter(prevFilter => ({ ...prevFilter, [name]: value }))
    closeModal()
  }

  return (
    <Wrapper>
      <ModalHeader>
        <h5>옥상 위치 찾기</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <h5>옥상 위치 선택</h5>
        <p>검색하려는 옥상의 위치를 지정해주세요.</p>
        <SelectList>
          <SelectBox name="city" onChange={changeSelect} defaultValue={city || "default"}>
            <option value="default" disabled>
              시 선택
            </option>
            {Array.from(SidoGunguList.keys()).map(sido => (
              <option key={sido} value={sido}>
                {sido}
              </option>
            ))}
          </SelectBox>
          {city ? (
            <SelectBox
              name="district"
              onChange={changeSelect}
              defaultValue={district || "default"}
              ref={citySelect}>
              <option value="default" disabled>
                구 선택
              </option>
              {SidoGunguList.get(city).map(sigun => (
                <option key={sigun} value={sigun}>
                  {sigun}
                </option>
              ))}
            </SelectBox>
          ) : (
            <SelectBox name="district" onChange={changeSelect} defaultValue="default">
              <option value="default" disabled>
                시를 선택해주세요.
              </option>
            </SelectBox>
          )}
        </SelectList>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 33vw;

  margin: auto;
  background-color: #f5f5f5;

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

const ModalContent = styled.main`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      display: flex;
      flex-direction: column;
      justify-content: center;

      padding: ${paddings.sm};
      border-top: 1px solid #dee2e6;
      background-color: ${colors.white};
      text-align: center;

      h5 {
        margin: ${margins.base} 0vw ${margins.xsm} 0vw;
        font-size: ${fonts.size.sm};
        text-align: center;
      }

      p {
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: center;
      }
    `
  }}
`

const SelectList = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      width: 60%;
      margin: ${margins.base} auto ${margins.lg} auto;

      display: flex;
      justify-content: space-between;
    `
  }}
`

const SelectBox = styled.select`
  ${({ theme }) => {
    const { fonts, margins, paddings } = theme
    return css`
      width: 47.5%;
      margin: ${margins.sm} 0vw;
      padding: ${paddings.sm};

      border: 1px solid #999;
      border-radius: 0px;

      font-weight: 100;
      font-size: ${fonts.size.xsm};
      text-align: center;

      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      option {
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }
    `
  }}
`

export default RegionFilterModal
