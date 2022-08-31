import { useContext, useState } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"

const ReservationNumber = ({ data, setData, adultCount, kidCount }) => {
  const { adult, kid, pet } = data
  const { closeModal } = useContext(ModalContext)
  const [num, setNum] = useState({
    a: adult,
    b: kid,
    c: pet,
  })
  const { a, b, c } = num
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
              {a === 0 ? (
                <Icons icon={faMinus} style={{ color: "gray" }} />
              ) : (
                <Icons
                  icon={faMinus}
                  onClick={() => {
                    const newValue = num.a - 1
                    setNum({ ...num, a: newValue })
                    setData({ ...data, adult: newValue })
                  }}
                />
              )}
              {a}
              {a === adultCount ? (
                <Icons icon={faPlus} style={{ color: "gray" }} />
              ) : (
                <Icons
                  icon={faPlus}
                  onClick={() => {
                    const newValue = num.a + 1
                    setNum({ ...num, a: newValue })
                    setData({ ...data, adult: newValue })
                  }}
                />
              )}
            </div>
          </Line>
          <Line>
            <div>유아</div>
            <div>
              {b === 0 ? (
                <Icons icon={faMinus} style={{ color: "gray" }} />
              ) : (
                <Icons
                  icon={faMinus}
                  onClick={() => {
                    const newValue = num.b - 1
                    setNum({ ...num, b: newValue })
                    setData({ ...data, kid: newValue })
                  }}
                />
              )}
              {b}
              {b === kidCount ? (
                <Icons icon={faPlus} style={{ color: "gray" }} />
              ) : (
                <Icons
                  icon={faPlus}
                  onClick={() => {
                    const newValue = num.b + 1
                    setNum({ ...num, b: newValue })
                    setData({ ...data, kid: newValue })
                  }}
                />
              )}
            </div>
          </Line>
          <Line>
            <div>반려동물</div>
            <div>
              {c === 0 ? (
                <Icons icon={faMinus} style={{ color: "gray" }} />
              ) : (
                <Icons
                  icon={faMinus}
                  onClick={() => {
                    const newValue = num.c - 1
                    setNum({ ...num, c: newValue })
                    setData({ ...data, pet: newValue })
                  }}
                />
              )}
              {c}
              <Icons
                icon={faPlus}
                onClick={() => {
                  const newValue = num.c + 1
                  setNum({ ...num, c: newValue })
                  setData({ ...data, pet: newValue })
                }}
              />
            </div>
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
