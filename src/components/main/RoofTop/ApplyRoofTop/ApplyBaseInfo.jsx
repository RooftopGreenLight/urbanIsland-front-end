import styled, { css } from "styled-components"
import { useRecoilState } from "recoil"

import { applyRoofTopBase, applyRoofTopContent } from "module/ApplyRoofTop"

const ApplyBaseInfo = () => {
  const [applyBaseInfo, setApplyBaseInfo] = useRecoilState(applyRoofTopBase)
  const [applyContent, setApplyContent] = useRecoilState(applyRoofTopContent)

  const { phoneNumber, width, totalPrice } = applyBaseInfo
  const { explainContent } = applyContent

  const changeContentInput = e => {
    const { name, value } = e.target
    setApplyContent({ name, value })
  }

  const changeBaseInfoInput = e => {
    const { name, value } = e.target
    setApplyBaseInfo({ name, value })
  }

  return (
    <Wrapper>
      <ApplyInfoBox>
        <h5>세부사항 : 건물 넓이</h5>
        <p>등록하시려는 옥상의 넓이를 입력해주세요.</p>
        <input name="width" value={width} placeholder="넓이" onChange={changeBaseInfoInput} />
      </ApplyInfoBox>
      <ApplyInfoBox>
        <h5>세부사항 : 이용 가격</h5>
        <p>등록하시려는 옥상의 이용가를 입력해주세요.</p>
        <input
          name="totalPrice"
          value={totalPrice}
          placeholder="가격"
          onChange={changeBaseInfoInput}
        />
      </ApplyInfoBox>
      <ApplyInfoBox>
        <h5>세부사항 : 연락처</h5>
        <p>옥상 소유자의 연락처를 입력해주세요.</p>
        <input
          name="phoneNumber"
          value={phoneNumber}
          placeholder="연락처"
          onChange={changeBaseInfoInput}
        />
      </ApplyInfoBox>
      <ApplyInfoBox>
        <h5>세부사항 : 옥상지기 측 멘트</h5>
        <p>등록하시려는 옥상 시설에 대한 소개글을 작성해주세요.</p>
        <input
          name="explainContent"
          value={explainContent}
          placeholder="멘트"
          onChange={changeContentInput}
        />
      </ApplyInfoBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin: auto;

  display: flex;
  flex-wrap: wrap;
`

const ApplyInfoBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 40%;
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
