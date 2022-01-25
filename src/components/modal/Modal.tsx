import { BackDrop, ModalContainer } from './modal.styles'
import ReactDOM from 'react-dom'
import { SyntheticEvent } from 'react'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

const modalPortal = document.getElementById('modal-root')

const Modal = ({ children, onClose }: ModalProps) => {
  const handleEventPropagation = (event: SyntheticEvent) => {
    event.stopPropagation()
  }
  const modal = (
    <BackDrop onClick={onClose}>
      <ModalContainer onClick={handleEventPropagation}>
        {children}
      </ModalContainer>
    </BackDrop>
  )
  return <>{modalPortal ? ReactDOM.createPortal(modal, modalPortal) : null}</>
}

export default Modal
