import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled, { css } from "styled-components"

import { ModalContext } from "module/Modal"
import { roofTopControl } from "api/controls/roofTopControl"

import ApplySidoList from "components/main/RoofTop/ApplyRoofTop/ApplySidoList"
import ApplyBaseInfo from "components/main/RoofTop/ApplyRoofTop/ApplyBaseInfo"
import ApplyImgList from "components/main/RoofTop/ApplyRoofTop/ApplyImgList"
import ApplyDetailView from "components/main/RoofTop/ApplyRoofTop/ApplyDetailView"
import ApplyAvailableInfo from "components/main/RoofTop/ApplyRoofTop/ApplyAvailableInfo"
import ApplyDetailInfo from "components/main/RoofTop/ApplyRoofTop/ApplyDetailInfo"
import ApplyExtraOption from "components/main/RoofTop/ApplyRoofTop/ApplyExtraOption"

import RequestDeadLine from "components/main/RoofTop/RequestGreenBee/RequestDeadLine"
import SetRequiredOptionModal from "components/main/RoofTop/RequestGreenBee/Modal/SetRequiredOption"

const RequestToGreenBee = () => {
  const { openModal } = useContext(ModalContext)
  const navigate = useNavigate()
  const [requiredInfo, setRequiredInfo] = useState({
    rooftopType: "NG",
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
    county: "",
    city: "",
    detail: "",
    deadLineNum: [],
    requiredItemNum: [],
    detailInfoNum: [],
    normalFile: [],
    structFile: "",
    mainFile: "",
    optionCount: 0,
    optionContent: [],
    optionPrice: [],
  })

  const { explainContent } = requiredInfo

  const changeInput = e => {
    const { name, value } = e.target
    setRequiredInfo({ ...requiredInfo, [name]: value })
  }

  const submitRequest = async () => {
    const reqFormData = new FormData()
    for (const [option, value] of Object.entries(requiredInfo)) {
      // 배열의 경우 append를 통해 같은 옵션에 값을 추가해주어야 함
      if (typeof value === "array") {
        for (let idx = 0; idx < value.length; idx++) {
          reqFormData.append(option, value[idx])
        }
        continue
      }
      if (option === "startTime" || option === "endTime") {
        reqFormData.append(option, `${value}:00:00`)
        continue
      }
      // 배열이 아닌 경우에는 그냥 값을 추가해주면 됨.
      reqFormData.append(option, value)
    }
    try {
      await roofTopControl.postRoofTopInfo(reqFormData)
      navigate("/")
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <Wrapper>
      <ViewPoint>
        <ApplySidoList applyInfo={requiredInfo} changeInfo={setRequiredInfo} />
        <ApplyBaseInfo applyInfo={requiredInfo} changeInfo={setRequiredInfo} />
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
        <ApplyImgList applyInfo={requiredInfo} changeInfo={setRequiredInfo} />
        <ApplyDetailView applyInfo={requiredInfo} changeInfo={setRequiredInfo} />
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
        <ApplyAvailableInfo applyInfo={requiredInfo} changeInfo={setRequiredInfo} />
        <ApplyDetailInfo applyInfo={requiredInfo} changeInfo={setRequiredInfo} />
        <ApplyExtraOption applyInfo={requiredInfo} changeInfo={setRequiredInfo} />
        <ConfirmBtn onClick={submitRequest}>제출하기</ConfirmBtn>
      </ViewPoint>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 50vw;
  height: 80vh;

  margin: auto;
  padding: 1rem;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  background-color: #d3d3d3;
  text-align: center;
`

const ViewPoint = styled.div`
  max-height: 80vh;
  overflow: auto;
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

const ConfirmBtn = styled.button`
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
