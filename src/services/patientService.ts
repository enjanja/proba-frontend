import { API_URL_PATIENT } from '../api/api'
import instance from '../api/instance'
import { PatientType } from '../interfaces/dataTypes'

const deletePatient = (jmbg: string) =>
  instance.delete(`${API_URL_PATIENT}${jmbg}`)

const createPatient = (data: PatientType) => {
  return instance.post(`${API_URL_PATIENT}`, data)
}
const editPatient = (data: PatientType) => {
  return instance.put(`${API_URL_PATIENT}`, data)
}

const getPatient = (id: string) => instance.get(`${API_URL_PATIENT}${id}`)

const getAllPatients = () => instance.get(`${API_URL_PATIENT}`)

export default {
  deletePatient,
  createPatient,
  getPatient,
  getAllPatients,
  editPatient,
}
