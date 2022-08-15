import styled, { css } from "styled-components"
import { useState } from "react"

const deadLineList = ["1개월 이내", "2개월 이내", "3개월 이내", "6개월 이내", "제한 없음"]

const RequestDeadLine = ({ requiredInfo, setRequiredInfo }) => {
  const [checkedDeadLineNum, setCheckedDeadLineNum] = useState(requiredInfo.deadLineNum)
  const changeDeadLineNum = e => {
    const { name, checked } = e.target
    setCheckedDeadLineNum(checked ? parseInt(name) : [])
    setRequiredInfo({ ...requiredInfo, deadLineNum: checkedDeadLineNum })
  }

  return (
    <Wrapper>
      <h5>세부사항 : 필요 시공 기한</h5>
      <p>옥상 녹화까지 소요될 시공 기한을 설정하세요.</p>
      <InputBoxList>
        {deadLineList.map((elm, idx) => (
          <InputBox key={elm}>
            <p>{elm}</p>
            <input
              type="checkbox"
              name={idx}
              checked={checkedDeadLineNum === idx}
              onChange={changeDeadLineNum}
            />
          </InputBox>
        ))}
      </InputBoxList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 90%;
      margin: 1vw auto;
      background-color: ${colors.white};
      padding: ${paddings.base};

      h5 {
        font-size: ${fonts.size.base};
      }

      p {
        margin-bottom: ${margins.sm};
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }

      input {
        width: 100%;
        padding: ${paddings.sm};
        margin: ${margins.sm} 0vw;
      }
    `
  }}
`

const InputBoxList = styled.div`
  width: 100%;
  margin: auto;

  display: flex;
  justify-content: center;
`

const InputBox = styled.div`
  ${({ theme }) => {
    const { fonts, colors, margins, paddings } = theme
    return css`
      width: 15%;
      p {
        margin: 0;
        font-size: ${fonts.size.xsm};
      }
    `
  }}
`

export default RequestDeadLine
