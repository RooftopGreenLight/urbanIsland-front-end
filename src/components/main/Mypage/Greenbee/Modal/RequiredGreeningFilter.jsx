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
            <h5>지역</h5>
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
            {city && (
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
            )}
          </OptionBox>
          <OptionBox>
            <h5>단가</h5>
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
            <h5>넓이</h5>
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
  background-color: #f5f5f5;
`

const ViewPoint = styled.div`
  width: 100%;
  max-height: 100%;
  overflow: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const ModalHeader = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.base};

      background-color: #000000;

      display: flex;
      justify-content: space-between;

      h5 {
        color: ${colors.white};
        font-size: ${fonts.size.base};
        text-align: center;
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
      padding: ${paddings.xl};
      margin: auto;

      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    `
  }}
`

const OptionBox = styled.div`
  ${({ theme }) => {
    const { fonts, paddings } = theme
    return css`
      width: 90%;
      margin: auto;
      padding: ${paddings.base};

      h5 {
        text-align: center;
        font-size: ${fonts.size.base};
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
  width: 85%;
  margin: 1vw auto 0vw auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const InputBox = styled.div`
  ${({ theme }) => {
    const { fonts } = theme
    return css`
      width: 47.5%;
      margin: auto;

      display: flex;
      justify-content: space-between;

      p {
        width: 90%;
        margin: 0;
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
      }
      input {
        width: 10%;
        margin: auto;
      }
    `
  }}
`
const ConfirmBtn = styled.button`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      width: 30%;
      padding: ${paddings.sm};
      margin: 0.75vw auto 0.25vw auto;

      border: 1px solid rgb(77, 77, 77);
      border-radius: 2.5vw;
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: 100;

      &:hover {
        background: rgb(77, 77, 77);
        color: #fff;
      }
    `
  }}
`

export default RequiredGreeningFilter
