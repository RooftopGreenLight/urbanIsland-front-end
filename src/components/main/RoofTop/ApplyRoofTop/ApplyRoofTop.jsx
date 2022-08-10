import styled, { css } from "styled-components"
import { useState } from "react"

import ApplyImgList from "components/main/RoofTop/ApplyRoofTop/ApplyImgList"
import ApplyDetailView from "components/main/RoofTop/ApplyRoofTop/ApplyDetailView"
import ApplyBaseInfo from "components/main/RoofTop/ApplyRoofTop/ApplyBaseInfo"
import ApplyAvailableInfo from "components/main/RoofTop/ApplyRoofTop/ApplyAvailableInfo"

const ApplyRoofTop = () => {
  const [applyInfo, setApplyInfo] = useState({
    phoneNumber: "",
    roofTopArea: 0,
    detailMention: "",
  })

  const { phoneNumber, roofTopArea, detailMention } = applyInfo

  const changeInput = e => {
    const { name, value } = e.target
    setApplyInfo({ ...applyInfo, [name]: value })
  }

  return (
    <Wrapper>
      <ApplyImgList />
      <ApplyDetailView />
      <ApplyBaseInfo />
      <ApplyAvailableInfo />
    </Wrapper>
  )
}

const Wrapper = styled.form`
  width: 70vw;
  height: 100vh;
  margin: auto;

  display: flex;
  flex-wrap: wrap;

  background-color: #d3d3d3;
  text-align: center;
`
export default ApplyRoofTop
