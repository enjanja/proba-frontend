import { useEffect, useState } from 'react'
import { Grid, Paper } from '@mui/material'
import doctorService from '../../services/doctorService'
import { DoctorType } from '../../interfaces/dataTypes'
import { colors } from '../../global.styles'
import { Button, ButtonHolderTable } from '../button/button.styles'
import TableDoctors from './tableDoctor'
import AddDoctor from './addDoctor/addDoctor'
import Modal from '../modal/Modal'
import { toast } from 'react-toastify'
import { Content } from '../layout/layout.styles'
import DeactivateDoctor from './deactivate/DeactivateDoctor'

const Doctor = () => {
  const [doctors, setDoctors] = useState<DoctorType[]>([])
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalDeactivate, setOpenModalDeactivate] = useState(false)
  const [
    doctorToDeactivate,
    setDoctorToDeactivate,
  ] = useState<DoctorType | null>(null)

  useEffect(() => {
    doctorService
      .getAllActiveDoctors()
      .then((res) => {
        setDoctors(res.data)
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }, [])

  const handleOpenModalAddDr = () => {
    setOpenModalAdd(true)
  }
  const handleCloseModalAddDr = () => {
    setOpenModalAdd(false)
  }

  const handleOpenModalDeactivate = (doctor: DoctorType) => {
    setDoctorToDeactivate(doctor)
    setOpenModalDeactivate(true)
  }
  const handleCloseModalDeactivate = () => {
    setOpenModalDeactivate(false)
  }

  const handleUpdateData = (newDoctor: DoctorType) => {
    const lastPatient = doctors[doctors.length - 1]
    newDoctor.id = Number(lastPatient.id) + 1 + ''
    setDoctors([...doctors, newDoctor])
  }

  const handleDeactivate = () => {
    if (doctorToDeactivate) {
      doctorService
        .deactivate(doctorToDeactivate.username)
        .then((res) => {
          const newDoctors = doctors.filter(
            (d) => d.id !== doctorToDeactivate.id,
          )
          setDoctors(newDoctors)
          toast.success(res.data)
        })
        .catch((err) => toast.error(err.message))
        .finally(() => handleCloseModalDeactivate())
    }
  }

  return (
    <Content>
      {openModalAdd && (
        <Modal onClose={handleCloseModalAddDr}>
          <AddDoctor
            onUpdate={handleUpdateData}
            onClose={handleCloseModalAddDr}
          />
        </Modal>
      )}
      {openModalDeactivate && (
        <Modal onClose={handleCloseModalDeactivate}>
          <DeactivateDoctor
            onClose={handleCloseModalDeactivate}
            onDeactivate={handleDeactivate}
            doctor={doctorToDeactivate}
          />
        </Modal>
      )}

      <Paper
        sx={{
          width: '80%',
        }}
      >
        <ButtonHolderTable>
          <div style={{ maxWidth: '200px' }}>
            <Button onClick={handleOpenModalAddDr}>Add doctor</Button>
          </div>
        </ButtonHolderTable>
        {doctors.length > 0 ? (
          <TableDoctors
            doctors={doctors}
            onDeactivate={handleOpenModalDeactivate}
          />
        ) : (
          <Grid
            container
            direction={'row'}
            justifyContent={'center'}
            height={'400px'}
          >
            <h3 style={{ color: colors.secondary }}>
              No doctors currently work with us
            </h3>
          </Grid>
        )}
      </Paper>
    </Content>
  )
}

export default Doctor
