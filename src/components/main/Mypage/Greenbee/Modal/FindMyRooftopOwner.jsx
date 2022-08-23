import { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { greenbeeControl } from "api/controls/greenbeeControl"
import { ModalContext } from "module/Modal"
import { AuthStateContext } from "module/Auth"

const FindMyRooftopOwner = () => {
  const { closeModal } = useContext(ModalContext)
  const { memberId } = useContext(AuthStateContext)

  const [greeningRoofTops, setGreeningRoofTops] = useState(new Map())

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

  return (
    <Wrapper>
      <ModalHeader>
        <h5>본인을 선택한 옥상 확인하기</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <GreeningSection>
          <h5>녹화를 완료한 옥상</h5>
          {completed ? (
            completed.map((elm, idx) => (
              <div key={idx}>
                <p>{elm}</p>
              </div>
            ))
          ) : (
            <p>완료한 옥상이 없습니다.</p>
          )}
        </GreeningSection>
        <GreeningSection>
          <h5>녹화를 진행 중인 옥상</h5>
          {progressed ? (
            progressed.map((elm, idx) => (
              <div key={idx}>
                <p>{elm}</p>
              </div>
            ))
          ) : (
            <p>완료한 옥상이 없습니다.</p>
          )}
        </GreeningSection>
        <GreeningSection>
          <h5>녹화를 신청한 옥상</h5>
          {selected ? (
            selected.map((elm, idx) => (
              <div key={idx}>
                <p>{elm}</p>
              </div>
            ))
          ) : (
            <p>완료한 옥상이 없습니다.</p>
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

      background-color: #000000;

      display: flex;
      justify-content: space-between;

      h5 {
        color: ${colors.white};
        font-size: ${fonts.size.base};
        text-align: center;
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
      padding: ${paddings.xl};
      margin: auto;

      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    `
  }}
`

const GreeningSection = styled.div`
  ${({ theme }) => {
    const { fonts, margins, paddings } = theme
    return css`
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      h5 {
        border-bottom: 1px solid #000000;
        margin-bottom: ${margins.sm};

        font-size: ${fonts.size.sm};
        line-height: 150%;
        text-align: left;
      }
    `
  }}
`

export default FindMyRooftopOwner
