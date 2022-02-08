import {
  NavbarContainer,
  NavItem,
  NavSelection,
  NavSelectionItem,
} from './navbar.styles'
import { Routes } from '../../enums/routes'
import { Link } from '../text/text.styles'
import authService from '../../services/authService'
import doctorService from '../../services/doctorService'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import { FiLogOut, FiUserX } from 'react-icons/fi'
import { useState } from 'react'
import { FaUserMd, FaUserNurse } from 'react-icons/fa'
import { colors } from '../../global.styles'
import { toast } from 'react-toastify'

const Navbar = () => {
  const type = JSON.parse(localStorage.getItem('type') || '')
  const navigation = useNavigate()
  const location = useLocation()
  const path = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1,
  )

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = () => {
    authService.logout()
    navigation(Routes.LOGIN)
  }

  const handleDeactivate = () => {
    const handleDeactivate = async () => {
      try {
        const username = await doctorService
          .getDoctorProfile()
          .then((res) => res.data.username)
          .catch((err) => {
            toast.error(err.message)
          })

        const navigationRoute = await doctorService
          .deactivate(username)
          .then(() => Routes.LOGIN)
          .catch((err) => {
            toast.error(err.message)
          })

        if (navigationRoute) navigation(navigationRoute)
      } catch (err) {
        console.log(err)
      }
    }
    handleDeactivate()
    navigation(Routes.LOGIN)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <NavbarContainer>
      {type === 1 ? (
        <NavSelection>
          <Link
            to={`${Routes.NURSE}/${Routes.DOCTORS}`}
            style={{ width: '100%' }}
          >
            <NavSelectionItem active={path === 'doctors'}>
              Doctors
            </NavSelectionItem>
          </Link>
          <Link
            to={`${Routes.NURSE}/${Routes.PATIENTS}`}
            style={{ width: '100%' }}
          >
            <NavSelectionItem active={path === 'patients'}>
              Patients
            </NavSelectionItem>
          </Link>
          <Link
            to={`${Routes.NURSE}/${Routes.EXAMINATIONS}`}
            style={{ width: '100%' }}
          >
            <NavSelectionItem active={path === 'examinations'}>
              Еxaminations
            </NavSelectionItem>
          </Link>
        </NavSelection>
      ) : type === 2 ? (
        <NavSelection>
          <Link
            to={`${Routes.DOCTOR}/${Routes.EXAMINATIONS}`}
            style={{ width: '100%' }}
          >
            <NavSelectionItem active={path === 'examinations'}>
              Examinations
            </NavSelectionItem>
          </Link>
        </NavSelection>
      ) : (
        <Link to={Routes.HOME}>
          <NavItem>Home</NavItem>
        </Link>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar
              sx={{ width: 32, height: 32 }}
              style={{ backgroundColor: '#303036' }}
            >
              {type === 1 ? <FaUserNurse /> : <FaUserMd />}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link
          to={`${Routes.DOCTOR}/${Routes.PROFILE}`}
          style={{ width: '100%', color: 'gray' }}
        >
          <MenuItem>
            <Avatar style={{ backgroundColor: colors.primary }} /> Profile
          </MenuItem>
        </Link>
        <Divider />
        <Link
          onClick={handleLogout}
          to={Routes.LOGIN}
          style={{ color: 'gray' }}
        >
          <MenuItem>
            <ListItemIcon>
              <FiLogOut fontSize="large" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Link>
        <Link
          onClick={handleDeactivate}
          to={Routes.LOGIN}
          style={{ color: 'gray' }}
        >
          <MenuItem>
            <ListItemIcon>
              <FiUserX fontSize="large" />
            </ListItemIcon>
            Deactivate
          </MenuItem>
        </Link>
      </Menu>
    </NavbarContainer>
  )
}

export default Navbar
