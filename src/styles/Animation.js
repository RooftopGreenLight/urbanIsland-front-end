import { keyframes } from "styled-components"
export const modalShow = keyframes`
 from {
  opacity: 0;
  margin-top: -50px;
}
to {
  opacity: 1;
  margin-top: 0;
}`

export const modalBgShow = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
}`
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
