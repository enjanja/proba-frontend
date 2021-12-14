import axios from 'axios'
import { DoctorType } from '../interfaces/dataTypes'

const API_URL_DOCTOR = 'http://localhost:8081/doctors/'

const deleteDoctor = (id: string) => axios.delete(`${API_URL_DOCTOR}${id}`) // idk ovo mozda ne treba ovako

const createDoctor = (data: DoctorType) => axios.post(`${API_URL_DOCTOR}`, data)

const getDoctor = (id: string) => axios.get(`${API_URL_DOCTOR}${id}`)

const getAllDoctors = (jwt: string) =>
  axios.get(`${API_URL_DOCTOR}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

export default { deleteDoctor, createDoctor, getDoctor, getAllDoctors }
