import { LoginData } from '../interfaces/dataTypes'
import authService from '../services/authService'

export const useAuth = () => {
  const login = (
    data: LoginData,
    onSuccess: () => void,
    onError: (error: string) => void,
  ) => {
    authService
      .login(data)
      .then((res) => {
        if (res.data?.jwt) {
          localStorage.setItem('jwt', JSON.stringify(res.data?.jwt))
          localStorage.setItem('type', JSON.stringify(res.data?.type))
          onSuccess()
        }
      })
      .catch((err) => {
        if (!err.response) {
          onError('Network Error')
          return
        }
        onError(err.response?.data.message)
      })
  }

  const logout = () => {}

  return { login, logout }
}
