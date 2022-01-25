import { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import doctorService from '../../services/doctorService'
import { DoctorType } from '../../interfaces/dataTypes'
import { colors } from '../../global.styles'
import { Button, ButtonHolderTable } from '../button/button.styles'
import TableDoctors from './tableDoctor'
import AddDoctor from './addDoctor/addDoctor'
import Modal from '../modal/Modal'
import { H2 } from '../text/text.styles'
import { toast } from 'react-toastify'

const Doctor = () => {
  const [doctors, setDoctors] = useState<DoctorType[]>([])
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    doctorService
      .getAllDoctors()
      .then((res) => {
        setDoctors(res.data)
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }, [])

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleUpdateData = (newDoctor: DoctorType) => {
    const lastPatient = doctors[doctors.length - 1]
    newDoctor.id = Number(lastPatient.id) + 1 + ''
    setDoctors([...doctors, newDoctor])
  }

  return (
    <>
      {openModal && (
        <Modal onClose={handleCloseModal}>
          <AddDoctor onUpdate={handleUpdateData} onClose={handleCloseModal} />
        </Modal>
      )}
      <Box sx={{ padding: '10px 0 0 10px' }}>
        <H2>Doctors</H2>
      </Box>
      <ButtonHolderTable>
        <Button onClick={handleOpenModal}>Add doctor</Button>
      </ButtonHolderTable>
      {doctors.length > 0 ? (
        <Box sx={{ padding: '10px', height: 'fill' }}>
          <TableDoctors doctors={doctors} />
        </Box>
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
    </>
  )
}

export default Doctor
