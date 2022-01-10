import { Box, Grid } from '@mui/material'
import { useState } from 'react'
import { AlertType } from '../../enums/alert'
import { colors } from '../../global.styles'
import AlertContainer from '../alert/alert'
import { Button, ButtonHolderTable } from '../button/button.styles'
import Modal from '../modal/Modal'
import { H2 } from '../text/text.styles'

const Examinations = () => {
  const [alert, setAlert] = useState<AlertType | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const oui = true

  const handleAlertClose = () => {
    setAlert(null)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <>
      {alert && (
        <AlertContainer
          type={alert.type}
          title={alert.type}
          message={alert.message}
          onClose={handleAlertClose}
        />
      )}
      {openModal && (
        <Modal onClose={handleCloseModal}>
          <div>modal</div>
        </Modal>
      )}
      <Box sx={{ padding: '10px 0 0 10px' }}>
        <H2>Examinations</H2>
      </Box>
      <ButtonHolderTable>
        <Button onClick={handleOpenModal}>Add an appointment</Button>
      </ButtonHolderTable>
      {oui ? (
        <Box sx={{ padding: '10px', height: 'fill' }}>
          <div>examinations</div>
        </Box>
      ) : (
        <Grid
          container
          direction={'row'}
          justifyContent={'center'}
          height={'400px'}
        >
          <h3 style={{ color: colors.secondary }}>
            No examination appointments exist
          </h3>
        </Grid>
      )}
    </>
  )
}

export default Examinations
