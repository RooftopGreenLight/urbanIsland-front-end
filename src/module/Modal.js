import { createContext } from "react"
import ModalPortal from "components/common/Modal/ModalPortal"
import useModal from "hook/useModal"

export const ModalContext = createContext()

// Modal 관련 Context API 선언 및 Provider 선언.
// Custom Hook으로 얻은 모달 상태 및 관리 함수를 전역적으로 관리하도록 함.
export const ModalProvider = ({ children }) => {
  const { modalStatus, modalContent, openModal, closeModal } = useModal()
  return (
    <ModalContext.Provider value={{ modalStatus, modalContent, openModal, closeModal }}>
      <ModalPortal />
      {children}
    </ModalContext.Provider>
  )
}
