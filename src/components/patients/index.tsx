import { useEffect, useState } from 'react'
import { PatientType } from '../../interfaces/dataTypes'
import { colors } from '../../global.styles'
import { Button } from '../button/button.styles'
import TablePatients from './tablePatients'
import patientService from '../../services/patientService'
import Modal from '../modal/Modal'
import AddPatient from './patientModal'
import { ActionType } from '../../enums/action'
import { toast } from 'react-toastify'
import { Content, PageHeader } from '../layout/layout.styles'

const Patients = () => {
  const [patients, setPatients] = useState<PatientType[]>([])
  const [selectedPatient, setSelectedPatient] = useState<PatientType | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [action, setAction] = useState<string | null>(null)

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
    setSelectedPatient(null)
    setAction(null)
  }

  const handleCreatePatient = (newPatient: PatientType) => {
    const lastPatient = patients[patients.length - 1]
    newPatient.id = Number(lastPatient.id) + 1 + ''
    setPatients([...patients, newPatient])
  }

  const handleOpenEditModal = (patient: PatientType) => {
    setSelectedPatient(patient)
    setOpenModal(true)
    setAction(ActionType.EDIT)
  }

  const handleUpdatePatient = (newPatient: PatientType) => {
    const newPatients = patients.map((patient) => {
      if (patient.id === newPatient.id) {
        patient.name = newPatient.name
        patient.jmbg = newPatient.jmbg
        patient.lbo = newPatient.lbo
      }
      return patient
    })
    setPatients(newPatients)
  }

  return (
    <Content>
      {openModal && (
        <Modal
          onClose={handleCloseModal}
          header={ action === ActionType.ADD ? 'Add new patient' : 'Edit patient' }
        >
          {action && (
            <AddPatient
              selectedPatient={selectedPatient}
              onCreate={handleCreatePatient}
              onUpdate={handleUpdatePatient}
              onClose={handleCloseModal}
              type={action}
            />
          )}
        </Modal>
      )}
      <PageHeader style={{ width: '200px' }}>
        <Button onClick={handleOpenModal}>Add Patient</Button>
      </PageHeader>
      {patients.length > 0 ? (
        <TablePatients patients={patients} onEdit={handleOpenEditModal} />
      ) : (
        <h3 style={{ color: colors.black }}>
          No patients found in the system
        </h3>
      )}
    </Content>
  )
}

export default Patients
