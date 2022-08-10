import styled from "styled-components"

import ApplyImgList from "components/main/RoofTop/ApplyRoofTop/ApplyImgList"
import ApplyDetailView from "components/main/RoofTop/ApplyRoofTop/ApplyDetailView"
import ApplyBaseInfo from "components/main/RoofTop/ApplyRoofTop/ApplyBaseInfo"
import ApplyAvailableInfo from "components/main/RoofTop/ApplyRoofTop/ApplyAvailableInfo"
import ApplyDetailInfo from "components/main/RoofTop/ApplyRoofTop/ApplyDetailInfo"
import ApplyExtraOption from "components/main/RoofTop/ApplyRoofTop/ApplyExtraOption"

const ApplyRoofTop = () => {
  return (
    <Wrapper>
      <ApplyImgList />
      <ApplyDetailView />
      <ApplyBaseInfo />
      <ApplyAvailableInfo />
      <ApplyDetailInfo />
      <ApplyExtraOption />
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
export default ApplyRoofTop
