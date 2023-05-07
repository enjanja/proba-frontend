import styled from 'styled-components'
import { colors, colorsMap, colorsNames } from '../../global.styles'

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`
interface ButtonProps {
  backgroundColor?: string
  color?: string
}

export const Button = styled.button<ButtonProps>`
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor || colors.black};
  color: ${colors.white};
  border: none;
  border-radius: 10px;
  font-size: 18px;
  &:hover {
    background-color: ${({ backgroundColor }) =>
      backgroundColor
        ? colorsMap[`${colorsNames[backgroundColor]}Hover`]
        : colorsMap.blackHover};
  }
  &:active {
    background-color: ${({ backgroundColor }) =>
      backgroundColor
        ? colorsMap[`${colorsNames[backgroundColor]}Active`]
        : colorsMap.blackActive};
  }
  &:disabled {
    background-color: ${({ backgroundColor }) =>
      backgroundColor
        ? colorsMap[`${colorsNames[backgroundColor]}Disabled`]
        : colorsMap.blackActive};
  }
`

export const ButtonSecondary = styled(Button)`
  width: 100%;
  margin-top: 20px;
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
