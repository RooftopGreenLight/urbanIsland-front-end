import styled, { css } from "styled-components"
import { useState } from "react"
import { useEffect } from "react"

const ApplyExtraOption = ({ applyInfo, changeInfo }) => {
  const [extraOptions, setExtraOptions] = useState([])
  const [newExtraOption, setNewExtraOption] = useState({
    option: "",
    cost: 0,
    count: 0,
  })

  const { option, cost, count } = newExtraOption

  useEffect(() => {
    const confirmExtraOption = () => {
      changeInfo(prevInfo => ({
        ...prevInfo,
        optionContent: extraOptions.map(({ option }) => option),
        optionPrice: extraOptions.map(({ cost }) => cost),
        optionCount: extraOptions.map(({ count }) => count),
      }))
    }
    confirmExtraOption()
  }, [extraOptions])

  const changeInput = e => {
    const { name, value } = e.target
    name === "option"
      ? setNewExtraOption({
          ...newExtraOption,
          [name]: value,
        })
      : setNewExtraOption({
          ...newExtraOption,
          [name]: isNaN(value) || value.length === 0 || value < 0 ? 0 : parseInt(value),
        })
  }

  const addNewOption = () => {
    if (count * cost === 0 || extraOptions.includes(newExtraOption)) {
      return
    }

    setExtraOptions(prevOptions => [...prevOptions, newExtraOption])
    setNewExtraOption({
      option: "",
      cost: 0,
      count: 0,
    })
  }

  const deleteExtraOption = e => {
    setExtraOptions(extraOptions.filter(({ option }) => option !== e.target.dataset.option))
  }

  return (
    <Wrapper>
      <div className="title">
        <h5>옥상 부가 옵션</h5>
        <p>등록하려는 부가 서비스 옵션을 작성해주세요.</p>
      </div>
      <OptionList>
        {extraOptions && (
          <ExtraOptionList>
            {extraOptions.map(({ option, cost, count }) => (
              <span
                key={option}
                data-option={option}
                onClick={deleteExtraOption}>{`${option} ${cost}원 (최대 ${count} 개)`}</span>
            ))}
          </ExtraOptionList>
        )}
        <InsertNewOption>
          <input name="option" value={option} placeholder="옵션 이름" onChange={changeInput} />
          <input name="cost" value={cost} placeholder="옵션 가격" onChange={changeInput} />
          <input name="count" value={count} placeholder="옵션 최대 수량" onChange={changeInput} />
          <button onClick={addNewOption}>옵션 추가</button>
        </InsertNewOption>
      </OptionList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 100%;
      background-color: ${colors.white};
      padding: ${paddings.base};

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .title {
        width: 80%;
        margin-bottom: ${margins.sm};
        text-align: left;
      }

      p {
        color: ${colors.black.quinary};
        font-weight: ${fonts.weight.light};
      }

      h5 {
        margin-bottom: 0.25rem;
        color: ${colors.black.secondary};
        font-size: ${fonts.size.sm};
      }

      img {
        width: 80%;
        margin: ${margins.lg} auto 0vw auto;
      }
    `
  }}
`

const OptionList = styled.div`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      width: 70%;
      margin: auto 0vw;
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
          width: 10%;
        }

        &[name="count"] {
          width: 10%;
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
