import { useContext, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import { RoofTopFacilities } from "constants/RoofTopFacilities"

import CustomRange from "components/main/Mypage/Greenbee/Modal/CustomRange"
import { useEffect } from "react"

const DetailFilterModal = ({ filter, setFilter }) => {
  const { closeModal } = useContext(ModalContext)
  const [detailFilter, setDetailFilter] = useState({
    minPrice: filter.minPrice,
    maxPrice: filter.maxPrice,
    minWidth: filter.minWidth,
    maxWidth: filter.maxWidth,
    contentNum: filter.contentNum,
  })

  const { minPrice, maxPrice, minWidth, maxWidth, contentNum } = detailFilter

  useEffect(() => {
    setFilter(prevFilter => ({
      ...prevFilter,
      minPrice,
      maxPrice,
      minWidth,
      maxWidth,
      contentNum,
    }))
  }, [detailFilter])

  const confirmFilter = () => {
    closeModal()
  }

  const resetFilter = () => {
    setDetailFilter({
      minPrice: 0,
      maxPrice: 50000000,
      minWidth: 0,
      maxWidth: 333333,
      contentNum: [],
    })
  }

  const changeCheck = e => {
    const { name, checked } = e.target
    checked
      ? setDetailFilter(prevOptions => ({
          ...prevOptions,
          contentNum: [...contentNum, parseInt(name)],
        }))
      : setDetailFilter(prevOptions => ({
          ...prevOptions,
          contentNum: [...contentNum].filter(item => item !== parseInt(name)),
        }))
  }
  return (
    <Wrapper>
      <ModalHeader>
        <h5>세부 옵션 설정</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <OptionBox>
          <h5>
            가격 <span>(KRW)</span>
          </h5>
          <CustomRange
            STEP={1}
            MIN={0}
            MAX={50000000}
            unit={"KRW"}
            setValue={setDetailFilter}
            minOption="minPrice"
            maxOption="maxPrice"
            imin={minPrice}
            imax={maxPrice}
          />
        </OptionBox>
        <OptionBox>
          <h5>
            넓이 <span>(m2)</span>
          </h5>
          <CustomRange
            STEP={1}
            MIN={0}
            MAX={333333}
            unit={"m2"}
            setValue={setDetailFilter}
            minOption="minWidth"
            maxOption="maxWidth"
            imin={minWidth}
            imax={maxWidth}
          />
        </OptionBox>
        <OptionBox>
          <h5>세부 옵션 설정</h5>
          <InputBoxList>
            {RoofTopFacilities.map((option, idx) => (
              <InputBox key={option}>
                <p>{option}</p>
                <input
                  key={`${option} + ${contentNum.includes(idx)}`}
                  type="checkbox"
                  name={idx}
                  checked={contentNum.includes(idx)}
                  onChange={changeCheck}
                />
              </InputBox>
            ))}
          </InputBoxList>
        </OptionBox>
        <BtnList>
          <SettingBtn onClick={resetFilter}>초기화</SettingBtn>
          <SettingBtn onClick={confirmFilter}>적용하기</SettingBtn>
        </BtnList>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      width: 33%;
      margin: auto;

      overflow: hidden;
      border-radius: 0.3rem;
      background-color: #fff;

      animation: ${modalShow} 0.3s;
      animation-fill-mode: forwards;
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

const OptionBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 90%;
      margin: auto;
      padding: ${paddings.sm};

      h5 {
        border-bottom: 1px solid ${colors.main.secondary};
        margin-bottom: ${margins.sm};

        font-size: ${fonts.size.base};
        line-height: 150%;
        text-align: left;
      }

      span {
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }
    `
  }}
`

const InputBoxList = styled.div`
  width: 80%;
  margin: 1vw auto 0vw auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

const InputBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 40%;
      margin: ${margins.xsm} auto;

      display: flex;
      justify-content: space-evenly;

      p {
        width: 80%;
        margin: 0;
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: left;
      }

      input[type="checkbox"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;

        background: ${colors.main.quaternary}88;
        border-radius: 4px;

        width: 16px;
        height: 16px;
        margin: auto;

        &::after {
          border: solid #fff;
          border-width: 0 2px 2px 0;
          content: "";
          display: none;

          width: 4px;
          height: 6px;

          position: relative;
          right: 3px;
          top: -4px;
          transform: rotate(45deg);
        }

        &:checked {
          background: ${colors.main.tertiary};
          &::after {
            display: block;
          }
        }
      }
    `
  }}
`

const BtnList = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      width: 80%;
      margin: 0vw auto ${margins.lg} auto;
      display: flex;
      justify-content: space-between;
    `
  }}
`

const SettingBtn = styled.button`
  ${({ theme }) => {
    const { colors, paddings, margins } = theme
    return css`
      width: 40%;
      padding: ${paddings.sm};
      margin: ${margins.sm} auto 0vw auto;

      background: ${colors.white};
      border: 1px solid ${colors.main.primary};
      border-radius: 2.5vw;
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: 100;

      &:hover {
        border: 0px;
        background: ${colors.main.tertiary};
        color: ${colors.white};
      }
    `
  }}
`

export default DetailFilterModal
