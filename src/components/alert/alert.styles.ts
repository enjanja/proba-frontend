import styled from 'styled-components'
import { colors } from '../../global.styles'

interface AlertBoxProp {
  type: string
}

export const AlertBox = styled.div<AlertBoxProp>`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;

  width: 300px;
  height: 90px;
  z-index: 9999;

  border-radius: 10px;
  box-shadow: 0px 0px 8px 0px ${colors.shadow};

  color: ${({ type }) => {
    if (type === 'error') {
      return colors.danger
    }
    if (type === 'success') {
      return colors.success
    }
    return colors.primary
  }};

  border: 1px solid
    ${({ type }) => {
      if (type === 'error') {
        return colors.danger
      }
      if (type === 'success') {
        return colors.success
      }
      return colors.primary
    }};
  background-color: white;
`

export const AlertTitle = styled.h2`
  margin: 0;
  margin-bottom: 10px;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Message = styled.div`
  font-size: '15px';
`
export const CloseContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 10px;
`

export const Close = styled.button`
  background-color: transparent;
  border: none;
`
