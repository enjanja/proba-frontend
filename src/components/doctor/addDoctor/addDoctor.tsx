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
  AddDoctorInputContainer,
  AddDoctorInputFieldContainer,
  Form,
  Label,
} from '../../form/form.styles'
import doctorService from '../../../services/doctorService'
import HospitalsSelect from './selectHospitals'
import SelectSpecialization from './selectSpecialization'
import { toast } from 'react-toastify'
import { TextField } from '@mui/material'

interface AddDoctorProps {
  onUpdate: (newDoctor: DoctorType) => void
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
        onUpdate(newData)
        toast.success(res.data)
        onClose()
      })
      .catch((err) => {
        if (!err) {
          toast.error('Network Error')
        }
        toast.error(err.response.data)
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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {addDoctorValidations.map((validation: AddDrValidationType) => (
        <AddDoctorInputContainer key={validation.name}>
          <Label>{validation.name}</Label>
          <AddDoctorInputFieldContainer>
            <TextField
              sx={{ width: '100%' }}
              placeholder={validation.name}
              {...register(validation.name, validation.validations)}
              error={errors.username !== undefined}
              helperText={errors?.username?.message}
            />
          </AddDoctorInputFieldContainer>
        </AddDoctorInputContainer>
      ))}
      <SelectSpecialization
        specialization={specialization}
        errorSpecialization={errorSpecialization}
        onSelectSpecialization={handleSelectSpecialization}
      />
      <HospitalsSelect
        onSelectHospitals={handleSelectHospitals}
        chosenHospitals={chosenHospitals}
        errorHospital={errorHospital}
      />
      <ButtonSecondary>Create</ButtonSecondary>
    </Form>
  )
}

export default AddDoctor
