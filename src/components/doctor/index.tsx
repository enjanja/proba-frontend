import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import doctorService from '../../services/doctorService'
import { DoctorType } from '../../interfaces/dataTypes'
import TableDoctors from './tableDoctor'
import AddDoctor from './addDoctor/addDoctor'
import Modal from '../modal/Modal'
import DeactivateDoctor from './deactivate/DeactivateDoctor'
import { FormControl, FormControlLabel, Checkbox } from '@mui/material'
import { colors } from '../../global.styles'
import { Button } from '../button/button.styles'
import { Content, PageHeader } from '../layout/layout.styles'
import { ButtonDividerInner } from '../form/form.styles'

const Doctor = () => {
  const [showAllDoctors, setShowAllDoctors] = useState<boolean>(false)
  const [doctors, setDoctors] = useState<DoctorType[]>([])
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalDeactivate, setOpenModalDeactivate] = useState(false)
  const [
    doctorToDeactivate,
    setDoctorToDeactivate,
  ] = useState<DoctorType | null>(null)

  useEffect(() => {
    const getDoctors = showAllDoctors
      ? doctorService.getAllDoctors
      : doctorService.getAllActiveDoctors
    getDoctors()
      .then((res) => {
        setDoctors(res.data)
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }, [showAllDoctors])

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

  const handleToggleCheckbox = () => {
    setShowAllDoctors((prev) => !prev)
  }

  const doctorsExist = doctors.length > 0

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
      <PageHeader>
        <ButtonDividerInner>
          <Button onClick={handleOpenModalAddDr}>Add doctor</Button>
        </ButtonDividerInner>
        <ButtonDividerInner>
          <FormControl style={{ marginLeft: '1.5rem' }}>
            <FormControlLabel
              control={
                <Checkbox
                  onClick={handleToggleCheckbox}
                  checked={showAllDoctors}
                  disabled={!doctorsExist}
                />
              }
              label="Show all doctors"
              labelPlacement="end"
            />
          </FormControl>
        </ButtonDividerInner>
      </PageHeader>
      {doctorsExist ? (
        <TableDoctors
          doctors={doctors}
          onDeactivate={handleOpenModalDeactivate}
        />
      ) : (
        <h3 style={{ color: colors.black }}>
          No doctors currently work with us
        </h3>
      )}
    </Content>
  )
}

export default Doctor
