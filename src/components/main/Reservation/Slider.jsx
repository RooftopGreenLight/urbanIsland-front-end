import styled from "styled-components"
import { useState, useEffect, useLayoutEffect } from "react"
const Wrapper = styled.div`
  input[type="range"] {
    --minRangePercent: 0%;
    --maxRangePercent: 0%;
    height: 0.4rem;
  }
  input[type="range"]:invalid {
    box-shadow: none;
  }

  input[type="range"]::-webkit-slider-thumb {
  }

  .min-max-slider {
    position: relative;
    width: 200px;
    text-align: center;
    margin-bottom: 50px;
  }

  .min-max-slider::focus {
    oultine: none;
  }

  input::focus {
    outline: none;
  }

  .min-max-slider label {
    display: none;
  }

  .min-max-slider input {
    cursor: pointer;
    position: absolute;
  }

  /* webkit specific styling */
  .min-max-slider input {
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none !important;
    background: transparent;
  }
  .min-max-slider input.min {
    background-image: linear-gradient(
      to right,
      silver 0%,
      silver var(--minRangePercent),
      orange var(--minRangePercent),
      orange 100%
    );
  }

  .min-max-slider input.max {
    background-image: linear-gradient(
      to right,
      orange 0%,
      orange var(--maxRangePercent),
      silver var(--maxRangePercent),
      silver 100%
    );
  }

  .min-max-slider input::-webkit-slider-runnable-track,
  .min-max-slider input::-moz-range-track,
  .min-max-slider input::-ms-track {
    box-sizing: border-box;
    border: none;
    height: 4px;
    background: orange;
    border-radius: 8px;
    height: 10px;
    background-color: transparent;
    background-image: linear-gradient(orange, orange), linear-gradient(orange, orange);
    background-size: var(--sx) 10px, calc(100% - var(--sx)) 4px;
    background-position: left center, right center;
    background-repeat: no-repeat;
  }

  .min-max-slider input::focus {
    outline: none;
  }

  .min-max-slider input.max::-moz-range-progress {
    background: orange;
    border-radius: 4px;
  }

  .min-max-slider input.min::-moz-range-progress {
    height: 0.6em;
    background: silver;
    border-radius: 4px;
  }

  input[type="range"]::-webkit-slider-thumb,
  input[type="range"]::-moz-range-thumb {
    -webkit-appearance: none; /* Override default look */
    -moz-appearance: none;
    appearance: none;
    width: 20px; /* Set a specific slider handle width */
    height: 20px; /* Slider handle height */
    background: orange; /* Green background */
    cursor: pointer; /* Cursor on hover */
    border: none;
    color: 1px solid orange;
    border-radius: 50%;
    /* box-shadow: -205px 0 0 200px hsl(100, 100%, 40%); */
  }

  .min-max-slider input::-webkit-slider-runnable-track {
    cursor: pointer;
  }
`
var thumbsize = 1

const Slider = ({ min, max }) => {
  const [avg, setAvg] = useState((min + max) / 2)
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)

  const width = 300
  const minWidth = thumbsize + ((avg - min) / (max - min)) * (width - 2 * thumbsize)
  const minPercent = ((minVal - min) / (avg - min)) * 100
  const maxPercent = ((maxVal - avg) / (max - avg)) * 100
  const styles = {
    min: {
      width: minWidth,
      left: 0,
      "--minRangePercent": `${minPercent}%`,
    },
    max: {
      width: thumbsize + ((max - avg) / (max - min)) * (width - 2 * thumbsize),
      left: minWidth,
      "--maxRangePercent": `${maxPercent}%`,
    },
  }

  useLayoutEffect(() => {
    setAvg((maxVal + minVal) / 2)
  }, [minVal, maxVal])

  console.log(maxVal, avg, min, max, maxPercent)

  return (
    <Wrapper>
      <div
        className="min-max-slider"
        data-legendnum="2"
        data-rangemin={min}
        data-rangemax={max}
        data-thumbsize={thumbsize}
        data-rangewidth={width}>
        <label htmlFor="min">Minimum price</label>
        <input
          id="min"
          className="min"
          style={styles.min}
          name="min"
          type="range"
          step="1"
          min={min}
          max={avg}
          value={minVal}
          onChange={({ target }) => setMinVal(Number(target.value))}
        />
        <label htmlFor="max">Maximum price</label>
        <input
          id="max"
          className="max"
          style={styles.max}
          name="max"
          type="range"
          step="1"
          min={avg}
          max={max}
          value={maxVal}
          onChange={({ target }) => setMaxVal(Number(target.value))}
        />
      </div>
    </Wrapper>
  )
}
export default Slider
