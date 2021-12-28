import axios from 'axios'
import { API_URL_HOSPITAL } from '../api/api'
import { HospitalType } from '../interfaces/dataTypes'

const deletHospital = (id: string) => axios.delete(`${API_URL_HOSPITAL}${id}`)

const createHospital = (data: HospitalType) =>
  axios.post(`${API_URL_HOSPITAL}`, data)

const getHospital = (id: string) => axios.get(`${API_URL_HOSPITAL}${id}`)

const getAllHospitals = (jwt: string) =>
  axios.get(`${API_URL_HOSPITAL}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

export default {
  deletHospital,
  createHospital,
  getHospital,
  getAllHospitals,
}
