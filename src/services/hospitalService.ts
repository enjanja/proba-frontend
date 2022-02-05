import { API_URL_HOSPITAL } from '../api/api'
import instance from '../api/instance'
import { DoctorType, HospitalType } from '../interfaces/dataTypes'

const deletHospital = (id: string) =>
  instance.delete(`${API_URL_HOSPITAL}${id}`)

const createHospital = (data: HospitalType) =>
  instance.post(`${API_URL_HOSPITAL}`, data)

const getHospital = (id: string) => instance.get(`${API_URL_HOSPITAL}${id}`)

const getAllHospitals = () => instance.get(`${API_URL_HOSPITAL}`)

const getHospitalsByDoctor = (data: DoctorType) =>
  instance.get(`${API_URL_HOSPITAL}doctors`, { params: { doctorId: data.id } })

export default {
  deletHospital,
  createHospital,
  getHospital,
  getAllHospitals,
  getHospitalsByDoctor,
}
