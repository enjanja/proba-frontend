export interface LoginData {
  username: string
  password: string
}

export interface UserType {
  username: string
  password: string
  name: string
  role: number
  hospitals: HospitalType[]
  active: boolean
  specialization: SpecializationType
}

export interface DoctorType {
  id?: string
  username: string
  password?: string
  name: string
  role?: number
  hospitals?: HospitalType[]
  active?: boolean
  specialization: SpecializationType
  examinations?: ExaminationType[]
}

export interface ExaminationType {
  id: {
    doctorId: string | undefined
    patientId: string
    dateTime: string
  }
  patient: PatientType
  doctor: DoctorType
  diagnosis: string
}

export interface ExaminationTypeForAxios {
  id: {
    doctorId: string
    patientId: string
    dateTime: string
  }
  patient: PatientType
  doctor: DoctorType
  diagnosis: string
}

export interface UpdateDiagnosisData {
  doctorId: string | undefined
  patientId: string
  dateTime: string
  diagnosis: string
}

export interface PatientType {
  id: string
  name: string
  jmbg: string
}

export interface HospitalType {
  id: number
  name: string
  address: string
}

export interface SpecializationType {
  name: string
  id: number
}
