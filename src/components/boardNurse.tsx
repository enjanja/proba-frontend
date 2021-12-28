import { Grid } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import { Routes } from '../enums/routes'
import { colors } from '../global.styles'
import Doctor from './doctor'

const BoardNurse = () => {
  const location = useLocation()
  const isRootDashboard = location.pathname === Routes.NURSE

  return (
    <Grid sx={{ backgroundColor: colors.base }}>
      {isRootDashboard ? <Doctor /> : <Outlet />}
    </Grid>
  )
}

export default BoardNurse
