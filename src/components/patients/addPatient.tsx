import { Box } from '@mui/system'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AlertMessages } from '../../enums/alert'
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

const AddPatient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const jwt = localStorage.getItem('jwt') || ''
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  // const jwt = localStorage.getItem('jwt') || ''

  // const [error, setError] = useState('')

  // useEffect(() => {
  //   specializationService
  //     .getAllSpecializations(jwt)
  //     .then((res) => {
  //       setSpecializations(res?.data)
  //     })
  //     .catch((err) => {
  //       setError(err.response?.data)
  //     })
  // }, [])

  // useEffect(() => {
  //   hospitalService
  //     .getAllHospitals(jwt)
  //     .then((res) => {
  //       setSpecializations(res?.data)
  //     })
  //     .catch((err) => {
  //       setError(err.response?.data)
  //     })
  // }, [])

  const onSubmit = (data: PatientType) => {
    console.log(data)
    data['id'] = 0

    const newData: { name: string; id: string; jmbg: string } = {
      ...data,
      id: '',
    }

    patientService
      .createPatient(newData, jwt)
      .then((res) => {
        setMessage(res.data?.message)
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  const handleCloseAlert = () => {
    setError('')
  }

  return (
    <>
      {error && (
        <AlertContainer
          type={AlertMessages.ERROR}
          title="Error"
          onClose={handleCloseAlert}
          message={error}
        />
      )}
      {message && (
        <AlertContainer
          type={AlertMessages.SUCCESS}
          title="Success"
          onClose={handleCloseAlert}
          message={error}
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
