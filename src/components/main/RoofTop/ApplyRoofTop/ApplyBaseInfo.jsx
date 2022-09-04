import styled, { css } from "styled-components"
import { useState } from "react"

const ApplyBaseInfo = ({ applyInfo, changeInfo }) => {
  const [applyBaseInfo, setApplyBaseInfo] = useState(applyInfo)
  const { phoneNumber, width, widthPrice, totalPrice, ownerContent, roofTopType } = applyBaseInfo

  const changeInput = e => {
    const { name, value } = e.target
    setApplyBaseInfo({ ...applyBaseInfo, [name]: value })
    changeInfo({ ...applyInfo, [name]: value })
  }

  return (
    <Wrapper>
      <InputBox boxSize="lg">
        <div className="title">
          <h5>연락처</h5>
          <p>옥상 소유자의 연락처를 입력해주세요.</p>
        </div>
        <input name="phoneNumber" value={phoneNumber} placeholder="연락처" onChange={changeInput} />
      </InputBox>
      <InputBox boxSize="base">
        <div className="title">
          <h5>건물 넓이</h5>
          <p>등록하시려는 옥상의 넓이를 입력해주세요.</p>
        </div>
        <input name="width" value={width} placeholder="넓이" onChange={changeInput} />
      </InputBox>
      {roofTopType === "G" ? (
        <InputBox boxSize="base">
          <div className="title">
            <h5>이용 가격</h5>
            <p>등록하시려는 옥상의 이용가를 입력해주세요.</p>
          </div>
          <input name="totalPrice" value={totalPrice} placeholder="가격" onChange={changeInput} />
        </InputBox>
      ) : (
        <InputBox boxSize="base">
          <div className="title">
            <h5>시공 가격</h5>
            <p>등록하시려는 옥상의 시공 가격을 입력해주세요.</p>
          </div>
          <input
            name="widthPrice"
            value={widthPrice}
            placeholder="시공 가격"
            onChange={changeInput}
          />
        </InputBox>
      )}
      <InputBox boxSize="lg">
        <div className="title">
          <h5>{roofTopType === "G" ? "옥상지기 측 멘트" : "그린비에게 보내는 멘트"}</h5>
          <p>등록하시려는 옥상 시설에 대한 소개글을 작성해주세요.</p>
        </div>
        <textarea
          rows="4"
          cols="50"
          name="ownerContent"
          value={ownerContent}
          placeholder="이곳에 자유롭게 소개글을 작성해주세요."
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
      ["sm", "25%"],
      ["base", "47.5%"],
      ["lg", "100%"],
    ])
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: ${boxWidth.get(boxSize)};
      background-color: ${colors.white};
      padding: ${paddings.base};

      .title {
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
        background-color: ${colors.main.tertiary}09;
        border-bottom: 1px solid ${colors.main.secondary}44;

        color: ${colors.black.secondary};
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: center;
      }
    `
  }}
`
export default ApplyBaseInfo
