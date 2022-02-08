import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Routes } from '../../enums/routes'
import { LoginData } from '../../interfaces/dataTypes'
import { LoginFormData } from '../../interfaces/propTypes'
import { Content, Wrapper } from '../../components/layout/layout.styles'
import {
  Form,
  FormContainer,
  InputContainer,
} from '../../components/form/form.styles'
import { H2 } from '../../components/text/text.styles'
import { Button } from '../../components/button/button.styles'
import { FiUser } from 'react-icons/fi'
import ClipLoader from 'react-spinners/ClipLoader'
import { useAuth } from '../../hooks/authHook'
import { FaEye } from 'react-icons/fa'
import { colors } from '../../global.styles'
import {
  passwordValidation,
  usernameValidation,
} from '../../fixtures/validation'
import { toast } from 'react-toastify'
import { TextField } from '@mui/material'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ defaultValues: { username: '', password: '' } })

  const [isLoading, setIsLoading] = useState(false)
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)

  const { login } = useAuth()
  const navigation = useNavigate()

  const onSubmit = (data: LoginData) => {
    login(
      data,
      () => setIsLoading(false),
      () => {
        navigation(Routes.HOME)
      },
      (err: string) => {
        toast.error(err)
      },
    )
  }

  const handleChangePasswordIsVisible = () => {
    setPasswordIsVisible(!passwordIsVisible)
  }

  return (
    <Content>
      <Wrapper>
        <FormContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <H2>
              <FiUser size="30px" />
            </H2>
            <InputContainer>
              <TextField
                placeholder="Username"
                sx={{ width: '100%' }}
                {...register('username', usernameValidation)}
                error={errors.username !== undefined}
                helperText={errors?.username?.message}
              />
            </InputContainer>
            <InputContainer>
              <TextField
                type={passwordIsVisible ? 'text' : 'password'}
                placeholder="Password"
                sx={{ width: '100%' }}
                {...register('password', passwordValidation)}
                error={errors.password !== undefined}
                helperText={errors?.password?.message}
              />
              <FaEye
                onClick={handleChangePasswordIsVisible}
                size={20}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '18px',
                  color: passwordIsVisible ? colors.primary : colors.secondary,
                }}
              />
            </InputContainer>
            <Button>
              {isLoading ? <ClipLoader color="white" size="20px" /> : 'Login'}
            </Button>
          </Form>
        </FormContainer>
      </Wrapper>
    </Content>
  )
}

export default Login
