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
      <InputBox>
        <div className="title">
          <h5>환불 규정</h5>
          <p>등록하려는 옥상 시설의 환불 규정을 작성해주세요.</p>
        </div>
        <textarea
          name="refundContent"
          rows="4"
          cols="50"
          value={refundContent}
          placeholder="자유롭게 환불 규정을 작성해주세요."
          onChange={changeInput}
        />
      </InputBox>
      <InputBox>
        <div className="title">
          <h5>이용 규칙</h5>
          <p>등록하려는 옥상 시설의 이용 규칙을 작성해주세요.</p>
        </div>
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
`

const InputBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 100%;
      background-color: ${colors.white};
      padding: ${paddings.base};

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

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
        background-color: ${colors.main.tertiary}11;
        border-bottom: 1px solid ${colors.main.secondary}44;

        color: ${colors.black.secondary};
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: center;
      }
    `
  }}
`

export default ApplyDetailInfo
