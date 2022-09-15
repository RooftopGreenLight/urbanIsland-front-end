import { useContext, useState } from "react"
import styled, { css } from "styled-components"

import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import { RoofTopFacilities } from "constants/RoofTopFacilities"

import { ModalHeader, ModalCloseBtn, ModalContent } from "components/common/Style/Modal/CommonStyle"
import { CheckBox } from "components/common/Style/Common/CommonStyle"

import CustomSlider from "components/common/CustomSlider"
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
        <ViewPoint>
          <OptionBox>
            <h5>
              가격 <span>(KRW)</span>
            </h5>
            <CustomSlider
              STEP={1}
              MIN={0}
              MAX={50000000}
              unit={"KRW"}
              setValue={([minPrice, maxPrice]) =>
                setDetailFilter(prevFilter => ({ ...prevFilter, minPrice, maxPrice }))
              }
              imin={minPrice}
              imax={maxPrice}
            />
          </OptionBox>
          <OptionBox>
            <h5>
              넓이 <span>(m2)</span>
            </h5>
            <CustomSlider
              STEP={1}
              MIN={0}
              MAX={333333}
              unit={"m2"}
              setValue={([minWidth, maxWidth]) =>
                setDetailFilter(prevFilter => ({ ...prevFilter, minWidth, maxWidth }))
              }
              imin={minWidth}
              imax={maxWidth}
            />
          </OptionBox>
          <OptionBox>
            <h5>세부 옵션 설정</h5>
            <SetDetailSection>
              {RoofTopFacilities.map((option, idx) => (
                <CheckBox key={option}>
                  <p>{option}</p>
                  <input
                    key={`${option} + ${contentNum.includes(idx)}`}
                    type="checkbox"
                    name={idx}
                    checked={contentNum.includes(idx)}
                    onChange={changeCheck}
                  />
                </CheckBox>
              ))}
            </SetDetailSection>
          </OptionBox>
        </ViewPoint>
        <BtnList>
          <SettingBtn onClick={resetFilter}>초기화</SettingBtn>
          <SettingBtn onClick={confirmFilter}>적용하기</SettingBtn>
        </BtnList>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 33%;
  margin: auto;

  overflow: hidden;
  border-radius: 0.3rem;
  background-color: #fff;

  animation: ${modalShow} 0.3s;
  animation-fill-mode: forwards;
`

const ViewPoint = styled.div`
  max-height: 70vh;
  overflow: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ::-webkit-scrollbar {
    display: none;
  }
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

        color: ${colors.main.secondary};
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

const SetDetailSection = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      width: 95%;
      margin: ${margins.base} auto;

      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;

      text-align: center;
    `
  }}
`

const BtnList = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      width: 80%;
      margin: ${margins.base} auto;
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
