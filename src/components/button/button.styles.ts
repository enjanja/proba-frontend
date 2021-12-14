import styled from 'styled-components'
import { colors } from '../../global.styles'

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

export const Button = styled.button`
  height: 40px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${colors.primary};
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

export const ButtonSecondary = styled.button`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${colors.secondary};
  color: ${colors.base};
  border: none;
  border-radius: 10px;

  font-size: 20px;

  &:hover {
    background-color: ${colors.secondaryDark};
  }

  &:active {
    background-color: ${colors.secondaryLight};
  }

  &:disabled {
    background-color: ${colors.inputBorder};
  }
`
export const TransparentButton = styled.button`
  border: none;
`
