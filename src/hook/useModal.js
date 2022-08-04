import { useState } from "react"

// 화면에 띄울 모달을 자유롭게 끄고 킬 수 있는 함수와
// 모달의 상태 여부를 체크하는 변수를 return 하는 hook 생성.
const useModal = () => {
  const [modalStatus, setModalStatus] = useState(false)
  const [modalContent, setModalContent] = useState("")

  const openModal = (content = false) => {
    setModalStatus(true)
    setModalContent(content || "")
  }

  const closeModal = () => {
    setModalStatus(false)
    setModalContent("")
  }

  return { modalStatus, modalContent, openModal, closeModal }
}

export default useModal
