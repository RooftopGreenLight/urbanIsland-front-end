import styled, { css } from "styled-components"

import { fadeInBottomText } from "styles/Animation"
import { MainPageBottomText } from "constants/MainPageBottomText"
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
    setTimeout(changeTextIdx, 1000)
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
      width: 23.5%;
      margin: ${margins.xl} auto;

      color: ${colors.white};
      opacity: 0%;

      animation: ${fadeInBottomText} 10s 1s infinite;
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
