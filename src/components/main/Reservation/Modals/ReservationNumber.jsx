import { useContext, useState } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"

const ReservationNumber = () => {
  const [kid, setKid] = useState(0)
  const [adult, setAdult] = useState(0)
  const [pet, setPet] = useState(0)

  const { closeModal } = useContext(ModalContext)

  const onChangePlus = (x, setX) => {
    if (x >= 99) {
      console.log("최대 99")
    } else setX(x + 1)
  }
  const onChangeMinus = (x, setX) => {
    setX(x - 1)
  }

  const onReset = () => {
    setAdult(0)
    setPet(0)
    setKid(0)
  }

  return (
    <Wrapper>
      <header>
        <ModalCloseBtn onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} />
        </ModalCloseBtn>
      </header>
      <ModalContent>
        <Box>
          <Line>
            <div>성인</div>
            <div>
              {adult === 0 ? (
                <Icons icon={faMinus} style={{ color: "gray" }} />
              ) : (
                <Icons
                  icon={faMinus}
                  value={adult}
                  onClick={() => onChangeMinus(adult, setAdult)}
                />
              )}
              {adult}
              <Icons icon={faPlus} value={adult} onClick={() => onChangePlus(adult, setAdult)} />
            </div>
          </Line>
          <Line>
            <div>유아</div>
            <div>
              {kid === 0 ? (
                <Icons icon={faMinus} style={{ color: "gray" }} />
              ) : (
                <Icons icon={faMinus} value={kid} onClick={() => onChangePlus(kid, setKid)} />
              )}
              {kid}
              <Icons icon={faPlus} value={kid} onClick={() => onChangePlus(kid, setKid)} />
            </div>{" "}
          </Line>
          <Line>
            <div>반려동물</div>
            <div>
              {pet === 0 ? (
                <Icons icon={faMinus} style={{ color: "gray" }} />
              ) : (
                <Icons icon={faMinus} value={pet} onClick={() => onChangeMinus(pet, setPet)} />
              )}
              {pet}
              <Icons icon={faPlus} value={pet} onClick={() => onChangePlus(pet, setPet)} />
            </div>{" "}
          </Line>
        </Box>
      </ModalContent>
    </Wrapper>
  )
}
const Box = styled.div`
  padding: 1rem;
`
const Line = styled.div`
  padding: 0.1rem;
  display: flex;
  justify-content: space-between;

  div {
    text-align: center;
    width: 50%;
  }
`
const Icons = styled(FontAwesomeIcon)`
  padding: 0 0.3rem;
`

const Wrapper = styled.section`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      width: 30%;
      margin: auto;

      border-radius: 0.3rem;
      background-color: #fff;

      animation: ${modalShow} 0.3s;
      animation-fill-mode: forwards;
      overflow: hidden;

      header {
        display: flex;
        flex-direction: row-reverse;

        padding: ${paddings.sm} ${paddings.base};
        background-color: #f1f1f1;
        font-weight: 700;
      }
    `
  }}
`
const ModalCloseBtn = styled.button`
  ${({ theme }) => {
    const { fonts } = theme
    return css`
      margin: 0vw 0vw 0vw auto

      color: #999;
      background-color: transparent;

      font-size: ${fonts.size.xsm};
      font-weight: 700;
      text-align: center;
    `
  }}
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
      width: 100%;
    `
  }}
`

export default ReservationNumber
