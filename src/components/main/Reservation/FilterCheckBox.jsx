import { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import { RoofTopFacilities } from "constants/RoofTopFacilities"

const FilterCheckbox = ({ setSet, flag }) => {
  const [isShowMore, setIsShowMore] = useState(false)
  const [checkedItems, setCheckedItems] = useState(new Set())
  const [checkedState, setCheckedState] = useState(new Array(RoofTopFacilities.length).fill(false))
  const isAllChecked = e => {
    setCheckedState(new Array(RoofTopFacilities.length).fill(false))
  }
  useEffect(() => {
    isAllChecked()
  }, [flag])
  const checkedItemHandler = (id, isChecked) => {
    console.log(id, isChecked)
    if (isChecked) {
      checkedItems.add(id)
      setCheckedItems(checkedItems)
      setSet(checkedItems)
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id)
      setCheckedItems(checkedItems)
      setSet(checkedItems)
    }
  }
  const handleCheck = event => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === Number(event.target.id) ? !item : item,
    )
    setCheckedState(updatedCheckedState)
    console.log(checkedState)
    checkedItemHandler(event.target.id, event.target.checked)
  }

  return (
    <Wrapper>
      <Display isShowMore={isShowMore}>
        {RoofTopFacilities.map((d, idx) => (
          <Line key={d}>
            <CheckBox htmlFor={idx}>
              <p> {d}</p>
              <input
                className="box"
                type="checkbox"
                checked={checkedState[idx]}
                id={idx}
                onChange={handleCheck}
              />
            </CheckBox>
          </Line>
        ))}
      </Display>
      <span
        onClick={() => {
          setIsShowMore(!isShowMore)
        }}>
        {isShowMore ? "닫기" : "더보기"}
      </span>
    </Wrapper>
  )
}
export default FilterCheckbox
const Line = styled.div`
  display: inline-block;
  width: 50%;
`
const CheckBox = styled.label`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      display: flex;
      justify-content: space-between;
      .box {
        width: 1rem;
        margin: ${margins.base};
      }
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: ${margins.base} 0;
      }
    `
  }}
`
const Wrapper = styled.div``
const Display = styled.div`
  height: ${({ isShowMore }) => (isShowMore ? "100%" : "200px")};
  overflow: ${({ isShowMore }) => (isShowMore ? "auto" : "hidden")};
`
