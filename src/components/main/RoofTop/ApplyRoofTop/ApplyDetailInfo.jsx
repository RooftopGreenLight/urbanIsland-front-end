import styled, { css } from "styled-components"
import { useRecoilState } from "recoil"
import { applyRoofTopContent } from "module/ApplyRoofTop"

const ApplyDetailInfo = () => {
  const [applyContent, setApplyContent] = useRecoilState(applyRoofTopContent)
  const { roleContent, refundContent } = applyContent

  const changeInput = e => {
    const { name, value } = e.target
    setApplyContent({ name, value })
  }

  return (
    <Wrapper>
      <ApplyInfoBox>
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
      </ApplyInfoBox>
      <ApplyInfoBox>
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
      </ApplyInfoBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin: auto;

  display: flex;
`

const ApplyInfoBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 30%;
      margin: auto;
      background-color: #ffffff;
      padding: ${paddings.base};

      h5 {
        font-size: ${fonts.size.base};
      }

      p {
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }

      textarea {
        width: 100%;
        padding: ${paddings.sm};
        margin: ${margins.sm} 0vw;
      }
    `
  }}
`

export default ApplyDetailInfo
