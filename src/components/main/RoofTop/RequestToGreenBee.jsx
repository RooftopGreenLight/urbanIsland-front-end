import { useContext, useState } from "react"
import styled, { css } from "styled-components"

import { ModalContext } from "module/Modal"

import RequestDeadLine from "components/main/RoofTop/RequestGreenBee/RequestDeadLine"
import SetRequiredOptionModal from "components/main/RoofTop/RequestGreenBee/Modal/SetRequiredOption"

const RequesToGreenBee = () => {
  const { openModal } = useContext(ModalContext)
  const [requiredInfo, setRequiredInfo] = useState({
    width: 0,
    widthPrice: 0,
    totalPrice: 0,
    phoneNumber: "",
    explainContent: "",
    refundContent: "",
    roleContent: "",
    ownerContent: "",
    startTime: 0,
    endTime: 23,
    adultCount: 0,
    kidCount: 0,
    petCount: 0,
    totalCount: 0,
    country: "",
    city: "",
    detail: "",
    deadLineNum: [],
    requiredItemNum: [],
    detailNum: [],
    normalFile: [],
    structFile: "",
    optionCount: 0,
    optionContent: [],
    optionPrice: [],
  })

  const {
    width,
    widthPrice,
    totalPrice,
    phoneNumber,
    explainContent,
    refundContent,
    roleContent,
    ownerContent,
    startTime,
    endTime,
    adultCount,
    kidCount,
    petCount,
    totalCount,
    country,
    city,
    detail,
    deadLineNum,
    requiredItemNum,
    detailNum,
    normalFile,
    structFile,
    optionCount,
    optionContent,
    optionPrice,
  } = requiredInfo

  const changeInput = e => {
    const { name, value } = e.target
    setRequiredInfo({ ...requiredInfo, [name]: value })
  }

  return (
    <Wrapper>
      <InputBox boxSize="lg">
        <h5>세부사항 : 연락처</h5>
        <p>옥상 소유자의 연락처를 입력해주세요.</p>
        <input name="phoneNumber" value={phoneNumber} placeholder="연락처" onChange={changeInput} />
      </InputBox>
      <InputBox boxSize="base">
        <h5>세부사항 : 넓이</h5>
        <p>옥상 소유자의 연락처를 입력해주세요.</p>
        <input name="width" value={width} placeholder="넓이" onChange={changeInput} />
      </InputBox>
      <InputBox boxSize="base">
        <h5>세부사항 : 희망 가격</h5>
        <p>옥상 소유자의 연락처를 입력해주세요.</p>
        <input
          name="totalPrice"
          value={totalPrice}
          placeholder="희망 가격"
          onChange={changeInput}
        />
      </InputBox>
      <InputBox boxSize="lg">
        <h5>세부사항 : 필요 항목</h5>
        <p>옥상 녹화 단계에 필요한 시설을 체크해주세요.</p>
        <OpenModalBtn
          onClick={() =>
            openModal(
              <SetRequiredOptionModal
                requiredInfo={requiredInfo}
                setRequiredInfo={setRequiredInfo}
              />,
            )
          }>
          수정하기
        </OpenModalBtn>
      </InputBox>
      <RequestDeadLine requiredInfo={requiredInfo} setRequiredInfo={setRequiredInfo} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 50vw;
  margin: auto;
  padding: 1rem;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  background-color: #d3d3d3;
  text-align: center;
`

const InputBox = styled.div`
  ${({ theme, boxSize }) => {
    const boxWidth = { sm: "20%", base: "40%", lg: "90%" }
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: ${boxWidth[boxSize]};
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

      input {
        width: 100%;
        padding: ${paddings.sm};
        margin: ${margins.sm} 0vw;
      }
    `
  }}
`

const OpenModalBtn = styled.div`
  ${({ theme }) => {
    const { colors, margins, paddings } = theme
    return css`
      width: 30%;
      padding: ${paddings.sm};
      margin: 0.75vw auto 0.25vw auto;

      border: 1px solid rgb(77, 77, 77);
      border-radius: 2.5vw;
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: 100;

      &:hover {
        background: rgb(77, 77, 77);
        color: #fff;
      }
    `
  }}
`

export default RequesToGreenBee
