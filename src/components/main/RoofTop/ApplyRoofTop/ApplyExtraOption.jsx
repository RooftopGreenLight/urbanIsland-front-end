import styled, { css } from "styled-components"
import { useState } from "react"

const ApplyExtraOption = () => {
  const [detailOptions, setdetailOptions] = useState([])
  const [newDetailOption, setNewDetailOption] = useState({
    option: "",
    cost: 0,
  })

  const [option, cost] = newDetailOption

  const changeInput = e => {
    const { name, value } = e.target
    setNewDetailOption({ ...newDetailOption, [name]: value })
  }

  return (
    <Wrapper>
      <DetailOptionList>
        <input name="option" value={option} placeholder="새로운 옵션" />
        <input name="cost" value={cost} placeholder="새로운 옵션 가격" />
      </DetailOptionList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 40%;
  padding: 2.5%;
  margin: auto;

  text-align: center;
  background-color: #ffffff;
`

const DetailOptionList = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 70%;
      margin: auto;
      background-color: ${colors.white};

      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `
  }}
`

export default ApplyExtraOption
