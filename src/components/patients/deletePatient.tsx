import { Box, Paper } from '@mui/material'
import { useState } from 'react'
import { AlertType } from '../../enums/alert'
import AlertContainer from '../alert/alert'
import { ButtonSecondary } from '../button/button.styles'

interface DeletePatientProps {
  onDelete: () => void
  onClose: () => void
}

const DeletePatient = ({ onDelete, onClose }: DeletePatientProps) => {
  const [alert, setAlert] = useState<AlertType | null>(null)

  const handleCloseAlert = () => {
    setAlert(null)
  }

  const handleClick = () => {
    onDelete()
    onClose()
  }

  return (
    <>
      {alert && (
        <AlertContainer
          type={alert.type}
          title={alert.type}
          message={alert.message}
          onClose={handleCloseAlert}
        />
      )}
      <Paper>
        <Box sx={{ padding: '20px' }}>
          <p>Are u sure u want to delete this patient?</p>
          <ButtonSecondary onClick={handleClick}>yes</ButtonSecondary>`
        </Box>
      </Paper>
    </>
  )
}

export default DeletePatient
