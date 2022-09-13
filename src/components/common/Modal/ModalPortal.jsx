import { useContext } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

import { ModalContext } from "module/Modal"
import { modalBgShow } from "styles/Animation"

// Portal을 사용하여 HTML 트리 구조에서 벗어난 외부로부터 Modal 생성
// modalStatus를 받아와 현재 모달의 상태 여부에 따라 렌더링 결정.
const ModalPortal = () => {
  const modalRoot = document.getElementById("modal-root")
  const { modalStatus, modalContent } = useContext(ModalContext)
  if (modalStatus) {
    return ReactDOM.createPortal(
      <>
        <Wrapper onClick={preventClick}>{modalContent}</Wrapper>
      </>,
      modalRoot,
    )
  } else return null
}

const preventClick = e => {
  if (!e.target instanceof HTMLElement) {
    e.preventDefault()
  }
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: -${window.scrollY}px;
  overflow-y: scroll;
  z-index: 99;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.6);
  animation: ${modalBgShow} 1s;
`

export default ModalPortal
