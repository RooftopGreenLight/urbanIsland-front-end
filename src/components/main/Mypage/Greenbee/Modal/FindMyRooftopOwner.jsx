import { useContext, useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faSeedling, faXmark } from "@fortawesome/free-solid-svg-icons"

import { greenbeeControl } from "api/controls/greenbeeControl"
import { ModalContext } from "module/Modal"
import { AuthCheckMemberId } from "module/Auth"
import { GreeningProgressStatus } from "constants/GreeningProgressStatus"

const FindMyRooftopOwner = () => {
  const { closeModal } = useContext(ModalContext)
  const memberId = useRecoilValue(AuthCheckMemberId)

  const [greeningRoofTops, setGreeningRoofTops] = useState({
    completed: [],
    progressed: [],
    selected: [],
  })
  const { completed, progressed, selected } = greeningRoofTops

  useEffect(() => {
    const loadInformation = async () => {
      try {
        const greeningList = await greenbeeControl.getGreeningRoofTop(memberId)
        setGreeningRoofTops(greeningList)
      } catch (err) {
        console.log(err.message)
      }
    }
    loadInformation()
  }, [])

  const finishGreeningRooftop = async rooftopId => {
    try {
      await greenbeeControl.getCompletedGreeningRooftop(rooftopId)
      alert("녹화 확정이 완료되었습니다.")
      closeModal()
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <Wrapper>
      <ModalHeader>
        <h5>본인을 선택한 옥상 확인하기</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <GreeningSection>
          <h5>녹화를 완료한 옥상</h5>
          {completed.length > 0 ? (
            completed.map(
              (
                { rooftopId, rooftopCity, rooftopDistrict, rooftopDetail, ownerPhoneNumber },
                idx,
              ) => (
                <RooftopInfo key={idx}>
                  <div className="rooftop-info">
                    <h5>{`${rooftopCity} ${rooftopDistrict} ${rooftopDetail}`}</h5>
                    <p>{`옥상지기 연락처 : ${ownerPhoneNumber ?? "번호 없음"}`}</p>
                  </div>
                  <FontAwesomeIcon icon={faCircleCheck} />
                </RooftopInfo>
              ),
            )
          ) : (
            <p>녹화를 완료한 옥상이 없습니다.</p>
          )}
        </GreeningSection>
        <GreeningSection>
          <h5>녹화를 진행 중인 옥상</h5>
          {progressed.length > 0 ? (
            progressed.map(
              (
                { rooftopId, rooftopCity, rooftopDistrict, rooftopDetail, ownerPhoneNumber },
                idx,
              ) => (
                <RooftopInfo key={idx}>
                  <div className="rooftop-info">
                    <h5>{`${rooftopCity} ${rooftopDistrict} ${rooftopDetail}`}</h5>
                    <p>{`옥상지기 연락처 : ${ownerPhoneNumber ?? "번호 없음"}`}</p>
                  </div>
                  <ConfirmBtn onClick={() => finishGreeningRooftop(rooftopId)}>
                    녹화 확정하기
                  </ConfirmBtn>
                </RooftopInfo>
              ),
            )
          ) : (
            <p>녹화를 진행 중인 옥상이 없습니다.</p>
          )}
        </GreeningSection>
        <GreeningSection>
          <h5>녹화를 신청한 옥상</h5>
          {selected.length > 0 ? (
            selected.map(
              ({ rooftopId, rooftopCity, rooftopDistrict, rooftopDetail, progress }, idx) => (
                <RooftopInfo key={idx}>
                  <div className="rooftop-info">
                    <h5>{`${rooftopCity} ${rooftopDistrict} ${rooftopDetail}`}</h5>
                    <p>{GreeningProgressStatus.get(progress)}</p>{" "}
                  </div>
                  <FontAwesomeIcon icon={faSeedling} />
                </RooftopInfo>
              ),
            )
          ) : (
            <p>녹화를 신청한 옥상이 없습니다.</p>
          )}
        </GreeningSection>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 33vw;

  margin: auto;
  background-color: #f5f5f5;
`

const ModalHeader = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.base};

      background-color: ${colors.main.primary};

      display: flex;
      justify-content: space-between;

      color: ${colors.white};
      text-align: center;

      h5 {
        font-size: ${fonts.size.base};
        vertical-align: center;
      }
    `
  }}
`

const ModalCloseBtn = styled(FontAwesomeIcon)`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      padding: ${paddings.sm};
      color: ${colors.white};
      font-size: ${fonts.size.xsm};
    `
  }}
`

const ModalContent = styled.div`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      padding: ${paddings.lg} ${paddings.xl};
      margin: auto;

      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      gap: ${paddings.lg};
    `
  }}
`

const GreeningSection = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      min-height: 10vh;
      padding: ${paddings.sm} 0vw;
      color: ${colors.main.primary};

      h5 {
        border-bottom: 1px solid ${colors.main.secondary};
        margin-bottom: ${margins.sm};

        font-size: ${fonts.size.base};
        line-height: 150%;
        text-align: left;
      }

      p {
        font-weight: 100;
      }
    `
  }}
`

const RooftopInfo = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      background-color: ${colors.main.primary}11;
      padding: ${paddings.base};
      margin-bottom: ${margins.xsm};
      color: ${colors.black.secondary};

      display: flex;
      justify-content: space-between;

      .rooftop-info {
        width: 80%;
        display: flex;
        flex-direction: column;
      }

      h5 {
        margin-bottom: 0;
        border: 0px;

        font-size: 1.25rem;
        line-height: 150%;
        text-align: left;
      }

      p {
        font-weight: 100;
      }

      svg {
        color: ${colors.main.primary};
        margin: auto ${margins.sm} auto 0vw;
      }
    `
  }}
`

const ConfirmBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 20%;
      height: 50%;
      margin: auto;
      padding: ${paddings.sm} 0vw;
      background-color: ${colors.main.primary};
      border-radius: 25px;

      color: ${colors.white};
      font-size: 0.875rem;
      font-weight: ${fonts.weight.light};

      &:hover {
        background-color: ${colors.main.tertiary};
      }
    `
  }}
`

export default FindMyRooftopOwner
