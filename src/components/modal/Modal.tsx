import { BackDrop, Header, ModalContainer } from './modal.styles'
import ReactDOM from 'react-dom'
import { SyntheticEvent } from 'react'
import { GrFormClose } from 'react-icons/gr'

interface ModalProps {
  children: React.ReactNode
  header?: React.ReactNode
  onClose: () => void
}

const style = {
  cursor: 'pointer',
}

const modalPortal = document.getElementById('modal-root')

const Modal = ({ children, header, onClose }: ModalProps) => {
  const handleEventPropagation = (event: SyntheticEvent) => {
    event.stopPropagation()
  }
  const modal = (
    <BackDrop onClick={onClose}>
      <ModalContainer onClick={handleEventPropagation}>
        {header && (
          <Header>
            {header}
            <GrFormClose onClick={onClose} style={style} />
          </Header>
        )}
        {children}
      </ModalContainer>
    </BackDrop>
  )
  return <>{modalPortal ? ReactDOM.createPortal(modal, modalPortal) : null}</>
}

export default Modal
