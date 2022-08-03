import styled, { css } from "styled-components"

import { fadeInBottomText } from "styles/Animation"
import { MainPageBottomText } from "constants/MainPageInformation"
import { useEffect, useRef, useState } from "react"

const HomeBottomText = () => {
  const textSection = useRef()
  const [textIdx, setTextIdx] = useState(0)
  useEffect(() => {
    const changeTextIdx = () => {
      setInterval(() => {
        setTextIdx(prev => (prev === MainPageBottomText.length - 1 ? 0 : prev + 1))
      }, 10000)
    }
    changeTextIdx()
  }, [])
  return (
    <Wrapper ref={textSection}>
      <h5>{MainPageBottomText[textIdx].title}</h5>
      <p>{MainPageBottomText[textIdx].desc}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 27.5%;
      margin: ${margins.xl} auto;
      color: ${colors.white};

      position: relative;
      bottom: -12.5vw;

      animation: ${fadeInBottomText} 10s infinite;
      animation-fill-mode: forwards;
      
      h5 {
        font-size: ${fonts.size.base};
      }
      
      p {
        font-weight: 100;
        font-size: ${fonts.size.xsm};
      }
    `
  }}
`

export default HomeBottomText
