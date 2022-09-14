import { useRef } from "react"
import styled, { css } from "styled-components"

const ServiceContent = ({ content }) => {
  const { title, desc, bottomText, img } = content
  const contentRef = useRef()

  return (
    <Wrapper ref={contentRef}>
      <IntroText>
        <h5>{title}</h5>
        <p>{desc}</p>
        <BottomText>
          <p>{bottomText}</p>
        </BottomText>
      </IntroText>
      <IntroImg img={img} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: auto;

  display: flex;
  justify-content: space-between;
`

const IntroText = styled.div`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      width: 30vw;
      height: 50%;
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
        margin: 0vw 0vw ${margins.base} 0vw;
        font-size: ${fonts.size.xxl};
        font-weight: bold;
      }

      p {
        width: 80%;
        margin: 0 0 1rem 0;
        white-space: pre-wrap;

        font-size: 1.2rem;
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

    border-top: 1px solid #000000;
    white-space: pre-wrap;

    font-size: 1.25rem;
    font-weight: 300;
    line-height: 1.3;
  }
`

const IntroImg = styled.div`
  ${({ img }) => {
    return css`
      width: 35%;
      height: 75%;
      margin: auto;

      background-image: url(${img});
      background-size: cover;
    `
  }}
`

export default ServiceContent
