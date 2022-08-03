import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTree, faSeedling, faTent } from "@fortawesome/free-solid-svg-icons"

import { rightToLeft } from "styles/Animation"

import bgImg1 from "assets/img/background1.jpg"
import bgImg2 from "assets/img/background2.jpg"
import bgImg3 from "assets/img/background3.jpg"
import { useEffect, useRef } from "react"

const iconList = { faTree: faTree, faSeedling: faSeedling, faTent: faTent }
const imgList = { img1: bgImg1, img2: bgImg2, img3: bgImg3 }

// scroll 이벤트 최적화를 위한 debounce 함수 선언
const debounce = (callback, delay) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(...args), delay)
  }
}

const InfoContent = ({ content }) => {
  const { title, desc, icon, img } = content
  const contentRef = useRef()

  const runningAnimate = () => {
    const currentScrollY = parseInt(window.scrollY + window.innerHeight * 0.9)
    const contentYOffset = parseInt(contentRef.current.offsetTop)
    // 현재 viewport 하단이 해당 컴포넌트 상단 영역보다 아래인지를 체크.
    // 만약 애니메이션이 실행되었다면 window에 할당된 이벤트 제거.
    if (contentYOffset < currentScrollY) {
      contentRef.current.style.animationPlayState = "running"
      window.removeEventListener("scroll", checkCurrentYOffset)
    }
  }

  const checkCurrentYOffset = debounce(runningAnimate, 100)

  // mount 시 window에 scroll 이벤트를 걸고, unmount 시 이벤트 제거
  useEffect(() => {
    window.addEventListener("scroll", checkCurrentYOffset)
    return () => {
      window.removeEventListener("scroll", checkCurrentYOffset)
    }
  }, [])

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

  opacity: 0;

  margin: auto;
  animation: ${rightToLeft} 1s;
  animation-play-state: paused;
  animation-fill-mode: forwards;
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
    const { colors, fonts, margins } = theme
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

export default InfoContent
