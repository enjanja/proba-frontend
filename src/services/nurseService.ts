import axios from 'axios'
import { API_URL_NURSE } from '../api/api'

const getNurse = (id: string) => axios.get(`${API_URL_NURSE}${id}`)

export default { getNurse }
