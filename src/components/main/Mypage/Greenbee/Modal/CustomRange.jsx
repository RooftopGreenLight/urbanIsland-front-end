import { useEffect } from "react"
import { useState } from "react"
import { Range, getTrackBackground } from "react-range"
import styled, { css } from "styled-components"

const CustomRange = ({ STEP, MIN, MAX, imin, imax, unit, setValue, minOption, maxOption }) => {
  const [values, setValues] = useState([imin, imax])
  useEffect(() => {
    setValues([imin, imax])
  }, [imin, imax])
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
            <ViewValue isDragged={isDragged}>{values[index].toLocaleString() + unit}</ViewValue>
            <InnerDiv isDragged={isDragged} />
          </ViewButton>
        )}
      />
    </Wrapper>
  )
}

const ViewValue = styled.span`
  ${({ theme, isDragged }) => {
    const { colors, fonts } = theme
    return css`
      position: absolute;
      bottom: -1.5rem;

      color: ${colors.main.primary};
      font-weight: ${isDragged ? `800` : `400`};
      font-size: ${fonts.size.xsm};
      text-align: center;

      width: 100px;
    `
  }}
`

const InnerDiv = styled.div`
  ${({ theme, isDragged }) => {
    const { colors } = theme
    return css`
      height: 12px;
      width: 12px;
      border-radius: 50%;
      background-color: ${isDragged ? `${colors.main.tertiary}` : "#CCC"};
    `
  }}
`
const ViewButton = styled.div`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      height: 1.5rem;
      width: 1.5rem;
      border-radius: 50%;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 2px 6px ${colors.main.primary}55;
    `
  }}
`
const Line = styled.div`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      height: 5px;
      width: 100%;
      border-radius: 4px;
      align-self: center;
      background: ${({ getTrackBackground, min, max, values }) =>
        getTrackBackground({
          values,
          min,
          max,
          colors: [`${colors.main.secondary}55`, `${colors.main.primary}`, "#ccc"],
        })};
    `
  }}
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
