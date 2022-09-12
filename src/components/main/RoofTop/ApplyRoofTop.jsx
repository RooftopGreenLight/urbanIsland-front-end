import styled, { css } from "styled-components"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { roofTopControl } from "api/controls/roofTopControl"

import ApplySidoList from "components/main/RoofTop/ApplyRoofTop/ApplySidoList"
import ApplyBaseInfo from "components/main/RoofTop/ApplyRoofTop/ApplyBaseInfo"
import ApplyImgList from "components/main/RoofTop/ApplyRoofTop/ApplyImgList"
import ApplyAvailableInfo from "components/main/RoofTop/ApplyRoofTop/ApplyAvailableInfo"
import ApplyDetailView from "components/main/RoofTop/ApplyRoofTop/ApplyDetailView"
import ApplyDetailInfo from "components/main/RoofTop/ApplyRoofTop/ApplyDetailInfo"
import ApplyExtraOption from "components/main/RoofTop/ApplyRoofTop/ApplyExtraOption"

const ApplyRoofTop = () => {
  const navigate = useNavigate()
  const feedbackMsg = useRef()
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
    city: "",
    district: "",
    detail: "",
    detailInfoNum: [],
    normalFile: [],
    structureFile: "",
    mainFile: "",
    optionCount: 0,
    optionContent: [],
    optionPrice: [],
  })

  const {
    city,
    district,
    detail,
    adultCount,
    explainContent,
    normalFile,
    structureFile,
    width,
    totalPrice,
    phoneNumber,
  } = applyRoofTopInfo

  const changeInput = e => {
    const { name, value } = e.target
    setApplyRoofTopInfo({ ...applyRoofTopInfo, [name]: value })
  }

  const sendRoofTopData = async () => {
    if (!city || !district || !detail) {
      feedbackMsg.current.innerText = "등록할 옥상 주소는 필히 설정해야 합니다."
      return
    }

    if (phoneNumber === "") {
      feedbackMsg.current.innerText = "소유주의 전화번호는 필히 기입해야 합니다."
      return
    }

    if (adultCount === 0) {
      feedbackMsg.current.innerText = "등록할 옥상의 이용 가능 인원을 설정해주세요."
      return
    }

    if (normalFile.length < 1) {
      feedbackMsg.current.innerText = "등록할 옥상의 이미지는 필히 올려야 합니다."
      return
    }

    if (!structureFile) {
      feedbackMsg.current.innerText = "등록할 옥상의 조경도는 필히 올려야 합니다."
      return
    }

    if (width === 0) {
      feedbackMsg.current.innerText = "등록할 옥상의 넓이는 필히 기입해야 합니다."
      return
    }

    if (totalPrice === 0) {
      feedbackMsg.current.innerText = "옥상의 이용 가격은 필히 기입해야 합니다."
      return
    }

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
      applyFormData.append(option, value)
    }

    try {
      await roofTopControl.postRoofTopInfo(applyFormData)
      alert("정상적으로 옥상이 등록되셨습니다.")
      navigate("/mypage/rooftop")
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <Wrapper>
      <ViewPoint>
        <ServiceList>
          <Title>
            <h5>기본 정보 기입하기</h5>
          </Title>
          <ApplySidoList applyInfo={applyRoofTopInfo} changeInfo={setApplyRoofTopInfo} />
          <ApplyBaseInfo applyInfo={applyRoofTopInfo} changeInfo={setApplyRoofTopInfo} />
        </ServiceList>
        <ServiceList>
          <Title>
            <h5>시설 정보 기입하기</h5>
          </Title>
          <ApplyImgList applyInfo={applyRoofTopInfo} changeInfo={setApplyRoofTopInfo} />
          <ApplyDetailView applyInfo={applyRoofTopInfo} changeInfo={setApplyRoofTopInfo} />
          <InputBox>
            <div className="title">
              <h5>세부사항 : 옥상 설명 멘트</h5>
              <p>고객에게 옥상 시설을 설명해주세요!</p>
            </div>
            <textarea
              name="explainContent"
              rows="4"
              cols="50"
              value={explainContent}
              placeholder="자유롭게 옥상 설명을 작성해주세요."
              onChange={changeInput}
            />
          </InputBox>
        </ServiceList>
        <ServiceList>
          <Title>
            <h5>운영 정보 기입하기</h5>
          </Title>
          <ApplyAvailableInfo applyInfo={applyRoofTopInfo} changeInfo={setApplyRoofTopInfo} />
          <ApplyDetailInfo applyInfo={applyRoofTopInfo} changeInfo={setApplyRoofTopInfo} />
          <ApplyExtraOption applyInfo={applyRoofTopInfo} changeInfo={setApplyRoofTopInfo} />
          <FeedBackMsg ref={feedbackMsg} />
          <ConfirmBtn onClick={sendRoofTopData}>옥상 신청하기</ConfirmBtn>
        </ServiceList>
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

  text-align: center;
`

const ViewPoint = styled.div`
  max-height: 80vh;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`

const Title = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      padding: ${paddings.sm} ${paddings.base};
      margin-bottom: ${margins.sm};

      display: flex;
      border-bottom: 1px solid ${colors.main.primary}77;

      color: ${colors.main.primary};
      text-align: center;

      h5 {
        width: 90%;

        font-size: ${fonts.size.base};
        font-weight: ${fonts.weight.bold};
        text-align: left;
      }
    `
  }}
`

const ServiceList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 7.5vh;
`

const FeedBackMsg = styled.p`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      font-size: ${fonts.size.xsm};
      font-weight: 100;

      margin: ${margins.sm} auto;
    `
  }}
`

const ConfirmBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 50%;
      padding: ${paddings.sm} ${paddings.base};
      margin: ${margins.sm} auto ${margins.lg} auto;

      cursor: pointer;
      border-radius: ${fonts.size.sm};
      background-color: ${colors.main.primary};

      text-align: center;
      color: ${colors.white};
      font-size: ${fonts.size.sm};

      svg {
        margin: auto ${margins.sm} auto 0vw;
      }

      &:hover {
        background-color: ${colors.main.tertiary};
        font-weight: ${fonts.weight.bold};
      }
    `
  }}
`

const InputBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 100%;
      background-color: ${colors.white};
      padding: ${paddings.base};

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .title {
        width: 80%;
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
        background-color: ${colors.main.tertiary}11;
        border-bottom: 1px solid ${colors.main.secondary}44;

        color: ${colors.black.secondary};
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: center;
      }
    `
  }}
`

export default ApplyRoofTop
