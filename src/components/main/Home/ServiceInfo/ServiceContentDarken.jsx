import { useRef } from "react"
import styled, { css } from "styled-components"

const ServiceContentDarken = ({ content }) => {
  const { title, desc, bottomText, img } = content
  const contentRef = useRef()

  return (
    <Wrapper ref={contentRef} imgSrc={img}>
      <IntroText>
        <h5>{title}</h5>
        <p>{desc}</p>
        <BottomText>
          <p>{bottomText}</p>
        </BottomText>
      </IntroText>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ imgSrc }) => {
    return css`
      width: 100%;
      height: 100vh;
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
      width: 30%;
      margin: auto auto auto 15vw;

      display: flex;
      flex-direction: column;

      span {
        width: 100%;
        font-size: ${fonts.size.sm};
        font-weight: 100;
      }

      h5 {
        display: inline-block;
        margin: ${margins.base} 0vw;
        font-size: ${fonts.size.xxl};
        font-weight: bold;
      }

      p {
        width: 80%;
        margin: 0 0 1rem 0;
        white-space: pre-wrap;

        font-size: 1.15rem;
        font-weight: 100;
        line-height: 1.3;
      }
    `
  }}
`

const BottomText = styled.div`
  margin: 1rem 0vw;

  p {
    padding-top: 1rem;
    margin: 0;
    display: inline;

    border-top: 1px solid #ffffff;
    white-space: pre-wrap;

    font-size: 1.25rem;
    font-weight: 300;
    line-height: 1.3;
  }
`

export default ServiceContentDarken
