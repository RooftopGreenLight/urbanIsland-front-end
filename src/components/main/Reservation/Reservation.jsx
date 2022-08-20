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
  height: 2rem;
`
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
  const [maxPrice, setMaxPrice] = useState(0)
  const [minPrice, setMinPrice] = useState(0)
  const [maxWidth, setMaxWidth] = useState(0)
  const [minWidth, setMinWidth] = useState(0)
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
        )
        setData(result)
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
            <option key={option.value} value={option.value} defaultValue={OPTIONS === option.value}>
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
  )
}
export default Reservation
