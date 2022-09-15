import styled from "styled-components"
import { useContext } from "react"

import { ModalContext } from "module/Modal"
import { ModalBtnBox, OpenModalBtn } from "components/common/Style/Mypage/CommonStyle"

import SetAvailableTimeModal from "components/main/RoofTop/ApplyRoofTop/Modal/SetAvailableTimeModal"
import SetAvailablePersonModal from "components/main/RoofTop/ApplyRoofTop/Modal/SetAvailablePersonModal"
import SetFacilitiesModal from "components/main/RoofTop/ApplyRoofTop/Modal/SetFacilitiesModal"

const ApplyAvailableInfo = ({ applyInfo, changeInfo }) => {
  const { openModal } = useContext(ModalContext)

  return (
    <Wrapper>
      <ModalBtnBox>
        <div className="title">
          <h5>이용 가능 시간</h5>
          <p>등록하려는 시설의 이용 가능 시간을 설정하세요.</p>
        </div>
        <OpenModalBtn
          onClick={() =>
            openModal(<SetAvailableTimeModal applyInfo={applyInfo} changeInfo={changeInfo} />)
          }>
          시간 설정하기
        </OpenModalBtn>
      </ModalBtnBox>
      <ModalBtnBox>
        <div className="title">
          <h5>이용 가능 인원</h5>
          <p>등록하려는 시설의 이용 가능 인원을 설정하세요.</p>
        </div>
        <OpenModalBtn
          onClick={() =>
            openModal(<SetAvailablePersonModal applyInfo={applyInfo} changeInfo={changeInfo} />)
          }>
          인원 설정하기
        </OpenModalBtn>
      </ModalBtnBox>
      <ModalBtnBox>
        <div className="title">
          <h5>시설 세부 정보</h5>
          <p>등록하려는 옥상 시설에 대한 세부 정보를 설정하세요.</p>
        </div>
        <OpenModalBtn
          onClick={() =>
            openModal(<SetFacilitiesModal applyInfo={applyInfo} changeInfo={changeInfo} />)
          }>
          시설 체크하기
        </OpenModalBtn>
      </ModalBtnBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin: auto;

  display: flex;
  flex-direction: column;
`

export default ApplyAvailableInfo
