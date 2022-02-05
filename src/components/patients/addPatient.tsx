import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import {
  addPatientValidations,
  AddPatientValidationType,
} from '../../fixtures/validation'
import { PatientType } from '../../interfaces/dataTypes'
import patientService from '../../services/patientService'
import { ButtonSecondary } from '../button/button.styles'
import {
  AddDoctorFormContainer,
  AddDoctorInputContainer,
  AddDoctorInputFieldContainer,
  Form,
  Label,
} from '../form/form.styles'

interface AddPatientProps {
  onUpdate: (newPatient: PatientType) => void
  onClose: () => void
}

const AddPatient = ({ onUpdate, onClose }: AddPatientProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: PatientType) => {
    const newData: { name: string; id: string; jmbg: string } = {
      ...data,
      id: '',
    }

    patientService
      .createPatient(newData)
      .then((res) => {
        onUpdate(newData)
        toast.success(res.data)
        onClose()
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <AddDoctorFormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {addPatientValidations.map((validation: AddPatientValidationType) => (
            <AddDoctorInputContainer key={validation.name}>
              <Label>{validation.name}</Label>
              <AddDoctorInputFieldContainer>
                <TextField
                  sx={{ width: '100%' }}
                  placeholder={validation.name}
                  {...register(validation.name, validation.validations)}
                  error={errors.name !== undefined}
                  helperText={errors?.name?.message}
                />
              </AddDoctorInputFieldContainer>
            </AddDoctorInputContainer>
          ))}

          <ButtonSecondary>Create</ButtonSecondary>
        </Form>
      </AddDoctorFormContainer>
    </Box>
  )
}

export default AddPatient
