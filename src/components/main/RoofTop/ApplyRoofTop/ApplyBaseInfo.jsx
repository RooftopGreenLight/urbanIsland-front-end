import styled, { css } from "styled-components"
import { useState } from "react"

const ApplyBaseInfo = () => {
  const [applyInfo, setApplyInfo] = useState({
    phoneNumber: "",
    roofTopArea: 0,
    detailMention: "",
  })

  const { phoneNumber, roofTopArea, detailMention } = applyInfo

  const changeInput = e => {
    const { name, value } = e.target
    setApplyInfo({ ...applyInfo, [name]: value })
  }
  return (
    <Wrapper>
      <ApplyInfoBox>
        <h5>세부사항 : 건물 넓이</h5>
        <p>등록하시려는 옥상의 넓이를 입력해주세요.</p>
        <input name="roofTopArea" value={roofTopArea} placeholder="넓이" onChange={changeInput} />
      </ApplyInfoBox>
      <ApplyInfoBox>
        <h5>세부사항 : 연락처</h5>
        <p>옥상 소유자의 연락처를 입력해주세요.</p>
        <input name="phoneNumber" value={phoneNumber} placeholder="연락처" onChange={changeInput} />
      </ApplyInfoBox>
      <ApplyInfoBox>
        <h5>세부사항 : 옥상지기 측 멘트</h5>
        <p>등록하시려는 옥상 시설에 대한 소개글을 작성해주세요.</p>
        <input
          name="detailMention"
          value={detailMention}
          placeholder="멘트"
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

      input {
        width: 100%;
        padding: ${paddings.sm};
        margin: ${margins.sm} 0vw;
      }
    `
  }}
`
export default ApplyBaseInfo
