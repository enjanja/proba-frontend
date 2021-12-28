import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { PatientType } from '../../interfaces/dataTypes'
import { colors } from '../../global.styles'
import AlertContainer from '../alert/alert'
import { AlertMessages, AlertType } from '../../enums/alert'
import { Button, ButtonHolderTable } from '../button/button.styles'
import TablePatients from './tablePatients'
import patientService from '../../services/patientService'
import Modal from '../modal/Modal'
import AddPatient from './addPatient'
import { H2 } from '../text/text.styles'

const Patients = () => {
  const [patients, setPatients] = useState<PatientType[]>([])
  const jwt = localStorage.getItem('jwt') || ''
  const [alert, setAlert] = useState<AlertType | null>(null)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    patientService
      .getAllPatients(jwt)
      .then((res) => {
        setPatients(res.data)
      })
      .catch((err) => {
        setAlert({ type: AlertMessages.ERROR, message: err.response?.data })
      })
  }, [])

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
          <AddPatient />
        </Modal>
      )}
      <H2>Patients</H2>
      <ButtonHolderTable>
        <Button onClick={handleOpenModal}>Add Patient</Button>
      </ButtonHolderTable>
      {patients.length > 0 ? (
        <TablePatients patients={patients} />
      ) : (
        <Grid
          container
          direction={'row'}
          justifyContent={'center'}
          height={'400px'}
        >
          <h3 style={{ color: colors.secondary }}>
            No patients are currently with us
          </h3>
        </Grid>
      )}
    </>
  )
}

export default Patients
