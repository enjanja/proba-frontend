import { Autocomplete, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  DoctorType,
  ExaminationTypeForAxios,
  HospitalType,
  PatientType,
} from '../../interfaces/dataTypes'
import { Form, ButtonDivider, ButtonDividerInner } from '../form/form.styles'
import { Button } from '../button/button.styles'
import { Controller } from 'react-hook-form'
import patientService from '../../services/patientService'
import doctorService from '../../services/doctorService'
import { toast } from 'react-toastify'
import { colors } from '../../global.styles'

interface AddExaminationProps {
  onClose: () => void
  onCreate: (newExam: ExaminationTypeForAxios) => void
  doctor: DoctorType | null
  hospital: HospitalType | null
  date: Date | null
  interval: string
}

const AddExamination = ({
  onClose,
  onCreate,
  doctor,
  date,
  hospital,
  interval,
}: AddExaminationProps) => {
  const { handleSubmit, control } = useForm()
  const [patients, setPatients] = useState<PatientType[]>([])

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

  const onSubmit = (data: { patient: PatientType }) => {
    if (!data.patient) {
      return
    }

    if (data && date && doctor && hospital) {
      const newPatient = {
        id: data.patient.id,
        jmbg: data.patient.jmbg,
        name: data.patient.name,
      }
      // ovde new date
      const year = date?.getFullYear()
      const month = date?.getMonth()
      const day = date?.getDate()
      const parts = interval.split(':')
      const hour = Number(parts[0])
      const minute = Number(parts[1])
      const newDate = new Date(year, month, day, hour + 2, minute) // hour + 2 because it looses that 2 hous for some reason

      const newData: ExaminationTypeForAxios = {
        id: {
          doctorId: doctor.id as string,
          patientId: data.patient.id,
          dateTime: newDate.toISOString(),
        },
        patient: newPatient,
        doctor: doctor,
        diagnosis: '',
      }

      doctorService
        .createExam(newData, hospital.id.toString())
        .then((res) => {
          onCreate(newData)
          toast.success(res.data)
        })
        .catch((err) => toast.error(err.response.data))
        .finally(() => onClose && onClose())
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field: { value, onChange } }) => (
          <Autocomplete
            freeSolo
            options={patients}
            getOptionLabel={(option: PatientType) => option.name}
            renderOption={(
              props: React.HTMLAttributes<HTMLLIElement>,
              option: PatientType,
            ) => (
              <Box component="li" {...props} key={option.id}>
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Select a patient" value={value} />
            )}
            onChange={(_, data) => onChange(data)}
          />
        )}
        name="patient"
        control={control}
      />
      <ButtonDivider>
        <ButtonDividerInner>
          <Button onClick={onClose} type="button" backgroundColor={colors.blue}>
            Cancel
          </Button>
        </ButtonDividerInner>
        <ButtonDividerInner>
          <Button backgroundColor={colors.black}>Create</Button>
        </ButtonDividerInner>
      </ButtonDivider>
    </Form>
  )
}

export default AddExamination
