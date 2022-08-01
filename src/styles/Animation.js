import { keyframes } from "styled-components"

import bgImg1 from "assets/img/background1.jpg"
import bgImg2 from "assets/img/background2.jpg"
import bgImg3 from "assets/img/background3.jpg"
import bgImg4 from "assets/img/background4.jpg"

export const modalShow = keyframes`
  from {
    opacity: 0;
    margin-top: -50px;
  }
  to {
    opacity: 1;
    margin-top: 0;
  }
`

export const modalBgShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const raiseText = keyframes`
  0% {
    visibility: hidden
  }
  100% {
    visibility: visible;
  }
`

export const shakeText = keyframes`
  0% {
    transform: translateX(0px);
  }

  50% {
    transform: translateX(-100px);
  }

  75% {
    transform: translateX(100px);
  }

  100% {
    transform: translateX(0px);
  }
`
export const fadeIn = keyframes`
  0% {
    opacity: 0%;
    transform: translate3d(0, 10%, 0);
  }
  100% {
    opacity: 100%;
    transform: translateZ(0);
  }
`

export const fadeInBottomText = keyframes`
  0% {
    opacity: 0%;
    transform: translate3d(0, 10%, 0);
  }
  10% {
    opacity: 100%;
    transform: translateZ(0);
  }
  100% {
    opacity: 100%;
    transform: translateZ(0);
  }
`

export const changeBackground = keyframes`
  0%, 100% {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${bgImg1});
  }
  25% {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${bgImg2});
  }
  50% {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${bgImg3});
  }
  75% {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${bgImg4});
  }

`
