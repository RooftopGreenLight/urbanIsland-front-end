import { useState, useEffect } from "react"
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
const FilterCheckbox = ({ setSet, flag }) => {
  const [isShowMore, setIsShowMore] = useState(false)
  var initial = []
  for (let i = 0; i < Object.keys(RoofTopFacilities).length; i++) {
    initial.push(false)
  }
  const [checkList, setCheckList] = useState(initial)
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
  // index 번째 체크 상태를 반전시킨다
  const handleCheckClick = index => {
    setCheckList(checks => checks.map((c, i) => (i === index ? !c : c)))
  }

  const isAllChecked = e => {
    setCheckList(checks => checks.map((c, i) => (c === true ? !c : c)))
  }
  const checkHandler = ({ target }) => {
    checkedItemHandler(target.id, target.checked)
  }
  useEffect(() => {
    isAllChecked()
  }, [flag])

  return (
    <Wrapper>
      <LDisplay isShowMore={isShowMore}>
        {Object.keys(RoofTopFacilities).map((d, idx) =>
          idx % 2 === 0 ? (
            <Line key={d}>
              <p>{d}</p>{" "}
              <input
                className="box"
                //checked={bChecked[index]}
                type="checkbox"
                id={idx}
                checked={checkList[idx]}
                onChange={checkHandler}
                onClick={() => handleCheckClick(idx)}
              />
            </Line>
          ) : null,
        )}
      </LDisplay>
      <RDisplay isShowMore={isShowMore}>
        {Object.keys(RoofTopFacilities).map((d, index) =>
          index % 2 !== 0 ? (
            <Line key={d}>
              <p>{d}</p>{" "}
              <input
                className="box"
                //checked={bChecked[index]}
                type="checkbox"
                id={index}
                checked={checkList[index]}
                onChange={checkHandler}
                onClick={() => handleCheckClick(index)}
              />
            </Line>
          ) : null,
        )}
      </RDisplay>
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
