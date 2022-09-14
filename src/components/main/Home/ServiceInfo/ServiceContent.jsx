import { useRef } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTree, faSeedling, faTent } from "@fortawesome/free-solid-svg-icons"

import { rightToLeft } from "styles/Animation"

import bgImg1 from "assets/img/background1.jpg"
import bgImg2 from "assets/img/background2.jpg"
import bgImg3 from "assets/img/background3.jpg"

const iconList = { faTree: faTree, faSeedling: faSeedling, faTent: faTent }
const imgList = { img1: bgImg1, img2: bgImg2, img3: bgImg3 }

const ServiceContent = ({ content }) => {
  const { title, desc, bottomText, icon, img } = content
  const contentRef = useRef()

  return (
    <Wrapper ref={contentRef}>
      <IntroText>
        <h5>{title}</h5>
        <MiniDot icon={iconList[icon]} />
        <p>{desc}</p>
      </IntroText>
      <IntroImg img={imgList[img]} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 41.5vw;
  height: 95vh;
  margin: auto;
`

const MiniDot = styled(FontAwesomeIcon)`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      width: ${fonts.size.base};
      height: ${fonts.size.base};
      margin: ${margins.base} ${margins.sm};

      display: inline-block;
      color: #009e3a;

      vertical-align: bottom;
    `
  }}
`

const IntroText = styled.div`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      margin: 7.5vh auto ${margins.xl} auto;

      h5 {
        display: inline-block;
        margin: ${margins.base} 0vw;
        font-size: ${fonts.size.xl};
        font-weight: bold;
      }

      p {
        width: 80%;
        margin: 0;
        white-space: pre-wrap;

        color: #7b7b7b;
        font-size: ${fonts.size.xsm};
        font-weight: 300;
        line-height: 1.25;
      }
    `
  }}
`

const IntroImg = styled.div`
  ${({ img }) => {
    return css`
      width: 100%;
      height: 60%;

      background-image: url(${img});
      background-size: cover;
    `
  }}
`

export default ServiceContent
