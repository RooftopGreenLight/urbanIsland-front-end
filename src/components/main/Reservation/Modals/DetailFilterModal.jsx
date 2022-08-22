import { useContext, useState } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import CustomSlider from "components/main/Reservation/CustomSlider"
import FilterCheckbox from "components/main/Reservation/FilterCheckBox"

const DetailFilterModal = ({ filter, setFilter }) => {
  const { closeModal } = useContext(ModalContext)

  const [price, setPrice] = useState([0, 5000000])
  const [width, setWidth] = useState([0, 3333])
  const [set, setSet] = useState(new Set())
  const onSubmit = () => {
    setFilter({
      ...filter,
      minPrice: price[0],
      maxPrice: price[1],
      minWidth: width[0],
      maxWidth: width[1],
      contentNum: Array.from(set),
    })

    closeModal()
  }
  const [flag, setFlag] = useState(false)
  const clear = () => {
    setFlag(!flag)
    setFilter({
      ...filter,
      minPrice: 0,
      maxPrice: 0,
      minWidth: 0,
      maxWidth: 0,
      contentNum: [],
    })
  }
  return (
    <Wrapper>
      <header>
        <ModalCloseBtn onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} />
        </ModalCloseBtn>
      </header>
      <ModalContent>
        <ModalBody>
          {" "}
          <Title>
            <span>가격</span>
          </Title>
          <Box>
            <CustomSlider
              STEP={1}
              MIN={0}
              MAX={5000000}
              unit={"W"}
              setValue={setPrice}
              flag={flag}
              imin={0}
              imax={500000}
            />
          </Box>{" "}
          <Title>
            <span>넓이</span>
          </Title>{" "}
          <Box>
            <CustomSlider
              STEP={1}
              MIN={0}
              MAX={3333}
              unit={"M^2"}
              setValue={setWidth}
              flag={flag}
              imin={0}
              imax={3333}
            />
          </Box>{" "}
          <Title>
            <span>편의요소</span>
          </Title>
          <Box>
            <FilterCheckbox setSet={setSet} flag={flag} />
          </Box>
        </ModalBody>
        <Bottom>
          <span onClick={clear}>초기화</span>
          <button onClick={onSubmit}>적용하기</button>
        </Bottom>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      width: 50%;
      margin: auto;

      overflow: hidden;
      border-radius: 0.3rem;
      background-color: #fff;

      animation: ${modalShow} 0.3s;
      animation-fill-mode: forwards;

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
      overflow-y: initial !important;

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

const Box = styled.div`
  margin: 0 3rem;
  span {
    float: right;
  }
`
const ModalBody = styled.div`
  height: 80vh;
  overflow-y: scroll;
  margin: 1rem;
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
  span {
    padding: 1rem;
  }
  button {
    padding: 1rem;
    margin: 0.3rem 0.5rem;
    border-radius: 0.3rem;
  }
`

export default DetailFilterModal
