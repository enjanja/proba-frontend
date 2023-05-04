import { TextField } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { colors } from '../../global.styles'
import authService from '../../services/authService'
import { Button } from '../button/button.styles'
import {
  AddDoctorInputContainer,
  ButtonDivider,
  ButtonDividerInner,
  Form,
  InputContainerPassword,
  Label,
} from '../form/form.styles'

const UpdatePassword = ({ onCancel }: { onCancel: () => void }) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({})

  const onSubmit = ({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }) => {
    if (oldPassword === newPassword) {
      toast.error('old and new password can not be the same')
      return
    }

    authService
      .updatePassword({ oldPassword, newPassword })
      .then((res) => {
        toast.success(res.data)
        onCancel()
      })
      .catch((err) => toast.error(err.message))
  }

  const validations = {
    oldPassword: {
      required: 'This filed is required',
      minLength: {
        value: 6,
        message: 'Password must be at least 6 characters',
      },
    },
    newPassword: {
      required: 'This filed is required',
      minLength: {
        value: 6,
        message: 'Password must be at least 6 characters',
      },
    },
    confirmPassword: {
      required: 'This filed is required',
      minLength: {
        value: 6,
        message: 'Password must be at least 6 characters',
      },
      validate: (value: string) =>
        value === watch('newPassword') || 'Passwords must match',
    },
  }

  const handleChangePasswordIsVisible = () => {
    setPasswordIsVisible(!passwordIsVisible)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} id="password-form">
      <AddDoctorInputContainer>
        <Label>Current Password</Label>
        <InputContainerPassword>
          <TextField
            type={passwordIsVisible ? 'text' : 'password'}
            placeholder="Current Password"
            sx={{ width: '100%' }}
            {...register('oldPassword', validations.oldPassword)}
            error={errors?.oldPassword}
            helperText={errors?.oldPassword?.message}
          />
          <FaEye
            onClick={handleChangePasswordIsVisible}
            size={20}
            style={{
              position: 'absolute',
              right: '10px',
              top: '18px',
              color: passwordIsVisible ? colors.blue : colors.black,
            }}
          />
        </InputContainerPassword>
      </AddDoctorInputContainer>
      <AddDoctorInputContainer>
        <Label>New Password</Label>
        <InputContainerPassword>
          <TextField
            type={passwordIsVisible ? 'text' : 'password'}
            placeholder="New Password"
            sx={{ width: '100%' }}
            {...register('newPassword', validations.newPassword)}
            error={errors?.newPassword}
            helperText={errors?.newPassword?.message}
          />
          <FaEye
            onClick={handleChangePasswordIsVisible}
            size={20}
            style={{
              position: 'absolute',
              right: '10px',
              top: '18px',
              color: passwordIsVisible ? colors.blue : colors.black,
            }}
          />
        </InputContainerPassword>
      </AddDoctorInputContainer>
      <AddDoctorInputContainer>
        <Label>Confirm New Password</Label>
        <InputContainerPassword>
          <TextField
            type={passwordIsVisible ? 'text' : 'password'}
            placeholder="Confirm New Password"
            sx={{ width: '100%' }}
            {...register('confirmPassword', validations.confirmPassword)}
            error={errors?.confirmPassword}
            helperText={errors?.confirmPassword?.message}
          />
          <FaEye
            onClick={handleChangePasswordIsVisible}
            size={20}
            style={{
              position: 'absolute',
              right: '10px',
              top: '18px',
              color: passwordIsVisible ? colors.blue : colors.black,
            }}
          />
        </InputContainerPassword>
      </AddDoctorInputContainer>

      <ButtonDivider>
        <ButtonDividerInner>
          <Button
            form="update-form"
            type="button"
            backgroundColor={colors.blue}
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
        </ButtonDividerInner>{' '}
        <ButtonDividerInner>
          <Button
            type="submit"
            backgroundColor={colors.black}
            form="password-form"
          >
            Update
          </Button>
        </ButtonDividerInner>
      </ButtonDivider>
    </Form>
  )
}

export default UpdatePassword
