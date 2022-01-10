import { Box } from '@mui/system'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AlertType } from '../../enums/alert'
import {
  addPatientValidations,
  AddPatientValidationType,
} from '../../fixtures/validation'
import { PatientType } from '../../interfaces/dataTypes'
import patientService from '../../services/patientService'
import AlertContainer from '../alert/alert'
import { ButtonSecondary } from '../button/button.styles'
import {
  AddDoctorFormContainer,
  AddDoctorInputContainer,
  AddDoctorInputFieldContainer,
  Form,
  Input,
  Label,
} from '../form/form.styles'
import { Error } from '../text/text.styles'

interface AddPatientProps {
  onUpdate: (newPatient: PatientType, alertMessage: string) => void
  onClose: () => void
}

const AddPatient = ({ onUpdate, onClose }: AddPatientProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [alert, setAlert] = useState<AlertType | null>(null)

  const onSubmit = (data: PatientType) => {
    const newData: { name: string; id: string; jmbg: string } = {
      ...data,
      id: '',
    }

    patientService
      .createPatient(newData)
      .then((res) => {
        onUpdate(newData, res.data)
        onClose()
      })
      .catch((err) => {
        setAlert(err.message)
      })
  }

  const handleCloseAlert = () => {
    setAlert(null)
  }

  return (
    <>
      {alert && (
        <AlertContainer
          type={alert.type}
          title={alert.type}
          message={alert.message}
          onClose={handleCloseAlert}
        />
      )}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <AddDoctorFormContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {addPatientValidations.map(
              (validation: AddPatientValidationType) => (
                <AddDoctorInputContainer key={validation.name}>
                  <Label>{validation.name}</Label>
                  <AddDoctorInputFieldContainer>
                    <Input
                      {...register(validation.name, validation.validations)}
                    />
                    <Error>{errors[validation.name]?.message}</Error>
                  </AddDoctorInputFieldContainer>
                </AddDoctorInputContainer>
              ),
            )}

            <ButtonSecondary>Create</ButtonSecondary>
          </Form>
        </AddDoctorFormContainer>
      </Box>
    </>
  )
}

export default AddPatient
