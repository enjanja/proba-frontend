export interface LoginData {
  username: string
  password: string
}

export interface UserType {
  username: string
  password: string
  fullName: string
  role: number
  hospitals: HospitalType[]
  active: boolean
  specialization: SpecializationType
}

export interface DoctorType {
  username: string
  password: string
  fullName: string
  role: number
  hospitals: HospitalType[]
  active: boolean
  specialization: SpecializationType
}

export interface HospitalType {
  id: number
  name: string
  address: string
}

export interface SpecializationType {
  id: number
  name: string
}
