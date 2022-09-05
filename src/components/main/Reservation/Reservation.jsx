import React, { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { ModalContext } from "module/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faFilter, faMap, faUser } from "@fortawesome/free-solid-svg-icons"
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
    size: 9,
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

  const { city, district, adultCount, kidCount, startTime, endTime } = filter

  useEffect(() => {
    const getFilteredData = async () => {
      const searchFilter = Object.entries(filter).filter(([option, value]) => {
        // page, cond의 경우 필수로 들어가는 값이므로 true.
        if (option === "page" || option === "cond") {
          return true
        }
        // contentNum의 배열이 비었거나, 값이 0 또는 빈 문자열일 경우 넣지 않음.
        if ((option === "contentNum" && value.length < 1) || value === 0 || value === "") {
          return false
        }
        return true
      })
      try {
        const result = await roofTopControl.getRooftopSearch(Object.fromEntries(searchFilter))
        setData(result)
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
          <MainFilterBtn
            onClick={() => openModal(<RegionFilterModal filter={filter} setFilter={setFilter} />)}>
            <div className="content">
              <FontAwesomeIcon icon={faMap} />
              <span>{city ? (district ? `${city} ${district}` : city) : "지역 선택"}</span>
            </div>
            <FontAwesomeIcon icon={faAngleDown} />
          </MainFilterBtn>
          <MainFilterBtn
            onClick={() => openModal(<TimeFilterModal filter={filter} setFilter={setFilter} />)}>
            <div className="content">
              <FontAwesomeIcon icon={faClock} />
              <span>
                {startTime
                  ? endTime
                    ? `${startTime.slice(0, 5)} - ${endTime.slice(0, 5)}`
                    : `${startTime.slice(0, 5)} - 24:00`
                  : "시간 선택"}
              </span>
            </div>
            <FontAwesomeIcon icon={faAngleDown} />
          </MainFilterBtn>
          <MainFilterBtn
            onClick={() => openModal(<NumFilterModal filter={filter} setFilter={setFilter} />)}>
            <div className="content">
              <FontAwesomeIcon icon={faUser} />
              <span>
                {adultCount > 0
                  ? kidCount > 0
                    ? `어른 ${adultCount}명, 유아 ${kidCount} 명`
                    : `어른 ${adultCount}명`
                  : "인원 선택"}
              </span>
            </div>
            <FontAwesomeIcon icon={faAngleDown} />
          </MainFilterBtn>
        </InnerDiv>

        <InnerDiv>
          {/* <Select onChange={handleChange}>
            {OPTIONS.map(option => (
              <option
                key={option.value}
                value={option.value}
                defaultValue={OPTIONS === option.value}>
                {option.name}
              </option>
            ))}
          </Select> */}
          <FilterBtn
            onClick={() => openModal(<DetailFilterModal filter={filter} setFilter={setFilter} />)}>
            <FontAwesomeIcon icon={faFilter} /> 세부 필터
          </FilterBtn>
        </InnerDiv>
      </SearchBar>
      <SearchResult>
        {data && data.length >= 1 ? (
          data.map((d, index) => <ReservationCard reservationInfo={d} key={index} />)
        ) : (
          <div>검색 결과가 없습니다</div>
        )}
      </SearchResult>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
`

const MainFilterBtn = styled.button`
  ${({ theme }) => {
    const { colors, margins, paddings } = theme
    return css`
      width: 15vw;
      height: 2.5rem;
      margin: ${margins.sm};
      padding: ${paddings.sm};

      display: flex;
      justify-content: space-between;
      align-items: center;

      background-color: ${colors.white};
      border: 1px solid ${colors.main.primary}55;
      border-radius: 0.25rem;

      color: ${colors.black.tertiary}88;
      font-weight: 200;

      svg {
        color: ${colors.main.secondary}88;
        margin-right: 0.33rem;
      }
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
      margin: ${margins.sm} 0vw;
    `
  }}
`
const SearchBar = styled.div`
  ${({ theme }) => {
    const { colors, paddings, margins } = theme
    return css`
      width: 100vw;
      padding: ${paddings.base} 12.5vw;
      margin: ${margins.base} 0vw;

      display: flex;
      justify-content: space-between;

      border-bottom: 1px solid ${colors.main.primary}22;
    `
  }}
`
const SearchResult = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      width: 75vw;
      margin: 0vw auto ${margins.xl} auto;
      display: grid;

      grid-gap: 5vh ${margins.sm};
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(4, 1fr);
    `
  }}
`

const FilterBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 7.5vw;
      height: 75%;
      padding: 0vw ${paddings.base};
      margin: auto;

      border-radius: ${fonts.size.xsm};
      background: ${colors.main.tertiary};

      color: ${colors.white};
      font-size: ${fonts.size.xsm};
      font-weight: ${fonts.weight.light};

      svg {
        font-size: ${fonts.size.xsm};
        margin: auto ${margins.xsm} auto 0vw;
      }
    `
  }}
`

export default Reservation
