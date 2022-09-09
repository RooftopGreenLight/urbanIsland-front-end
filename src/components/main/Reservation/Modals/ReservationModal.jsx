import { useContext, useState, useEffect } from "react"
import styled, { css } from "styled-components"
import moment from "moment"

import Calendar from "react-calendar"
import { CalenderContainer } from "styles/calender"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"

import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import DateUtil from "util/DateUtil"
import CustomSlider from "components/main/Reservation/CustomSlider"

const ReservationModal = ({
  limitTime,
  limitCount,
  bookedDate,
  rooftopOptions,
  reservationData,
  setReservationData,
}) => {
  const [modifiedData, setModifiedData] = useState(reservationData)
  const { closeModal } = useContext(ModalContext)

  const { adultCount, kidCount, petCount, selectedDate, optionCount } = modifiedData
  const limitExtraOptionCount = rooftopOptions?.map(({ count }) => count)

  const confirmModify = () => {
    setReservationData(prevData => ({ ...prevData, ...modifiedData }))
    closeModal()
  }

  const changeCount = (option, value) => {
    if (option === "adultCount" && value < 1) {
      return
    }
    if (value >= 0 && value <= limitCount[option]) {
      setModifiedData(prevData => ({ ...prevData, [option]: value }))
    }
  }

  const changeExtraOption = (idx, value) => {
    if (value >= 0 && value <= limitExtraOptionCount[idx]) {
      optionCount[idx] = value
      setModifiedData(prevData => ({ ...prevData, optionCount }))
    }
  }

  const resetModifiedData = () => {
    setModifiedData({
      selectedDate: [new Date(), new Date()],
      selectedTime: [0, 23],
      extraOptions: {},
      adultCount: 1,
      kidCount: 0,
      petCount: 0,
      totalPrice: 0,
    })
  }

  console.log(bookedDate)

  return (
    <Wrapper>
      <ModalHeader>
        <h5>예약 조건 설정</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ViewPoint>
        <ModalContent>
          <OptionBox>
            <div className="title">
              <h5>예약 일자</h5>
              <p>옥상을 대여하려는 기간을 설정해주세요.</p>
            </div>
            <CalenderContainer>
              <Calendar
                formatDay={(_, date) => moment(date).format("DD")}
                showNeighboringMonth={false}
                minDate={new Date()}
                onChange={([startDate, endDate]) => {
                  const selectedDates = [
                    ...DateUtil.getDatesBetweenTwoDates(startDate, endDate),
                  ].map(date => date.toDateString())
                  // 만약 선택한 일자 범주에 예약 불가능한 일이 있다면, 선택을 취소함.
                  if (selectedDates.every(selectedDate => !bookedDate.has(selectedDate))) {
                    return setModifiedData(prevData => ({
                      ...prevData,
                      selectedDate: [startDate, endDate],
                    }))
                  }
                }}
                tileDisabled={({ date, view }) =>
                  view === "month" && bookedDate.has(date.toDateString())
                }
                value={selectedDate}
                selectRange={true}
                returnValue={"range"}
              />
            </CalenderContainer>
          </OptionBox>
          <OptionBox>
            <div className="title">
              <h5>예약 시간</h5>
              <p>옥상을 대여하려는 시간을 설정해주세요.</p>
            </div>
            <CustomSlider
              STEP={1}
              MIN={limitTime.startTime}
              MAX={limitTime.endTime}
              unit={":00"}
              setValue={newSelectedTime =>
                setModifiedData(prevData => ({ ...prevData, selectedTime: newSelectedTime }))
              }
              imin={limitTime.startTime}
              imax={limitTime.endTime}
            />
          </OptionBox>
          <OptionBox>
            <div className="title">
              <h5>예약 인원</h5>
              <p>옥상을 사용하려는 인원을 설정해주세요.</p>
            </div>
            <SetPersonSection>
              <h5>
                성인 <span>{`(최대 ${limitCount.adultCount} 명)`}</span>
              </h5>
              <CounterBox isDisabled={limitCount.adultCount === 0}>
                <FontAwesomeIcon
                  icon={faMinus}
                  value={adultCount}
                  onClick={() => changeCount("adultCount", adultCount - 1)}
                />
                <strong>{adultCount}</strong>
                <FontAwesomeIcon
                  icon={faPlus}
                  value={adultCount}
                  onClick={() => changeCount("adultCount", adultCount + 1)}
                />
              </CounterBox>
            </SetPersonSection>
            <SetPersonSection>
              <h5>
                유아
                <span>{` ${
                  limitCount.kidCount === 0 ? "(노 키즈 존)" : `(최대 ${limitCount.kidCount} 명)`
                }`}</span>
              </h5>
              <CounterBox isDisabled={limitCount.kidCount === 0}>
                <FontAwesomeIcon
                  icon={faMinus}
                  value={kidCount}
                  onClick={() => changeCount("kidCount", kidCount - 1)}
                />
                <strong>{kidCount}</strong>
                <FontAwesomeIcon
                  icon={faPlus}
                  value={kidCount}
                  onClick={() => changeCount("kidCount", kidCount + 1)}
                />
              </CounterBox>
            </SetPersonSection>
            <SetPersonSection>
              <h5>
                반려 동물
                <span>{` ${
                  limitCount.petCount === 0
                    ? "(반려동물 출입 금지)"
                    : `(최대 ${limitCount.petCount} 마리)`
                }`}</span>
              </h5>
              <CounterBox isDisabled={limitCount.petCount === 0}>
                <FontAwesomeIcon
                  icon={faMinus}
                  value={petCount}
                  onClick={() => changeCount("petCount", petCount - 1)}
                />
                <strong>{petCount}</strong>
                <FontAwesomeIcon
                  icon={faPlus}
                  value={petCount}
                  onClick={() => changeCount("petCount", petCount + 1)}
                />
              </CounterBox>
            </SetPersonSection>
          </OptionBox>
          {rooftopOptions?.length > 0 && (
            <OptionBox>
              <div className="title">
                <h5>추가 옵션</h5>
                <p>시설에서 지원하는 추가 옵션을 선택하세요.</p>
              </div>
              {rooftopOptions.map(({ content, count, price }, idx) => (
                <SetPersonSection key={content}>
                  <h5>
                    {content} <span>{`(${price.toLocaleString()} KRW, 최대 ${count}개)`}</span>
                  </h5>
                  <CounterBox>
                    <FontAwesomeIcon
                      icon={faMinus}
                      value={optionCount[idx]}
                      onClick={() => changeExtraOption(idx, optionCount[idx] - 1)}
                    />
                    <strong>{optionCount[idx]}</strong>
                    <FontAwesomeIcon
                      icon={faPlus}
                      value={optionCount[idx]}
                      onClick={() => changeExtraOption(idx, optionCount[idx] + 1)}
                    />
                  </CounterBox>
                </SetPersonSection>
              ))}
            </OptionBox>
          )}
          <BtnList>
            <SettingBtn onClick={resetModifiedData}>초기화</SettingBtn>
            <SettingBtn onClick={confirmModify}>적용하기</SettingBtn>
          </BtnList>
        </ModalContent>
      </ViewPoint>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      width: 33vw;
      margin: auto;

      border-radius: 0.25rem;
      background-color: ${colors.white};

      animation: ${modalShow} 0.3s;
      animation-fill-mode: forwards;
      overflow: hidden;
    `
  }}
`

const ViewPoint = styled.div`
  width: 100%;
  max-height: 80vh;
  overflow: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ::-webkit-scrollbar {
    display: none;
  }
`

const ModalHeader = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.base};

      background-color: ${colors.main.primary};

      display: flex;
      justify-content: space-between;

      color: ${colors.white};
      text-align: center;

      h5 {
        font-size: ${fonts.size.base};
        vertical-align: center;
      }
    `
  }}
`

const ModalCloseBtn = styled(FontAwesomeIcon)`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      padding: ${paddings.sm};
      color: ${colors.white};
      font-size: ${fonts.size.xsm};
    `
  }}
