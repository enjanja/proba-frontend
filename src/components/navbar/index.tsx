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
          <Link
            to={`${Routes.NURSE}/${Routes.DOCTORS}`}
            style={{ width: '100%' }}
          >
            <NavSelectionItem>Doctors</NavSelectionItem>
          </Link>
          <Link
            to={`${Routes.NURSE}/${Routes.PATIENTS}`}
            style={{ width: '100%' }}
          >
            <NavSelectionItem>Patients</NavSelectionItem>
          </Link>
          <Link
            to={`${Routes.NURSE}/${Routes.EXAMINATIONS}`}
            style={{ width: '100%' }}
          >
            <NavSelectionItem>Еxaminations</NavSelectionItem>
          </Link>
        </NavSelection>
      ) : (
        <Link to={Routes.HOME}>
          <NavItem>Home</NavItem>
        </Link>
      )}
      <Link onClick={handleLogout} to={Routes.LOGIN}>
        <NavItem>Logout</NavItem>
      </Link>
    </NavbarContainer>
  )
}

export default Navbar
