import { useContext, useRef, useState } from "react"
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
import SetRequiredOptionModal from "components/main/RoofTop/RequestGreenBee/Modal/SetRequiredOptionModal"

const RequestToGreenBee = () => {
  const { openModal } = useContext(ModalContext)
  const navigate = useNavigate()
  const feedbackMsg = useRef()
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
    city: "",
    district: "",
    detail: "",
    deadLineNum: 0,
    requiredItemNum: [],
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
    widthPrice,
    phoneNumber,
  } = requiredInfo

  const changeInput = e => {
    const { name, value } = e.target
    setRequiredInfo({ ...requiredInfo, [name]: value })
  }

  const submitRequest = async () => {
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

    if (width * totalPrice * widthPrice === 0) {
      feedbackMsg.current.innerText = "옥상의 넓이와 시공 가격은 필히 기입해야 합니다."
      return
    }

    if (totalPrice === 0) {
      feedbackMsg.current.innerText = "옥상의 이용 가격은 필히 기입해야 합니다."
      return
    }

    const reqFormData = new FormData()
    for (const [option, value] of Object.entries(requiredInfo)) {
      // 배열의 경우 append를 통해 같은 옵션에 값을 추가해주어야 함
      if (Array.isArray(value)) {
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
      alert("정상적으로 옥상이 등록되셨습니다.")
      navigate("/mypage/rooftop")
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <Wrapper>
      <ServiceList>
        <Title>
          <h5>기본 정보 기입하기</h5>
        </Title>
        <ApplySidoList applyInfo={requiredInfo} changeInfo={setRequiredInfo} />
        <ApplyBaseInfo applyInfo={requiredInfo} changeInfo={setRequiredInfo} />
      </ServiceList>
      <ServiceList>
        <Title>
          <h5>시공 관련 정보 기입하기</h5>
        </Title>
        <InputBox>
          <div className="title">
            <h5>세부사항 : 필요 항목</h5>
            <p>옥상 녹화 단계에 필요한 시설을 체크해주세요.</p>
          </div>
          <OpenModalBtn
            onClick={() =>
              openModal(
                <SetRequiredOptionModal applyInfo={requiredInfo} changeInfo={setRequiredInfo} />,
              )
            }>
            수정하기
          </OpenModalBtn>
        </InputBox>
        <RequestDeadLine requiredInfo={requiredInfo} setRequiredInfo={setRequiredInfo} />
        <ApplyImgList applyInfo={requiredInfo} changeInfo={setRequiredInfo} />
        <ApplyDetailView applyInfo={requiredInfo} changeInfo={setRequiredInfo} />
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
          <h5>이용 관련 정보 기입하기</h5>
        </Title>
        <ApplyAvailableInfo applyInfo={requiredInfo} changeInfo={setRequiredInfo} />
        <ApplyDetailInfo applyInfo={requiredInfo} changeInfo={setRequiredInfo} />
        <ApplyExtraOption applyInfo={requiredInfo} changeInfo={setRequiredInfo} />
      </ServiceList>
      <FeedBackMsg ref={feedbackMsg} />
      <ConfirmBtn onClick={submitRequest}>제출하기</ConfirmBtn>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 50vw;
  margin: 7.5vh auto auto auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  text-align: center;
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

const OpenModalBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 10%;
      padding: 0vw ${paddings.xsm};
      margin-bottom: 0.25rem;

      border-radius: ${fonts.size.xsm};
      background-color: ${colors.main.secondary};

      color: ${colors.white};
      font-size: ${fonts.size.xsm};
      font-weight: ${fonts.weight.light};

      &:hover {
        background-color: ${colors.main.tertiary};
        font-weight: ${fonts.weight.bold};
      }
    `
  }}
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

export default RequestToGreenBee
