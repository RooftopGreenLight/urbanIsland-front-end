import styled, { css } from "styled-components"
import { useEffect, useState } from "react"

import { RequestDeadLineDate } from "constants/RequestDeadLineDate"

const RequestDeadLine = ({ requiredInfo, setRequiredInfo }) => {
  const [checkedDeadLineNum, setCheckedDeadLineNum] = useState(requiredInfo.deadLineNum)

  useEffect(() => {
    setRequiredInfo(prevInfo => ({ ...prevInfo, deadLineNum: checkedDeadLineNum }))
  }, [checkedDeadLineNum])

  const changeCheckbox = e => {
    const { name, checked } = e.target
    setCheckedDeadLineNum(checked ? parseInt(name) : null)
  }

  return (
    <Wrapper>
      <div className="title">
        <h5>세부사항 : 필요 시공 기한</h5>
        <p>옥상 녹화까지 소요될 시공 기한을 설정하세요.</p>
      </div>
      <InputBoxList>
        {RequestDeadLineDate.map((elm, idx) => (
          <InputBox key={elm}>
            <p>{elm}</p>
            <input
              type="checkbox"
              name={idx}
              checked={checkedDeadLineNum === idx}
              onChange={changeCheckbox}
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
      width: 100%;
      background-color: ${colors.white};
      padding: ${paddings.base};

      .title {
        width: 80%;
        margin-bottom: ${margins.sm};
        text-align: left;
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

      input,
      textarea {
        width: 100%;
        padding: ${paddings.sm} 0vw;
        margin: ${margins.xsm} 0vw;

        border: 0;
        border-bottom: 1px solid ${colors.main.secondary}44;

        color: ${colors.black.secondary};
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: center;
      }
    `
  }}
`

const InputBoxList = styled.div`
  ${({ theme }) => {
    const { colors, margins, paddings } = theme
    return css`
      width: 100%;
      margin: ${margins.lg} auto 0vw auto;
      padding: ${paddings.sm} ${paddings.lg};

      background-color: ${colors.main.tertiary}11;

      display: flex;
      justify-content: space-between;
    `
  }}
`

const InputBox = styled.div`
  ${({ theme }) => {
    const { fonts } = theme
    return css`
      p {
        margin: 0;
        font-size: ${fonts.size.xsm};
      }
    `
  }}
`

export default RequestDeadLine
