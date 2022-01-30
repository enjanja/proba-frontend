import { LoginData } from '../interfaces/dataTypes'
import authService from '../services/authService'

export const useAuth = () => {
  const login = (
    data: LoginData,
    setLoading: (yes: boolean) => void, // dodato
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
          onError('Network error')
          return
        }

        onError(err.response?.data)
      })
      .finally(() => setLoading(false))
  }

  return { login }
}
