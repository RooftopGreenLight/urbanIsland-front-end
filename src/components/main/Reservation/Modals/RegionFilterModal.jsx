import { useContext, useState, useRef, useEffect } from "react"
import styled, { css } from "styled-components"

import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import { SidoGunguList } from "constants/SidoGunguList"

import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { ModalHeader, ModalCloseBtn, ModalContent } from "components/common/Style/Modal/CommonStyle"

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
      if (district !== "") {
        citySelect.current.value = "default"
      }
      return
    }
    setSidoInfo({ ...sidoInfo, [name]: value })
  }

  const resetSelect = () => {
    setSidoInfo({ city: "", district: "" })
    setFilter(prevFilter => ({ ...prevFilter, city: "", district: "" }))
    closeModal()
  }

  const confirmSelect = () => {
    if (city !== "") {
      setFilter(prevFilter => ({ ...prevFilter, city, district }))
      closeModal()
    }
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
        <BtnList>
          <SettingBtn onClick={resetSelect}>초기화</SettingBtn>
          <SettingBtn onClick={confirmSelect}>적용하기</SettingBtn>
        </BtnList>
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

const SelectList = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      width: 72.5%;
      margin: ${margins.base} auto;

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

const SettingBtn = styled.button`
  ${({ theme }) => {
    const { colors, paddings, margins } = theme
    return css`
      width: 40%;
      padding: ${paddings.sm};
      margin: ${margins.sm} auto 0vw auto;

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

export default RegionFilterModal
