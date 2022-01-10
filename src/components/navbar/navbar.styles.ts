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
  justify-content: space-around;
  height: 100%;
  width: 40%;
`

export const NavSelectionItem = styled.div<NavProps>`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: center;

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
  justify-content: center;
  height: 100%;
  margin: 0 20px;

  &:hover {
    color: ${colors.secondaryDisabled};
  }
`
