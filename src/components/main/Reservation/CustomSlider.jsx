import { useEffect, useState } from "react"
import { Range, getTrackBackground } from "react-range"
import styled from "styled-components"
const ViewValue = styled.div`
  position: absolute;
  bottom: -28px;
  color: black;
  font-weight: bold;
  font-size: 14px;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  padding: 4px;
  border-radius: 4px;
  background-color: null;
`

const InnerDiv = styled.div`
  height: 16px;
  width: 5px;
  background-color: ${({ isDragged }) => (isDragged ? "#548BF4" : "#CCC")};
`
const ViewButton = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 6px #aaa;
`
const Line = styled.div`
  height: 5px;
  width: 100%;
  border-radius: 4px;
  align-self: center;
  background: ${({ getTrackBackground, min, max, values }) =>
    getTrackBackground({
      values,
      min,
      max,
      colors: ["#ccc", "gray", "#ccc"],
    })};
`
const Display = styled.div`
  height: 36px;
  display: flex;
  width: 100%;
`
const Wrapper = styled.div`
  padding: 0 1rem 1rem 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
const CustomSlider = ({ STEP, MIN, MAX, imin, imax, unit, setValue, flag }) => {
  const [values, setValues] = useState([imin, imax])
  useEffect(() => {
    const onChange = () => {
      setValues([imin, imax])
    }
    onChange()
  }, [flag])
  return (
    <Wrapper>
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={values => {
          setValues(values)
          setValue(values)
        }}
        renderTrack={({ props, children }) => (
          <Display
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
            }}>
            <Line
              values={values}
              min={MIN}
              max={MAX}
              getTrackBackground={getTrackBackground}
              ref={props.ref}>
              {children}
            </Line>
          </Display>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <ViewButton
            {...props}
            style={{
              ...props.style,
            }}>
            <ViewValue>{values[index] + unit}</ViewValue>
            <InnerDiv isDragged={isDragged} />
          </ViewButton>
        )}
      />
    </Wrapper>
  )
}
export default CustomSlider