`

const ModalContent = styled.main`
  ${({ theme }) => {
    const { colors, paddings } = theme
    return css`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      padding: ${paddings.sm} 0vw;
      border-top: 1px solid #dee2e6;
      background-color: ${colors.white};
      text-align: center;
    `
  }}
`

const OptionBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 90%;
      margin: ${margins.base} 0vw;

      .title {
        width: 100%;
        color: ${colors.main.secondary};
        margin-bottom: ${margins.base};
      }

      h5 {
        margin: ${margins.base} 0vw ${margins.xsm} 0vw;
        font-size: ${fonts.size.sm};
        text-align: center;
      }

      p {
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: center;
      }
    `
  }}
`

const SetPersonSection = styled.div`
  ${({ theme }) => {
    const { fonts, paddings, margins } = theme
    return css`
      width: 90%;
      margin: ${margins.xsm} auto;
      padding: ${paddings.sm};

      display: flex;
      justify-content: space-between;

      h5 {
        width: 75%;
        margin: auto;
        font-size: ${fonts.size.sm};
        text-align: left;
      }

      span {
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }
    `
  }}
`

const CounterBox = styled.div`
  ${({ theme, isDisabled }) => {
    const { colors, paddings } = theme
    return css`
      width: 25%;
      margin: auto;

      background-color: ${isDisabled ? `${colors.black.quinary}33` : colors.white};
      color: ${isDisabled ? `${colors.black.secondary}88` : colors.black.secondary};
      border: 1px inset ${!isDisabled ? `${colors.main.primary}88` : `${colors.black.quinary}55`};
      border-radius: 0.25rem;

      display: flex;
      justify-content: space-between;
      align-items: center;

      svg {
        width: 25%;
        padding: ${paddings.sm};
      }
    `
  }}
`

const BtnList = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      width: 100%;
      margin: ${margins.base} auto;
      display: flex;
      justify-content: space-between;
    `
  }}
`

const SettingBtn = styled.button`
  ${({ theme }) => {
    const { colors, paddings, margins } = theme
    return css`
      width: 40%;
      padding: ${paddings.sm};
      margin: ${margins.sm} auto 0vw auto;

      background: ${colors.white};
      border: 1px solid ${colors.main.primary};
      border-radius: 2.5vw;
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: 100;

      &:hover {
        border: 0px;
        background: ${colors.main.tertiary};
        color: ${colors.white};
      }
    `
  }}
`

export default ReservationModal
