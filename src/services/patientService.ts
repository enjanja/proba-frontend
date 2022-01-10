import axios from 'axios'
import { API_URL_PATIENT } from '../api/api'
import instance from '../api/instance'

const deletePatient = (jmbg: string) =>
  instance.delete(`${API_URL_PATIENT}${jmbg}`)

const createPatient = (data: { name: string; jmbg: string; id: string }) => {
  return instance.post(`${API_URL_PATIENT}`, data)
}
const editPatient = (data: { name: string; jmbg: string; id: string }) => {
  return instance.put(`${API_URL_PATIENT}`, data)
}

const getPatient = (id: string) => axios.get(`${API_URL_PATIENT}${id}`)

const getAllPatients = () => instance.get(`${API_URL_PATIENT}`)

export default {
  deletePatient,
  createPatient,
  getPatient,
  getAllPatients,
  editPatient,
}
