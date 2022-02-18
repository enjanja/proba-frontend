import { API_URL_DOCTOR, API_URL_EXAMINATION } from '../api/api'
import instance from '../api/instance'
import { UpdateDiagnosisData } from '../interfaces/dataTypes'

const getAllExaminations = (
  doctorId: string | undefined,
  hospitalId: string,
) => {
  const params = new URLSearchParams()
  if (doctorId && hospitalId) {
    params.append('doctorId', doctorId)
    params.append('hospitalId', hospitalId)
  }
  const request = {
    params: params,
  }

  return instance.get(`${API_URL_EXAMINATION}doctor`, request)
}

const updateDiagnosis = (data: UpdateDiagnosisData) =>
  instance.put(`${API_URL_EXAMINATION}`, data)

const deleteExamination = (
  doctorId: string,
  patientId: string,
  dateTime: string,
) => {
  const params = new URLSearchParams()
  params.append('doctorId', doctorId)
  params.append('patientId', patientId)
  params.append('dateTime', dateTime)
  const request = {
    params: params,
  }

  return instance.delete(`${API_URL_DOCTOR}removeExam`, request)
}

export default {
  getAllExaminations,
  updateDiagnosis,
  deleteExamination,
}
