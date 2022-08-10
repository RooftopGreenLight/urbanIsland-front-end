import styled, { css } from "styled-components"
import { useState } from "react"

const ApplyDetailInfo = () => {
  const [detailInfo, setDetailInfo] = useState({
    explain: "",
    refundInfo: "",
  })
  return (
    <Wrapper>
      <ApplyInfoBox>
        <h5>세부사항 : 건물 넓이</h5>
        <p>등록하시려는 옥상의 넓이를 입력해주세요.</p>
        <input name="roofTopArea" value={roofTopArea} placeholder="넓이" onChange={changeInput} />
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

      input {
        width: 100%;
        padding: ${paddings.sm};
        margin: ${margins.sm} 0vw;
      }
    `
  }}
`

export default ApplyDetailInfo
