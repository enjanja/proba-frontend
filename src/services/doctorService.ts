import axios from 'axios'
import { API_URL_DOCTOR } from '../api/api'
import { DoctorType } from '../interfaces/dataTypes'

const deleteDoctor = (id: number) => axios.delete(`${API_URL_DOCTOR}${id}`)

const createDoctor = (data: DoctorType, jwt: string) =>
  axios.post(`${API_URL_DOCTOR}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data,
  })

const getDoctor = (id: string) => axios.get(`${API_URL_DOCTOR}${id}`)

const getAllDoctors = (jwt: string) =>
  axios.get(`${API_URL_DOCTOR}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

export default { deleteDoctor, createDoctor, getDoctor, getAllDoctors }
