import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { colors } from '../global.styles'

const BoardDoctor = () => {
  return (
    <Grid sx={{ backgroundColor: colors.background, height: '100vh' }}>
      <Outlet />
    </Grid>
  )
}

export default BoardDoctor
