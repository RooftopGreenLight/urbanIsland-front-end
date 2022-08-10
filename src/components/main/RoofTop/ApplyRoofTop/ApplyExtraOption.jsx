import styled, { css } from "styled-components"
import { useState } from "react"

const ApplyExtraOption = () => {
  const [detailOptions, setdetailOptions] = useState([])
  const [newDetailOption, setNewDetailOption] = useState({
    option: "",
    cost: 0,
  })

  const { option, cost } = newDetailOption

  const changeInput = e => {
    const { name, value } = e.target
    setNewDetailOption({ ...newDetailOption, [name]: value })
  }

  return (
    <Wrapper>
      <OptionTitle>
        <h5>옥상 부가 옵션</h5>
        <p>등록하려는 부가 서비스 옵션을 작성해주세요.</p>
      </OptionTitle>
      <DetailOptionList>
        <InsertNewOption>
          <input name="option" value={option} placeholder="새로운 옵션" />
          <input name="cost" value={cost} placeholder="새로운 옵션 가격" />
          <button type="button">옵션 추가</button>
        </InsertNewOption>
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

const OptionTitle = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      margin: auto;

      h5 {
        font-size: ${fonts.size.lg};
      }

      p {
        font-weight: 100;
      }
    `
  }}
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

const InsertNewOption = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 100%;
      background-color: ${colors.white};

      display: flex;
      justify-content: space-between;

      input {
        &[name="option"] {
          width: 70%;
        }

        &[name="cost"] {
          width: 20%;
        }
      }
    `
  }}
`

export default ApplyExtraOption
