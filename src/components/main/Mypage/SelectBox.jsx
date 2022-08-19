import { useState } from "react"
import { LOCATIONS } from "constants/Locations"
const SelectBox = ({ setDistrict, setCity }) => {
  const [options, setOptions] = useState(1)
  const handleSidoChange = e => {
    // event handler
    setCity(LOCATIONS[0][e.target.value])
    setOptions(e.target.value)
  }
  const handleGuChange = e => {
    // event handler
    setDistrict(e.target.value)
  }
  return (
    <div>
      <select onChange={handleSidoChange}>
        {LOCATIONS[0].map((d, index) => (
          <option key={index} value={index}>
            {d}
          </option>
        ))}
      </select>
      <select onChange={handleGuChange}>
        {LOCATIONS[options].map(d => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  )
}
export default SelectBox
