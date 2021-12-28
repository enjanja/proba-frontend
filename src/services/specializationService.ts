import axios from 'axios'
import { API_URL_SPECIALIZATION } from '../api/api'
import { SpecializationType } from '../interfaces/dataTypes'

const deletSpecialization = (id: string) =>
  axios.delete(`${API_URL_SPECIALIZATION}${id}`)

const createSpecialization = (data: SpecializationType) =>
  axios.post(`${API_URL_SPECIALIZATION}`, data)

const getSpecialization = (id: string) =>
  axios.get(`${API_URL_SPECIALIZATION}${id}`)

const getAllSpecializations = (jwt: string) =>
  axios.get(`${API_URL_SPECIALIZATION}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

export default {
  deletSpecialization,
  createSpecialization,
  getSpecialization,
  getAllSpecializations,
}
