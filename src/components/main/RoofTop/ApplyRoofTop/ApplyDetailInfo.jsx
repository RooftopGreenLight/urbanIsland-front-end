import styled, { css } from "styled-components"
import { useState } from "react"

const ApplyDetailInfo = ({ applyInfo, changeInfo }) => {
  const [applyDetailInfo, setApplyDetailInfo] = useState(applyInfo)
  const { roleContent, refundContent } = applyDetailInfo

  const changeInput = e => {
    const { name, value } = e.target
    setApplyDetailInfo({ ...applyDetailInfo, [name]: value })
    changeInfo({ ...applyInfo, [name]: value })
  }

  return (
    <Wrapper>
      <InputBox boxSize="base">
        <h5>환불 규정</h5>
        <p>등록하려는 옥상 시설의 환불 규정을 작성해주세요.</p>
        <textarea
          name="refundContent"
          rows="4"
          cols="50"
          value={refundContent}
          placeholder="자유롭게 환불 규정을 작성해주세요."
          onChange={changeInput}
        />
      </InputBox>
      <InputBox boxSize="base">
        <h5>이용 규칙</h5>
        <p>등록하려는 옥상 시설의 이용 규칙을 작성해주세요.</p>
        <textarea
          name="roleContent"
          rows="4"
          cols="50"
          value={roleContent}
          placeholder="자유롭게 이용 규칙을 작성해주세요."
          onChange={changeInput}
        />
      </InputBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin: auto;

  display: flex;
`

const InputBox = styled.div`
  ${({ theme, boxSize }) => {
    const boxWidth = new Map([
      ["sm", "25%"],
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
        width: 100%;
        padding: ${paddings.sm};
        margin: ${margins.sm} 0vw;
      }
    `
  }}
`

export default ApplyDetailInfo
