import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { PatientType } from '../../interfaces/dataTypes'
import { colors } from '../../global.styles'
import { Button, ButtonHolderTable } from '../button/button.styles'
import TablePatients from './tablePatients'
import patientService from '../../services/patientService'
import Modal from '../modal/Modal'
import AddPatient from './addPatient'
import { ActionType } from '../../enums/action'
import EditPatient from './editPatient'
import { Box } from '@mui/system'
import { toast } from 'react-toastify'

const Patients = () => {
  const [patients, setPatients] = useState<PatientType[]>([])
  const [selectedPatient, setSelectedPatient] = useState<PatientType | null>(
    null,
  )
  const [openModal, setOpenModal] = useState(false)
  const [action, setAction] = useState('')

  useEffect(() => {
    patientService
      .getAllPatients()
      .then((res) => {
        setPatients(res.data)
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }, [])

  const handleOpenModal = () => {
    setOpenModal(true)
    setAction(ActionType.ADD)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
    setAction('')
  }

  const handleUpdateData = (newPatient: PatientType) => {
    const lastPatient = patients[patients.length - 1]
    newPatient.id = Number(lastPatient.id) + 1 + ''
    setPatients([...patients, newPatient])
  }

  const handleOpenEditModal = (patient: PatientType) => {
    setSelectedPatient(patient)
    setOpenModal(true)
    setAction(ActionType.EDIT)
  }

  const handleEdit = (newPatient: PatientType) => {
    const newPatients = patients.map((patient) => {
      if (patient.id === newPatient.id) {
        patient.name = newPatient.name
        patient.jmbg = newPatient.jmbg
      }
      return patient
    })
    setPatients(newPatients)
  }

  return (
    <div style={{ paddingTop: '50px' }}>
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
      <ButtonHolderTable>
        <div style={{ maxWidth: '200px' }}>
          <Button onClick={handleOpenModal}>Add Patient</Button>
        </div>
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
    </div>
  )
}

export default Patients
