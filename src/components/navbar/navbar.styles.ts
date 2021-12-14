import styled from 'styled-components'

interface NavProps {
  absolute?: boolean
}

export const NavbarContainer = styled.div<NavProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0;

  height: 40px;
  width: 100%;
  ${({ absolute }) => (absolute ? 'position: absolute' : 'position: relative')}
`

export const NavItem = styled.div`
  margin: 0 20px;
`
