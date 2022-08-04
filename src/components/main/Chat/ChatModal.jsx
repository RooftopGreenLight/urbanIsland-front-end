import { useEffect, useRef } from "react"
import styled, { css } from "styled-components"

import ModalPortal from "components/common/Modal/ModalPortal"

const ChatModal = () => {
  const modalRef = useRef()

  return (
    <ModalPortal>
      <Wrapper ref={modalRef}></Wrapper>
    </ModalPortal>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.6);
`

export default ChatModal
