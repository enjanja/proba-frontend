import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  AiOutlineCloseCircle,
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
} from 'react-icons/ai'
import { colors } from '../../global.styles'
import { AlertPorps } from '../../interfaces/propTypes'
import {
  AlertBox,
  Close,
  Message,
  ContentContainer,
  CloseContainer,
  AlertTitle,
} from './alert.styles'

const alertPortal = document.getElementById('alert-root')

const AlertContainer = ({ type, title, message, onClose }: AlertPorps) => {
  const alert = (
    <AlertBox type={type}>
      <CloseContainer>
        <Close onClick={onClose}>
          {type === 'error' && (
            <AiOutlineCloseCircle size="30px" color={colors.danger} />
          )}
          {type === 'success' && (
            <AiOutlineCheckCircle size="30px" color={colors.success} />
          )}
          {type === 'info' && (
            <AiOutlineInfoCircle size="30px" color={colors.primary} />
          )}
        </Close>
      </CloseContainer>
      <ContentContainer>
        <AlertTitle>{title}</AlertTitle>
        <Message>{message}</Message>
      </ContentContainer>
    </AlertBox>
  )

  useEffect(() => {
    setTimeout(() => {
      onClose()
    }, 4000)
  }, [])

  return <>{alertPortal ? ReactDOM.createPortal(alert, alertPortal) : null}</>
}

export default AlertContainer
