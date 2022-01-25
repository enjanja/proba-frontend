import { API_URL_DOCTOR } from '../api/api'
import instance from '../api/instance'
import { DoctorType, ExaminationTypeForAxios } from '../interfaces/dataTypes'

const deleteDoctor = (id: number) => instance.delete(`${API_URL_DOCTOR}${id}`)

const createDoctor = (data: DoctorType) =>
  instance.post(`${API_URL_DOCTOR}`, data)

const createExam = (data: ExaminationTypeForAxios, hospitalId: string) => {
  const params = new URLSearchParams()
  if (data) {
    params.append('doctorId', data.id.doctorId)
    params.append('patientId', data.id.patientId)
    params.append('hospitalId', hospitalId)
    params.append('dateTime', data.id.dateTime)
  }
  const request = {
    params: params,
  }
  return instance.post(`${API_URL_DOCTOR}addExam`, data, request)
}

const getDoctor = (id: string) => instance.get(`${API_URL_DOCTOR}${id}`)

const getAllDoctors = () => instance.get(`${API_URL_DOCTOR}`)

const getAllDoctorByUsername = (username: string) =>
  instance.get(`${API_URL_DOCTOR}${username}`)

export default {
  deleteDoctor,
  createDoctor,
  getDoctor,
  getAllDoctors,
  getAllDoctorByUsername,
  createExam,
}
