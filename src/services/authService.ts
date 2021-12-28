import axios from 'axios'
import { API_URL_AUTH } from '../api/api'
import { LoginData } from '../interfaces/dataTypes'

const login = (data: LoginData) => axios.post(`${API_URL_AUTH}`, data)
const logout = () => localStorage.clear()

export default { login, logout }
