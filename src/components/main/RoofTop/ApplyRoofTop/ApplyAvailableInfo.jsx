import styled, { css } from "styled-components"
import { useContext, useState } from "react"

import { ModalContext } from "module/Modal"
import SetAvailableTimeModal from "components/main/RoofTop/ApplyRoofTop/Modal/SetAvailableTimeModal"
import SetAvailablePersonModal from "components/main/RoofTop/ApplyRoofTop/Modal/SetAvailablePersonModal"
import SetDetailInfoModal from "components/main/RoofTop/ApplyRoofTop/Modal/SetDetailInfoModal"

const ApplyAvailableInfo = () => {
  const { openModal } = useContext(ModalContext)

  return (
    <Wrapper>
      <ApplyInfoBox>
        <h5>시설 정보 : 이용 가능 시간</h5>
        <p>등록하려는 시설의 이용 가능 시간을 설정하세요.</p>
        <OpenModalBtn onClick={() => openModal(<SetAvailableTimeModal />)}>
          시간 설정하기
        </OpenModalBtn>
      </ApplyInfoBox>
      <ApplyInfoBox>
        <h5>시설 정보 : 이용 가능 인원</h5>
        <p>등록하려는 시설의 이용 가능 인원을 설정하세요.</p>
        <OpenModalBtn onClick={() => openModal(<SetAvailablePersonModal />)}>
          인원 설정하기
        </OpenModalBtn>
      </ApplyInfoBox>
      <ApplyInfoBox>
        <h5>시설 정보 : 시설 세부 정보</h5>
        <p>등록하려는 옥상 시설에 대한 세부 정보를 설정하세요.</p>
        <OpenModalBtn onClick={() => openModal(<SetDetailInfoModal />)}>
          세부 정보 설정하기
        </OpenModalBtn>
      </ApplyInfoBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin: auto;

  display: flex;
`

const ApplyInfoBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 30%;
      margin: auto;
      background-color: #ffffff;
      padding: ${paddings.base};

      h5 {
        font-size: ${fonts.size.base};
      }

      p {
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }
    `
  }}
`

const OpenModalBtn = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 50%;
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
