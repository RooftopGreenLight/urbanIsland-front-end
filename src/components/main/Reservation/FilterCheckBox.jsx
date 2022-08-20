import { useState } from "react"
import styled from "styled-components"
import { RoofTopFacilities } from "constants/RoofTopFacilities"

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  .box {
    width: 1rem;
    margin: 1rem;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
  }
`
const RDisplay = styled.div`
  height: ${({ isShowMore }) => (isShowMore ? "100%" : "200px")};
  overflow: ${({ isShowMore }) => (isShowMore ? "auto" : "hidden")};
  width: 50%;
  display: inline-block;
`
const LDisplay = styled.div`
  display: inline-block;
  width: 50%;
  border-right: 1px solid black;
  height: ${({ isShowMore }) => (isShowMore ? "100%" : "200px")};
  overflow: ${({ isShowMore }) => (isShowMore ? "auto" : "hidden")};
`
const Wrapper = styled.div``
const FilterCheckbox = ({ setSet }) => {
  const [checkedItems, setCheckedItems] = useState(new Set())
  const checkedItemHandler = (id, isChecked) => {
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
  const checkHandler = ({ target }) => {
    checkedItemHandler(target.id, target.checked)
  }
  const [isShowMore, setIsShowMore] = useState(false)

  return (
    <Wrapper>
      <LDisplay isShowMore={isShowMore}>
        {Object.keys(RoofTopFacilities).map((d, index) =>
          index % 2 === 0 ? (
            <Line key={d}>
              <p>{d}</p>{" "}
              <input className="box" type="checkbox" id={index} name={d} onChange={checkHandler} />
            </Line>
          ) : null,
        )}
      </LDisplay>
      <RDisplay isShowMore={isShowMore}>
        {Object.keys(RoofTopFacilities).map((d, index) =>
          index % 2 !== 0 ? (
            <Line key={d}>
              <p>{d}</p>{" "}
              <input className="box" type="checkbox" id={index} name={d} onChange={checkHandler} />
            </Line>
          ) : null,
        )}
      </RDisplay>
      <span
        onClick={() => {
          setIsShowMore(!isShowMore)
          console.log(isShowMore)
        }}>
        {isShowMore ? "닫기" : "더보기"}
      </span>
    </Wrapper>
  )
}
export default FilterCheckbox
