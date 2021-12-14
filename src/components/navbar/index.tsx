import { NavbarContainer, NavItem } from './navbar.styles'
import { Routes } from '../../enums/routes'
import { Link } from '../text/text.styles'

type NavbarProps = {
  showProfile?: boolean
  absolute?: boolean
}

const Navbar = ({ showProfile, absolute }: NavbarProps) => {
  return (
    <NavbarContainer absolute={absolute}>
      <NavItem>
        <Link to={Routes.HOME}>Home</Link>
      </NavItem>
      <NavItem>
        {showProfile && <Link to={Routes.PROFILE}>Profile</Link>}
      </NavItem>
    </NavbarContainer>
  )
}

export default Navbar
