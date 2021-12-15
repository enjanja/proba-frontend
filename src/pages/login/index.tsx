import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Routes } from '../../enums/routes'
import { LoginData } from '../../interfaces/dataTypes'
import { LoginFormData } from '../../interfaces/propTypes'
import { Wrapper } from '../../components/layout/layout.styles'
import {
  Form,
  FormContainer,
  Input,
  InputContainer,
} from '../../components/form/form.styles'
import { Error, H2 } from '../../components/text/text.styles'
import { Button } from '../../components/button/button.styles'
import { FiUser } from 'react-icons/fi'
import ClipLoader from 'react-spinners/ClipLoader'
import AlertContainer from '../../components/alert/alert'
import { useAuth } from '../../hooks/authHook'
import { FaEye } from 'react-icons/fa'
import { colors } from '../../global.styles'

const usernameValidation = {
  required: 'This field is required',
  minLength: {
    value: 6,
    message: 'Username must have at least 6 characters',
  },
}
const passwordValidation = {
  required: 'This field is required',
  minLength: {
    value: 6,
    message: 'Password must have at least 6 characters',
  },
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const [error, setError] = useState('')
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
        setIsLoading(true)
      },
      (err: string) => {
        console.log(err)
        setIsLoading(true)
        setError(err)
      },
    )
  }

  const handleAlertClose = () => {
    setError('')
  }

  const handleChangePasswordIsVisible = () => {
    setPasswordIsVisible(!passwordIsVisible)
  }

  return (
    <Wrapper>
      {error && (
        <AlertContainer
          type="error"
          title="Error"
          message={error}
          onClose={handleAlertClose}
        />
      )}
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <H2>
            <FiUser size="30px" />
          </H2>
          <InputContainer>
            <Input
              type="text"
              placeholder="username"
              {...register('username', usernameValidation)}
            />
            <Error>{errors.username?.message}</Error>
          </InputContainer>
          <InputContainer>
            <Input
              type={passwordIsVisible ? 'text' : 'password'}
              placeholder="password"
              {...register('password', passwordValidation)}
            />
            <FaEye
              onClick={handleChangePasswordIsVisible}
              size={20}
              style={{
                position: 'absolute',
                right: '5px',
                top: '18px',
                color: passwordIsVisible ? colors.primary : colors.secondary,
              }}
            />
            <Error>{errors.password?.message}</Error>
          </InputContainer>
          <Button>
            {isLoading ? <ClipLoader color="white" size="20px" /> : 'Login'}
          </Button>
        </Form>
      </FormContainer>
    </Wrapper>
  )
}

export default Login
