import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { ModalContext } from "module/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import DetailFilterModal from "./Modals/DetailFilterModal"
import { reservationControl } from "api/reservationControl"
import TimeFilterModal from "components/main/Reservation/Modals/TimeFilterModal"
import NumFilterModal from "components/main/Reservation/Modals/NumFilterModal"
import RegionFilterModal from "components/main/Reservation/Modals/RegionFilterModal"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import ReservationCard from "./ReservationCard"
const Button = styled.button`
  background-color: white;
  border: 1px solid black;
  padding: 0.3rem;
  border-radius: 0.5rem;
  width: 9vw;
  display: flex;
  justify-content: space-between;
  margin: 0 1rem;
`
const InnerDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 3rem;
`
const SearchBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 3.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid black;
`
const SearchResult = styled.div`
  margin: 10vh 15vw;
  display: flex;
  justify-content: center;
`
const Wrapper = styled.div``
const Reservation = () => {
  const { openModal } = useContext(ModalContext)
  const [data, setData] = useState()
  const [contentNum, setContentNum] = useState([])
  const [page, setPage] = useState(0)
  const [cond, setCond] = useState(1)
  const [kidCount, setKid] = useState(0)
  const [adultCount, setAdult] = useState(0)
  const [petCount, setPet] = useState(0)
  const [startTime, setStartTime] = useState("00:00:00")
  const [endTime, setEndTime] = useState("23:59:00")
  const [city, setCity] = useState("")
  const [district, setDistrict] = useState("")
  const [maxPrice, setMaxPrice] = useState(5000000)
  const [minPrice, setMinPrice] = useState(0)
  const [maxWidth, setMaxWidth] = useState(3333)
  const [minWidth, setMinWidth] = useState(0)
  const [type, setType] = useState("G")
  useEffect(() => {
    const getFilteredData = async event => {
      try {
        const result = await reservationControl.getRooftopSearch(
          page,
          startTime,
          endTime,
          adultCount,
          kidCount,
          petCount,
          city,
          district,
          maxPrice,
          minPrice,
          contentNum,
          maxWidth,
          minWidth,
          cond,
          type,
        )
        setData(result.rooftopResponses)
        console.log(result.rooftopResponses)
      } catch (err) {
        console.log(err.message)
      }
    }
    getFilteredData()
  }, [
    page,
    startTime,
    endTime,
    adultCount,
    kidCount,
    petCount,
    city,
    district,
    maxPrice,
    minPrice,
    contentNum,
    maxWidth,
    minWidth,
    cond,
    type,
  ])

  const handleChange = e => {
    setCond(e.target.value)
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
            onClick={() =>
              openModal(<RegionFilterModal setDistricts={setDistrict} setCitys={setCity} />)
            }>
            <span>지역 선택</span>
            <FontAwesomeIcon icon={faAngleDown} />
          </Button>
          <Button
            onClick={() =>
              openModal(<TimeFilterModal setStartTime={setStartTime} setEndTime={setEndTime} />)
            }>
            <span>시간 선택</span>
            <FontAwesomeIcon icon={faAngleDown} />
          </Button>
          <Button
            onClick={() =>
              openModal(<NumFilterModal setKids={setKid} setAdults={setAdult} setPets={setPet} />)
            }>
            <span>인원 선택</span>
            <FontAwesomeIcon icon={faAngleDown} />
          </Button>
        </InnerDiv>

        <InnerDiv>
          {" "}
          <select onChange={handleChange}>
            {OPTIONS.map(option => (
              <option
                key={option.value}
                value={option.value}
                defaultValue={OPTIONS === option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <Button
            onClick={() =>
              openModal(
                <DetailFilterModal
                  setMaxPrice={setMaxPrice}
                  setMaxWidth={setMaxWidth}
                  setMinPrice={setMinPrice}
                  setMinWidth={setMinWidth}
                  setContentNum={setContentNum}
                />,
              )
            }>
            <span>세부필터</span>
            <FontAwesomeIcon icon={faFilter} />
          </Button>
        </InnerDiv>
      </SearchBar>
      <SearchResult>
        {data ? data.map(d => <ReservationCard props={d} />) : <div>검색 결과가 없습니다</div>}
      </SearchResult>
    </Wrapper>
  )
}
export default Reservation
