import { API_URL_DOCTOR } from '../api/api'
import instance from '../api/instance'
import { DoctorType } from '../interfaces/dataTypes'

const deleteDoctor = (id: number) => instance.delete(`${API_URL_DOCTOR}${id}`)

const createDoctor = (data: DoctorType) =>
  instance.post(`${API_URL_DOCTOR}`, data)

const getDoctor = (id: string) => instance.get(`${API_URL_DOCTOR}${id}`)

const getAllDoctors = () => instance.get(`${API_URL_DOCTOR}`)

export default { deleteDoctor, createDoctor, getDoctor, getAllDoctors }
