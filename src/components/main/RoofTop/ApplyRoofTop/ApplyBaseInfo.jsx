import styled, { css } from "styled-components"
import { useState } from "react"

const ApplyBaseInfo = ({ applyInfo, changeInfo }) => {
  const [applyBaseInfo, setApplyBaseInfo] = useState(applyInfo)
  const { phoneNumber, width, totalPrice, explainContent } = applyBaseInfo

  const changeInput = e => {
    const { name, value } = e.target
    setApplyBaseInfo({ ...applyBaseInfo, [name]: value })
    changeInfo({ ...applyInfo, [name]: value })
  }

  return (
    <Wrapper>
      <InputBox boxSize="sm">
        <h5>건물 넓이</h5>
        <p>등록하시려는 옥상의 넓이를 입력해주세요.</p>
        <input name="width" value={width} placeholder="넓이" onChange={changeInput} />
      </InputBox>
      <InputBox boxSize="sm">
        <h5>이용 가격</h5>
        <p>등록하시려는 옥상의 이용가를 입력해주세요.</p>
        <input name="totalPrice" value={totalPrice} placeholder="가격" onChange={changeInput} />
      </InputBox>
      <InputBox boxSize="sm">
        <h5>연락처</h5>
        <p>옥상 소유자의 연락처를 입력해주세요.</p>
        <input name="phoneNumber" value={phoneNumber} placeholder="연락처" onChange={changeInput} />
      </InputBox>
      <InputBox boxSize="lg">
        <h5>옥상지기 측 멘트</h5>
        <p>등록하시려는 옥상 시설에 대한 소개글을 작성해주세요.</p>
        <textarea
          rows="4"
          cols="50"
          name="explainContent"
          value={explainContent}
          placeholder="멘트"
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
  justify-content: space-between;
  flex-wrap: wrap;
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
        width: 100%;
        padding: ${paddings.sm};
        margin: ${margins.sm} 0vw;
      }
    `
  }}
`
export default ApplyBaseInfo
