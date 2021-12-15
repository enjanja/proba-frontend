import {
  AppBar,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { colors } from '../global.styles'
import AddDoctor from './doctor/addDoctor'
import TableDoctors from './doctor/table/tableDoctor'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ height: '550px' }}
      {...other}
    >
      {value === index && (
        <Typography component={'span'}>{children}</Typography>
      )}
    </div>
  )
}

const BoardNurse = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Grid>
      <Container sx={{ height: '600px' }}>
        <Paper sx={{ overflow: 'hidden', height: '100%' }}>
          <AppBar sx={{ position: 'relative' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              sx={{ backgroundColor: colors.base, color: colors.primary }}
            >
              <Tab value={0} label="Doctors" />
              <Tab value={1} label="Add Doctor" />
              <Tab value={2} label="Patients" />
              <Tab value={3} label="Add Patient" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <TableDoctors />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AddDoctor />
          </TabPanel>
          <TabPanel value={value} index={2}>
            patients
          </TabPanel>
          <TabPanel value={value} index={3}>
            add patient
          </TabPanel>
        </Paper>
      </Container>
    </Grid>
  )
}

export default BoardNurse
