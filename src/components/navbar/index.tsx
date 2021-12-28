import {
  NavbarContainer,
  NavItem,
  NavSelection,
  NavSelectionItem,
} from './navbar.styles'
import { Routes } from '../../enums/routes'
import { Link } from '../text/text.styles'
import authService from '../../services/authService'
import { useNavigate } from 'react-router-dom'

type NavbarProps = {
  showProfile?: boolean
  absolute?: boolean
}

const Navbar = ({ absolute }: NavbarProps) => {
  const navigation = useNavigate()

  const type = JSON.parse(localStorage.getItem('type') || '')

  const handleLogout = () => {
    authService.logout()
    navigation(Routes.LOGIN)
  }

  return (
    <NavbarContainer absolute={absolute}>
      {type === 1 ? (
        <NavSelection>
          <NavSelectionItem>
            <Link to={`${Routes.NURSE}/${Routes.DOCTORS}`}>Doctors</Link>
          </NavSelectionItem>
          <NavSelectionItem>
            <Link to={`${Routes.NURSE}/${Routes.PATIENTS}`}>Patients</Link>
          </NavSelectionItem>
        </NavSelection>
      ) : (
        <NavItem>
          <Link to={Routes.HOME}>Home</Link>
        </NavItem>
      )}
      <NavItem>
        <Link onClick={handleLogout} to={Routes.LOGIN}>
          Logout
        </Link>
      </NavItem>
    </NavbarContainer>
  )
}

export default Navbar
