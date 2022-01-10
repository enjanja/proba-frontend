import { BackDrop, Close, ModalContainer } from './modal.styles'
import ReactDOM from 'react-dom'
import { AiOutlineCloseCircle } from 'react-icons/ai'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

const modalPortal = document.getElementById('modal-root')

const Modal = ({ children, onClose }: ModalProps) => {
  const modal = (
    <BackDrop>
      <ModalContainer>
        <Close onClick={onClose}>
          {' '}
          <AiOutlineCloseCircle size="30px" />
        </Close>
        {children}
      </ModalContainer>
    </BackDrop>
  )
  return <>{modalPortal ? ReactDOM.createPortal(modal, modalPortal) : null}</>
}

export default Modal
