import { useEffect, useRef, useContext, useState } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
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

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.3rem;
  span {
    font-weight: bold;
    font-size: 1.2rem;
  }
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    text-align: center;
    width: 50%;
  }
`
const NumFilterModal = ({ setAdults, setPets, setKids }) => {
  const [kid, setKid] = useState(0)
  const [adult, setAdult] = useState(0)
  const [pet, setPet] = useState(0)

  const { closeModal } = useContext(ModalContext)
  const onConfirm = () => {
    setAdults(adult)
    setPets(pet)
    setKids(kid)
    closeModal()
  }
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

  const ref = useRef(null)
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        closeModal()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])
  return (
    <Wrapper ref={ref}>
      <ModalContent>
        {" "}
        <Title>
          <span>인원선택</span>
        </Title>
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
        <Bottom>
          <div onClick={onReset}>초기화</div>
          <div onClick={onConfirm}>적용하기</div>
        </Bottom>
      </ModalContent>
    </Wrapper>
  )
}

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
      text-align: center;

      input {
        width: 90%;
        padding: ${paddings.sm};
        margin: 0vw auto ${margins.base} auto;

        background-color: transparent;
        border: 0;
        border-bottom: 1px solid #232323;

        &::placeholder {
          color: #3e3e3e;
          text-align: left;
          font-weight: 100;
        }

        &::before {
          background-color: #d9d9d9;
        }
      }
    `
  }}
`

export default NumFilterModal
