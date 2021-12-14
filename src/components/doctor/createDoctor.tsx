import { Box } from '@mui/system'
import { useForm } from 'react-hook-form'
import { UserType } from '../../interfaces/dataTypes'
import { ButtonSecondary } from '../button/button.styles'
import {
  AddDoctorFormContainer,
  AddDoctorInputContainer,
  AddDoctorInputFieldContainer,
  Form,
  Input,
  Label,
} from '../form/form.styles'

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: UserType) => {
    console.log(data)

    setTimeout(() => {}, 5000)
  }

  return (
    <Box>
      <AddDoctorFormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <AddDoctorInputContainer>
            <Label>Full Name</Label>
            <AddDoctorInputFieldContainer>
              <Input {...register('fullName')} />
            </AddDoctorInputFieldContainer>
          </AddDoctorInputContainer>
          <AddDoctorInputContainer>
            <Label>Userame</Label>
            <AddDoctorInputFieldContainer>
              <Input {...register('username')} />
            </AddDoctorInputFieldContainer>
          </AddDoctorInputContainer>
          <AddDoctorInputContainer>
            <Label>Password</Label>
            <AddDoctorInputFieldContainer>
              <Input type="password" {...register('password')} />
            </AddDoctorInputFieldContainer>
          </AddDoctorInputContainer>
          <AddDoctorInputContainer>
            <Label>Specialization</Label>
            <AddDoctorInputFieldContainer>
              <Input {...register('specialization')} />
            </AddDoctorInputFieldContainer>
          </AddDoctorInputContainer>
          <ButtonSecondary>Update</ButtonSecondary>
        </Form>
      </AddDoctorFormContainer>
    </Box>
  )
}

export default AddDoctor
