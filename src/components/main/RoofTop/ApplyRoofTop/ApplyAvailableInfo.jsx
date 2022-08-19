import styled, { css } from "styled-components"
import { useContext } from "react"

import { ModalContext } from "module/Modal"
import SetAvailableTimeModal from "components/main/RoofTop/ApplyRoofTop/Modal/SetAvailableTimeModal"
import SetAvailablePersonModal from "components/main/RoofTop/ApplyRoofTop/Modal/SetAvailablePersonModal"
import SetFacilitiesModal from "components/main/RoofTop/ApplyRoofTop/Modal/SetFacilitiesModal"

const ApplyAvailableInfo = ({ applyInfo, changeInfo }) => {
  const { openModal } = useContext(ModalContext)
  const { adultCount, kidCount, petCount } = applyInfo

  return (
    <Wrapper>
      <InputBox boxSize="lg">
        <h5>이용 가능 시간</h5>
        <p>등록하려는 시설의 이용 가능 시간을 설정하세요.</p>
        <input value={`어른 [${adultCount}] 명, 유아 [${kidCount}] 명`} />
        <OpenModalBtn
          onClick={() =>
            openModal(<SetAvailableTimeModal applyInfo={applyInfo} changeInfo={changeInfo} />)
          }>
          시간 설정하기
        </OpenModalBtn>
      </InputBox>
      <InputBox boxSize="lg">
        <h5>이용 가능 인원</h5>
        <p>등록하려는 시설의 이용 가능 인원을 설정하세요.</p>
        <OpenModalBtn
          onClick={() =>
            openModal(<SetAvailablePersonModal applyInfo={applyInfo} changeInfo={changeInfo} />)
          }>
          인원 설정하기
        </OpenModalBtn>
      </InputBox>
      <InputBox boxSize="lg">
        <h5>시설 세부 정보</h5>
        <p>등록하려는 옥상 시설에 대한 세부 정보를 설정하세요.</p>
        <OpenModalBtn
          onClick={() =>
            openModal(<SetFacilitiesModal applyInfo={applyInfo} changeInfo={changeInfo} />)
          }>
          세부 정보 설정하기
        </OpenModalBtn>
      </InputBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin: auto;

  display: flex;
  flex-direction: column;
`

const InputBox = styled.div`
  ${({ theme, boxSize }) => {
    const boxWidth = new Map([
      ["sm", "25%"],
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
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 20%;
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

export default ApplyAvailableInfo
