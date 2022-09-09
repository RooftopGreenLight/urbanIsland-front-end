import moment from "moment"

const DateUtil = {
  getTimeFormat(selectedTime) {
    return String(selectedTime).padStart(2, "0")
  },
  getDateFormat(selectedDate) {
    return moment(selectedDate).format("YYYY.MM.DD")
  },
  createDate(dateArray) {
    const [year, month, day] = dateArray
    return new Date(year, month - 1, day)
  },
  getDatesBetweenTwoDates(startDate, endDate) {
    const date = new Date(startDate.getTime())
    const betweenDates = []
    // new Date(date) 인 이유는 deep copy를 하기 위함.
    while (date <= endDate) {
      betweenDates.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }
    return betweenDates
  },
}

export default DateUtil
