import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { addPatientValidations } from '../../fixtures/validation'
import { PatientType } from '../../interfaces/dataTypes'
import patientService from '../../services/patientService'
import { ButtonSecondary } from '../button/button.styles'
import {
  AddDoctorInputContainer,
  AddDoctorInputFieldContainer,
  Form,
  Label,
} from '../form/form.styles'

interface EditPatientProps {
  onEdit: (newPatient: PatientType) => void
  onClose: () => void
  selectedPatient: PatientType
}

const EditPatient = ({
  onEdit,
  onClose,
  selectedPatient,
}: EditPatientProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { jmbg: selectedPatient.jmbg, name: selectedPatient.name },
  })

  const onSubmit = (data: PatientType) => {
    if (
      data.name === selectedPatient.name &&
      data.jmbg === selectedPatient.jmbg
    ) {
      toast.error('You must edit selected patient to update their data')
      return
    }

    const newData: { name: string; id: string; jmbg: string } = {
      ...data,
      id: selectedPatient.id,
    }

    patientService
      .editPatient(newData)
      .then((res) => {
        onEdit(newData)
        toast.success(res.data)
        onClose()
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <AddDoctorInputContainer key={addPatientValidations[0].name}>
        <Label>{addPatientValidations[0].name}</Label>
        <AddDoctorInputFieldContainer>
          <TextField
            sx={{ width: '100%' }}
            placeholder="name"
            {...register('name', addPatientValidations[0].validations)}
            error={errors.name !== undefined}
            helperText={errors?.name?.message}
          />
        </AddDoctorInputFieldContainer>
      </AddDoctorInputContainer>
      <AddDoctorInputContainer key={addPatientValidations[1].name}>
        <Label>{addPatientValidations[1].name}</Label>
        <AddDoctorInputFieldContainer>
          <TextField
            sx={{ width: '100%' }}
            placeholder="jmbg"
            {...register('jmbg', addPatientValidations[1].validations)}
            error={errors.jmbg !== undefined}
            helperText={errors?.jmbg?.message}
          />
        </AddDoctorInputFieldContainer>
      </AddDoctorInputContainer>
      <ButtonSecondary>Edit</ButtonSecondary>
    </Form>
  )
}

export default EditPatient
