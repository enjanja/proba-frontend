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
  password: string
  name: string
  role: number
  hospitals: HospitalType[]
  active: boolean
  specialization: SpecializationType
  examinations: ExaminationType[]
}

export interface ExaminationType {
  id: number
  name: string
}

export interface PatientType {
  id: number
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
