import axios from 'axios'
import { UserType } from '../interfaces/dataTypes'

const API_URL_PATIENT = 'http://localhost:8081/patient/'

const deletePatient = (id: string) => axios.delete(`${API_URL_PATIENT}${id}`)

const createPatient = (data: UserType) => axios.post(`${API_URL_PATIENT}`, data) // PatientType

const getPatient = (id: string) => axios.get(`${API_URL_PATIENT}${id}`)

const getAllPatients = () => axios.get(`${API_URL_PATIENT}`)

export default { deletePatient, createPatient, getPatient, getAllPatients }
