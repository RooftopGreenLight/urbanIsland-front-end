import styled, { css } from "styled-components"
import { useState } from "react"

import { roofTopControl } from "api/controls/roofTopControl"

import ApplySidoList from "components/main/RoofTop/ApplyRoofTop/ApplySidoList"
import ApplyBaseInfo from "components/main/RoofTop/ApplyRoofTop/ApplyBaseInfo"
import ApplyImgList from "components/main/RoofTop/ApplyRoofTop/ApplyImgList"
import ApplyAvailableInfo from "components/main/RoofTop/ApplyRoofTop/ApplyAvailableInfo"
import ApplyDetailView from "components/main/RoofTop/ApplyRoofTop/ApplyDetailView"
import ApplyDetailInfo from "components/main/RoofTop/ApplyRoofTop/ApplyDetailInfo"
import ApplyExtraOption from "components/main/RoofTop/ApplyRoofTop/ApplyExtraOption"

const ApplyRoofTop = () => {
  const [applyRoofTopInfo, setApplyRoofTopInfo] = useState({
    rooftopType: "G",
    width: 0,
    totalPrice: 0,
    phoneNumber: "",
    explainContent: "",
    refundContent: "",
    roleContent: "",
    ownerContent: "",
    startTime: "0",
    endTime: "23",
    adultCount: 0,
    kidCount: 0,
    petCount: 0,
    totalCount: 0,
    county: "",
    city: "",
    detail: "",
    detailInfoNum: [],
    normalFile: [],
    structureFile: "",
    mainFile: "",
    optionCount: 0,
    optionContent: [],
    optionPrice: [],
  })

  const { explainContent } = applyRoofTopInfo

  const changeInput = e => {
    const { name, value } = e.target
    setApplyRoofTopInfo({ ...applyRoofTopInfo, [name]: value })
  }

  const sendRoofTopData = async () => {
    const applyFormData = new FormData()

    for (const [option, value] of Object.entries(applyRoofTopInfo)) {
      // 배열의 경우 append를 통해 같은 옵션에 값을 추가해주어야 함
      if (Array.isArray(value)) {
        for (let idx = 0; idx < value.length; idx++) {
          applyFormData.append(option, value[idx])
        }
        continue
      }
      // 시간의 경우 LocalTime 형식에 맞게 이를 수정하여 보내야 함
      if (option === "startTime" || option === "endTime") {
        applyFormData.append(option, `${value.padStart(2, "0")}:00:00`)
        continue
      }
      // 배열이 아닌 경우에는 그냥 값을 추가해주면 됨.
      console.log(option, value)
      applyFormData.append(option, value)
    }

    try {
      await roofTopControl.postRoofTopInfo(applyFormData)
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <Wrapper>
      <ViewPoint>
        <ApplySidoList applyInfo={applyRoofTopInfo} changeInfo={setApplyRoofTopInfo} />
        <ApplyBaseInfo applyInfo={applyRoofTopInfo} changeInfo={setApplyRoofTopInfo} />
        <ApplyImgList applyInfo={applyRoofTopInfo} changeInfo={setApplyRoofTopInfo} />
        <ApplyDetailView applyInfo={applyRoofTopInfo} changeInfo={setApplyRoofTopInfo} />
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
        <ApplyAvailableInfo applyInfo={applyRoofTopInfo} changeInfo={setApplyRoofTopInfo} />
        <ApplyDetailInfo applyInfo={applyRoofTopInfo} changeInfo={setApplyRoofTopInfo} />
        <ApplyExtraOption applyInfo={applyRoofTopInfo} changeInfo={setApplyRoofTopInfo} />
        <ConfirmBtn onClick={sendRoofTopData}>옥상 신청하기</ConfirmBtn>
      </ViewPoint>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 50vw;

  margin: auto;
  padding: 1rem;

  display: flex;
  flex-wrap: wrap;

  background-color: #d3d3d3;
  text-align: center;
`

const ViewPoint = styled.div`
  max-height: 80vh;
  overflow: auto;
`

const ConfirmBtn = styled.button`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      width: 25%;
      padding: ${paddings.sm};
      margin: 2vw auto;

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

export default ApplyRoofTop
