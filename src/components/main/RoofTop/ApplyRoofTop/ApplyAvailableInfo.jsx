import styled, { css } from "styled-components"
import { useContext } from "react"

import { ModalContext } from "module/Modal"
import SetAvailableTimeModal from "components/main/RoofTop/ApplyRoofTop/Modal/SetAvailableTimeModal"
import SetAvailablePersonModal from "components/main/RoofTop/ApplyRoofTop/Modal/SetAvailablePersonModal"
import SetFacilitiesModal from "components/main/RoofTop/ApplyRoofTop/Modal/SetFacilitiesModal"

const ApplyAvailableInfo = ({ applyInfo, changeInfo }) => {
  const { openModal } = useContext(ModalContext)

  return (
    <Wrapper>
      <InputBox>
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
      </InputBox>
      <InputBox>
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
      </InputBox>
      <InputBox>
        <div className="title">
          <h5>시설 세부 정보</h5>
          <p>등록하려는 옥상 시설에 대한 세부 정보를 설정하세요.</p>
        </div>
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
