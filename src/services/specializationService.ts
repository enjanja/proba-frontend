import { API_URL_SPECIALIZATION } from '../api/api'
import instance from '../api/instance'
import { SpecializationType } from '../interfaces/dataTypes'

const deletSpecialization = (id: string) =>
  instance.delete(`${API_URL_SPECIALIZATION}${id}`)

const createSpecialization = (data: SpecializationType) =>
  instance.post(`${API_URL_SPECIALIZATION}`, data)

const getSpecialization = (id: string) =>
  instance.get(`${API_URL_SPECIALIZATION}${id}`)

const getAllSpecializations = () => instance.get(`${API_URL_SPECIALIZATION}`)

export default {
  deletSpecialization,
  createSpecialization,
  getSpecialization,
  getAllSpecializations,
}
