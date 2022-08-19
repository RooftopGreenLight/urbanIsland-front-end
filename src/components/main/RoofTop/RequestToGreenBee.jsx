import { useContext, useState } from "react"
import styled, { css } from "styled-components"

import { ModalContext } from "module/Modal"

import RequestDeadLine from "components/main/RoofTop/RequestGreenBee/RequestDeadLine"
import RequestImgList from "components/main/RoofTop/RequestGreenBee/RequestImgList"
import RequestDetailView from "components/main/RoofTop/RequestGreenBee/RequestDetailView"
import SetRequiredOptionModal from "components/main/RoofTop/RequestGreenBee/Modal/SetRequiredOption"

const RequestToGreenBee = () => {
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

  const submitRequest = e => {
    e.preventDefault()
    const data = new FormData(e.target)
    let formObject = Object.fromEntries(data.entries())
    console.log(formObject)
  }

  return (
    <Wrapper method="post" encType="multipart/form-data" onSubmit={submitRequest}>
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
      <InputBox boxSize="lg">
        <h5>세부사항 : 그린비에게 보내는 멘트</h5>
        <p>그린비에게 보낼 멘트를 입력해주세요.</p>
        <textarea
          name="ownerContent"
          rows="4"
          cols="50"
          value={ownerContent}
          placeholder="자유롭게 환불 규정을 작성해주세요."
          onChange={changeInput}
        />
      </InputBox>
      <RequestImgList requiredInfo={requiredInfo} setRequiredInfo={setRequiredInfo} />
      <RequestDetailView requiredInfo={requiredInfo} setRequiredInfo={setRequiredInfo} />
      <InputBox boxSize="lg">
        <h5>세부사항 : 옥상 설명 멘트</h5>
        <p>고객에게 옥상 시설을 설명해주세요!</p>
        <textarea
          name="explainContent"
          rows="4"
          cols="50"
          value={explainContent}
          placeholder="자유롭게 옥상 설명을 작성해주세요."
          onChange={changeInput}
        />
      </InputBox>
      <SubmitBtn>제출하기</SubmitBtn>
    </Wrapper>
  )
}

const Wrapper = styled.form`
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
    const boxWidth = new Map([
      ["sm", "20%"],
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

const SubmitBtn = styled.button`
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
export default RequestToGreenBee
