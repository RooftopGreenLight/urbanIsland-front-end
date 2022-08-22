import styled, { css } from "styled-components"
import { useEffect, useState } from "react"

import { SidoGunguList } from "constants/SidoGunguList"

const ApplySidoList = ({ applyInfo, changeInfo }) => {
  let defaultSidoList = {}
  // option Content, Price를 한 쌍으로 묶어 새로운 객체를 생성
  useEffect(() => {
    const { county, city, detail } = applyInfo
    defaultSidoList = { county, city, detail }
  }, [])

  const [sidoInfo, setSidoInfo] = useState(applyInfo)
  const { county, city, detail } = sidoInfo

  const changeSelect = e => {
    const { name, value } = e.target
    if (name === "county") {
      setSidoInfo({ ...sidoInfo, [name]: value, city: "" })
      changeInfo({ ...applyInfo, [name]: value, city: "" })
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
      <InputBox boxSize="lg">
        <h5>현위치</h5>
        <p>옥상 시설의 현 위치를 지정해주세요.</p>
        <SelectBox name="county" onChange={changeSelect}>
          {Array.from(SidoGunguList.keys()).map(sido => (
            <option key={sido} value={sido}>
              {sido}
            </option>
          ))}
        </SelectBox>
        {county && (
          <SelectBox name="city" onChange={changeSelect}>
            {SidoGunguList.get(county).map(sigun => (
              <option key={sigun} value={sigun}>
                {sigun}
              </option>
            ))}
          </SelectBox>
        )}
        {city && (
          <input
            type="texT"
            name="detail"
            placeholder="도로명 주소를 입력해주세요"
            value={detail}
            onChange={changeInput}
          />
        )}
      </InputBox>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 100%;
  margin: auto;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const SelectBox = styled.select`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 25%;
      margin: ${margins.sm};
      padding: ${paddings.sm};

      border: 1px solid #999;
      border-radius: 0px;

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

const InputBox = styled.div`
  ${({ theme, boxSize }) => {
    const boxWidth = new Map([
      ["sm", "22.5%"],
      ["base", "40%"],
      ["lg", "90%"],
    ])
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: ${boxWidth.get(boxSize)};
      margin: 1vw auto;
      background-color: ${colors.white};
      padding: ${paddings.base};

      h5 {
        font-size: ${fonts.size.base};
      }

      p {
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }

      input,
      textarea {
        width: 90%;
        padding: ${paddings.sm};
        margin: ${margins.sm} 0vw;
      }
    `
  }}
`
export default ApplySidoList
