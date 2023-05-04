import styled from 'styled-components'
import { colors, colorsMap } from '../../global.styles'

interface NavProps {
  active?: boolean
}

export const NavbarContainer = styled.div<NavProps>`
  display: flex;
  justify-content: space-between;
  position: absolute;
  background: ${colors.blue};
  margin: 0;
  height: 50px;
  width: 100%;
`
export const NavSelection = styled.div<NavProps>`
  display: flex;
  height: 100%;
  width: 500px;
`

export const NavSelectionItem = styled.div<NavProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: ${({ active }) => (active ? colors.white : 'none')};
  &:hover {
    background-color: ${({ active }) =>
      active ? 'none' : colorsMap.blueHover};
  }
  color: ${({ active }) => (active ? colors.black : colors.white)};
`

export const NavItem = styled.div`
  text-align: center;
  height: 100%;
  &:hover {
    color: ${colors.hover};
  }
`
