import { API_URL_EXAMINATION } from '../api/api'
import instance from '../api/instance'
import { UpdateDiagnosisData } from '../interfaces/dataTypes'

const getAllExaminations = (doctorId: string, hospitalId: string) => {
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

export default {
  getAllExaminations,
  updateDiagnosis,
}
