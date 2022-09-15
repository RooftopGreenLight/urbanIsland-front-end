import { useContext, useState, useRef, useEffect } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCommentDots, faStar, faXmark } from "@fortawesome/free-solid-svg-icons"

import { ModalHeader, ModalCloseBtn } from "components/common/Style/Modal/CommonStyle"
import ShowMyReservationModal from "./ShowMyReservationModal"

import { roofTopControl } from "api/controls/roofTopControl"
import { ModalContext } from "module/Modal"

const WriteRooftopReviewModal = ({ rooftopId, address }) => {
  const { openModal, closeModal } = useContext(ModalContext)
  const feedbackMsg = useRef("")
  const [wroteReview, setWroteReview] = useState("")
  const [starGrade, setStarGrade] = useState(0)

  const submitReview = async () => {
    if (wroteReview.length < 10) {
      feedbackMsg.current.innerText = "리뷰는 최소 10자 이상 작성해야 합니다."
      return
    }
    try {
      await roofTopControl.postRooftopReview(rooftopId, wroteReview, starGrade)
      closeModal()
    } catch (err) {
      feedbackMsg.current.innerText = err.message
      console.log(err.message)
    }
  }

  useEffect(() => {
    return () => openModal(<ShowMyReservationModal />)
  }, [])

  return (
    <Wrapper>
      <ModalHeader>
        <h5>리뷰 작성하기</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <h5>{address}</h5>
        <p>사용자님이 이용하셨던 시설의 리뷰를 작성해주세요.</p>
        <StarContainer>
          {[1, 2, 3, 4, 5].map(elm => (
            <Star
              icon={faStar}
              selected={starGrade >= elm}
              key={elm}
              onClick={() => setStarGrade(elm)}
            />
          ))}
        </StarContainer>
        <textarea
          name="refundContent"
          rows="4"
          cols="50"
          value={wroteReview}
          onChange={e => setWroteReview(e.target.value)}
          placeholder={`이곳에 자유롭게 리뷰를 작성해주세요.`}
        />
        <ModalFeedBack ref={feedbackMsg}></ModalFeedBack>
        <ConfirmBtn onClick={submitReview}>
          <FontAwesomeIcon icon={faCommentDots} />
          리뷰 작성 완료
        </ConfirmBtn>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 33vw;

  margin: auto;
  background-color: #f5f5f5;
`

const ModalContent = styled.main`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      display: flex;
      flex-direction: column;
      justify-content: center;

      padding: ${paddings.sm};
      border-top: 1px solid #dee2e6;
      background-color: ${colors.white};

      h5 {
        margin: ${margins.base} 0vw ${margins.xsm} 0vw;
        font-size: ${fonts.size.sm};
        text-align: center;
      }

      p {
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: center;
      }

      textarea {
        width: 70%;
        padding: ${paddings.sm};
        margin: ${margins.lg} auto ${margins.base} auto;

        background-color: ${colors.main.tertiary}11;
        border: 0;
        border-bottom: 1px solid #232323;

        font-weight: 100;
        text-align: center;

        &::placeholder {
          color: #3e3e3e;
          font-weight: 100;
        }

        &::before {
          background-color: #d9d9d9;
        }
      }
    `
  }}
`

const StarContainer = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      width: 33%;
      margin: ${margins.lg} auto 0vw auto;

      display: flex;
      justify-content: space-between;
    `
  }}
`

const Star = styled(FontAwesomeIcon)`
  ${({ theme, selected }) => {
    const { colors, fonts } = theme
    return css`
      font-size: ${fonts.size.lg};
      color: ${selected ? `${colors.main.tertiary}` : `${colors.black.quinary}55`};
    `
  }}
`

const ModalFeedBack = styled.p`
  ${({ theme }) => {
    const { colors, fonts } = theme
    return css`
      margin: 0;

      text-align: center;
      color: ${colors.main.primary};
      font-size: ${fonts.size.xxsm};
      font-weight: 100;
    `
  }}
`

const ConfirmBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 70%;
      padding: ${paddings.sm} ${paddings.base};
      margin: 0vw auto ${margins.base} auto;

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

export default WriteRooftopReviewModal
