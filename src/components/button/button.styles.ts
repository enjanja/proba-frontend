import styled from 'styled-components'
import { colors } from '../../global.styles'

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

export const Button = styled.button<SeccondaryButtonProps>`
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${({ color }) => (color ? color : colors.primary)};
  color: ${colors.base};
  border: none;
  border-radius: 10px;

  font-size: 20px;

  &:hover {
    background-color: ${colors.primaryDark};
  }

  &:active {
    background-color: ${colors.primaryLight};
  }
`
interface SeccondaryButtonProps {
  color?: string
}

export const ButtonSecondary = styled(Button)`
  width: 100%;
  margin-top: 20px;

  background-color: ${({ color }) => (color ? color : colors.secondary)};

  &:hover {
    background-color: ${({ color }) => (color ? null : colors.secondaryDark)};
  }

  &:active {
    background-color: ${({ color }) => (color ? null : colors.secondaryLight)};
  }

  &:disabled {
    background-color: ${colors.inputBorder};
  }
`

export const TransparentButton = styled.button`
  border: none;
  display: flex;
  align-content: center;
  background-color: transparent;
`
export const ButtonHolderTable = styled.div`
  padding: 10px;
`
export const ButtonHolderTableItem = styled.div`
  margin-right: 10px;
`
