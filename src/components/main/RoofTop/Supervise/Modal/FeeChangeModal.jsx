import { useContext, useState } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { ModalContext } from "module/Modal"
const FeeChangeModal = ({ input, setInput }) => {
  const { closeModal } = useContext(ModalContext)
  const [fee, setFee] = useState(input.totalPrice)
  const onChangeVal = e => {
    setFee(e.target.value)
  }
  const onFinish = e => {
    setInput({ ...input, totalPrice: fee })
    closeModal()
  }
  return (
    <Wrapper>
      <ModalHeader>
        <h5>가격변경</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <Box>
          <h5>1일당 가격 책정하기</h5>
          <input value={fee} onChange={onChangeVal} />
          <button onClick={onFinish}>적용완료하기</button>
        </Box>
      </ModalContent>
    </Wrapper>
  )
}
const Box = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      min-height: 10vh;
      padding: ${paddings.sm} 0vw;

      h5 {
        margin-bottom: ${margins.sm};

        font-size: ${fonts.size.base};
        line-height: 150%;
        text-align: left;
      }
      button {
        margin: ${margins.sm} 0;
        padding: ${paddings.sm};
        border-radius: 0.3rem;
        background-color: ${colors.main.tertiary};
        color: ${colors.white};
        width: 100%;
      }
      input {
        width: 100%;
        padding: ${paddings.sm} 0vw;
        margin: ${margins.xsm} 0vw;

        border: 0;
        background-color: ${colors.main.tertiary}09;
        border-bottom: 1px solid ${colors.main.secondary}44;

        color: ${colors.black.secondary};
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: center;
      }
    `
  }}
`
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

export default FeeChangeModal
