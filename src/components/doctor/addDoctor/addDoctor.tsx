import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  addDoctorValidations,
  AddDrValidationType,
} from '../../../fixtures/validation'
import {
  DoctorType,
  HospitalType,
  SpecializationType,
} from '../../../interfaces/dataTypes'
import { ButtonSecondary } from '../../button/button.styles'
import {
  AddDoctorFormContainer,
  AddDoctorInputContainer,
  AddDoctorInputFieldContainer,
  Form,
  Input,
  Label,
} from '../../form/form.styles'
import { Error } from '../../text/text.styles'
import doctorService from '../../../services/doctorService'
import HospitalsSelect from './selectHospitals'
import { AlertMessages, AlertType } from '../../../enums/alert'
import AlertContainer from '../../alert/alert'
import SelectSpecialization from './selectSpecialization'

interface AddDoctorProps {
  onUpdate: (newDoctor: DoctorType, alertMessage: string) => void
  onClose: () => void
}

const AddDoctor = ({ onUpdate, onClose }: AddDoctorProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [specialization, setSpecialization] = useState<SpecializationType>({
    name: '',
    id: 0,
  })
  const [errorSpecialization, setErrorSpecialization] = useState('')
  const [chosenHospitals, setChosenHospitals] = useState<HospitalType[]>([])
  const [errorHospital, setErrorHospital] = useState('')
  const [alert, setAlert] = useState<AlertType | null>(null)

  const onSubmit = (data: DoctorType) => {
    if (specialization.name === '') {
      setErrorSpecialization('You must select a specialization')
      return
    }
    if (chosenHospitals.length === 0) {
      setErrorHospital('You must select a hospital')
      return
    }

    const doctorData = {
      ...data,
      hospitals: chosenHospitals,
      specialization: specialization,
    }

    const newData: DoctorType = {
      ...doctorData,
      id: '',
      active: true,
      examinations: [],
    }

    doctorService
      .createDoctor(newData)
      .then((res) => {
        onUpdate(newData, res.data)
        onClose()
      })
      .catch((err) => {
        if (!err) {
          setAlert({ type: AlertMessages.ERROR, message: 'Network Error' })
        }
        setAlert({ type: AlertMessages.ERROR, message: err.message })
      })
      .finally(() => {
        setErrorSpecialization('')
        setErrorHospital('')
      })
  }

  const handleSelectSpecialization = (spec: SpecializationType) => {
    setSpecialization(spec)
  }

  const handleSelectHospitals = (hospital: HospitalType) => {
    const hosps = [...chosenHospitals]
    const index = hosps.indexOf(hospital)
    if (index !== -1) {
      hosps.splice(index, 1)
      setChosenHospitals(() => hosps)
    } else setChosenHospitals((prev: HospitalType[]) => [...prev, hospital])
  }

  const handleSetError = (err: string) => {
    setAlert({ type: AlertMessages.ERROR, message: err })
  }

  const handleCloseAlert = () => {
    setAlert(null)
  }

  return (
    <>
      {alert && (
        <AlertContainer
          title={alert.type}
          type={alert.type}
          message={alert.message}
          onClose={handleCloseAlert}
        />
      )}
      <AddDoctorFormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {addDoctorValidations.map((validation: AddDrValidationType) => (
            <AddDoctorInputContainer key={validation.name}>
              <Label>{validation.name}</Label>
              <AddDoctorInputFieldContainer>
                <Input {...register(validation.name, validation.validations)} />
                <Error>{errors[validation.name]?.message}</Error>
              </AddDoctorInputFieldContainer>
            </AddDoctorInputContainer>
          ))}

          <SelectSpecialization
            specialization={specialization}
            onError={handleSetError}
            errorSpecialization={errorSpecialization}
            onSelectSpecialization={handleSelectSpecialization}
          />

          <HospitalsSelect
            onSelectHospitals={handleSelectHospitals}
            chosenHospitals={chosenHospitals}
            onError={handleSetError}
            errorHospital={errorHospital}
          />

          <ButtonSecondary>Create</ButtonSecondary>
        </Form>
      </AddDoctorFormContainer>
    </>
  )
}

export default AddDoctor
