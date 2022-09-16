import { useRef } from "react"
import styled, { css } from "styled-components"

const GreeningContent = ({ content }) => {
  const { title, date, tel, img, url } = content
  const contentRef = useRef()

  return (
    <Wrapper ref={contentRef} imgSrc={img} onClick={() => window.open(url)}>
      <IntroText>
        <h5>{title}</h5>
        <p>{date}</p>
        <p>{tel}</p>
      </IntroText>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ imgSrc }) => {
    return css`
      width: 100%;
      height: 25vh;
      padding: 10vw auto;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${imgSrc});
      background-size: cover;
      color: #ffffff;
    `
  }}
`

const IntroText = styled.div`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      width: 85%;
      margin: auto;

      display: flex;
      flex-direction: column;
      text-align: left;

      h5 {
        margin: 0vw 0vw ${margins.base} 0vw;
        font-size: ${fonts.size.xl};
        font-weight: bold;

        &::after {
          content: ""
          width: 100%;
          border: 1px solid #ffffff;
        }
      }

      p {
        white-space: pre-wrap;

        font-size: 1.15rem;
        font-weight: 100;
        line-height: 1.3;
      }
    `
  }}
`

export default GreeningContent
