import React, { useState } from "react"
import styled, { css } from "styled-components"

import { mypageControl } from "api/controls/mypageControl"
import GreenbeeImgList from "./Information/GreenbeeImgList"
import GreenbeeSidoList from "./Information/GreenbeeSidoList"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSeedling } from "@fortawesome/free-solid-svg-icons"

const MakeGreenbeeAccount = () => {
  const [greenbeeInfo, setGreenbeeInfo] = useState({
    officeNumber: "",
    city: "",
    district: "",
    detail: "",
    content: "",
    normalFile: [],
    confirmationFile: "",
  })

  const { officeNumber, content } = greenbeeInfo

  console.log(greenbeeInfo)

  const changeInput = e => {
    const { name, value } = e.target
    setGreenbeeInfo(prevInfo => ({ ...prevInfo, [name]: value }))
  }

  const submitGreenbeeInfo = async () => {
    const applyFormData = new FormData()
    for (const [option, value] of Object.entries(greenbeeInfo)) {
      // 배열의 경우 append를 통해 같은 옵션에 값을 추가해주어야 함
      if (Array.isArray(value)) {
        for (let idx = 0; idx < value.length; idx++) {
          applyFormData.append(option, value[idx])
        }
        continue
      }
      // 배열이 아닌 경우에는 그냥 값을 추가해주면 됨.
      applyFormData.append(option, value)
    }
    try {
      await mypageControl.postApplyGreenbees(applyFormData)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Wrapper>
      <ViewPoint>
        <GreenbeeInfoBox>
          <Title>
            <h5>사무소 정보 기입하기</h5>
          </Title>
          <InputBox>
            <div className="title">
              <h5>사무소 소개 문구</h5>
              <p>사무소에 대한 간략한 설명을 작성해주세요.</p>
            </div>
            <textarea
              name="content"
              rows="4"
              cols="50"
              value={content}
              placeholder="자유롭게 사무소를 설명해주세요."
              onChange={changeInput}
            />
          </InputBox>
          <InputBox>
            <div className="title">
              <h5>연락처</h5>
              <p>옥상 소유자의 연락처를 입력해주세요.</p>
            </div>
            <input
              name="officeNumber"
              value={officeNumber}
              placeholder="연락처"
              onChange={changeInput}
            />
          </InputBox>
          <GreenbeeSidoList applyInfo={greenbeeInfo} changeInfo={setGreenbeeInfo} />
          <GreenbeeImgList applyInfo={greenbeeInfo} changeInfo={setGreenbeeInfo} />
          <ConfirmBtn onClick={submitGreenbeeInfo}>
            <FontAwesomeIcon icon={faSeedling} /> 그린비 등록 신청하기
          </ConfirmBtn>
        </GreenbeeInfoBox>
      </ViewPoint>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 40vw;
  height: 75vh;
  margin: auto;

  display: flex;
  flex-direction: column;
`

const ViewPoint = styled.div`
  max-height: 80vh;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    margin-left: 10px;
    background: #ffffff;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #ced4da;
    &:hover {
      background-color: #adb5bd;
    }
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

const GreenbeeInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.5vh;
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

const ConfirmBtn = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 47.5%;
      padding: ${paddings.sm} ${paddings.base};
      margin: ${margins.base} auto;

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

export default MakeGreenbeeAccount
