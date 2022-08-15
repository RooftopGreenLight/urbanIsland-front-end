import styled, { css } from "styled-components"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { applyRoofTopState } from "module/ApplyRoofTop"

import { roofTopControl } from "api/roofTopControl"

import ApplyImgList from "components/main/RoofTop/ApplyRoofTop/ApplyImgList"
import ApplyDetailView from "components/main/RoofTop/ApplyRoofTop/ApplyDetailView"
import ApplyBaseInfo from "components/main/RoofTop/ApplyRoofTop/ApplyBaseInfo"
import ApplyAvailableInfo from "components/main/RoofTop/ApplyRoofTop/ApplyAvailableInfo"
import ApplyDetailInfo from "components/main/RoofTop/ApplyRoofTop/ApplyDetailInfo"
import ApplyExtraOption from "components/main/RoofTop/ApplyRoofTop/ApplyExtraOption"

const ApplyRoofTop = () => {
  const applyRoofTop = useRecoilValue(applyRoofTopState)
  console.log(applyRoofTop)

  const sendRoofTopData = async () => {
    try {
      const res = await roofTopControl.postRoofTopInfo(applyRoofTop)
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <Wrapper method="post" encType="multipart/form-data">
      <ApplyImgList />
      <ApplyDetailView />
      <ApplyBaseInfo />
      <ApplyAvailableInfo />
      <ApplyDetailInfo />
      <ApplyExtraOption />
      <ConfirmBtn onClick={sendRoofTopData}>옥상 신청하기</ConfirmBtn>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  width: 70vw;
  margin: auto;
  padding: 1rem;

  display: flex;
  flex-wrap: wrap;

  background-color: #d3d3d3;
  text-align: center;
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

export default ApplyRoofTop
