import { Autocomplete, Stack, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  DoctorType,
  ExaminationTypeForAxios,
  HospitalType,
  PatientType,
} from '../../interfaces/dataTypes'
import { ButtonSecondary } from '../button/button.styles'
import { Controller } from 'react-hook-form'
import patientService from '../../services/patientService'
import doctorService from '../../services/doctorService'
import { toast } from 'react-toastify'
import { AddExaminationContainer, Form } from '../form/form.styles'
import { colors } from '../../global.styles'

interface AddExaminationProps {
  onClose?: () => void
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

    const newPatient = {
      id: data.patient.id,
      jmbg: data.patient.jmbg,
      name: data.patient.name,
    }

    if (data && date && doctor && hospital) {
      // ovde pravimo novi datum
      const year = date?.getFullYear()
      const month = date?.getMonth()
      const day = date?.getDate()

      const parts = interval.split(':')
      const hour = Number(parts[0])
      const minute = Number(parts[1])

      const newDate = new Date(year, month, day, hour + 1, minute) // ovde dodajemo + 1  da bi dobro prikazivao vreme
      // jer smanji za po 1

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
    <AddExaminationContainer>
      <h3>Add an appointment</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
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
                  <TextField {...params} label="Patient" value={value} />
                )}
                onChange={(_, data) => onChange(data)}
              />
            )}
            defaultValue={patients[0]}
            name="patient"
            control={control}
          />
          <ButtonSecondary>Create</ButtonSecondary>
        </Stack>
      </Form>
      <ButtonSecondary color={colors.secondaryDisabled} onClick={onClose}>
        Cancel
      </ButtonSecondary>
    </AddExaminationContainer>
  )
}

export default AddExamination
