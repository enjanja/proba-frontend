import styled from 'styled-components'
import { colors } from '../../global.styles'

interface NavProps {
  absolute?: boolean
}

export const NavbarContainer = styled.div<NavProps>`
  display: flex;
  justify-content: space-between;

  margin: 0;

  height: 50px;
  width: 100%;
`
export const NavSelection = styled.div<NavProps>`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 20%;
`

export const NavSelectionItem = styled.div<NavProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;

  &:hover {
    background-color: ${colors.primaryLight};
  }

  &:active {
    background-color: ${colors.primaryDark};
  }
`

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 20px;
`
