import { Box } from '@mui/system'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AlertMessages, AlertType } from '../../enums/alert'
import { addPatientValidations } from '../../fixtures/validation'
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

interface EditPatientProps {
  onEdit: (newPatient: PatientType, alertMessage: string) => void
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

  const [alert, setAlert] = useState<AlertType | null>(null)

  const onSubmit = (data: PatientType) => {
    if (
      data.name === selectedPatient.name &&
      data.jmbg === selectedPatient.jmbg
    ) {
      setAlert({
        type: AlertMessages.ERROR,
        message: 'You must edit selected patient to update their data',
      })
      return
    }

    const newData: { name: string; id: string; jmbg: string } = {
      ...data,
      id: selectedPatient.id,
    }

    patientService
      .editPatient(newData)
      .then((res) => {
        onEdit(newData, res.data)
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
            <AddDoctorInputContainer key={addPatientValidations[0].name}>
              <Label>{addPatientValidations[0].name}</Label>
              <AddDoctorInputFieldContainer>
                <Input
                  {...register('name', addPatientValidations[0].validations)}
                />
                <Error>{errors['name']?.message}</Error>
              </AddDoctorInputFieldContainer>
            </AddDoctorInputContainer>
            <AddDoctorInputContainer key={addPatientValidations[1].name}>
              <Label>{addPatientValidations[1].name}</Label>
              <AddDoctorInputFieldContainer>
                <Input
                  {...register('jmbg', addPatientValidations[1].validations)}
                />
                <Error>{errors['jmbg']?.message}</Error>
              </AddDoctorInputFieldContainer>
            </AddDoctorInputContainer>
            <ButtonSecondary>Edit</ButtonSecondary>
          </Form>
        </AddDoctorFormContainer>
      </Box>
    </>
  )
}

export default EditPatient
