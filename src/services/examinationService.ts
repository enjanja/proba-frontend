import { AxiosRequestConfig } from 'axios'
import { API_URL_DOCTOR, API_URL_EXAMINATION } from '../api/api'
import instance from '../api/instance'
import { ExaminationIdType, UpdateDiagnosisData } from '../interfaces/dataTypes'

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

const exportExaminationToPDF = (examinationId: ExaminationIdType) => {
  const params = new URLSearchParams()
  if (
    examinationId.doctorId &&
    examinationId.patientId &&
    examinationId.dateTime
  ) {
    params.append('doctorId', examinationId.doctorId)
    params.append('patientId', examinationId.patientId)
    params.append('dateTime', examinationId.dateTime)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const request: AxiosRequestConfig<any> = {
    responseType: 'blob', // set the response type to blob to get binary data
    params: params,
  }

  return instance.get(`${API_URL_EXAMINATION}pdf`, request)
}

export default {
  getAllExaminations,
  updateDiagnosis,
  deleteExamination,
  exportExaminationToPDF,
}
