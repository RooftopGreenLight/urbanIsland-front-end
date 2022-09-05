import { useEffect, useState } from "react"
import { Range, getTrackBackground } from "react-range"
import styled from "styled-components"

const CustomRange = ({
  STEP,
  MIN,
  MAX,
  imin,
  imax,
  unit,
  setValue,
  minOption,
  maxOption,
  flag,
}) => {
  const [values, setValues] = useState([imin, imax])
  useEffect(() => {
    const onChange = () => {
      setValues([MIN, MAX])
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
          setValue(prev => ({ ...prev, [minOption]: values[0], [maxOption]: values[1] }))
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
            <ViewValue>{values[index].toLocaleString() + unit}</ViewValue>
            <InnerDiv isDragged={isDragged} />
          </ViewButton>
        )}
      />
    </Wrapper>
  )
}

const ViewValue = styled.p`
  position: absolute;
  bottom: -20px;

  color: black;
  font-weight: 400;
  font-size: 12px;
  text-align: center;

  width: 100px;
  border-radius: 4px;
`

const InnerDiv = styled.div`
  height: 12px;
  width: 4px;
  background-color: ${({ isDragged }) => (isDragged ? "#548BF4" : "#CCC")};
`
const ViewButton = styled.div`
  height: 1.5rem;
  width: 1.5rem;
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

export default CustomRange
