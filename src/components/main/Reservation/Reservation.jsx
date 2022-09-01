import React, { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { ModalContext } from "module/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import DetailFilterModal from "./Modals/DetailFilterModal"
import { roofTopControl } from "api/controls/roofTopControl"
import TimeFilterModal from "components/main/Reservation/Modals/TimeFilterModal"
import NumFilterModal from "components/main/Reservation/Modals/NumFilterModal"
import RegionFilterModal from "components/main/Reservation/Modals/RegionFilterModal"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import ReservationCard from "components/main/Reservation/ReservationCard"

const Reservation = () => {
  const { openModal } = useContext(ModalContext)
  const [data, setData] = useState()
  const [filter, setFilter] = useState({
    page: 0,
    cond: 1,
    type: "G",
    kidCount: 0,
    adultCount: 0,
    petCount: 0,
    startTime: "",
    endTime: "",
    city: "",
    district: "",
    maxPrice: 0,
    minPrice: 0,
    maxWidth: 0,
    minWidth: 0,
    contentNum: [],
  })
  useEffect(() => {
    var obj = new Object()
    const getFilteredData = async event => {
      Object.entries(filter).map(d => {
        if (d[0] === "page" || d[0] === "cond") {
          obj[d[0]] = d[1]
        } else if (d[0] === "contentNum") {
          if (d[1].length >= 1) {
            obj[d[0]] = d[1]
          }
        } else if (d[1] === 0 || d[1] === "") {
        } else {
          obj[d[0]] = d[1]
        }
      })
      try {
        const result = await roofTopControl.getRooftopSearch(obj)
        setData(result.rooftopResponses)
      } catch (err) {
        console.log(err.message)
      }
    }
    getFilteredData()
  }, [filter])

  const handleChange = e => {
    setFilter({ ...filter, cond: e.target.value })
    console.log(filter.cond)
  }

  const OPTIONS = [
    { value: 1, name: "평점순" },
    { value: 2, name: "낮은가격순" },
    { value: 3, name: "높은가격순" },
  ]

  return (
    <Wrapper>
      <SearchBar>
        <InnerDiv>
          <Button
            onClick={() => openModal(<RegionFilterModal filter={filter} setFilter={setFilter} />)}>
            <span>지역 선택</span>
            <FontAwesomeIcon icon={faAngleDown} />
          </Button>
          <Button
            onClick={() => openModal(<TimeFilterModal filter={filter} setFilter={setFilter} />)}>
            <span>시간 선택</span>
            <FontAwesomeIcon icon={faAngleDown} />
          </Button>
          <Button
            onClick={() => openModal(<NumFilterModal filter={filter} setFilter={setFilter} />)}>
            <span>인원 선택</span>
            <FontAwesomeIcon icon={faAngleDown} />
          </Button>
        </InnerDiv>

        <InnerDiv>
          <Select onChange={handleChange}>
            {OPTIONS.map(option => (
              <option
                key={option.value}
                value={option.value}
                defaultValue={OPTIONS === option.value}>
                {option.name}
              </option>
            ))}
          </Select>
          <Button
            onClick={() => openModal(<DetailFilterModal filter={filter} setFilter={setFilter} />)}>
            <span>세부필터</span>
            <FontAwesomeIcon icon={faFilter} />
          </Button>
        </InnerDiv>
      </SearchBar>
      <SearchResult>
        {data && data.length >= 1 ? (
          data.map((d, index) => <ReservationCard props={d} key={index} />)
        ) : (
          <div>검색 결과가 없습니다</div>
        )}
      </SearchResult>
    </Wrapper>
  )
}
export default Reservation

const Button = styled.button`
  ${({ theme }) => {
    const { margins, paddings } = theme
    return css`
      background-color: white;
      border: 1px solid black;
      padding: ${paddings.sm};
      border-radius: 0.5rem;
      width: 9vw;
      display: flex;
      justify-content: space-between;
      margin: ${margins.sm};
      height: 2.2rem;
    `
  }}
`

const Select = styled.select`
  ${({ theme }) => {
    const { margins, paddings } = theme
    return css`
      background-color: white;
      border: 1px solid black;
      padding: ${paddings.sm};
      border-radius: 0.5rem;
      display: flex;
      justify-content: space-between;
      margin: ${margins.sm};
      height: 2.2rem;
    `
  }}
`
const InnerDiv = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      display: flex;
      flex-direction: row;
      margin: ${margins.sm};
    `
  }}
`
const SearchBar = styled.div`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      display: flex;
      width: 100%;
      justify-content: space-between;
      height: 3.4rem;
      padding-bottom: ${paddings.sm};
      border-bottom: 1px solid black;
    `
  }}
`
const SearchResult = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      width: 100%;
      margin: ${margins.sm};
      display: flex;
      justify-content: center;
    `
  }}
`
const Wrapper = styled.div`
  width: 100%;
`
