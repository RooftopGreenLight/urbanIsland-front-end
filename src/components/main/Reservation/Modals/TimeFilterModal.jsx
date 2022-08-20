import { useContext, useState, useRef, useEffect } from "react"
import styled, { css } from "styled-components"
import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import CustomSlider from "components/main/Reservation/CustomSlider"

const Box = styled.div`
  p {
    font-size: 0.9rem;
  }
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
const TimeFilterModal = ({ setEndTime, setStartTime }) => {
  const { closeModal } = useContext(ModalContext)
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
  //const { closeModal } = useContext(ModalContext)
  const [flag, setFlag] = useState(false)
  const onReset = e => {
    setFlag(!flag)
  }
  const [value, setValue] = useState([])
  const onConfirm = e => {
    closeModal()
  }
  useEffect(() => {
    const ModifyForm = () => {
      if (value[0] >= 0 || value[0] <= 9) {
        setStartTime("0" + value[0] + ":00:00")
        setEndTime(value[1] + ":00:00")
      } else {
        setStartTime(value[0] + ":00:00")
        setEndTime(value[1] + ":00:00")
      }
    }
    ModifyForm()
  }, [value])
  return (
    <Wrapper ref={ref}>
      <ModalContent>
        {" "}
        <Title>
          <span>시간선택</span>
        </Title>
        <Box>
          <p>사용하려는 시간이 포함된 가장 짧은 시간을 검색해주세요</p>{" "}
          <CustomSlider MAX={24} MIN={0} STEP={1} unit={":00"} setValue={setValue} flag={flag} />
        </Box>
        <Bottom>
          <div onClick={onReset}>초기화</div>
          <div onClick={onConfirm}>적용하기</div>
        </Bottom>
      </ModalContent>
    </Wrapper>
  )
}
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    text-align: center;
    width: 50%;
  }
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

export default TimeFilterModal
