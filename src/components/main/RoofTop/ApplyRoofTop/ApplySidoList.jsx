import styled, { css } from "styled-components"
import { useRef, useState } from "react"

import { SidoGunguList } from "constants/SidoGunguList"

const ApplySidoList = ({ applyInfo, changeInfo }) => {
  const citySelect = useRef()
  const [sidoInfo, setSidoInfo] = useState({
    city: "",
    district: "",
    detail: "",
  })
  const { city, district, detail } = sidoInfo

  const changeSelect = e => {
    const { name, value } = e.target
    if (name === "city") {
      setSidoInfo({ ...sidoInfo, [name]: value, district: "", detail: "" })
      changeInfo({ ...applyInfo, [name]: value, district: "", detail: "" })
      citySelect.current.value = "default"
      return
    }
    setSidoInfo({ ...sidoInfo, [name]: value })
    changeInfo({ ...applyInfo, [name]: value })
  }

  const changeInput = e => {
    const { name, value } = e.target
    setSidoInfo({ ...sidoInfo, [name]: value })
    changeInfo({ ...applyInfo, [name]: value })
  }

  return (
    <Wrapper>
      <div className="title">
        <h5>시설 위치</h5>
        <p>등록하려는 옥상 시설의 주소를 설정해주세요.</p>
      </div>
      <SelectList>
        <SelectBox name="city" onChange={changeSelect} defaultValue="default">
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
            defaultValue="default"
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
        {district ? (
          <input
            type="texT"
            name="detail"
            placeholder="도로명 주소를 입력해주세요"
            value={detail}
            onChange={changeInput}
          />
        ) : (
          <input type="texT" name="detail" placeholder="시 / 구를 설정해주세요." disabled />
        )}
      </SelectList>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: ${paddings.base};
      text-align: left;

      .title {
        margin-bottom: ${margins.sm};
      }

      p {
        color: ${colors.black.quinary};
        font-weight: ${fonts.weight.light};
      }

      h5 {
        margin-bottom: 0.25rem;
        color: ${colors.black.secondary};
        font-size: ${fonts.size.sm};
      }

      input {
        width: 50%;
        padding: ${paddings.sm} 0vw;
        margin: ${margins.xsm} 0vw;

        border: 0;
        background-color: ${colors.main.tertiary}09;
        border-bottom: 1px solid ${colors.main.secondary}44;

        color: ${colors.black.secondary};
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: center;
      }
    `
  }}
`

const SelectList = styled.div`
  display: flex;
  justify-content: space-between;
`

const SelectBox = styled.select`
  ${({ theme }) => {
    const { fonts, margins, paddings } = theme
    return css`
      width: 22.5%;
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

export default ApplySidoList
