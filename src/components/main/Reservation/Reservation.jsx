import React, { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import { ModalContext } from "module/Modal"
import { roofTopControl } from "api/controls/roofTopControl"
import { SortingRooftop } from "constants/SortingRooftop"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faClock,
  faFilter,
  faMap,
  faAngleDown,
  faUser,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons"

import ReservationCard from "components/main/Reservation/ReservationCard"
import DetailFilterModal from "./Modals/DetailFilterModal"
import TimeFilterModal from "components/main/Reservation/Modals/TimeFilterModal"
import NumFilterModal from "components/main/Reservation/Modals/NumFilterModal"
import RegionFilterModal from "components/main/Reservation/Modals/RegionFilterModal"

const Reservation = () => {
  const { openModal } = useContext(ModalContext)
  const [rooftopList, setRooftopList] = useState()
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
    minPrice: 0,
    maxPrice: 50000000,
    minWidth: 0,
    maxWidth: 333333,
    contentNum: [],
  })

  const { city, district, adultCount, kidCount, petCount, startTime, endTime } = filter

  useEffect(() => {
    const getFilteredData = async () => {
      const searchFilter = Object.entries(filter).filter(([option, value]) => {
        // page, cond의 경우 필수로 들어가는 값이므로 true.
        if (["page", "cond"].includes(option)) {
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
        setRooftopList(result)
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
                {startTime || endTime
                  ? `${startTime ? `${startTime.slice(0, 5)}` : `00:00`} - ${
                      endTime ? `${endTime.slice(0, 5)}` : "24:00"
                    }`
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
                    ? `어른 ${adultCount}명, 유아 ${kidCount}명`
                    : `어른 ${adultCount}명`
                  : "인원 선택"}
              </span>
            </div>
            <FontAwesomeIcon icon={faAngleDown} />
          </MainFilterBtn>
        </InnerDiv>

        <InnerDiv>
          <SortingBtn onChange={handleChange}>
            {SortingRooftop.map(({ name, value }) => (
              <option key={name} value={value} defaultValue={value}>
                {name}
              </option>
            ))}
          </SortingBtn>
          <FilterBtn
            onClick={() => openModal(<DetailFilterModal filter={filter} setFilter={setFilter} />)}>
            <FontAwesomeIcon icon={faFilter} /> 세부 필터
          </FilterBtn>
        </InnerDiv>
      </SearchBar>
      <SearchResult>
        {rooftopList && rooftopList.length >= 1 ? (
          rooftopList.map((rooftopInfo, index) => (
            <ReservationCard
              rooftopInfo={rooftopInfo}
              filterInfo={{
                kidCount,
                adultCount: adultCount > 1 ? adultCount : 1,
                petCount,
                selectedTime: [
                  startTime ? parseInt(startTime.slice(0, 2)) : 0,
                  endTime ? parseInt(endTime.slice(0, 2)) : 23,
                ],
              }}
              key={index}
            />
          ))
        ) : (
          <NoticeEmptyIcon>
            <FontAwesomeIcon icon={faCircleQuestion} />
            <h5>옥상 목록 없음</h5>
            <p>설정하신 조건에 맞는 시설이 없습니다.</p>
          </NoticeEmptyIcon>
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

const InnerDiv = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      display: flex;
      justify-content: space-between;
      margin: ${margins.sm} 0vw;
    `
  }}
`
const SearchBar = styled.div`
  ${({ theme }) => {
    const { colors, paddings, margins } = theme
    return css`
      width: 100%;
      padding: ${paddings.base} 12.5vw;
      margin: 0vw 0vw ${margins.base} 0vw;

      display: flex;
      justify-content: space-between;

      border-bottom: 1px solid ${colors.main.primary}22;
      background-color: ${colors.main.quaternary}09;
    `
  }}
`
const SearchResult = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      width: 75vw;
      margin: ${margins.lg} auto;
      display: grid;

      grid-gap: 5vh ${margins.base};
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, 1fr);
    `
  }}
`

const SortingBtn = styled.select`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 9vw;
      height: 75%;
      margin: auto 0vw auto ${margins.sm};
      padding: 0vw ${paddings.base};

      border: 0;
      border-radius: ${fonts.size.xsm};
      background: ${colors.main.secondary};

      color: ${colors.white};
      font-size: ${fonts.size.xsm};
      font-weight: ${fonts.weight.light};

      svg {
        font-size: ${fonts.size.xsm};
        margin: auto ${margins.xsm} auto 0vw;
      }

      option {
        border: 0;
        background: ${colors.white};

        color: ${colors.main.tertiary};
        font-size: ${fonts.size.xsm};
        font-weight: 100;

        &:focus {
          background: ${colors.main.quaternary};
          color: ${colors.white};
        }
      }
    `
  }}
`

const FilterBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 9vw;
      height: 75%;
      margin: auto 0vw auto ${margins.sm};
      padding: 0vw ${paddings.base};

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

const NoticeEmptyIcon = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      margin: auto;

      grid-column: 1 / 5;
      grid-row: 2 / 3;

      color: ${colors.main.primary};
      text-align: center;

      h5 {
        font-size: ${fonts.size.xl};
        margin-bottom: ${margins.sm};
      }

      p {
        font-size: ${fonts.size.sm};
        font-weight: 100;
      }

      svg {
        width: 5vw;
        height: 5vw;

        margin-bottom: ${margins.lg};
        padding: ${paddings.xl};

        background-color: ${colors.main.secondary};
        border-radius: 20vw;

        color: ${colors.white};
      }
    `
  }}
`

export default Reservation
