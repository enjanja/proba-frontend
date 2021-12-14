import axios from 'axios'
import { LoginData } from '../interfaces/dataTypes'

const API_URL = 'http://localhost:8081/authenticate'

const login = (data: LoginData) => axios.post(`${API_URL}`, data)

export default { login }
