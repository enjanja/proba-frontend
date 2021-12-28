import axios from 'axios'
import { API_URL_PATIENT } from '../api/api'

const deletePatient = (jmbg: string, jwt: string) =>
  axios.delete(`${API_URL_PATIENT}${jmbg}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

const createPatient = (
  data: { name: string; jmbg: string; id: string },
  jwt: string,
) => {
  console.log(data)

  return axios.post(`${API_URL_PATIENT}`, {
    data,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
} // PatientType

const getPatient = (id: string) => axios.get(`${API_URL_PATIENT}${id}`)

const getAllPatients = (jwt: string) =>
  axios.get(`${API_URL_PATIENT}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

export default { deletePatient, createPatient, getPatient, getAllPatients }
