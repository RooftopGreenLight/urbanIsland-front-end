import { useContext, useState } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import CustomRange from "./CustomRange"

import { ModalContext } from "module/Modal"
import { SidoGunguList } from "constants/SidoGunguList"
import { RequestDeadLineDate } from "constants/RequestDeadLineDate"
import { RequiredRoofTopOption } from "constants/RequiredRoofTopOption"
import { useEffect } from "react"

const RequiredGreeningFilter = ({ appliedFilter, setAppliedFilter }) => {
  const { closeModal } = useContext(ModalContext)

  useEffect(() => {
    if (appliedFilter) {
      setRooftopFilter({ ...appliedFilter })
    }
  }, [])

  // 코드 개선 필요
  const [rooftopFilter, setRooftopFilter] = useState({
    type: "NG",
    page: 0,
    size: 9,
    city: "",
    district: "",
    minWidth: 0,
    maxWidth: 100000,
    minWidthPrice: 0,
    maxWidthPrice: 1000000,
    deadLineType: 0,
    contentNum: [],
  })

  const { city, deadLineType, contentNum } = rooftopFilter

  const applyRooftopFilter = async () => {
    setAppliedFilter(rooftopFilter)
    closeModal()
  }

  const changeSelect = e => {
    const { name, value } = e.target
    if (name === "county") {
      setRooftopFilter(prevFilter => ({ ...prevFilter, [name]: value, city: "" }))
      return
    }
    setRooftopFilter(prevFilter => ({ ...prevFilter, [name]: value }))
  }

  const changeDeadLineCheck = e => {
    const { name, checked } = e.target
    setRooftopFilter(prevFilter => ({
      ...prevFilter,
      deadLineType: checked ? parseInt(name) : null,
    }))
  }

  const changeCheck = e => {
    const { name, checked } = e.target
    checked
      ? setRooftopFilter(prevOptions => ({
          ...prevOptions,
          contentNum: [...contentNum, parseInt(name)],
        }))
      : setRooftopFilter(prevOptions => ({
          ...prevOptions,
          contentNum: [...contentNum].filter(item => item !== parseInt(name)),
        }))
  }

  return (
    <Wrapper>
      <ModalHeader>
        <h5>녹화 요청 옥상 필터</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <ViewPoint>
          <OptionBox>
            <h5>옥상 지역</h5>
            <SelectBox name="city" onChange={changeSelect} defaultValue="default">
              <option value="default" disabled>
                시 선택
              </option>
              {Array.from(SidoGunguList.keys()).map(sido => (
                <option key={sido} value={sido}>
                  {sido}
                </option>
              ))}
            </SelectBox>
            {city ? (
              <SelectBox name="district" onChange={changeSelect} defaultValue="default">
                <option value="default" disabled>
                  구 선택
                </option>
                {SidoGunguList.get(city).map(sigun => (
                  <option key={sigun} value={sigun}>
                    {sigun}
                  </option>
                ))}
              </SelectBox>
            ) : (
              <SelectBox name="district" defaultValue="default">
                <option value="default" disabled>
                  --- ---
                </option>
              </SelectBox>
            )}
          </OptionBox>
          <OptionBox>
            <h5>
              시공 단가 <span>(KRW / m2)</span>
            </h5>
            <CustomRange
              MAX={100000000}
              MIN={0}
              STEP={1}
              unit={"원 / m2"}
              setValue={setRooftopFilter}
              imin={0}
              imax={100000000}
              minOption="minWidthPrice"
              maxOption="maxWidthPrice"
            />
          </OptionBox>
          <OptionBox>
            <h5>
              시설 넓이 <span>(m2)</span>
            </h5>
            <CustomRange
              MAX={1000000}
              MIN={0}
              STEP={1}
              unit={"m2"}
              setValue={setRooftopFilter}
              imin={0}
              imax={1000000}
              minOption="minWidth"
              maxOption="maxWidth"
            />
          </OptionBox>
          <OptionBox>
            <h5>필요 시공 기한</h5>
            <InputBoxList>
              {RequestDeadLineDate.map((elm, idx) => (
                <InputBox key={elm}>
                  <p>{elm}</p>
                  <input
                    type="checkbox"
                    key={`${elm} + ${deadLineType === idx}`}
                    name={idx}
                    checked={deadLineType === idx}
                    onChange={changeDeadLineCheck}
                  />
                </InputBox>
              ))}
              <InputBox />
            </InputBoxList>
          </OptionBox>
          <OptionBox>
            <h5>세부 옵션 설정</h5>
            <InputBoxList>
              {RequiredRoofTopOption.map((option, idx) => (
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
          <ConfirmBtn onClick={applyRooftopFilter}>필터 적용하기</ConfirmBtn>
        </ViewPoint>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 33vw;

  margin: auto;
  background-color: #ffffff;
`

const ViewPoint = styled.div`
  width: 100%;
  max-height: 80vh;
  overflow: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    margin-left: 10px;
    background: #ffffff;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #ced4da;
    &:hover {
      background-color: #adb5bd;
    }
  }
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

      input {
        width: 70%;
        padding: ${paddings.sm};
        margin: ${margins.lg} auto;

        background-color: transparent;
        border: 0;
        border-bottom: 1px solid #232323;
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

const SelectBox = styled.select`
  ${({ theme }) => {
    const { fonts, margins, paddings } = theme
    return css`
      width: 40%;
      margin: ${margins.sm} 0vw;
      padding: ${paddings.sm} 0vw;

      border: 1px solid #999;
      border-radius: 0px;

      font-size: ${fonts.size.xsm};
      text-align: center;

      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      option {
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }
    `
  }}
`

const InputBoxList = styled.div`
  width: 75%;
  margin: 1vw auto 0vw auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

const InputBox = styled.div`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      width: 47.5%;
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
      input {
        width: 10%;
        margin: auto;
      }
    `
  }}
`
const ConfirmBtn = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 60%;
      padding: ${paddings.sm} ${paddings.base};
      margin: ${margins.lg} auto;

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

export default RequiredGreeningFilter
