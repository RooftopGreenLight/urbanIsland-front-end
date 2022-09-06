import { useContext, useState } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import { roofTopControl } from "api/controls/roofTopControl"
import ApplyExtraOption from "./ApplyRoofTop/ApplyExtraOption"
const PayOptionChangeModal = ({ rooftopid }) => {
  const { closeModal } = useContext(ModalContext)

  const [input, setInput] = useState({
    optionContent: "",
    optionPrice: 0,
    optionCount: 0,
  })
  const onFinish = async () => {
    const formData = new FormData()
    for (const [option, value] of Object.entries(input)) {
      for (let idx = 0; idx < value.length; idx++) {
        formData.append(option, value[idx])
      }
    }
    try {
      await roofTopControl.postRoofTopPayoption(rooftopid, formData)
      closeModal()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Wrapper>
      <ModalHeader>
        <h5>추가옵션</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <Box>
          <ApplyExtraOption applyInfo={input} changeInfo={setInput} />
          <button className="submit" onClick={onFinish}>
            적용하기
          </button>
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
      }
      .submit {
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

const Wrapper = styled.section`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      width: 50%;
      margin: auto;

      border-radius: 0.3rem;
      background-color: #fff;

      animation: ${modalShow} 0.3s;
      animation-fill-mode: forwards;
      overflow: hidden;
    `
  }}
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

const ModalContent = styled.main`
  ${({ theme }) => {
    const { colors, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.base};
      background-color: ${colors.white};
    `
  }}
`

export default PayOptionChangeModal
