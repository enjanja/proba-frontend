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
import { ActionType } from '../../enums/action'
import EditPatient from './editPatient'
import { Box } from '@mui/system'

const Patients = () => {
  const [patients, setPatients] = useState<PatientType[]>([])
  const [selectedPatient, setSelectedPatient] = useState<PatientType | null>(
    null,
  )
  const [alert, setAlert] = useState<AlertType | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [action, setAction] = useState('')

  useEffect(() => {
    patientService
      .getAllPatients()
      .then((res) => {
        setPatients(res.data)
      })
      .catch((err) => {
        setAlert({ type: AlertMessages.ERROR, message: err.message })
      })
  }, [])

  const handleAlertClose = () => {
    setAlert(null)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
    setAction(ActionType.ADD)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
    setAction('')
  }

  const handleUpdateData = (newPatient: PatientType, alertMessage: string) => {
    const lastPatient = patients[patients.length - 1]
    newPatient.id = Number(lastPatient.id) + 1 + ''
    setPatients([...patients, newPatient])
    setAlert({ type: AlertMessages.SUCCESS, message: alertMessage })
  }

  const handleOpenEditModal = (patient: PatientType) => {
    setSelectedPatient(patient)
    setOpenModal(true)
    setAction(ActionType.EDIT)
  }

  const handleEdit = (newPatient: PatientType, alertMessage: string) => {
    console.log(newPatient)
    const newPatients = patients.map((patient) => {
      if (patient.id === newPatient.id) {
        patient.name = newPatient.name
        patient.jmbg = newPatient.jmbg
      }
      return patient
    })
    setPatients(newPatients)
    setAlert({ type: AlertMessages.SUCCESS, message: alertMessage })
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
          {action === ActionType.ADD && (
            <AddPatient
              onUpdate={handleUpdateData}
              onClose={handleCloseModal}
            />
          )}
          {action === ActionType.EDIT && selectedPatient && (
            <EditPatient
              onEdit={handleEdit}
              onClose={handleCloseModal}
              selectedPatient={selectedPatient}
            />
          )}
        </Modal>
      )}
      <Box sx={{ padding: '10px 0 0 10px' }}>
        <H2>Patients</H2>
      </Box>
      <ButtonHolderTable>
        <Button onClick={handleOpenModal}>Add Patient</Button>
      </ButtonHolderTable>
      {patients.length > 0 ? (
        <Box sx={{ padding: '10px', height: 'fill' }}>
          <TablePatients patients={patients} onEdit={handleOpenEditModal} />
        </Box>
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
