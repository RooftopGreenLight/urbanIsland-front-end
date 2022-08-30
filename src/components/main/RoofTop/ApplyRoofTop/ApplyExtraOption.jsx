import styled, { css } from "styled-components"
import { useState } from "react"
import { useEffect } from "react"

const ApplyExtraOption = ({ applyInfo, changeInfo }) => {
  const [extraOptions, setExtraOptions] = useState([])
  const [newExtraOption, setNewExtraOption] = useState({
    option: "",
    cost: 0,
  })

  useEffect(() => {
    const confirmExtraOption = () => {
      changeInfo(prevInfo => ({
        ...prevInfo,
        optionContent: extraOptions.map(({ option }) => option),
        optionPrice: extraOptions.map(({ cost }) => cost),
        optionCount: extraOptions.length,
      }))
    }
    confirmExtraOption()
  }, [extraOptions])

  const { option, cost } = newExtraOption

  const changeInput = e => {
    const { name, value } = e.target
    name === "cost"
      ? setNewExtraOption({
          ...newExtraOption,
          [name]: isNaN(value) || value.length === 0 || value < 0 ? 0 : parseInt(value),
        })
      : setNewExtraOption({
          ...newExtraOption,
          [name]: value,
        })
  }

  const addNewOption = () => {
    if (cost === 0 || extraOptions.includes(newExtraOption)) {
      return
    }

    setExtraOptions(prevOptions => [...prevOptions, newExtraOption])
    setNewExtraOption({
      option: "",
      cost: 0,
    })
  }

  const deleteExtraOption = e => {
    setExtraOptions(extraOptions.filter(({ option }) => option !== e.target.dataset.option))
  }

  return (
    <Wrapper>
      <Title>
        <h5>옥상 부가 옵션</h5>
        <p>등록하려는 부가 서비스 옵션을 작성해주세요.</p>
      </Title>
      <OptionList>
        {extraOptions && (
          <ExtraOptionList>
            {extraOptions.map(({ option, cost }) => (
              <span
                key={option}
                data-option={option}
                data-cost={cost}
                onClick={deleteExtraOption}>{`${option} ${cost}원`}</span>
            ))}
          </ExtraOptionList>
        )}
        <InsertNewOption>
          <input name="option" value={option} placeholder="새로운 옵션" onChange={changeInput} />
          <input name="cost" value={cost} placeholder="새로운 옵션 가격" onChange={changeInput} />
          <button onClick={addNewOption}>옵션 추가</button>
        </InsertNewOption>
      </OptionList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 90%;
  padding: 2.5%;
  margin: auto;

  text-align: center;
  background-color: #ffffff;
`

const Title = styled.div`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      margin: auto;

      h5 {
        font-size: ${fonts.size.lg};
      }

      p {
        font-weight: 100;
        margin-bottom: ${margins.sm};
      }
    `
  }}
`

const OptionList = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 70%;
      margin: auto;
      background-color: ${colors.white};

      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `
  }}
`

const InsertNewOption = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 100%;
      background-color: ${colors.white};

      display: flex;
      justify-content: space-between;

      input {
        border: 0px;
        border-bottom: 1px solid #000000;
        text-align: center;

        &[name="option"] {
          width: 50%;
        }

        &[name="cost"] {
          width: 20%;
        }
      }

      button {
        width: 15%;
        padding: ${paddings.sm};

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
      }
    `
  }}
`

const ExtraOptionList = styled.div`
  ${({ theme }) => {
    const { fonts } = theme
    return css`
      width: 70%;
      margin: 1vw auto;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      span {
        font-weight: 100;
        font-size: ${fonts.size.xsm};
      }
    `
  }}
`

export default ApplyExtraOption
