import { TextField } from '@mui/material'
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
  InputFieldWrapper,
  InputContainer,
  Form,
  Label,
} from '../form/form.styles'
import { ActionType } from '../../enums/action'
import { AxiosResponse } from 'axios'

type PatientTypeFunction = (newPatient: PatientType) => void

interface AddPatientProps {
  selectedPatient: PatientType | null
  type: string
  onCreate: PatientTypeFunction
  onUpdate: PatientTypeFunction
  onClose: () => void
}

const AddPatient = ({ selectedPatient, type, onCreate, onClose, onUpdate }: AddPatientProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: selectedPatient ? selectedPatient as PatientType : undefined
  })

  const handleCallback = (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      serviceResult: Promise<AxiosResponse<any, any>>,
      data: PatientType,
      callback: PatientTypeFunction
    ) => {
      serviceResult
        .then((res) => {
          callback(data)
          toast.success(res.data)
          onClose()
        })
        .catch((err) => {        
          toast.error(err.response?.data)
        })
  }

  const onSubmit = (data: PatientType) => {
    const newPatientData: PatientType = {
      ...data,
      id: selectedPatient ? selectedPatient.id : ''
    }
    const service = type === ActionType.ADD
      ? patientService.createPatient(newPatientData)
      : patientService.editPatient(newPatientData)
    
    if (type === ActionType.ADD) {
      handleCallback(service, newPatientData, onCreate);
    } else if (type === ActionType.EDIT && selectedPatient) {
      if (data.name === selectedPatient.name && data.lbo === selectedPatient.lbo) {
        toast.error('You must edit selected patient to update their data')
        return;
      }
      handleCallback(service, newPatientData, onUpdate);
    }
  }

  const buttonLabel = type === ActionType.ADD ? 'Create' : 'Update'

  const isDisabled = (onDisabled: boolean | ((param: string) => boolean), prop: string) => {
    return type === ActionType.EDIT && (typeof onDisabled === 'function' ? onDisabled(prop) : onDisabled)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {addPatientValidations.map((validation: AddPatientValidationType) => (
        <InputFieldWrapper key={validation.name}>
          <Label>{validation.name}</Label>
          <InputContainer>
            <TextField
              disabled={isDisabled(validation.disabled, validation.name)}
              sx={{ width: '100%' }}
              placeholder={validation.name}
              {...register(validation.name, validation.validations)}
              error={!!errors?.[validation.name]}
              helperText={errors?.[validation.name]?.message}
            />
          </InputContainer>
        </InputFieldWrapper>
      ))}
      <ButtonSecondary>{buttonLabel}</ButtonSecondary>
    </Form>
  )
}

export default AddPatient
