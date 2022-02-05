import { API_URL, API_URL_AUTH } from '../api/api'
import instance from '../api/instance'
import { LoginData } from '../interfaces/dataTypes'

const login = (data: LoginData) => instance.post(`${API_URL_AUTH}`, data)

const logout = () => {
  Object.assign(instance.defaults, {
    headers: {
      ...instance.defaults.headers,
      common: {
        ...instance.defaults.headers.common,
        Authorization: ``,
      },
    },
  })
  localStorage.clear()
}

const updatePassword = (data: { oldPassword: string; newPassword: string }) =>
  instance.put(`${API_URL}change-password`, data)

export default { login, logout, updatePassword }
